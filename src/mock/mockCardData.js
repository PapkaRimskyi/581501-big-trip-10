const ICON_PATH = `img/icons/`;

const routeCollection = [
  {routeType: `bus`, description: `Bus to`, iconPath: null},
  {routeType: `check-in`, description: `Check into hotel`},
  {routeType: `drive`, description: `Drive to`},
  {routeType: `flight`, description: `Flight to`},
  {routeType: `restaurant`, description: `Restaurant`},
  {routeType: `ship`, description: `Ship`},
  {routeType: `sightseeing`, description: `Natural History Museum`},
  {routeType: `taxi`, description: `Taxi to airport`},
  {routeType: `train`, description: `Train to`},
  {routeType: `transport`, description: `Transport`},
];

const citiesToVisit = [`Amsterdam`, `Geneva`, `Chamonix`, `Geneva`, `Amsterdam`];

const additionalOptionsType = [
  {additionalName: `luggage`, description: `Add luggage`, price: `30`},
  {additionalName: `comfort`, description: `Switch to comfort class`, price: `150`},
  {additionalName: `meal`, description: `Add meal`, price: `2`},
  {additionalName: `seats`, description: `Choose seats`, price: `9`},
];

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
  const mapResult = [];
  routeCollection.map((item) => {
    item.iconPath = `${ICON_PATH}${item.routeType}.png`;
    mapResult.push(item);
  });
  return mapResult;
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

const createTime = (time, timeType) => {
  let checkedTime = time;
  switch (timeType) {
    case `hours`:
      const MAX_HOURS = 24;
      const TIME_DIFF = 1;
      checkedTime = time > MAX_HOURS ? (time + TIME_DIFF) - MAX_HOURS : time;
      if (checkedTime < 10) {
        checkedTime = `0${checkedTime}`;
      }
      break;
    case `minutes`:
      checkedTime = time < 10 ? `0${time}` : time;
      break;
  }
  return checkedTime;
};

const createFakeTime = () => {
  // diff between startTime and endTime. Example
  const TIME_DIFF = 1;
  const data = new Date();
  const dayData = data.toDateString();
  const startTime = `${createTime(data.getHours(), `hours`)}:${createTime(data.getMinutes(), `minutes`)}`;
  const endTime = `${createTime(data.getHours() + TIME_DIFF, `hours`)}:${createTime(data.getMinutes(), `minutes`)}`;
  const diffTime = `${TIME_DIFF}H`;
  return {dayData, startTime, endTime, diffTime};
};

const getAdditionalServices = () => {
  const quantityOfServices = getNumberBetweenMinMax(0, 2);
  const additionalServicesCollection = [];
  for (let i = 0; i < quantityOfServices; i++) {
    const randomServicesIndex = Math.floor(Math.random() * additionalOptionsType.length);
    additionalServicesCollection.push(additionalOptionsType[randomServicesIndex]);
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
    tripCost: `${Math.floor(Math.random() * 200)}`,
    extraServices: getAdditionalServices(),
  };
};

export {createRouteData};


