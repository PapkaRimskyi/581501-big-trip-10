import {createRouteData} from '../mock/mock-route-data.js';
import {QUANTITY_OF_RENDER} from '../const.js';

export const createRouteDataCollection = () => {
  const roadMapCollection = [];
  for (let i = 0; i < QUANTITY_OF_RENDER; i++) {
    roadMapCollection.push(createRouteData());
  }
  return roadMapCollection;
};
