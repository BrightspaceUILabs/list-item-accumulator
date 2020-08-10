import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
import '@brightspace-ui/core/components/dropdown/dropdown-more.js';
import '@brightspace-ui/core/components/list/list-item-generic-layout.js';
import '@brightspace-ui/core/components/list/list-item-placement-marker.js';
import '@brightspace-ui/core/components/menu/menu.js';
import '@brightspace-ui/core/components/menu/menu-item.js';
import { bodyCompactStyles, bodySmallStyles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { dropLocation, ListItemDragDropMixin } from '@brightspace-ui/core/components/list/list-item-drag-drop-mixin.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { getUniqueId } from '@brightspace-ui/core/helpers/uniqueId.js';
import { langResources } from './lang';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { nothing } from 'lit-html';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

const keyCodes = Object.freeze({
	ENTER: 13,
	SPACE: 32
});

class ListItemAccumulator extends ListItemDragDropMixin(RtlMixin(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_dropdownOpen: { type: Boolean, attribute: '_dropdown-open', reflect: true },
			_hasSecondaryActions: { type: Boolean },
			_hovering: { type: Boolean, reflect: true },
			_tooltipShowing: { type: Boolean, attribute: '_tooltip-showing', reflect: true }
		};
	}

	static get styles() {
		const styles = [ bodyStandardStyles, bodySmallStyles, bodyCompactStyles, css`
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
				padding: 0.6rem 0.7rem 0.6rem 0.25rem;
			}
			:host([draggable][dir="rtl"]) .d2l-bordered-container {
				padding: 0.6rem 0.25rem 0.7rem 0.6rem;
			}
			.d2l-bordered-container {
				border: 1px solid transparent;
				border-radius: 6px;
				padding: 0.6rem 0.7rem;
				position: relative;
				transform: rotate(1deg);
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
				animation-duration: 2s;
				animation-name: showBoxShadowDelay;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
				display: block;
			}
			[slot="outside-control"] {
				width: 1.4rem;
			}
			.d2l-list-item-drag-shadow {
				border-radius: 6px;
				display: block;
				height: 100%;
				left: 0;
				pointer-events: none;
				position: absolute;
				top: 0;
				width: 100%;
			}
			:host([hidden]) {
				display: none;
			}

			.d2l-hidden {
				display: none;
			}
			[slot="outside-control-action"] {
				margin: -0.6rem -0.25rem -0.7rem -0.6rem;
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
				display: flex;
				min-height: 4.2rem;
				z-index: 2;
			}
			[slot="content-action"] {
				background: white;
				border-radius: 6px;
				z-index: 1;
			}

			[slot="content"] ::slotted([slot="illustration"]) {
				flex-grow: 0;
				flex-shrink: 0;
				max-height: 5.7rem;
				max-width: 4.2rem;
				overflow: hidden;
				border-radius: 6px 0 0 6px;
				object-fit: cover;
			}
			[slot="content"] ::slotted([slot="supporting-info"]) {
				color: var(--d2l-color-celestine);

			}
			:host([dir="rtl"]) [slot="content"] ::slotted([slot="illustration"]) {
				border-radius: 0 6px 6px 0;
			}
			.d2l-body-small {
				margin: 0;
			}
			.d2l-list-item-main {
				align-content: center;
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 0.9rem;
				padding: 0.4rem 0;
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
				display: flex;
				margin-right: 0.8rem;
			}
			:host([dir="rtl"]) .d2l-list-item-actions-container {
				margin-left: 0.8rem;
				margin-right: 0;
			}
			::slotted([slot="primary-action"]) {
				display: none;
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

			@media screen and (min-width: 615px) {

				[slot="content"] ::slotted([slot="illustration"]) {
					max-height: 5rem;
					max-width: 8.6rem;
				}

				[slot="content"] {
					min-height: 4.2rem;
				}

				[slot="content"] ::slotted([slot="supporting-info"]) {
					color: var(--d2l-color-celestine);
					height: 1.2rem;
					overflow: hidden;
				}
				.d2l-primary-action-mobile {
					display: none;
				}
				::slotted([slot="primary-action"]) {
					display: inline-block;
				}
			}
		`];
		super.styles && styles.unshift(super.styles);
		return styles;
	}

	static async getLocalizeResources(langs) {
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
		this._primaryAction = null;
	}

	firstUpdated(changedProperties) {
		this.addEventListener('d2l-dropdown-open', () => this._dropdownOpen = true);
		this.addEventListener('d2l-dropdown-close', () => this._dropdownOpen = false);
		this.addEventListener('d2l-tooltip-show', () => this._tooltipShowing = true);
		this.addEventListener('d2l-tooltip-hide', () => this._tooltipShowing = false);
		this._getActions();

		super.firstUpdated(changedProperties);
	}

	render() {
		const mobilePrimaryAction = this._primaryAction ? html`
			<d2l-menu-item
				class="d2l-primary-action-mobile"
				text="${this._primaryAction.text}"
				@click="${this._onClickPrimaryMenuItem}"></d2l-menu-item>
		` : nothing;
		const classes = {
			'd2l-bordered-container': true,
			'd2l-hovering': this._hovering
		};
		const dropdownClasses = {
			'd2l-hidden':
				(!this._hasSecondaryActions && !this.draggable) ||
				(!this.nextElementSibling && !this.previousElementSibling && !this._hasSecondaryActions) // only child
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
								<div class="d2l-body-standard"><slot></slot></div>
								<div class="d2l-body-small"><slot name="secondary"></slot></div>
								<div class="d2l-body-compact"><slot name="supporting-info"></slot></div>
							</div>
						</div>
						<div slot="actions">
							<div class="d2l-list-item-actions-container">
								<slot name="primary-action"></slot>
								<d2l-dropdown-more text="${this.localize('actions')}" class="${classMap(dropdownClasses)}">
									<d2l-dropdown-menu id="${this._dropdownId}">
										<d2l-menu label="${this.localize('secondaryActions')}">
											${mobilePrimaryAction}
											${this._renderReorderActions()}
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

	_getActions() {
		this._getSlottedPrimaryAction();
		this._getSlottedSecondaryActions();
	}

	_getSlottedPrimaryAction() {
		const primary = this.shadowRoot.querySelector('slot[name="primary-action"]');
		if (primary) {
			const actions = primary.assignedNodes({flatten: true});
			if (actions) this._primaryAction = actions[0];
		}
	}

	_getSlottedSecondaryActions() {
		const secondary = this.shadowRoot.querySelector('slot[name="secondary-action"]');
		if (secondary) {
			const actions = secondary.assignedNodes({flatten: true});
			if (actions.length) this._hasSecondaryActions = true;
		}
	}

	_onClickMoveDown() {
		this._annoucePositionChange(this.key, null, dropLocation.shiftDown);
	}

	_onClickMoveUp() {
		this._annoucePositionChange(this.key, null, dropLocation.shiftUp);
	}

	_onClickPrimaryMenuItem() {
		this._primaryAction.click();
	}

	_onKeyDownMoveDown(e) {
		return (e.keyCode === keyCodes.ENTER || e.keyCode === keyCodes.SPACE) && this._annoucePositionChange(this.key, null, dropLocation.shiftDown);
	}

	_onKeyDownMoveUp(e) {
		return (e.keyCode === keyCodes.ENTER || e.keyCode === keyCodes.SPACE) && this._annoucePositionChange(this.key, null, dropLocation.shiftUp);
	}

	_renderOutsideControl(dragHandle) {
		return html`<div slot="outside-control">${dragHandle}</div>`;
	}

	_renderReorderActions() {
		if (!this.draggable) return nothing;
		// if direction is up and this is the first item, don't render up
		const upAction = this.previousElementSibling ? html`
			<d2l-menu-item text="${this.localize('moveUp')}" @click="${this._onClickMoveUp}" @keydown="${this._onKeyDownMoveUp}"></d2l-menu-item>
			` : nothing;
		// if direction is down and this is the last item, don't render down
		const downAction = this.nextElementSibling ? html`
			<d2l-menu-item text="${this.localize('moveDown')}" @click="${this._onClickMoveDown}" @keydown="${this._onKeyDownMoveDown}"></d2l-menu-item>
			` : nothing;
		return html`
			${upAction}
			${downAction}
		`;
	}

	_renderOutsideControlAction(dragTarget) {
		return html`<div slot="outside-control-action">${dragTarget}</div>`;
	}
}
customElements.define('d2l-labs-list-item-accumulator', ListItemAccumulator);
