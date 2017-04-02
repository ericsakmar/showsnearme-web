<template>
  <section class="show-list">

    <section v-for="day in groupByDate" class="day">

      <h1 class="header--day">{{day.date | date}}</h1>

      <div class="day-group">

        <a class="show-summary" 
          v-bind:title="getLinkTitle(show)"
          v-for="show in day.shows" 
          v-bind:style="getBackground(show)"
          :href="'https://facebook.com/' + show.remoteId" 
          target="_blank"
          rel="noopener">

          <div class="show-summary__info">

            <h1 class="header">{{show.name}}</h1>

            <p class="show-summary__text">
              <span>{{ show.start_time | time }}</span>
              <span v-if="show.place.length > 0">at {{ show.place[0].name }}</span>
            </p>

          </div>

        </a>

      </div>

    </section>

  </section>
</template>

<script>
import moment from 'moment';
import { date, time } from '../filters';

export default {
  name: 'show-list',
  props: ['shows'],
  filters: { date, time },

  data() {
    return {
      backgroundImages: [],
    };
  }, 

  mounted() {
    this.updateVisibleBackgrounds();
    window.addEventListener('scroll', this.updateVisibleBackgrounds);
    window.addEventListener('resize', this.updateVisibleBackgrounds);
  },

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

  methods: {

    updateVisibleBackgrounds() {
      const articles = document.querySelectorAll('.show-summary');
      this.backgroundImages = Array.prototype
        .map.call(articles, article => article.getBoundingClientRect().top < document.documentElement.clientHeight)
        .filter(visible => visible)
        .map((visible, i) => this.shows[i])
        .reduce((images, show) => {
          images[show.remoteId] = show.cover && show.cover.source;
          return images;
        }, {});
    },

    getBackground(show) {
      const image = this.backgroundImages[show.remoteId];
      if (image) {
        return {
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        };
      }
      else {
        return {
          backgroundImage: "url('/static/icons/logo-120.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        };
      }
    },

    getLinkTitle(show) {
      let desc = show.name + ', ' + this.$options.filters.time(show.start_time);

      if (show.place.length > 0) {
        desc += ' at ' + show.place[0].name;
      }

      desc += ' (opens in a new window)';

      return desc;
    }

  },

}
</script>

<style lang="stylus" scoped>
@require "../styles/style"

.header--day
  color dark-gray
  text-transform uppercase
  margin-left gutter-med
  margin-right gutter-med
  padding-top gutter-small
  padding-bottom gutter-small
  background bg-color
  position -webkit-sticky
  position -moz-sticky
  position -ms-sticky
  position -o-sticky
  position sticky
  top 0

.day:not(:last-child)
  margin-bottom gutter-big

.day-group
  margin-top gutter-small
  display flex
  flex-wrap wrap

.show-summary
  margin-left gutter-med
  margin-right gutter-med
  margin-bottom gutter
  background-color base-color
  height 300px
  display flex
  flex column
  align-items flex-end
  flex 1 0 300px
  text-decoration none

.show-summary__info
  background-color dark-gray 
  padding gutter-med
  width 100%
  color bg-color

.show-summary__text
  margin-top gutter-small
  color light-gray

</style>
