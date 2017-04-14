<template>
  <div v-if="weeks" class="calendar">

    <div class="calendar-nav">
      <a @click.prevent="back()" href="#">&lt;&lt;</a>
      {{ start.format('MMM D') }} to {{ end.format('MMM D') }}
      <a @click.prevent="forward()" href="#">&gt;&gt;</a>
    </div>

    <table class="calendar-links">

      <tbody>

        <tr v-for="week in weeks">

          <td v-for="day in week">

            <router-link
              :to="{ path: 'shows', query: getRange(day.day) }"
              :class="{ 'calendar-day': true, 'calendar-today': day.today, 'calendar-this-month': day.thisMonth }"
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

.calendar-links
  border-collapse separate
  border-spacing 0.1em
  margin 0 auto

.calendar-day
  display inline-block
  background-color light-gray
  color bg-color !important
  width 100%
  text-decoration none
  padding 0.1em

.calendar-this-month
  background-color link-color 

.calendar-today
  background-color tomato


</style>
