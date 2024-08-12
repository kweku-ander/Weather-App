<template>
  <div class="city">
    <span>{{ city.city }}</span>
    <div class="weather">
      <span>{{ Math.round(city.currentWeather.main.temp) }}&deg;</span>
      <img :src="`../../public/conditions/${city.currentWeather.weather[0].icon}.svg`" alt="" />
      <div class="video">
        <video
          autoplay
          muted
          :src="`../../public/conditions/${city.currentWeather.weather[0].icon}.mp4`"
        ></video>
      </div>
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
