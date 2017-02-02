import moment from 'moment';

export function time(value) {
  return moment(value).format('h:mma');
}

export function date(value) {
  return moment(value).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'dddd, MMMM Do'
  });
}

