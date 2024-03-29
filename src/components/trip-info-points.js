import AbstractComponent from './abstract-class.js';

const createRoute = () => (
  `<div class="trip-info__main">
  <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>

  <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
</div>
  `
);

export default class TripInfoPoints extends AbstractComponent {
  getTemplate() {
    return createRoute();
  }
}
