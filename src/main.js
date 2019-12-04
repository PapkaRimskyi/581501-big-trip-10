import {renderMarkup} from './components/markup-render.js';
import {positionForRender} from './utils.js';

import TripInfo from './components/route.js';
import Menu from './components/menu.js';
import Filter from './components/filter.js';
import Sort from './components/sort.js';
import EventAddMenu from './components/event-add-menu.js';
import TripContainer from './components/trip-container.js';
import TripDay from './components/trip-days.js';
import {calculateRouteCost} from './components/calculateCost.js';

// Import roadMap collection
import {createRouteDataCollection} from './components/createRoadmap.js';

const tripMenu = document.querySelector(`.trip-main__trip-controls`);
const tripRouteInfo = document.querySelector(`.trip-main__trip-info`);
const tripEvents = document.querySelector(`.trip-events`);

renderMarkup(tripRouteInfo, new TripInfo().getElement(), positionForRender.afterbegin);
renderMarkup(tripMenu, new Menu().getElement(), positionForRender.beforeend);
renderMarkup(tripMenu, new Filter().getElement(), positionForRender.beforeend);
renderMarkup(tripEvents, new TripContainer().getElement(), positionForRender.beforeend);

const tripEventsList = tripEvents.querySelector(`.trip-events__list`);

const renderRouteList = (routeData) => {
  const tripDayInstance = new TripDay(routeData);
  const tripDayEditForm = new EventAddMenu(routeData);

  const editButton = tripDayInstance.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    tripEventsList.replaceChild(tripDayEditForm.getElement(), tripDayInstance.getElement());
  });

  const editForm = tripDayEditForm.getElement();
  editForm.addEventListener(`submit`, () => {
    tripEventsList.replaceChild(tripDayInstance.getElement(), tripDayEditForm.getElement());
  });

  renderMarkup(tripEventsList, tripDayInstance.getElement(), positionForRender.beforeend);
};

const routeDataCollection = createRouteDataCollection();

routeDataCollection.map((card) => {
  renderRouteList(card);
});

renderMarkup(tripEvents, new Sort().getElement(), positionForRender.afterbegin);
calculateRouteCost(routeDataCollection);
