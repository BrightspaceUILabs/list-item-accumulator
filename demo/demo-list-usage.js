import '../list-item-accumulator.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/menu/menu-item.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { nothing } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';

class DemoAccumulatorUsage extends LitElement {
	static get properties() {
		return {
			list: { type: Array }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
				background-color: var(--d2l-color-sylvite);
			}
		`;
	}

	constructor() {
		super();
		this.list = [
			{
				key: '1',
				name: 'Geomorphology and GIS',
				secondary: 'Course · 33 mins',
				supporting: 'Due: 3 days',
				img: 'https://s.brightspace.com/course-images/images/63b162ab-b582-4bf9-8c1d-1dad04714121/tile-high-density-max-size.jpg',
				href: 'https://d2l.com'
			},
			{
				key: '2',
				name: 'Engineering Materials for Energy Systems',
				secondary: 'Course',
				img: 'https://s.brightspace.com/course-images/images/e5fd575a-bc14-4a80-89e1-46f349a76178/tile-high-density-max-size.jpg',
				href: 'https://d2l.com'
			},
			{
				key: '3',
				name: 'Introductory Earth Sciences',
				secondary: 'Course',
				img: 'https://s.brightspace.com/course-images/images/38e839b1-37fa-470c-8830-b189ce4ae134/tile-high-density-max-size.jpg',
				href: 'https://d2l.com'
			},
			{
				key: '4',
				name: 'Applied Complex Analysis',
				secondary: 'Learning Path',
				supporting: 'Due: 1 day',
				img: 'https://s.brightspace.com/course-images/images/c63e7407-c3ba-4fa0-8383-08a8f4fa468b/tile-high-density-max-size.jpg',
				href: 'https://d2l.com'
			},
			{
				key: '5',
				name: 'Basic French',
				secondary: 'Course',
				img: 'https://s.brightspace.com/course-images/images/9e319eb4-31af-4912-889d-92d9f2d82884/tile-high-density-max-size.jpg',
				href: 'https://d2l.com'
			},
			{
				key: '6',
				name: 'Algebraic Number Theory',
				secondary: 'Course',
				img: 'https://s.brightspace.com/course-images/images/36c5813d-2ac3-4a73-8f39-3d6e1b381fe3/tile-high-density-max-size.jpg',
				href: 'https://d2l.com'
			}
		];
	}

	render() {
		return html`
			<d2l-list @d2l-list-item-position-change="${this._moveItems}">
				${repeat(this.list, (item) => item.key, (item) => html`
					<d2l-labs-list-item-accumulator key="${ifDefined(item.key)}" draggable="true">
						<img slot="illustration" src="${item.img}">
						<div>${item.name}</div>
						<div slot="secondary">${item.secondary}</div>
						${item.supporting ? html`<div slot="supporting-info">${item.supporting}</div>` : nothing }
						<d2l-menu-item slot="secondary-action" text="Remove"></d2l-menu-item>
					</d2l-labs-list-item-accumulator>
				`)}
			</d2l-list>
		`;
	}

	_moveItems(e) {
		e.detail.reorder(this.list, { keyFn: (item) => item.key });
		this.requestUpdate('list', []);
	}

}

customElements.define('d2l-demo-list-accumulator-usage', DemoAccumulatorUsage);
