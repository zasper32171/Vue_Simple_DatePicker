<template>
  <DatePicker></DatePicker>
</template>

<script>
import DatePicker from './components/DatePicker.vue';

export default {
  name: 'App',
  components: { DatePicker },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  --color-disabled: #d2d5db;
  --color-inactive: #d2d2d2;
  --color-active: #f0a202;
}
</style>
