import {renderMarkup, positionForRender} from '../utils/render-markup.js';

import {sortType} from '../mock/mockSortData.js';

import TripInfo from '../components/route.js';
import Sort from '../components/sort.js';

import TripContainer from '../components/trip-container.js';
import PointController from './point-controller.js';
import {calculateRouteCost} from '../components/calculateCost.js';

import NoRouteWarning from '../components/no-route.js';

const tripEvents = document.querySelector(`.trip-events`);

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sort = new Sort();
    this._tripInfo = new TripInfo();
  }

  render(routeDataCollection) {
    if (routeDataCollection.length !== 0) {
      const tripRouteInfo = document.querySelector(`.trip-main__trip-info`);

      renderMarkup(tripRouteInfo, this._tripInfo, positionForRender.afterbegin);
      renderMarkup(tripEvents, this._sort, positionForRender.afterbegin);
      renderMarkup(tripEvents, new TripContainer(), positionForRender.beforeend);

      const tripEventsList = tripEvents.querySelector(`.trip-events__list`);


      this._sort.setSortClickHandler((currentSort) => {
        let sortedRouteDataCollection = [];
        const sortTypeNameCollection = sortType.map((type) => type.sortName);
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
        sortedRouteDataCollection.map((card) => {
          new PointController(tripEventsList, this._onDataChange).render(card);
        });
      });

      routeDataCollection.map((card) => {
        new PointController(tripEventsList, this._onDataChange).render(card);
      });

      calculateRouteCost(routeDataCollection);
    } else {
      renderMarkup(tripEvents, new NoRouteWarning(), positionForRender.beforeend);
    }
  }

  // _onDataChange(oldRoute, newRouteData) {
  //   console.log(oldRoute, newRouteData);
  // }
}
