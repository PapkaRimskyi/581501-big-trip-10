export const createFilter = (filterData) => (
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
