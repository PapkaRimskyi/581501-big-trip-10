import {createRouteData} from '../mock/mockCardData.js';

// While using mock data
const QUANTITY_OF_RENDER = 4;

export const createRouteDataCollection = () => {
  const roadMapCollection = [];
  for (let i = 0; i < QUANTITY_OF_RENDER; i++) {
    roadMapCollection.push(createRouteData());
  }
  return roadMapCollection;
};
