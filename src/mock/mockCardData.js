const ICON_PATH = `../../markup/img/icons/`;

const routeCollection = [`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`];

const citiesToVisit = [`Amsterdam`, `Geneva`, `Chamonix`, `Geneva`, `Amsterdam`];

const additionalOptionsType = [`luggage`, `comfort`, `meal`, `seats`];

const additionalNameAndPrice = [[`Add luggage`, `+10 €`], [`Switch to comfort class`, `+150 €`], [`Add meal`, `+2 €`], [`Choose seats`, `+9 €`]];

const defaultDescritpionText =
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.
  `
;

const getNumberBetweenMinMax = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

const createWaypointType = () => {
  const waypointsType = new Map();
  routeCollection.map((item) => {
    waypointsType.set(item, `${ICON_PATH}${item}.png`);
  });
  return waypointsType;
};

const getPlacePhoto = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

const getPlaceDescription = () => {
  const description = [];
  const sentencesCollection = defaultDescritpionText.split(`.`);
  const quantityOfSentences = getNumberBetweenMinMax(1, 3);
  for (let i = 0; i < quantityOfSentences; i++) {
    const randomSentenceIndex = Math.floor(Math.random() * sentencesCollection.length);
    description.push(sentencesCollection[randomSentenceIndex]);
  }
  return description;
};

const createFakeTime = () => {
  const TIME_DIFF = 1;
  const MAX_HOURS = 24;
  const data = new Date();
  const startTime = `${data.getHours()}:${data.getMinutes()}`;
  const endTime = data.getHours() + TIME_DIFF >= MAX_HOURS ? `${(data.getHours() + TIME_DIFF) - MAX_HOURS}${data.getMinutes()}` : `${(data.getHours() + TIME_DIFF)}:${data.getMinutes()}`;
  const diffTime = `${TIME_DIFF}H`;
  return [`${startTime} - ${endTime}`, diffTime];
};

const getAdditionalServices = () => {
  const quantityOfServices = getNumberBetweenMinMax(0, 2);
  const additionalServicesCollection = new Map();
  for (let i = 0; i < quantityOfServices; i++) {
    const randomServicesIndex = Math.floor(Math.random() * additionalOptionsType.length);
    additionalServicesCollection.set(additionalOptionsType[randomServicesIndex], additionalNameAndPrice[randomServicesIndex]);
  }
  return additionalServicesCollection;
};

const createRouteData = () => {
  return {
    waypoint: createWaypointType(),
    citiesInTheRoute: citiesToVisit,
    placePhoto: getPlacePhoto(),
    description: getPlaceDescription(),
    estimatedTime: createFakeTime(),
    extraServices: getAdditionalServices(),
  };
};

export {createRouteData};


