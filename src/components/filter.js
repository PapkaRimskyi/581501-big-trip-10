import {mockFilterData} from '../mock/mockFilterData.js';
import {createElement} from '../utils.js';

const createFilter = (filterData) => (
  `<form class="trip-filters" action="#" method="get">
  ${filterData.map((item) => {
    return `
    <div class="trip-filters__filter">
    <input id="${item.inputCardId}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.inputValue}" ${item.inputChecked === true ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="${item.inputCardId}">${item.labelName}</label>
  </div>
    `;
  }).join(` `)}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>
  `
);

export default class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilter(mockFilterData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
