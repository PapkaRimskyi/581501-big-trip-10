import {renderMarkup, PositionForRender} from './utils/render-markup.js';

import TripController from './controller/trip-controller.js';
import Menu from './components/menu.js';
import Filter from './components/filter.js';

// Import roadMap collection
import {createRouteDataCollection} from './components/create-roadmap.js';

const tripMenu = document.querySelector(`.trip-main__trip-controls`);

renderMarkup(tripMenu, new Menu(), PositionForRender.BEFOREEND);
renderMarkup(tripMenu, new Filter(), PositionForRender.BEFOREEND);

const routeDataCollection = createRouteDataCollection();

const tripConroller = new TripController();
tripConroller.render(routeDataCollection);
