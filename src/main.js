import {renderMarkup, PositionForRender} from './utils/render-markup.js';

import Points from './models/points.js';
import TripController from './controller/trip-controller.js';
import Menu from './components/menu.js';
import Filter from './components/filter.js';
import {mockFiltersData} from './mock/mock-filters-data.js';

// Import roadMap collection
import {createRouteDataCollection} from './components/create-roadmap.js';
import FilterController from './controller/filter-controller.js';

const tripMenu = document.querySelector(`.trip-main__trip-controls`);

renderMarkup(tripMenu, new Menu(), PositionForRender.BEFOREEND);
// renderMarkup(tripMenu, new Filter(), PositionForRender.BEFOREEND);

const routeDataCollection = createRouteDataCollection();

const pointsInstance = new Points();
pointsInstance.setRoutes(routeDataCollection);

const filterInstance = new FilterController(tripMenu, pointsInstance, new Filter(mockFiltersData));
filterInstance.render();

const tripConroller = new TripController(pointsInstance);
tripConroller.render();
