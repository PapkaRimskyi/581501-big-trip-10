import {renderMarkup, positionForRender, replaceElement} from '../utils/render-markup.js';

import {sortType} from '../mock/mockSortData.js';

import TripInfo from '../components/route.js';
import Sort from '../components/sort.js';

import TripContainer from '../components/trip-container.js';
import TripDay from '../components/trip-days.js';
import {calculateRouteCost} from '../components/calculateCost.js';
import EventAddMenu from '../components/event-add-menu.js';

import NoRouteWarning from '../components/no-route.js';

import {keyCodeName} from '../const.js';

const tripEvents = document.querySelector(`.trip-events`);

const renderRouteList = (eventsList, routeData) => {
  const tripDayInstance = new TripDay(routeData);
  const tripDayEditFormInstance = new EventAddMenu(routeData);

  const replaceCardToForm = () => {
    replaceElement(tripDayEditFormInstance, tripDayInstance);
  };

  const replaceFormToCard = () => {
    replaceElement(tripDayInstance, tripDayEditFormInstance);
  };

  const editFormEscHandler = (evt) => {
    if (keyCodeName.escape === evt.key && eventsList.querySelector(`.event--edit`)) {
      replaceFormToCard();
      document.removeEventListener(`keydown`, editFormEscHandler);
    }
  };

  tripDayInstance.setButtonClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, editFormEscHandler);
  });

  tripDayEditFormInstance.setFormClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, editFormEscHandler);
  });

  renderMarkup(eventsList, tripDayInstance, positionForRender.beforeend);
};

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
          renderRouteList(tripEventsList, card);
        });
      });

      routeDataCollection.map((card) => {
        renderRouteList(tripEventsList, card);
      });

      calculateRouteCost(routeDataCollection);
    } else {
      renderMarkup(tripEvents, new NoRouteWarning(), positionForRender.beforeend);
    }
  }
}
