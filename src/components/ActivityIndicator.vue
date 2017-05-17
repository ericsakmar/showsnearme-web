<template>
  <div class="activity-indicator">
    <p class="activity-indicator-message">Finding shows{{ postfix }}</p>
  </div>
</template>

<script>
export default {
  name: 'ActivityIndicator',

  data() {
    return {
      isRunning: true,
      postfix: '.'
    }
  },

  created() {
    setTimeout(this.changeIt, 500);
  },

  destroyed() {
    this.isRunning = false;
  },

  methods: {
    changeIt() {
      if (this.postfix === '...') {
        this.postfix = '';
      }
      else {
        this.postfix += '.';
      }

      if (this.isRunning) {
        setTimeout(this.changeIt, 500);
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@require "../styles/style"

.activity-indicator
  border-top 0.2em double base-color
  border-bottom 0.2em double base-color
  margin-left gutter-med
  margin-right gutter-med
  padding-top gutter-med
  padding-bottom gutter-med

  @media (max-width: screen-small) 
    margin gutter-small

.activity-indicator-message
  width 8em
  margin 0 auto

</style>
