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
				margin: 0 0.9rem 0 0;
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
			}
			.d2l-list-item-actions-container {
				padding: 0 0.8rem 0 0;
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: right;
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
				<div class="d2l-list-item-actions-container" slot="actions">
					<slot name="actions">
				</div>
			</d2l-list-item-generic-layout>
		`;
	}
}
customElements.define('d2l-labs-list-item-accumulator', ListItemAccumulator);
