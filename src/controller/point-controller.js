import TripDay from '../components/trip-day.js';
import EventAddMenu from '../components/event-add-menu.js';
import {renderMarkup, positionForRender, replaceElement} from '../utils/render-markup.js';
import {getPlaceDescription, findEventType, getAdditionalServices} from '../mock/mock-route-data.js';

import {keyCodeName} from '../const.js';

const MODE_STATUS = {
  default: `default`,
  edit: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._routeComponent = null;
    this._routeEventAddMenuComponent = null;

    this._mode = MODE_STATUS.default;
  }

  render(routeData) {
    const oldTaskComponent = this._routeComponent;
    const oldEventAddMenuComponent = this._routeEventAddMenuComponent;

    this._routeComponent = new TripDay(routeData);
    this._routeEventAddMenuComponent = new EventAddMenu(routeData);

    const editFormEscHandler = (evt) => {
      if (keyCodeName.escape === evt.key && this._container.querySelector(`.event--edit`)) {
        this._replaceFormToCard();
        document.removeEventListener(`keydown`, editFormEscHandler);
      }
    };

    this._routeComponent.setButtonClickHandler(() => {
      this._replaceCardToForm();
      document.addEventListener(`keydown`, editFormEscHandler);
    });

    this._routeEventAddMenuComponent.setFormClickHandler(() => {
      this._replaceFormToCard();
      document.removeEventListener(`keydown`, editFormEscHandler);
    });

    this._routeEventAddMenuComponent.setFavotireClickHandler(() => {
      this._onDataChange(this, routeData, Object.assign({}, routeData, {favorite: !routeData.favorite}));
    });

    this._routeEventAddMenuComponent.setCityChangeHandler(() => {
      this._onDataChange(this, routeData, Object.assign({}, routeData, {description: getPlaceDescription()}));
    });

    this._routeEventAddMenuComponent.setRouteTypeClickHandler((evt) => {
      if (evt.target.tagName === `INPUT`) {
        const inputValue = evt.target.value;
        this._onDataChange(this, routeData, Object.assign({}, routeData, {waypoint: findEventType(inputValue), extraServices: getAdditionalServices()}));
      }
    });

    if (oldTaskComponent && oldEventAddMenuComponent) {
      replaceElement(this._routeComponent, oldTaskComponent);
      replaceElement(this._routeEventAddMenuComponent, oldEventAddMenuComponent);
    } else {
      renderMarkup(this._container, this._routeComponent, positionForRender.beforeend);
    }
  }

  _replaceCardToForm() {
    this._onViewChange();
    replaceElement(this._routeEventAddMenuComponent, this._routeComponent);
    this._mode = MODE_STATUS.edit;
  }

  _replaceFormToCard() {
    replaceElement(this._routeComponent, this._routeEventAddMenuComponent);
    this._mode = MODE_STATUS.default;
  }

  setDefaultView() {
    if (this._mode !== MODE_STATUS.default) {
      this._replaceFormToCard();
    }
  }
}
