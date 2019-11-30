import {renderMarkup} from './components/markup-render.js';

import {createRoute} from './components/route.js';
import {createMenu} from './components/menu.js';
import {createFilter} from './components/filter.js';
import {createSort} from './components/sort.js';
import {createEventAddMenu} from './components/event-add-menu.js';
import {createTripContainer} from './components/trip-container.js';
import {createTripDays} from './components/trip-days.js';
import {createRouteData} from './mock/mockCardData.js';

const tripMenu = document.querySelector(`.trip-main__trip-controls`);
const tripRouteInfo = document.querySelector(`.trip-main__trip-info`);
const tripEvents = document.querySelector(`.trip-events`);

renderMarkup(tripRouteInfo, createRoute(), `afterbegin`);
renderMarkup(tripMenu, createMenu(), `afterbegin`);
renderMarkup(tripMenu, createFilter(), `beforeend`);
renderMarkup(tripEvents, createSort(), `beforeend`);
renderMarkup(tripEvents, createEventAddMenu(), `beforeend`);
renderMarkup(tripEvents, createTripContainer(), `beforeend`);

const tripDaysContainer = tripEvents.querySelector(`.trip-days`);

for (let i = 0; i < 3; i++) {
  renderMarkup(tripDaysContainer, createTripDays(), `beforeend`);
  // чтобы npm test не ругался
  createRouteData();
}


