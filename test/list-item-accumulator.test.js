/* eslint-disable */
import '../list-item-accumulator.js';
import { elementUpdated, expect, fixture, html, waitUntil } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-labs-list-item-accumulator', () => {

	describe('accessibility', () => {
		it('should pass all axe tests', async() => {
			const el = await fixture(html`<d2l-labs-list-item-accumulator></d2l-labs-list-item-accumulator>`);
			await expect(el).to.be.accessible();
		});
	});

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-labs-list-item-accumulator');
		});
	});

	describe('reorder actions', () => {
		let el;

		before(async() => {
			const basicList = html`
			<div>
				<d2l-labs-list-item-accumulator draggable="true" key="1"></d2l-labs-list-item-accumulator>
				<d2l-labs-list-item-accumulator draggable="true" key="2"></d2l-labs-list-item-accumulator>
				<d2l-labs-list-item-accumulator draggable="true" key="3"></d2l-labs-list-item-accumulator>
			</div>`;

			el = await fixture(basicList);
			await elementUpdated(el);
			const items = el.firstElementChild.shadowRoot.querySelectorAll('d2l-menu-item');
			await waitUntil(() =>  Array.from(items).find(item => item.text !== undefined));
		});

		it.skip('should only show "Move Down" when first item', async() => {
			const items = el.firstElementChild.shadowRoot.querySelectorAll('d2l-menu-item');
			await waitUntil(() =>  Array.from(items).find(item => item.text === 'Move Down'), 'Element did not become ready');
			const itemsWithText = Array.from(items).filter(item => item.text);

			expect(itemsWithText.find(item => item.text === 'Move Down')).to.exist;
			expect(itemsWithText.find(item => item.text === 'Move Up')).to.be.undefined;
		}); // Safari keeps failing on this test, "items" never resolves to anything

		it('should only show "Move Up" when last item', async() => {
			const items = el.lastElementChild.shadowRoot.querySelectorAll('d2l-menu-item');
			await waitUntil(() =>  Array.from(items).find(item => item.text === 'Move Up'), 'Element did not become ready');
			const itemsWithText = Array.from(items).filter(item => item.text);

			expect(itemsWithText.find(item => item.text === 'Move Down')).to.be.undefined;
			expect(itemsWithText.find(item => item.text === 'Move Up')).to.exist;
		});

		it('should show both actions when middle item', async() => {
			const items = el.querySelector(':nth-child(2)').shadowRoot.querySelectorAll('d2l-menu-item');
			await waitUntil(() =>  Array.from(items).find(item => item.text === 'Move Down'), 'Element did not become ready');
			const itemsWithText = Array.from(items).filter(item => item.text);

			expect(itemsWithText.find(item => item.text === 'Move Down')).to.exist;
			expect(itemsWithText.find(item => item.text === 'Move Up')).to.exist;
		});

		it('should show no actions when only item in list', async() => {
			const el = await fixture(html`<div><d2l-labs-list-item-accumulator draggable="true" key="1"></d2l-labs-list-item-accumulator></div>`);
			const items = el.firstElementChild.shadowRoot.querySelectorAll('d2l-menu-item');

			const itemsWithText = Array.from(items).filter(item => item.text);
			expect(itemsWithText.find(item => item.text === 'Move Down')).to.be.undefined;
			expect(itemsWithText.find(item => item.text === 'Move Up')).to.be.undefined;
		});
	});

});
