<template>
  <div class="calendar">

  <table>

    <tbody>
      <tr v-for="week in weeks">
        <td v-for="day in week">
          <router-link
            :to="{ path: 'shows', query: getRange(day) }"
          >{{day.format('DD')}}</router-link>
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
    'queryDateFormat',
    'daysToShow',
  ],


  data() {
    const today = moment();
    const start = today.clone().startOf('month').startOf('week');
    const end = today.clone().endOf('month').endOf('week');
    const day = start.clone();

    const weeks = [];
    const startWeek = start.week();

    while (day.isSameOrBefore(end, 'day')) {

      const week = day.week() - startWeek;

      if (weeks.length === week) {
        weeks.push([]);
      }

      weeks[week].push(day.clone());

      day.add(1, 'day');
    }

    return {
      weeks,
    };
  },

  created() {
  },

  methods: {

    getRange(day) {

      return {
        since: day.format(this.queryDateFormat),
        until: day.clone().add(this.daysToShow, 'days').format(this.queryDateFormat),
      };

    }

  },

}
</script>

<style lang="stylus">
@require "../styles/style"
</style>
