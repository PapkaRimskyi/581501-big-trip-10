import {createRouteData} from '../mock/mockCardData.js';

export const createRouteDataCollection = () => {
  // While using mock data
  const QUANTITY_OF_RENDER = 4;
  const roadMapCollection = [];
  for (let i = 0; i < QUANTITY_OF_RENDER; i++) {
    roadMapCollection.push(createRouteData());
  }
  return roadMapCollection;
};
