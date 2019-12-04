import {createElement} from '../utils.js';
import {mockMenuData} from '../mock/mockMenuData.js';

const createMenuMarkup = (menuData) => {
  const menuMarkupCollection = [];
  for (let itemMenu of menuData) {
    menuMarkupCollection.push(`<a class="trip-tabs__btn ${itemMenu.menuChecked === true ? `trip-tabs__btn--active` : ``}" href="#">${itemMenu.menuName}</a>`);
  }
  return menuMarkupCollection.join(` `);
};

const createMenu = (menuData) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${createMenuMarkup(menuData)}
</nav>
  `
);

export default class Menu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMenu(mockMenuData);
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
