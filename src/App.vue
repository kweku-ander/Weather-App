<template>
  <div class="main">
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey" />
    <Navigation v-on:add-city="toggleModal" />
    <router-view :cities="cities"></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import db from './firebase/firebase'
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import Navigation from './components/Navigation.vue'
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: { Navigation, Modal },
  data() {
    return {
      APIkey: '9102a4430044f10a43c96f4168761fa7',
      cities: [],
      modalOpen: null

      // city: null
    }
  },
  created() {
    // this.getCurrentWeather()
    this.getCityWeather()
    // console.log(this.cities)
  },
  methods: {
    getCityWeather() {
      let firestoreDb = collection(db, 'cities')
      onSnapshot(firestoreDb, (snap) => {
        snap.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            try {
              const response = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?q=${change.doc.data().city}&units=imperial&appid=${this.APIkey}`
              )
              const data = response.data

              updateDoc(doc(firestoreDb, change.doc.id), {
                currentWeather: data
              }).then(() => {
                this.cities.push(change.doc.data())
              })
            } catch (err) {
              console.log(err)
            }
          }
        })
      })
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen
    }
    // getCurrentWeather() {
    //   axios.get(
    //     `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&appid=${this.APIkey}`
    //   )
    //   // .then((res) => console.log(res.data))
    // }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;

  .container {
    padding: 0 20px;
  }
}
</style>
