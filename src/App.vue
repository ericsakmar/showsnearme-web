<template>
  <div id="app">
    <ShowList :shows="shows"></ShowList>
  </div>
</template>

<script>
import moment from 'moment';
import ShowList from './components/ShowList'

export default {
  name: 'app',

  components: {
    ShowList
  },

  data() {
    return {
      shows: []
    };
  },

  created () {
    this.fetchShows();
  },

  methods: {
    fetchShows () {
      const now = moment();
      const since = now.subtract(12, 'hours').format();
      const until = now.add(8, 'days').format();

      window.fetch(`${process.env.API}/events?since=${since}&until=${until}`)
        .then(res => res.json())
        .then(shows => this.shows = shows);
    }
  }
}
</script>

<style>
</style>
