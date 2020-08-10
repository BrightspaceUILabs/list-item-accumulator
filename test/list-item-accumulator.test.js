import '../list-item-accumulator.js';
import { expect, fixture, html } from '@open-wc/testing';
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
		const basicList = html`
		<div>
			<d2l-labs-list-item-accumulator draggable key="1"></d2l-labs-list-item-accumulator>
			<d2l-labs-list-item-accumulator draggable key="2"></d2l-labs-list-item-accumulator>
			<d2l-labs-list-item-accumulator draggable key="3"></d2l-labs-list-item-accumulator>
		</div>`;

		it('should only show "Move Down" when first item', async() => {
			const el = await fixture(basicList);
			const items = el.firstElementChild.shadowRoot.querySelectorAll('d2l-menu-item');
			expect(items).to.not.be.null;
			expect(items).to.have.lengthOf(1);
			expect(items[0].text).to.equal('Move Down');
		});

		it('should only show "Move Up" when last item', async() => {
			const el = await fixture(basicList);
			const items = el.lastElementChild.shadowRoot.querySelectorAll('d2l-menu-item');
			expect(items).to.not.be.null;
			expect(items).to.have.lengthOf(1);
			expect(items[0].text).to.equal('Move Up');
		});

		it('should show both actions when middle item', async() => {
			const el = await fixture(basicList);
			const items = el.querySelector(':nth-child(2)').shadowRoot.querySelectorAll('d2l-menu-item');
			expect(items).to.not.be.null;
			expect(items).to.have.lengthOf(2);
		});

		it('should show no actions when only item in list', async() =>{
			const el = await fixture(html`<div><d2l-labs-list-item-accumulator draggable key="1"></d2l-labs-list-item-accumulator></div>`);
			expect(el.firstElementChild.shadowRoot.querySelector('d2l-menu-item')).to.be.null;
		});
	});

});
