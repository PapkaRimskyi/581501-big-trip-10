import {additionalOptionsType} from '../const.js';

const ICON_PATH = `img/icons/`;
const MIN_QUANTITY_DESCRIPTION = 1;
const MAX_QUANTITY_DESCRIPTION = 1;
const TIME_DIFF = 1;

const eventTypeCollection = {
  transportTypes: [
    {routeType: `bus`, description: `Bus to`, iconPath: `${ICON_PATH}bus.png`},
    {routeType: `drive`, description: `Drive to`, iconPath: `${ICON_PATH}drive.png`},
    {routeType: `flight`, description: `Flight to`, iconPath: `${ICON_PATH}flight.png`},
    {routeType: `ship`, description: `Ship to`, iconPath: `${ICON_PATH}ship.png`},
    {routeType: `taxi`, description: `Taxi to airport`, iconPath: `${ICON_PATH}taxi.png`},
    {routeType: `train`, description: `Train to`, iconPath: `${ICON_PATH}train.png`},
    {routeType: `transport`, description: `Transport to`, iconPath: `${ICON_PATH}transport.png`},
  ],
  servicesTypes: [
    {routeType: `check-in`, description: `Check into hotel`, iconPath: `${ICON_PATH}check-in.png`},
    {routeType: `sightseeing`, description: `Natural History Museum`, iconPath: `${ICON_PATH}sightseeing.png`},
    {routeType: `restaurant`, description: `Restaurant`, iconPath: `${ICON_PATH}restaurant.png`},
  ],
};

const citiesToVisit = [`Amsterdam`, `Geneva`, `Chamonix`, `Geneva`, `Amsterdam`];

const defaultDescritpionText =
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.
  `
;

const getNumberBetweenMinMax = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export const findEventType = (searchName) => {
  let result = null;
  for (let type in eventTypeCollection) {
    if (eventTypeCollection.hasOwnProperty(type)) {
      eventTypeCollection[type].filter((item) => {
        if (item.routeType === searchName) {
          result = item;
        }
      });
    }
  }
  return result;
};

const getRandomWaypointType = (eventTypeCol) => {
  const randomItem = Object.keys(eventTypeCol)[getNumberBetweenMinMax(0, Object.keys(eventTypeCol).length - 1)];
  const chosenType = eventTypeCol[randomItem];
  return chosenType[getNumberBetweenMinMax(0, chosenType.length - 1)];
};

const getPlacePhoto = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

export const getPlaceDescription = () => {
  const description = [];
  const sentencesCollection = defaultDescritpionText.split(`.`);
  const quantityOfSentences = getNumberBetweenMinMax(MIN_QUANTITY_DESCRIPTION, MAX_QUANTITY_DESCRIPTION);
  for (let i = 0; i < quantityOfSentences; i++) {
    const randomSentenceIndex = Math.floor(Math.random() * sentencesCollection.length);
    description.push(sentencesCollection[randomSentenceIndex]);
  }
  return description;
};

const createFakeTime = (date, difHours = 0) => {
  date.setHours(date.getHours() + difHours);
  return new Date(date);
};

export const getAdditionalServices = (withChecks) => {
  const quantityOfServices = getNumberBetweenMinMax(0, 2);
  const additionalServicesCollection = [];
  for (let i = 0; i < quantityOfServices; i++) {
    const randomServicesIndex = Math.floor(Math.random() * additionalOptionsType.length);
    if (withChecks) {
      additionalOptionsType[randomServicesIndex].checked = true;
    }
    additionalServicesCollection.push(additionalOptionsType[randomServicesIndex]);
  }
  return additionalServicesCollection;
};

const createRouteData = () => {
  const now = new Date();
  return {
    id: String(new Date() + Math.random()),
    waypoint: getRandomWaypointType(eventTypeCollection),
    citiesInTheRoute: citiesToVisit,
    randomCity: citiesToVisit[getNumberBetweenMinMax(0, citiesToVisit.length - 1)],
    placePhoto: getPlacePhoto(),
    description: getPlaceDescription(),
    startTime: createFakeTime(now),
    endTime: createFakeTime(now, TIME_DIFF),
    tripCost: `${Math.floor(Math.random() * 200)}`,
    extraServices: getAdditionalServices(true),
    favorite: Math.random() > 0.5,
  };
};

export {createRouteData};


