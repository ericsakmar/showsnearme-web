import moment from 'moment';

export function time(value) {
  return moment(value).format('h:mma');
}

export function date(value) {
  return moment(value).calendar(null, {
    sameDay: '[Today] - dddd, MMMM Do',
    nextDay: '[Tomorrow] - dddd, MMMM Do',
    nextWeek: 'dddd, MMMM Do',
    lastDay: '[Yesterday], MMMM Do',
    lastWeek: '[Last] dddd, MMMM Do',
    sameElse: 'dddd, MMMM Do'
  });
}

