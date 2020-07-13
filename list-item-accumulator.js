import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
import '@brightspace-ui/core/components/dropdown/dropdown-more.js';
import '@brightspace-ui/core/components/list/list-item-generic-layout.js';
import '@brightspace-ui/core/components/list/list-item-placement-marker.js';
import '@brightspace-ui/core/components/menu/menu.js';
import '@brightspace-ui/core/components/menu/menu-item.js';
import { bodyCompactStyles, bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ListItemDragDropMixin } from '@brightspace-ui/core/components/list/list-item-drag-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ListItemAccumulator extends ListItemDragDropMixin(RtlMixin(LitElement)) {

	static get properties() {
		return {
			_hovering: { type: Boolean, attribute: '_hovering', reflect: true }
		};
	}

	static get styles() {
		const styles = [ bodySmallStyles, bodyCompactStyles, css`
			:host {
				display: block;
				padding: 0.6rem 0.7rem;
				border: 1px solid transparent;
				border-radius: 6px;
				position: relative;
				pointer-events:all;
			}
			:host([draggable]) {
				padding: 0.6rem 0.7rem 0.6rem 0.25rem;
			}
			:host([_hovering]:not([dragging])) {
				border-color: var(--d2l-color-mica);
			}
			:host([_hovering]:not([hide-dragger]):not([dragging])) .d2l-list-item-drag-shadow {
				display: block;
				animation-duration: 2s;
				animation-name: showBoxShadowDelay;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			}
			:host([dragging]) d2l-list-item-generic-layout {
				opacity: 0.3;
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
			[slot="actions"] {
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
			.d2l-list-item-actions-container {
				padding: 0 0.8rem 0 0;
				display: flex;
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

	get primaryAction() {
		const primary = this.shadowRoot.querySelector('slot[name="primary-action"]');
		if (primary) {
			const actions = primary.assignedNodes({flatten: true});
			if (actions) return actions[0];
		}
		return null;
	}

	get secondaryActions() {
		const primary = this.shadowRoot.querySelector('slot[name="secondary-action"]');
		if (primary) {
			const actions = primary.assignedNodes({flatten: true});
			if (actions) return actions;
		}
		return [];
	}

	get hasActions() {
		return this.primaryAction || this.secondaryActions.length;
	}

	firstUpdated(changedProperties) {
		this.addEventListener('mouseenter', () => this._hovering = true);
		this.addEventListener('mouseleave', () => this._hovering = false);
		super.firstUpdated(changedProperties);
	}
	// todo: add accessibility options for label
	render() {
		const menu = this.draggable || this.hasActions ? html`
			<d2l-dropdown-more text="Actions">
				<d2l-dropdown-menu id="dropdown">

				</d2l-dropdown-menu>
			</d2l-dropdown-more>
		` : '';
		return html`
			${this._renderTopPlacementMarker(html`<d2l-list-item-placement-marker></d2l-list-item-placement-marker>`)}
			${this._renderDropTarget()}
			<div class="d2l-list-item-drag-image">
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
							<d2l-dropdown-more text="Actions">
								<d2l-dropdown-menu id="dropdown">
									<d2l-menu label="Actions for list item">
										<slot name="secondary-action"></slot>
									</d2l-menu>
								</d2l-dropdown-menu>
							</d2l-dropdown-more>
						</div>
					</div>
				</d2l-list-item-generic-layout>
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
