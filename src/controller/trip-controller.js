import {renderMarkup, PositionForRender} from '../utils/render-markup.js';

import {mockSortTypesData} from '../mock/mock-sort-types-data.js';

import TripInfoPoints from '../components/trip-info-points.js';
import Sort from '../components/sort.js';

import TripContainer from '../components/trip-container.js';
import PointController from './point-controller.js';
import {calculateRouteCost} from '../components/calculate-cost.js';

import NoRouteWarning from '../components/no-route-warning.js';

const tripEvents = document.querySelector(`.trip-events`);

const renderRoutes = (eventsContainer, routeDataCollection, onDataChange, onViewChange) => {
  return routeDataCollection.map((route) => {
    const pointController = new PointController(eventsContainer, onDataChange, onViewChange);
    pointController.render(route);
    return pointController;
  });
};

export default class TripController {
  constructor(pointsModel) {
    this._sort = new Sort();
    this._tripInfo = new TripInfoPoints();
    this._tripContainer = new TripContainer();
    this._noRouteWarning = new NoRouteWarning();
    this._pointsModel = pointsModel;
    this._pointCollection = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sort.setSortClickHandler(this._onSortTypeChange);
  }

  render() {
    if (this._pointsModel.getRoutes().length !== 0) {
      const routes = this._pointsModel.getRoutes();
      const tripRouteInfo = document.querySelector(`.trip-main__trip-info`);

      renderMarkup(tripRouteInfo, this._tripInfo, PositionForRender.AFTERBEGIN);
      renderMarkup(tripEvents, this._sort, PositionForRender.AFTERBEGIN);
      renderMarkup(tripEvents, this._tripContainer, PositionForRender.BEFOREEND);

      const tripEventsList = tripEvents.querySelector(`.trip-events__list`);

      const newRoutes = renderRoutes(tripEventsList, routes, this._onDataChange, this._onViewChange);
      this._pointCollection = newRoutes;

      calculateRouteCost(routes);
    } else {
      renderMarkup(tripEvents, this._noRouteWarning, PositionForRender.BEFOREEND);
    }
  }

  _onDataChange(pointController, oldRoute, newRoute) {
    const isSuccess = this._pointsModel.updateRoute(oldRoute.id, newRoute);

    if (isSuccess) {
      pointController.render(newRoute);
    }
  }

  _onViewChange() {
    this._pointCollection.map((item) => item.setDefaultView());
  }

  _onSortTypeChange(currentSort) {
    let sortedRouteDataCollection = [];
    const routes = this._pointsModel.getRoutes();
    const sortTypeNameCollection = mockSortTypesData.map((type) => type.sortName);
    const inputSortType = this._sort.getElement().querySelector(`.trip-sort__item--${currentSort}`).querySelector(`input`);
    inputSortType.checked = true;
    switch (currentSort) {
      case sortTypeNameCollection[0]:
        sortedRouteDataCollection = routes.slice();
        break;
      case sortTypeNameCollection[1]:
        sortedRouteDataCollection = routes.slice().sort((a, b) => parseInt(b.estimatedTime.diffTime, 10) - parseInt(a.estimatedTime.diffTime, 10));
        break;
      case sortTypeNameCollection[2]:
        sortedRouteDataCollection = routes.slice().sort((a, b) => b.tripCost - a.tripCost);
        break;
    }
    const tripEventsList = tripEvents.querySelector(`.trip-events__list`);

    tripEventsList.innerHTML = ``;

    const newRoutes = renderRoutes(tripEventsList, sortedRouteDataCollection, this._onDataChange, this._onViewChange);
    this._pointCollection = newRoutes;
  }
}
