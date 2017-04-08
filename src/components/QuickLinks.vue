<template>

  <div class="quick-links">

    <Calendar
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

  props: [
    'daysToShow',
    'queryDateFormat',
  ],

  components: {
    Calendar,
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
