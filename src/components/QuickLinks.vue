<template>

  <nav class="quick-links-nav">

    <div class="quick-links">

      <a href="#"
        @click.prevent="showCalendar = !showCalendar" 
        class="quick-link"
      >Calendar</a>

      <a href="#" class="quick-link">Community</a>

      <a href="#" class="quick-link">More Info</a>

    </div>

    <div class="quick-links__content" v-if="showCalendar">

      <Calendar
        v-if="showCalendar"
        :date="date"
        :daysToShow="daysToShow"
        :queryDateFormat="queryDateFormat"
      ></Calendar>

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
    };
  },

  computed: {

  },

};
</script>

<style lang="stylus">
@require "../styles/style"

.quick-links-nav
  text-align center

.quick-links
  margin-bottom gutter-med
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

.quick-link
  text-decoration none
  padding gutter-small 1%
  display inline-block

  @media (max-width: 20em)
    padding gutter-small gutter-tiny

</style>
