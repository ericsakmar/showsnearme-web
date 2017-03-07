<template>
  <div class="show-list">

    <div v-for="day in groupByDate" class="day">
      <h1 class="header header--day">{{day.date | date}}</h1>

      <article class="show-summary" v-for="show in day.shows">

        <aside class="show-summary__time">
          <p>{{show.start_time | time }}</p>
        </aside>

        <div class="show-summary__info">
          <h1 class="header">
            <a :href="'https://facebook.com/' + show.remoteId" target="_blank">{{show.name}}</a>
          </h1>
          <p v-if="show.place.length > 0">{{show.place[0].name}}</p>
        </div>

      </article>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
import { date, time } from '../filters';

export default {
  name: 'show-list',
  props: ['shows'],
  filters: { date, time },

  computed: {
    groupByDate: function() {

      const grouped = this.shows.reduce((acc, show) => {
        const key = moment(show.start_time).format('YYYY-MM-DD');
        acc[key] = acc[key] || [];
        acc[key].push(show);
        return acc;
      }, {});

      const arrayed = Object.keys(grouped).map(k => ({date:k, shows:grouped[k]}));

      arrayed.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      return arrayed;
    }
  },
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
