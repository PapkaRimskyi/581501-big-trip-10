import {renderMarkup, positionForRender} from './utils/render-markup.js';

import TripController from './controller/trip-controller.js';
import Menu from './components/menu.js';
import Filter from './components/filter.js';

// Import roadMap collection
import {createRouteDataCollection} from './components/createRoadmap.js';

const tripMenu = document.querySelector(`.trip-main__trip-controls`);

renderMarkup(tripMenu, new Menu(), positionForRender.beforeend);
renderMarkup(tripMenu, new Filter(), positionForRender.beforeend);

const routeDataCollection = createRouteDataCollection();

const tripConroller = new TripController();
tripConroller.render(routeDataCollection);
