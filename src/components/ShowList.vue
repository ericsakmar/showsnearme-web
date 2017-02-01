<template>
  <ul>
    <li v-for="show in groupByDate">{{show.name}}</li>
  </ul>
</template>

<script>
import moment from 'moment';

export default {
  name: 'show-list',
  props: ['shows'],

  computed: {
    groupByDate: function() {

      const dates = this.shows.reduce((dates, show) => dates.add(moment(show.start_time).format('YYYY-MM-DD')), new Set());

      const more = Array.from(dates).map(date => ({date:date, shows:[]}));
      console.log(more);

      return this.shows;
    }
  }
}
</script>

