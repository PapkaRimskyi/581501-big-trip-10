import {renderMarkup, positionForRender, replaceElement} from '../utils/render-markup.js';

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
  }

  render(routeDataCollection) {
    if (routeDataCollection.length !== 0) {
      const tripRouteInfo = document.querySelector(`.trip-main__trip-info`);

      renderMarkup(tripRouteInfo, new TripInfo(), positionForRender.afterbegin);
      renderMarkup(tripEvents, new Sort(), positionForRender.afterbegin);
      renderMarkup(tripEvents, new TripContainer(), positionForRender.beforeend);

      const tripEventsList = tripEvents.querySelector(`.trip-events__list`);

      routeDataCollection.map((card) => {
        renderRouteList(tripEventsList, card);
      });

      calculateRouteCost(routeDataCollection);
    } else {
      renderMarkup(tripEvents, new NoRouteWarning(), positionForRender.beforeend);
    }
  }
}
