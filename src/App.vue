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
      const since = now.format();
      const until = now.add(1, 'month').format();

      window.fetch(`http://localhost:3001/events?since=${since}&until=${until}`)
        .then(res => res.json())
        .then(shows => this.shows = shows);
    }
  }
}
</script>

<style>
</style>