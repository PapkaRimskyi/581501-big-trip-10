const createMenuMarkup = (menuData) => {
  const menuMarkupCollection = [];
  for (let itemMenu of menuData) {
    menuMarkupCollection.push(`<a class="trip-tabs__btn ${itemMenu.menuChecked === true ? `trip-tabs__btn--active` : ``}" href="#">${itemMenu.menuName}</a>`);
  }
  return menuMarkupCollection.join(` `);
};

export const createMenu = (menuData) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${createMenuMarkup(menuData)}
</nav>
  `
);
