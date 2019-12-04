import {renderMarkup} from './components/markup-render.js';
import {positionForRender} from './utils.js';
import {keyCodeName} from './const.js';

import TripInfo from './components/route.js';
import Menu from './components/menu.js';
import Filter from './components/filter.js';
import Sort from './components/sort.js';
import EventAddMenu from './components/event-add-menu.js';
import TripContainer from './components/trip-container.js';
import TripDay from './components/trip-days.js';
import NoRouteWarning from './components/no-route.js';
import {calculateRouteCost} from './components/calculateCost.js';

// Import roadMap collection
import {createRouteDataCollection} from './components/createRoadmap.js';

const tripMenu = document.querySelector(`.trip-main__trip-controls`);
const tripRouteInfo = document.querySelector(`.trip-main__trip-info`);
const tripEvents = document.querySelector(`.trip-events`);

renderMarkup(tripMenu, new Menu().getElement(), positionForRender.beforeend);
renderMarkup(tripMenu, new Filter().getElement(), positionForRender.beforeend);

const renderRouteList = (eventsList, routeData) => {
  const tripDayInstance = new TripDay(routeData);
  const tripDayEditFormInstance = new EventAddMenu(routeData);

  const editFormEscHandler = (evt) => {
    if (keyCodeName.escape === evt.key && eventsList.querySelector(`.event--edit`)) {
      eventsList.replaceChild(tripDayInstance.getElement(), tripDayEditFormInstance.getElement());
    }
  };

  const editButton = tripDayInstance.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    eventsList.replaceChild(tripDayEditFormInstance.getElement(), tripDayInstance.getElement());
    document.addEventListener(`keydown`, editFormEscHandler);
  });

  const editForm = tripDayEditFormInstance.getElement();
  editForm.addEventListener(`submit`, () => {
    eventsList.replaceChild(tripDayInstance.getElement(), tripDayEditFormInstance.getElement());
    document.removeEventListener(`keydown`, editFormEscHandler);
  });

  renderMarkup(eventsList, tripDayInstance.getElement(), positionForRender.beforeend);
};

const routeDataCollection = createRouteDataCollection();

const hasRoutes = () => {
  if (routeDataCollection.length !== 0) {
    renderMarkup(tripRouteInfo, new TripInfo().getElement(), positionForRender.afterbegin);
    renderMarkup(tripEvents, new Sort().getElement(), positionForRender.afterbegin);
    renderMarkup(tripEvents, new TripContainer().getElement(), positionForRender.beforeend);
    const tripEventsList = tripEvents.querySelector(`.trip-events__list`);
    routeDataCollection.map((card) => {
      renderRouteList(tripEventsList, card);
    });
    calculateRouteCost(routeDataCollection);
  } else {
    renderMarkup(tripEvents, new NoRouteWarning().getElement(), positionForRender.beforeend);
  }
};

hasRoutes();
