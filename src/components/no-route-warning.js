import AbstractComponent from './abstract-class.js';

const createNoRouteMarkup = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

export default class NoRouteWarning extends AbstractComponent {
  getTemplate() {
    return createNoRouteMarkup();
  }
}
