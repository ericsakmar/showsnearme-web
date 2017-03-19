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

<style scoped>

@media (max-width: 45em) {
  .activity-indicator {
    margin: var(--gutter-small);
  }
}

</style>
