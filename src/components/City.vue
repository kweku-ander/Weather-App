<template>
  <div class="city">
    <span>{{ city.city }}</span>
    <div class="weather">
      <span>{{ Math.round(city.currentWeather.main.temp) }}&deg;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'city',
  props: ['city'],
  created() {
    console.log(this.city)
  }
}
</script>

<style lang="scss" scoped></style>
