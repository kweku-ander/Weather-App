<template>
  <div class="main">
    <Navigation class="navigation" />
  </div>

  <RouterView />
</template>

<script>
// import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'
import db from './firebase/firebase'
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import Navigation from './components/Navigation.vue'
export default {
  name: 'App',
  components: { Navigation },
  data() {
    return {
      APIkey: '9102a4430044f10a43c96f4168761fa7',
      city: 'Dallas',
      cities: []
    }
  },
  created() {
    // this.getCurrentWeather()
    this.getCityWeather()
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
              // .then(() => {
              //   console.log(this.cities)
              // })
            } catch (err) {
              console.log(err)
            }
          }
        })
      })
    },
    getCurrentWeather() {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&appid=${this.APIkey}`
        )
        .then((res) => console.log(res.data))
    }
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
  height: 100vh;
  .navigation {
    z-index: 99;
    position: fixed;
    max-width: 1024px;
    width: 100%;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .container {
    padding: 0 20px;
  }
}
</style>
