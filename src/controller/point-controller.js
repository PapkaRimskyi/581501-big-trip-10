import TripDay from '../components/trip-day.js';
import EventAddMenu from '../components/event-add-menu.js';
import {renderMarkup, PositionForRender, replaceElement} from '../utils/render-markup.js';
import {getPlaceDescription, findEventType, getAdditionalServices} from '../mock/mock-route-data.js';

import {KeyCodeName, ModeStatus} from '../const.js';

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._routeComponent = null;
    this._routeEventAddMenuComponent = null;

    this._mode = ModeStatus.DEFAULT;
  }

  render(routeData) {
    const oldTaskComponent = this._routeComponent;
    const oldEventAddMenuComponent = this._routeEventAddMenuComponent;

    this._routeComponent = new TripDay(routeData);
    this._routeEventAddMenuComponent = new EventAddMenu(routeData);

    const editFormEscHandler = (evt) => {
      if (KeyCodeName.ESCAPE === evt.key && this._container.querySelector(`.event--edit`)) {
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

    this._routeEventAddMenuComponent.setChangeDataHandler(() => {
      const startTimeInput = document.getElementById(`event-start-time-1`);
      const endTimeInput = document.getElementById(`event-end-time-1`);
      const splitStartInputValue = startTimeInput.value.split(` `);
      const splitEndInputValue = endTimeInput.value.split(` `);
      let lessThanStartValue = false;
      for (let i = 0; i < splitEndInputValue.length; i++) {
        const symbol = i === 0 ? `/` : `:`;
        for (let j = 0; j < splitEndInputValue[i].split(symbol).length; j++) {
          if (splitEndInputValue[i].split(symbol)[j] < splitStartInputValue[i].split(symbol)[j]) {
            startTimeInput.setCustomValidity(`Дата начала поездки не может быть раньше даты окончания поездки`);
            lessThanStartValue = true;
            break;
          } else {
            startTimeInput.setCustomValidity(``);
          }
        }
        if (lessThanStartValue) {
          break;
        }
      }
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
      renderMarkup(this._container, this._routeComponent, PositionForRender.BEFOREEND);
    }
  }

  _replaceCardToForm() {
    this._onViewChange();
    replaceElement(this._routeEventAddMenuComponent, this._routeComponent);
    this._mode = ModeStatus.EDIT;
  }

  _replaceFormToCard() {
    replaceElement(this._routeComponent, this._routeEventAddMenuComponent);
    this._mode = ModeStatus.DEFAULT;
  }

  setDefaultView() {
    if (this._mode !== ModeStatus.DEFAULT) {
      this._replaceFormToCard();
    }
  }
}
