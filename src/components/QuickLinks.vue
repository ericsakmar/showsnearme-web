<template>

  <div class="quick-links">

    <!-- only show if TODAY is not visible -->
    <router-link :to="{ path: 'shows' }" class="quick-link">Today</router-link>

    <router-link :to="{ path: 'shows', query: tomorrow }" class="quick-link">Tomorrow</router-link>

    <router-link :to="{ path: 'shows', query: thisWeekend }" class="quick-link">{{ isWeekend ? 'Next' : 'This' }} Weekend</router-link>

  </div>

</template>

<script>

import moment from 'moment';
export default {

  name: 'ActivityIndicator',

  data() {
    return {
      queryDateFormat: 'YYYY-MM-DD[T00:00:00]Z',
    };
  },

  computed: {

    isWeekend() {
      const today = moment().day();
      return today === 5 || today === 6 || today === 0;
    },

    tomorrow() {
      const tomorrow = moment().add(1, "day");
      const since = tomorrow.format(this.queryDateFormat);
      const until = tomorrow.add(1, 'day').format(this.queryDateFormat);
      return { since, until };
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
    }

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

.quick-link
  margin-left gutter-small
  margin-right gutter-small

</style>
