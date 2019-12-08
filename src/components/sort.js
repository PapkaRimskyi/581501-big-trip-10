import AbstractComponent from './abstract-class.js';
import {sortType} from '../mock/mockSortData.js';

const createSort = (sortData) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <span class="trip-sort__item  trip-sort__item--day"></span>

  ${sortData.map((sort) => {
    return `<div class="trip-sort__item  trip-sort__item--${sort.sortName}">
    <input id="sort-${sort.sortName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort.sortName}" ${sort.checked === true ? `checked` : ``}>
    <label class="trip-sort__btn" for="sort-${sort.sortName}" data-sort="${sort.sortName}">
      ${sort.sortName.charAt(0).toUpperCase() + sort.sortName.substr(1)}
    </label>
  </div>
    `;
  }).join(` `)}

  <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
</form>
  `
);

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = sortType.find((item) => item.checked === true ? item : false).sortName;
  }

  getTemplate() {
    return createSort(sortType);
  }

  setSortClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName === `LABEL`) {
        if (evt.target.dataset.sort === this._currentSortType) {
          return;
        }
        this._currentSortType = evt.target.dataset.sort;
        handler(this._currentSortType);
      } else {
        return;
      }
    });
  }
}
