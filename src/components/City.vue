<template>
  <div class="city">
    <i @click="deleteCity" v-if="edit" class="far fa-trash-alt edit" ref="edit"></i>
    <span>{{ city.city }}</span>
    <div class="weather">
      <span>{{ Math.round(city.currentWeather.main.temp) }}&deg;</span>
      <img :src="`../../public/conditions/${city.currentWeather.weather[0].icon}.svg`" alt="" />
      <div class="video">
        <video
          autoplay
          loop
          muted
          :src="`../../public/videos/${city.currentWeather.weather[0].icon}.mp4`"
        ></video>
        <div class="bg-overlay"></div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase/firebase'
import { collection } from 'firebase/firestore'
export default {
  name: 'city',
  props: ['city', 'edit'],
  data() {
    return {
      id: null
    }
  },
  methods: {
    deleteCity() {
      collection(db, 'cities')
        .where('city', '==', `${this.city.city}`)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            this.id = doc.id
          })
        })
        .then(() => {
          console.log(this.id)
        })
        .catch((err) => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
.city {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px;
  flex-basis: 50%;
  min-height: 250px;
  color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .edit {
    border-radius: 0 15px 0 0;
    border: 10px solid rgb(77, 77, 77);
    z-index: 10;
    font-size: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  span {
    z-index: 2;
    text-transform: capitalize;
    display: block;
    font-size: 25px;
    font-weight: 600;
  }

  .weather {
    display: flex;
    z-index: 1;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;

    span {
      font-size: 35px;
      margin-right: 8px;
    }

    img {
      height: 20px;
      width: auto;
      z-index: inherit;
    }
  }

  .video {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    widows: 100%;
    height: 100%;

    video {
      height: 100%;
      @media (min-width: 900px) {
        height: auto;
        width: 100%;
      }
    }

    .bg-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
