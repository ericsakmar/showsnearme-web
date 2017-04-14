<template>
  <main id="main">

    <ActivityIndicator v-if="isLoading"></ActivityIndicator>

    <QuickLinks 
      v-if="!isLoading"
      :queryDateFormat="queryDateFormat"
      :daysToShow="daysToShow"
      :date="since"
    ></QuickLinks>

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

import ActivityIndicator from './components/ActivityIndicator';
import QuickLinks from './components/QuickLinks';
import ShowList from './components/ShowList';

export default {
  name: 'app',

  components: {
    ActivityIndicator,
    QuickLinks,
    ShowList,
  },

  data() {

    return {
      shows: [],
      isLoading: false,
      daysToShow: 3,
      queryDateFormat: 'YYYY-MM-DD[T00:00:00]Z',
      since: null,
      until: null,
    };

  },

  watch: {
    '$route' (to, from) {
      this.setRange(to.query.since, to.query.until);
    }
  },

  created () {
    this.setRange(this.$route.query.since, this.$route.query.until);
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

    setRange(since, until) {

      if (since && until) {
        this.since = since;
        this.until = until;
      }
      else {
        const now = moment();
        this.since = now.format(this.queryDateFormat);
        this.until = now.add(this.daysToShow, 'days').format(this.queryDateFormat);
      }

      this.fetchShows(this.since, this.until);

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
  margin-left gutter-med
  margin-right gutter-med

  div 
    flex-grow 1

  div:last-child
    text-align right

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
