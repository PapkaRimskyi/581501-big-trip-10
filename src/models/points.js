import {FilterTypes} from '../const.js';
import moment from 'moment';

export default class Points {
  constructor() {
    this._defaultRoutes = null;
    this._filteredRoutes = null;

    this._filterName = FilterTypes.EVERYTHING;
    this.getFilterName = this.getFilterName.bind(this);

    this.tripControllerFilterHandler = null;
  }

  getRoutes() {
    const dateToday = new Date().getDate();
    switch (this._filterName) {
      case FilterTypes.EVERYTHING:
        return this._defaultRoutes;
      case FilterTypes.FUTURE:
        this._filteredRoutes = this._defaultRoutes.map((item) => moment(item.startTime).format(`DD`) >= dateToday ? item : null);
        return this._filteredRoutes;
      case FilterTypes.PAST:
        this._filteredRoutes = this._defaultRoutes.map((item) => moment(item.startTime).format(`DD`) < dateToday ? item : null);
        return this._filteredRoutes;
    }
    return null;
  }

  getSortedRoutes() {
    return this._sortedData;
  }

  setRoutes(routeCollection) {
    this._defaultRoutes = routeCollection;
  }

  updateRoute(oldRouteId, newRoute) {
    const index = this._defaultRoutes.findIndex((item) => item.id === oldRouteId);
    if (index === -1) {
      return false;
    }
    if (newRoute) {
      this._defaultRoutes = [].concat(this._defaultRoutes.slice(0, index), newRoute, this._defaultRoutes.slice(index + 1));
      return true;
    } else {
      this._defaultRoutes = [].concat(this._defaultRoutes.slice(0, index), this._defaultRoutes.slice(index + 1));
      return false;
    }
  }

  getFilterName(filterName) {
    this._filterName = filterName;
    this.tripControllerFilterHandler();
  }
}
