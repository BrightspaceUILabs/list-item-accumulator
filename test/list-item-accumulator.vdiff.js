import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/menu/menu-item.js';
import '@brightspace-ui/core/components/typography/typography.js';
import '../list-item-accumulator.js';
import { expect, fixture, html } from '@brightspace-ui/testing';

describe('d2l-labs-list-item-accumulator', () => {

	it('default', async() => {
		const elem = await fixture(html`
			<div style="background-color: #bbbbbb;">
				<d2l-list>
					<d2l-labs-list-item-accumulator>
						<img slot="illustration" src="https://s.brightspace.com/course-images/images/e5fd575a-bc14-4a80-89e1-46f349a76178/tile-high-density-max-size.jpg">
						Employee Orientation
						<div slot="secondary">Course &middot; 33 mins</div>
						<div slot="supporting-info">Due: 5 days</div>
					
						<d2l-button-icon text="Search" icon="tier1:search" slot="primary-action"></d2l-button-icon>
						<d2l-menu-item text="View" slot="secondary-action"></d2l-menu-item>
						<d2l-menu-item text="Delete" slot="secondary-action"></d2l-menu-item>
					</d2l-labs-list-item-accumulator>
					<d2l-labs-list-item-accumulator>
						Content
						<div slot="secondary">Course · 33 mins</div>
					</d2l-labs-list-item-accumulator>
				</d2l-list>
			</div>
		`);
		await expect(elem).to.be.golden();
	});

});
