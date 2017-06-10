<template>

  <nav class="quick-links-nav">

    <div class="quick-links">

      <a href="#"
        @click.prevent="toggleCalendar()" 
        class="quick-link"
      >Calendar</a>

      <span class="quick-link__divider">&#183;</span>

      <a href="https://www.facebook.com/groups/1234703889961588/" class="quick-link">Community</a>

      <span class="quick-link__divider">&#183;</span>

      <a href="#"
        @click.prevent="toggleInfo()" 
        class="quick-link">About</a>

    </div>

    <div class="quick-links__content" v-if="showCalendar | showInfo">

      <Calendar
        v-if="showCalendar"
        :date="date"
        :daysToShow="daysToShow"
        :queryDateFormat="queryDateFormat"
      ></Calendar>

      <div v-if="showInfo">

        <p class="app-info">Shows Near Me is a crowd-sourced community calendar 
          for live shows in Pittsburgh.</p>

        <p class="app-info">Have a show? Want to see it here? Just post it to the
          <a href="https://www.facebook.com/groups/1234703889961588/">Shows Near Me group on Facebook</a>.
        </p>

        <p class="app-info">Shows Near Me was created by 
          <a href="mailto:eric@ericsakmar.com">Eric Sakmar</a>.
        </p>

      </div>

    </div>

  </nav>

</template>

<script>
import moment from 'moment';

import Calendar from './Calendar';

export default {

  name: 'QuickLinks',

  components: {
    Calendar,
  },

  props: [
    'date',
    'daysToShow',
    'queryDateFormat',
  ],

  data() {
    return {
      showCalendar: false,
      showInfo: false,
    };
  },

  methods: {

    toggleCalendar() {
      if (this.showCalendar) {
        this.showCalendar = false;
      }
      else {
        this.showCalendar = true;
        this.showInfo = false;
      }
    },

    toggleInfo() {
      if (this.showInfo) {
        this.showInfo = false;
      }
      else {
        this.showInfo = true;
        this.showCalendar = false;
      }
    },

  },

};
</script>

<style lang="stylus">
@require "../styles/style"

.quick-links-nav
  text-align center

.quick-links
  margin-left gutter-med
  margin-right gutter-med
  text-align center
  border-top 0.2em double base-color
  border-bottom 0.2em double base-color

.quick-links__content
  border-bottom 0.2em double base-color
  margin-left gutter-med
  margin-right gutter-med
  padding-bottom gutter-med
  padding-top gutter-med

.quick-link
  text-decoration none
  padding gutter-small 1%
  display inline-block

  @media (max-width: 22em)
    padding gutter-small gutter-tiny

.app-info
  max-width 25em
  margin gutter auto
  text-align left

</style>
