import {renderMarkup} from './components/markup-render.js';

import {createRoute} from './components/route.js';
import {createMenu} from './components/menu.js';
import {createFilter} from './components/filter.js';
import {createSort} from './components/sort.js';
import {createEventAddMenu} from './components/event-add-menu.js';
import {createTripContainer} from './components/trip-container.js';
import {createTripDay} from './components/trip-days.js';
import {calculateRouteCost} from './components/calculateCost.js';

// Import mock data
import {mockMenuData} from './mock/mockMenuData.js';
import {mockFilterData} from './mock/mockFilterData.js';

// Import roadMap collection
import {createRouteDataCollection} from './components/createRoadmap.js';

const tripMenu = document.querySelector(`.trip-main__trip-controls`);
const tripRouteInfo = document.querySelector(`.trip-main__trip-info`);
const tripEvents = document.querySelector(`.trip-events`);

renderMarkup(tripRouteInfo, createRoute(), `afterbegin`);
renderMarkup(tripMenu, createMenu(mockMenuData), `afterbegin`);
renderMarkup(tripMenu, createFilter(mockFilterData), `beforeend`);
renderMarkup(tripEvents, createTripContainer(), `beforeend`);

const tripDaysContainer = tripEvents.querySelector(`.trip-events__list`);

const routeDataCollection = createRouteDataCollection();

const createEventAddManuAndTripDaysList = () => {
  for (let i = 0; i < routeDataCollection.length; i++) {
    if (i === 0) {
      renderMarkup(tripEvents, createEventAddMenu(routeDataCollection[i]), `afterbegin`);
    } else {
      renderMarkup(tripDaysContainer, createTripDay(routeDataCollection[i]), `beforeend`);
    }
  }
};

createEventAddManuAndTripDaysList();
renderMarkup(tripEvents, createSort(), `afterbegin`);
calculateRouteCost(routeDataCollection);
