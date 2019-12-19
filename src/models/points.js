export default class Points {
  constructor() {
    this._routes = null;
  }

  getRoutes() {
    return this._routes;
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
}
