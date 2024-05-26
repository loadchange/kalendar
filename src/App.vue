<template>
  <div id="app">
    <calendar-component :events="events"></calendar-component>
  </div>
</template>

<script>
import CalendarComponent from './components/CalendarComponent.vue';

export default {
  name: 'App',
  components: {
    CalendarComponent
  },
  data() {
    return {
      // Sample events data
      events: [
        { date: '2022-01-01', title: 'New Year\'s Day' },
        { date: '2022-02-14', title: 'Valentine\'s Day' },
        // Add more events here
      ]
    }
  }
}
</script>

<style>
/* Global styles */
body {
  font-family: 'Arial', sans-serif;
}
</style>
