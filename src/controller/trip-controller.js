import {renderMarkup, positionForRender} from '../utils/render-markup.js';

import {mockSortData} from '../mock/mock-sort-data.js';

import TripInfo from '../components/route.js';
import Sort from '../components/sort.js';

import TripContainer from '../components/trip-container.js';
import PointController from './point-controller.js';
import {calculateRouteCost} from '../components/calculate-cost.js';

import NoRouteWarning from '../components/no-route.js';

const tripEvents = document.querySelector(`.trip-events`);

const renderRoutes = (eventsContainer, routeDataCollection, onDataChange, onViewChange) => {
  return routeDataCollection.map((route) => {
    const pointController = new PointController(eventsContainer, onDataChange, onViewChange);
    pointController.render(route);
    return pointController;
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sort = new Sort();
    this._tripInfo = new TripInfo();
    this._routes = null;
    this._pointCollection = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(routeDataCollection) {
    if (routeDataCollection.length !== 0) {
      this._routes = routeDataCollection;
      const tripRouteInfo = document.querySelector(`.trip-main__trip-info`);

      renderMarkup(tripRouteInfo, this._tripInfo, positionForRender.afterbegin);
      renderMarkup(tripEvents, this._sort, positionForRender.afterbegin);
      renderMarkup(tripEvents, new TripContainer(), positionForRender.beforeend);

      const tripEventsList = tripEvents.querySelector(`.trip-events__list`);


      this._sort.setSortClickHandler((currentSort) => {
        let sortedRouteDataCollection = [];
        const sortTypeNameCollection = mockSortData.map((type) => type.sortName);
        const inputSortType = this._sort.getElement().querySelector(`.trip-sort__item--${currentSort}`).querySelector(`input`);
        inputSortType.checked = true;
        switch (currentSort) {
          case sortTypeNameCollection[0]:
            sortedRouteDataCollection = routeDataCollection.slice();
            break;
          case sortTypeNameCollection[1]:
            sortedRouteDataCollection = routeDataCollection.slice().sort((a, b) => parseInt(b.estimatedTime.diffTime, 10) - parseInt(a.estimatedTime.diffTime, 10));
            break;
          case sortTypeNameCollection[2]:
            sortedRouteDataCollection = routeDataCollection.slice().sort((a, b) => b.tripCost - a.tripCost);
            break;
        }
        tripEventsList.innerHTML = ``;

        const newRoutes = renderRoutes(tripEventsList, sortedRouteDataCollection, this._onDataChange, this._onViewChange);
        this._pointCollection = this._pointCollection.concat(newRoutes);
      });

      const newRoutes = renderRoutes(tripEventsList, routeDataCollection, this._onDataChange, this._onViewChange);
      this._pointCollection = this._pointCollection.concat(newRoutes);

      calculateRouteCost(routeDataCollection);
    } else {
      renderMarkup(tripEvents, new NoRouteWarning(), positionForRender.beforeend);
    }
  }

  _onDataChange(pointController, oldRoute, newRoute) {
    const index = this._routes.findIndex((item) => item === oldRoute);
    if (index === -1) {
      return;
    }

    this._routes = [].concat(this._routes.slice(0, index), newRoute, this._routes.slice(index + 1));
    pointController.render(this._routes[index]);
  }

  _onViewChange() {
    this._pointCollection.map((item) => item.setDefaultView());
  }
}
