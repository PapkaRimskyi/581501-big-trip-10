const createExtraServicesMarkup = (servicesData) => {
  if (servicesData.length !== 0) {
    const servicesMarkupArray = [];
    servicesData.map((item) => {
      servicesMarkupArray.push(`<li class="event__offer">
        <span class="event__offer-title">${item.description}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
      </li>
        `
      );
    });
    return servicesMarkupArray.join(` `);
  }
  return ``;
};

const getRandomWaypoint = (waypointCollection) => {
  const randomRouteType = waypointCollection[Math.floor(Math.random() * waypointCollection.length)];
  return (
    `<div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="${randomRouteType.iconPath}" alt="Event type icon">
  </div>
  <h3 class="event__title">${randomRouteType.description}</h3>
    `
  );
};

export const createTripDay = (cardData) => {
  const {estimatedTime, tripCost, extraServices, waypoint} = cardData;

  return (
    `
  <li class="trip-events__item">
  <div class="event">
    ${getRandomWaypoint(waypoint)}

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${estimatedTime.dayData}T${estimatedTime.startTime}">${estimatedTime.startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${estimatedTime.dayData}T${estimatedTime.endTime}">${estimatedTime.endTime}</time>
      </p>
      <p class="event__duration">${estimatedTime.diffTime}</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${tripCost}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createExtraServicesMarkup(extraServices)}
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
  `
  );
};
