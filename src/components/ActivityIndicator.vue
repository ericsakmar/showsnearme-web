<template>
  <div class="activity-indicator">
    Finding shows{{ postfix }}
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
  @media (max-width: screen-small) 
    margin gutter-small

</style>
