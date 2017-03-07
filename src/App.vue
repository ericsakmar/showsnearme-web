<template>
  <div>
    <ActivityIndicator v-if="isLoading"></ActivityIndicator>
    <ShowList :shows="shows" v-if="!isLoading"></ShowList>
    
    <div class="actions">
      <a @click.prevent="previous()" href="#">previous</a>     
      <a @click.prevent="next()" href="#">next</a>     
    </div>
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

  watch: {
    '$route' (to, from) {
      this.setRange(to.query);
    }
  },

  created () {
    this.setRange(this.$route.query);
  },

  methods: {

    next() {
      const now = moment(this.$route.query.since).add(8, 'days');
      const since = now.format();
      const until = now.add(8, 'days').format();
      this.$router.push({ path: '/shows', query: { since, until } });
    },

    previous() {
      const now = moment(this.$route.query.since);
      const until = now.format();
      const since = now.subtract(8, 'days').format();
      this.$router.push({ path: '/shows', query: { since, until } });
    },

    setRange(query) {

      if (query.since && query.until) {
        this.fetchShows(query.since, query.until);
      }
      else {
        const now = moment();
        const since = now.subtract(6, 'hours').format();
        const until = now.add(8, 'days').format();
        this.$router.push({ path: '/shows', query: { since, until } });
      }

    },

    fetchShows (since, until) {
      this.isLoading = true;

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

<style scoped>
.actions {
  display: flex;
}
.actions a {
  flex-grow: 1;
}
.actions a:last-child {
  text-align: right;
}

</style>
