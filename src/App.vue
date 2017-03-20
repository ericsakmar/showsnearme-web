<template>
  <main id="main">

    <ActivityIndicator v-if="isLoading"></ActivityIndicator>

    <ShowList :shows="shows" v-if="!isLoading"></ShowList>
    
    <div class="actions" v-if="!isLoading">
      <div>
        <a @click.prevent="previous()" href="#" class="button">&lt;&lt;&lt;</a>     
      </div>
      <div>
        <a @click.prevent="next()" href="#" class="button">&gt;&gt;&gt;</a>     
      </div>
    </div>

  </main>
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
      daysToShow: 4,
      queryDateFormat: 'YYYY-MM-DD[T00:00:00]Z',
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
      const now = moment(this.$route.query.since).add(this.daysToShow, 'days');
      const since = now.format(this.queryDateFormat);
      const until = now.add(this.daysToShow, 'days').format(this.queryDateFormat);
      this.$router.push({ path: '/shows', query: { since, until } });
    },

    previous() {
      const now = moment(this.$route.query.since);
      const until = now.format(this.queryFormat);
      const since = now.subtract(this.daysToShow, 'days').format(this.queryFormat);
      this.$router.push({ path: '/shows', query: { since, until } });
    },

    setRange(query) {

      if (query.since && query.until) {
        this.fetchShows(query.since, query.until);
      }
      else {
        const now = moment();
        const since = now.format(this.queryDateFormat);
        const until = now.add(this.daysToShow, 'days').format(this.queryDateFormat);
        this.fetchShows(since, until);
      }

    },

    fetchShows (since, until) {
      this.isLoading = true;

      window.fetch(`${process.env.API}/events?since=${since}&until=${until}`)
        .then(res => res.json())
        .then(shows => {
          const now = moment();
          return shows.filter(show => now.isBefore(moment(show.end_time)));
        })
        .then(shows => {
          this.shows = shows;
          this.isLoading = false;
        });

    }
  }
}
</script>

<style lang="stylus">
@require "./styles/style"

.actions 
  display flex

  div 
    flex-grow 1

  div:last-child
    text-align right

  @media (max-width: screen-small)
    margin gutter-small

// these should go to the header component
.logo
  margin-bottom gutter
  font-size 3em
  text-decoration none
  text-align center
  color base-color !important
  display block

  @media (max-width: screen-med)
    margin-top gutter
    font-size 2em

  @media (max-width: screen-real-small)
    font-size 1.25em

header
  font-family 'Rubik Mono One', monospace
  
.header
  font-weight 700

</style>
