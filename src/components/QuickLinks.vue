<template>

  <div class="quick-links">

    <router-link 
      :to="{ path: 'shows' }" 
      :class="{ 'quick-link': true, 'quick-link-hidden': isToday }"
    >Today</router-link>

    <router-link 
      :to="{ path: 'shows', query: tomorrow }" 
      :class="{ 'quick-link': true, 'quick-link-hidden': isTomorrow }"
    >Tomorrow</router-link>

    <router-link 
      :to="{ path: 'shows', query: thisWeekend }" 
      class="quick-link"
    >{{ isWeekend ? 'Next' : 'This' }} Weekend</router-link>

    <Calendar></Calendar>

  </div>

</template>

<script>
import moment from 'moment';

import Calendar from './Calendar';

export default {

  name: 'QuickLinks',

  props: [
    'queryDateFormat',
    'since',
    'until',
  ],

  components: {
    Calendar,
  },

  computed: {

    isWeekend() {
      const today = moment().day();
      return today === 5 || today === 6 || today === 0;
    },

    isToday() {
      const today = moment().format(this.queryDateFormat);
      return today === this.since;
    },

    tomorrow() {
      const tomorrow = moment().add(1, "day");
      const since = tomorrow.format(this.queryDateFormat);
      const until = tomorrow.add(1, 'day').format(this.queryDateFormat);
      return { since, until };
    },

    isTomorrow() {
      const tomorrow = moment().add(1, "day").format(this.queryDateFormat);
      return tomorrow === this.since;
    },

    thisWeekend() {
      // 5 is friday
      const today = moment().day();
      const friday = moment();
     
      // find the next friday
      if (today === 5) { // friday
        friday.add(7, "days");
      }
      else if (today === 6) { // saturday
        friday.add(6, "days");
      }
      else if (today === 0) { // sunday
        friday.add(5, "days");
      }
      else {
        // during the week, set day to friday
        friday.add(5 - today, "days");
      }

      const since = friday.format(this.queryDateFormat);
      const until = friday.add(3, 'days').format(this.queryDateFormat);

      return { since, until };
    },

  },

};
</script>

<style lang="stylus">
@require "../styles/style"

.quick-links
  text-align center
  margin-bottom gutter
  margin-left gutter-small
  margin-right gutter-small
  background bg-color
  width 100%

  @media (max-height: 50em)
    position fixed
    bottom 0
    left 0
    margin-bottom 0
    padding-top gutter-med
    padding-bottom gutter-med

.quick-link
  margin-left gutter-small
  margin-right gutter-small

.quick-link-hidden
  display none

</style>
