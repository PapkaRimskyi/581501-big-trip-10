import AbstractComponent from './abstract-class.js';
import {setDateTime, getMonthAndDay} from '../moment.js';

const createTripContainer = () => {
  const dateTime = setDateTime(new Date(), false);
  return (
    `<ul class="trip-days">
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="${dateTime}">${getMonthAndDay(dateTime)}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>
  </ul>
  `
  );
};

export default class TripContainer extends AbstractComponent {
  getTemplate() {
    return createTripContainer();
  }
}
