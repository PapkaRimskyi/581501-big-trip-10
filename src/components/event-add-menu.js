import {additionalOptionsType} from '../const.js';
import AbstractComponent from './abstract-class.js';

const createEventAddMenu = (cardData) => {
  const {description, placePhoto, estimatedTime, tripCost, citiesInTheRoute, waypoint} = cardData;
  return `<li class="trip-events__item">
  <form class="trip-events__item  event  event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>

          ${waypoint[`transportType`].map((item) => {
    return `
    <div class="event__type-item">
    <input id="event-type-${item.routeType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.routeType}">
    <label class="event__type-label  event__type-label--${item.routeType}" for="event-type-${item.routeType}-1">${item.routeType.charAt(0).toUpperCase() + item.routeType.substr(1)}</label>
  </div>
            `;
  })}
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>

          ${waypoint[`servicesType`].map((item) => {
    return `
            <div class="event__type-item">
            <input id="event-type-${item.routeType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.routeType}">
            <label class="event__type-label  event__type-label--${item.routeType}" for="event-type-${item.routeType}-1">${item.routeType.charAt(0).toUpperCase() + item.routeType.substr(1)}</label>
          </div>
            `;
  })}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        Sightseeing at
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
      <datalist id="destination-list-1">
        ${citiesInTheRoute.map((item) => `<option value="${item}"></option>`).join(` `)}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${estimatedTime.dayData} ${estimatedTime.startTime}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${estimatedTime.dayData} ${estimatedTime.endTime}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${tripCost}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>

    <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>

  </header>
  <section class="event__details">

    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${additionalOptionsType.map((type) => {
    return `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${type.checked === true ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${type.additionalName}-1">
            <span class="event__offer-title">${type.description}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${type.price}</span>
          </label>
        </div>
        `;
  }).join(` `)}
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          <img class="event__photo" src="${placePhoto}" alt="Event photo">
          <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
        </div>
      </div>
    </section>
  </section>
</form>
</li>
  `;
};

export default class EventAddMenu extends AbstractComponent {
  constructor(cardData) {
    super();
    this._cardData = cardData;
  }

  getTemplate() {
    return createEventAddMenu(this._cardData);
  }

  setFormClickHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
  }

  setFavotireClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
  }
}
