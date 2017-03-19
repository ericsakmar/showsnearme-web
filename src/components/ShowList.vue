<template>
  <div class="show-list">

    <div v-for="day in groupByDate" class="day">
      <h1 class="header header--day">{{day.date | date}}</h1>

      <div class="day-group">

        <article class="show-summary" v-for="show in day.shows"
          v-bind:style="{ backgroundImage: 'url(' + (show.cover && show.cover.source) + ')'}">

          <div class="show-summary__info">
            <h1 class="header">
              <a :href="'https://facebook.com/' + show.remoteId" target="_blank">{{show.name}}</a>
            </h1>
            <p>
              <span>{{ show.start_time | time }}</span>
              <span v-if="show.place.length > 0">at {{ show.place[0].name }}</span>
            </p>
          </div>

        </article>

      </div>
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
  padding: var(--gutter-small);
}

.day-group {
  display: flex;
  flex-wrap: wrap;
}

.show-summary {
  margin: var(--gutter-small);
  background-size: cover;
  background-position: top center;
  height: 300px;
  display: flex;
  flex: column;
  align-items: flex-end;
  flex: 1 0 300px;
}
.show-summary:first-child {
  margin-left: 0;
}
.show-summary:last-child {
  margin-right: 0;
}

.show-summary__info {
  background: rgba(255, 255, 255, 0.9);
  padding: var(--gutter-small);
  width: 100%;
}

.show-summary__image {
  height: 200px;
}

@media (max-width: 45em) {
  .show-summary {
    height: 150px;
    margin-left: var(--gutter-small) !important;
    margin-right: var(--gutter-small) !important;
  }
}

</style>
