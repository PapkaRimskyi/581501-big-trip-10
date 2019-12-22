import AbstractComponent from './abstract-class.js';

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

export default class Filter extends AbstractComponent {
  constructor(mockFiltersData) {
    super();
    this._mockFiltersData = mockFiltersData;
    this._filter = null;
  }

  getTemplate() {
    return createFilter(this._mockFiltersData);
  }

  setFilterContainerHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `INPUT` && evt.target.checked) {
        if (this._filter !== evt.target) {
          this._filter = evt.target;
          handler(this._filter.value);
        }
      }
    });
  }
}
