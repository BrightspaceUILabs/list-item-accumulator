import { ListItemAccumulatorMixin } from './list-item-accumulator-mixin.js';
import { LitElement } from 'lit';

class ListItemAccumulator extends ListItemAccumulatorMixin(LitElement) {
	render() {
		return this._renderListItem();
	}
}

customElements.define('d2l-labs-list-item-accumulator', ListItemAccumulator);
