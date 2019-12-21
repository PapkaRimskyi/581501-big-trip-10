import {FilterTypes} from '../const.js';
import moment from 'moment';

export default class Points {
  constructor() {
    this._routes = null;
    this._routesFuture = [];
    this._routesPast = [];

    this._filterName = FilterTypes.EVERYTHING;
    this.getFilterName = this.getFilterName.bind(this);

    this.tripHandler = null;
  }

  getRoutes() {
    const dateToday = new Date().getDate();
    switch (this._filterName) {
      case FilterTypes.EVERYTHING:
        return this._routes;
      case FilterTypes.FUTURE:
        this._routesFutute = this._routes.map((item) => moment(item.startTime).format(`DD`) >= dateToday ? item : null);
        return this._routesFutute;
      case FilterTypes.PAST:
        this._routesPast = this._routes.map((item) => moment(item.startTime).format(`DD`) < dateToday ? item : undefined);
        return this._routesPast;
    }
    return null;
  }

  getSortedRoutes() {
    return this._sortedData;
  }

  setRoutes(routeCollection) {
    this._routes = routeCollection;
  }

  updateRoute(oldRouteId, newRoute) {
    const index = this._routes.findIndex((item) => item.id === oldRouteId);
    if (index === -1) {
      return false;
    }

    this._routes = [].concat(this._routes.slice(0, index), newRoute, this._routes.slice(index + 1));

    return true;
  }

  getFilterName(filterName) {
    this._filterName = filterName;
    this.tripHandler();
  }
}
