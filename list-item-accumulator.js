import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/list/list-item-generic-layout.js';
import '@brightspace-ui/core/components/list/list-item-placement-marker.js';
import '@brightspace-ui/core/components/list/list-item-drag-handle.js';
import { bodyCompactStyles, bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ListItemAccumulator extends RtlMixin(LitElement) {

	static get properties() {
		return {
			prop1: { type: String },
		};
	}

	static get styles() {
		return [ bodySmallStyles, bodyCompactStyles, css`
			:host {
				display: block;
				padding: 0.6rem 0.7rem 0.6rem 0.25rem;
				border: 1px solid transparent;
				border-radius: 6px;
				position: relative;
				pointer-events:all;
			}
			:host(:hover) {
				border-color: var(--d2l-color-mica);
			}
			:host(:hover:not([hide-dragger])) .d2l-list-item-drag-shadow {
				display: block;
				animation-duration: 2s;
				animation-name: showBoxShadowDelay;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
				width: 1.4rem;
			}
			d2l-list-item-drag-handle {
				justify-self: middle;
			}
			[slot="content"] {
				z-index: 2;
				display: flex;
				max-height: 5.7rem;
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
				max-height: 5.7rem;
				max-width: 4.2rem;
				overflow: hidden;
				border-radius: 6px 0 0 6px;
				object-fit: cover;
			}
			[slot="content"] ::slotted([slot="supporting-information"]) {
				display: none;
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
				margin: 0 0 0 0.9rem;
			}
			[slot="actions"] {
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding-right: 0.8rem;
			}
			.d2l-list-item-actions-container {
				align-self: flex-start;
				display: grid;
				flex-grow: 0;
				grid-auto-columns: 1fr;
				grid-auto-flow: column;
			}

			@media screen and (min-width: 636px) {
				[slot="outside-control"] {
					width: 2.1rem;
				}

				[slot="content"] ::slotted([slot="illustration"]) {
					max-height: 5rem;
					max-width: 8.6rem;
				}

				[slot="content"] {
					min-height: 4.2rem;
				}

				[slot="content"] ::slotted([slot="supporting-information"]) {
					color: var(--d2l-color-celestine);
					font-size: 0.7rem;
					display: block;
					height: 1.2rem;
					overflow: hidden;
				}
			}

			@media screen and (min-width: 842px) {
				[slot="content"] ::slotted([slot="supporting-information"]) {
					font-size: 0.8rem;
				}
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

		this.prop1 = 'list-item-accumulator';
	}

	render() {
		return html`
			<div class="d2l-list-item-drag-shadow"></div>
			<d2l-list-item-generic-layout>
				<div slot="outside-control">
					<d2l-list-item-drag-handle></d2l-list-item-drag-handle>
				</div>
				<div slot="outside-control-action"></div>
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
						<d2l-button-icon text="My Button" icon="tier1:more"></d2l-button-icon>
					</div>
				</div>
			</d2l-list-item-generic-layout>
		`;
	}
}
customElements.define('d2l-labs-list-item-accumulator', ListItemAccumulator);
