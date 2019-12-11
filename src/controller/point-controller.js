import TripDay from '../components/trip-days.js';
import EventAddMenu from '../components/event-add-menu.js';
import {renderMarkup, positionForRender, replaceElement} from '../utils/render-markup.js';

import {keyCodeName} from '../const.js';

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this.onDataChange = onDataChange;
    this._eventAddMenu = null;
    this._tripData = null;
  }

  render(routeData) {
    this._tripDay = new TripDay(routeData);
    this._eventAddMenu = new EventAddMenu(routeData);
    this._tripData = routeData;

    const replaceCardToForm = () => {
      replaceElement(this._eventAddMenu, this._tripDay);
    };

    const replaceFormToCard = () => {
      replaceElement(this._tripDay, this._eventAddMenu);
    };

    const editFormEscHandler = (evt) => {
      if (keyCodeName.escape === evt.key && this._container.querySelector(`.event--edit`)) {
        replaceFormToCard();
        document.removeEventListener(`keydown`, editFormEscHandler);
      }
    };

    this._tripDay.setButtonClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, editFormEscHandler);
    });

    this._eventAddMenu.setFormClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, editFormEscHandler);
    });

    this._eventAddMenu.setFavotireClickHandler(() => {
      const oldData = this._eventAddMenu._cardData;
      const newRouteData = Object.assign(oldData, {favorite: this._eventAddMenu.getElement().querySelector(`.event__favorite-checkbox`).checked ? false : true});
      this.onDataChange(oldData, newRouteData);
    });

    renderMarkup(this._container, this._tripDay, positionForRender.beforeend);
  }
}
