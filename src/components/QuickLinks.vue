<template>

  <div class="quick-links">

    <button @click.prevent="showCalendar = !showCalendar" 
      v-if="!showCalendar"
      class="button"
    >Calendar</button>

    <Calendar
      v-if="showCalendar"
      :date="date"
      :daysToShow="daysToShow"
      :queryDateFormat="queryDateFormat"
    ></Calendar>

  </div>

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

.quick-links
  text-align center
  margin-bottom gutter

</style>
