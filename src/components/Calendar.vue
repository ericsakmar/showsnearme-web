<template>
  <div v-if="weeks" class="calendar">

    <table class="calendar-links">

      <thead>

        <tr>
          <td>
            <button @click.prevent="back()" 
              class="button calendar-nav__link"
              title="Go Back"
              href="#"
            >&lt;&lt;</button>
          </td>

          <td colspan="5">{{ start.format('MMM D') }} to {{ end.format('MMM D') }}</td>

          <td>
            <button @click.prevent="forward()"
              class="button calendar-nav__link"
              title="Go Forward"
              href="#"
            >&gt;&gt;</button>
          </td>
        </tr>

      </thead>

      <tbody>

        <tr v-for="week in weeks">

          <td v-for="day in week">

            <router-link
              :to="{ path: 'shows', query: getRange(day.day) }"
              :class="{ 'calendar-day': true,
              'calendar-month__even': day.day.month() % 2 === 0,
              'calendar-month__odd': day.day.month() % 2 === 1,
              'calendar-today': day.today }"
            >{{day.formatted}}</router-link>

          </td>

        </tr>

      </tbody>

    </table>

  </div>
</template>

<script>
import moment from 'moment';
export default {

  name: 'Calendar',

  props: [
    'date',
    'queryDateFormat',
    'daysToShow',
  ],

  data() {
    return {
      end: null,
      start: null,
      weeks: null,
    };
  },

  created() {
    this.buildCalendar(this.date);
  },

  methods: {

    forward() {
      this.buildCalendar(this.end);
    },

    back() {
      this.buildCalendar(this.start.clone().subtract(4, 'weeks'));
    },

    getRange(day) {
      return {
        since: day.format(this.queryDateFormat),
        until: day.clone().add(this.daysToShow, 'days').format(this.queryDateFormat),
      };
    },

    buildCalendar(from) {
      const date = moment(this.date);
      const today = moment(from);
      const start = today.clone().startOf('week');
      const end = today.clone().add(4, 'weeks').endOf('week');
      const day = start.clone();

      const weeks = [];
      const startWeek = start.week();

      while (day.isSameOrBefore(end, 'day')) {

        const week = day.week() - startWeek;

        if (weeks.length === week) {
          weeks.push([]);
        }

        weeks[week].push({
          day: day.clone(),
          formatted: day.format('D'),
          today: day.isSame(date, 'day'),
          thisMonth: day.month() === date.month(),
        });

        day.add(1, 'day');
      }

      this.weeks = weeks;
      this.start = start;
      this.end = end;
    },

  },

}
</script>

<style lang="stylus">
@require "../styles/style"

.calendar
  margin 0 auto
  display inline-block

.calendar-nav
  display flex
  padding gutter-tiny

.calendar-nav__link
  padding-left gutter-small
  padding-right gutter-small
  padding-top 0
  font-weight 700
  font-size 0.75em
  width 100%
  background transparent
  color link-color !important

.calendar-header
  flex-grow 1

.calendar-links
  border-collapse separate
  border-spacing gutter-tiny

.calendar-day
  display inline-block
  background-color light-gray
  width 100%
  text-decoration none
  padding gutter-tiny

.calendar-today
  background-color cornsilk !important

.calendar-month__even
  background-color lighten(#ddd, 50%)

.calendar-month__odd
  background-color #ddd

</style>
