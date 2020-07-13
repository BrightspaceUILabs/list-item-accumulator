import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
import '@brightspace-ui/core/components/dropdown/dropdown-more.js';
import '@brightspace-ui/core/components/list/list-item-generic-layout.js';
import '@brightspace-ui/core/components/list/list-item-placement-marker.js';
import '@brightspace-ui/core/components/menu/menu.js';
import '@brightspace-ui/core/components/menu/menu-item.js';
import { bodyCompactStyles, bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { getUniqueId } from '@brightspace-ui/core/helpers/uniqueId.js';
import { ListItemDragDropMixin } from '@brightspace-ui/core/components/list/list-item-drag-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ListItemAccumulator extends ListItemDragDropMixin(RtlMixin(LitElement)) {

	static get properties() {
		return {
			secondaryActions: { type: Array },
			_dropdownOpen: { type: Boolean, attribute: '_dropdown-open', reflect: true },
			_hovering: { type: Boolean, attribute: '_hovering', reflect: true },
			_tooltipShowing: { type: Boolean, attribute: '_tooltip-showing', reflect: true }
		};
	}

	static get styles() {
		const styles = [ bodySmallStyles, bodyCompactStyles, css`
			:host {
				display: block;
				pointer-events:all;
			}
			:host([_tooltip-showing]),
			:host([_dropdown-open]){
				z-index: 10;
			}
			:host([_hovering]){
				z-index: 9;
			}
			:host([dragging]) d2l-list-item-generic-layout {
				opacity: 0.3;
			}
			:host([draggable]) .d2l-bordered-container {
				padding-left: 0.25rem;
			}
			:host([draggable][dir="rtl"]) .d2l-bordered-container {
				padding-left: 0.6rem 0.25rem 0.7rem 0.6rem;
			}
			.d2l-bordered-container {
				padding: 0.6rem 0.7rem;
				border: 1px solid transparent;
				border-radius: 6px;
				background: var(--d2l-color-sylvite);
				transform: rotate(1deg);
				position: relative;
			}
			.d2l-list-item-drag-image {
				transform: rotate(-1deg);
			}
			:host([draggable]) .d2l-list-item-drag-image {
				transform: rotate(-1deg);
			}
			:host(:not([dragging])) .d2l-hovering {
				border-color: var(--d2l-color-mica);
			}
			:host(:not([dragging])) .d2l-hovering .d2l-list-item-drag-shadow {
				display: block;
				animation-duration: 2s;
				animation-name: showBoxShadowDelay;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			}
			[slot="outside-control"] {
				width: 1.4rem;
			}
			.d2l-list-item-drag-shadow {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 6px;
				display: block;
				pointer-events: none;
			}
			:host([hidden]) {
				display: none;
			}

			.d2l-hidden {
				display: none;
			}
			[slot="outside-control-action"] {
				z-index: 3;
			}
			[slot="outside-control"] {
				display: flex;
				z-index: 4;
			}
			d2l-list-item-drag-handle {
				justify-self: middle;
			}
			[slot="content"] {
				z-index: 2;
				display: flex;
				min-height: 4.2rem;
			}
			[slot="content-action"] {
				background: white;
				border-radius: 6px;
				z-index: 1;
			}

			[slot="content"] ::slotted([slot="illustration"]) {
				flex-grow: 0;
				flex-shrink: 0;
				max-height: 5rem;
				max-width: 8.6rem;
				overflow: hidden;
				border-radius: 6px 0 0 6px;
			}
			[slot="content"] ::slotted([slot="supporting-information"]) {
				color: var(--d2l-color-celestine);
				font-size: 0.8rem;
			}
			:host([dir="rtl"]) [slot="content"] ::slotted([slot="illustration"]) {
				border-radius: 0 6px 6px 0;
			}
			.d2l-body-small {
				margin: 0;
			}
			.d2l-list-item-main {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-content: center;
				margin-left: 0.9rem;
			}
			:host([dir="rtl"]) .d2l-list-item-main {
				margin-left: 0;
				margin-right: 0.9rem;
			}
			[slot="actions"] {
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
			.d2l-list-item-actions-container {
				margin-right: 0.8rem;
				display: flex;
			}
			:host([dir="rtl"]) .d2l-list-item-actions-container {
				margin-left: 0.8rem;
				margin-right: 0;
			}

			@keyframes showBoxShadowDelay {
				0%, 85% {
					border-color: var(--d2l-color-mica);
					box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.19);
				}
				100% {
					border-color: transparent;
					box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
				}
			}
		`];
		super.styles && styles.unshift(super.styles);
		return styles;
	}

	static async getLocalizeResources(langs) {
		const langResources = {
			'en': { 'myLangTerm': 'I am a localized string!' }
		};

		for (let i = 0; i < langs.length; i++) {
			if (langResources[langs[i]]) {
				return {
					language: langs[i],
					resources: langResources[langs[i]]
				};
			}
		}

		return null;
	}

	constructor() {
		super();
		this._dropdownId = getUniqueId();
		this.primaryAction = null;
		this.secondaryActions = [];
	}

	getSlottedPrimaryAction() {
		const primary = this.shadowRoot.querySelector('slot[name="primary-action"]');
		if (primary) {
			const actions = primary.assignedNodes({flatten: true});
			if (actions) return actions[0];
		}
		return null;
	}

	getSlottedSecondaryActions() {
		const secondary = this.shadowRoot.querySelector('slot[name="secondary-action"]');
		if (secondary) {
			const actions = secondary.assignedNodes({flatten: true});
			if (actions) this.secondaryActions = actions;
		}
		return [];
	}

	get hasActions() {
		return this.primaryAction || this.secondaryActions.length;
	}

	firstUpdated(changedProperties) {
		this.addEventListener('d2l-dropdown-open', () => this._dropdownOpen = true);
		this.addEventListener('d2l-dropdown-close', () => this._dropdownOpen = false);
		this.addEventListener('d2l-tooltip-show', () => this._tooltipShowing = true);
		this.addEventListener('d2l-tooltip-hide', () => this._tooltipShowing = false);
		this.getSlottedSecondaryActions();
		super.firstUpdated(changedProperties);
	}
	// todo: add accessibility options for label
	render() {

		const classes = {
			'd2l-bordered-container': true,
			'd2l-hovering': this._hovering
		};
		const dropdownClasses = {
			'd2l-hidden': !this.secondaryActions.length
		};
		return html`
			${this._renderTopPlacementMarker(html`<d2l-list-item-placement-marker></d2l-list-item-placement-marker>`)}
			${this._renderDropTarget()}
			<div class="d2l-list-item-drag-image">
				<div class="${classMap(classes)}">
					<div class="d2l-list-item-drag-shadow"></div>
					<d2l-list-item-generic-layout>
						${this._renderDragHandle(this._renderOutsideControl)}
						${this._renderDragTarget(this._renderOutsideControlAction)}
						<div slot="content-action"></div>
						<div slot="content">
							<slot name="illustration"></slot>
							<div class="d2l-list-item-main">
								<slot></slot>
								<div class="d2l-body-small"><slot name="secondary"></slot></div>
								<slot name="supporting-information"></slot>
							</div>
						</div>
						<div slot="actions">
							<div class="d2l-list-item-actions-container">
								<slot name="primary-action"></slot>
								<d2l-dropdown-more text="Actions" class="${classMap(dropdownClasses)}">
									<d2l-dropdown-menu id="${this._dropdownId}">
										<d2l-menu label="Secondary actions">
											<slot name="secondary-action"></slot>
										</d2l-menu>
									</d2l-dropdown-menu>
								</d2l-dropdown-more>
							</div>
						</div>
					</d2l-list-item-generic-layout>
				</div>
			</div>
			${this._renderBottomPlacementMarker(html`<d2l-list-item-placement-marker></d2l-list-item-placement-marker>`)}
		`;
	}

	_renderOutsideControl(dragHandle) {
		return html`<div slot="outside-control">${dragHandle}</div>`;
	}

	_renderOutsideControlAction(dragTarget) {
		return html`<div slot="outside-control-action">${dragTarget}</div>`;
	}
}
customElements.define('d2l-labs-list-item-accumulator', ListItemAccumulator);
