import {TimeTypes} from './const.js';

import moment from 'moment';
moment.locale(`ru`);

const DOUBLE_NUMBER = 10;
const MIN_HOUR = 1;

export const setFormatData = (data) => {
  return moment(data).format(`DD/MM/YYYY HH:mm`);
};

export const setFormatTime = (time) => {
  return moment(time).format(`HH:mm`);
};

const checkTime = (time) => time < DOUBLE_NUMBER ? `0${time}` : time;

export const getTripDuration = (startDate, endDate) => {
  const mseconds = moment(endDate).diff(moment(startDate));
  let minutes = Math.floor(mseconds / TimeTypes.MSEC_IN_SEC / TimeTypes.MIN_IN_HOURS);
  const days = Math.floor(minutes / TimeTypes.MIN_IN_HOURS / TimeTypes.HOURS_IN_DAY);
  const hours = ((minutes - (days * TimeTypes.HOURS_IN_DAY * TimeTypes.MIN_IN_HOURS)) / TimeTypes.MIN_IN_HOURS);
  minutes = minutes - (days * TimeTypes.HOURS_IN_DAY * TimeTypes.MIN_IN_HOURS) - (hours * TimeTypes.MIN_IN_HOURS);
  if (days !== 0) {
    return `${checkTime(days)}D ${checkTime(hours)}H ${checkTime(minutes)}M}`;
  } else if (hours < MIN_HOUR) {
    return `${checkTime(minutes)}M`;
  } else {
    return `${hours}H ${checkTime(minutes)}M`;
  }
};

export const setDateTime = (data) => {
  return moment(data).format(`YYYY-MM-DD HH:mm`).split(` `).join(`T`);
};
