<template>
  <div>
    <ActivityIndicator v-if="isLoading"></ActivityIndicator>
    <ShowList :shows="shows" v-if="!isLoading"></ShowList>
  </div>
</template>

<script>
import moment from 'moment';
import ShowList from './components/ShowList';
import ActivityIndicator from './components/ActivityIndicator';

export default {
  name: 'app',

  components: {
    ShowList,
    ActivityIndicator
  },

  data() {
    return {
      shows: [],
      isLoading: false,
    };
  },

  created () {
    this.fetchShows();
  },

  methods: {
    fetchShows () {
      this.isLoading = true;

      const now = moment();
      const since = now.subtract(12, 'hours').format();
      const until = now.add(8, 'days').format();

      window.fetch(`${process.env.API}/events?since=${since}&until=${until}`)
        .then(res => res.json())
        .then(shows => {
          this.shows = shows;
          this.isLoading = false;
        });

    }
  }
}
</script>

<style>
</style>
