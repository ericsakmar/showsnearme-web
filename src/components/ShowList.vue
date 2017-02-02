<template>
  <div class="show-list">

    <div v-for="day in groupByDate" class="day">
      <h1 class="header header--day">{{day.date | date}}</h1>

      <article class="show-summary" v-for="show in day.shows">

        <aside class="show-summary__time">
          <p>{{show.start_time | time }}</p>
        </aside>

        <div class="show-summary__info">
          <h1 class="header">{{show.name}}</h1>
          <p>{{show.place[0].name}}</p>
        </div>

      </article>
    </div>

  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'show-list',
  props: ['shows'],

  filters: {

    date: function(value) {
      return moment(value).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'dddd, MMMM Do'
      });
    },

    time: function(value) {
      return moment(value).format('h:mma');
    }
  },

  computed: {
    groupByDate: function() {

      const dates = this.shows.reduce((dates, show) => dates.add(moment(show.start_time).format('YYYY-MM-DD')), new Set());

      const grouped = Array.from(dates).reduce((acc, date) => {
        acc[date] = [];
        return acc;
      }, {});

      this.shows.forEach(show => {
        const key = moment(show.start_time).format('YYYY-MM-DD');
        grouped[key].push(show);
      });

      const arrayed = Object.keys(grouped).map(k => ({date:k, shows:grouped[k]}));

      arrayed.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      return arrayed;
    }
  }
}
</script>

<style>
  .header--day {
    background: var(--accent-color);
    margin-bottom: var(--gutter);
    padding: var(--gutter-small);
  }

  .show-summary {
    display: flex;
    margin-bottom: var(--gutter);
  }

  .show-summary__time {
    background: #eee;
    flex: 0 0 5em;
    text-align: center;
    padding: var(--gutter-small);
    margin-right: var(--gutter-small);
  }

  .show-summary__info {
    flex-grow: 1;
    margin-top: var(--gutter-small);
    margin-bottom: var(--gutter-small);
  }


</style>
