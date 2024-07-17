<template>
  <Navigation />

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
              })
                .then(() => {
                  this.cities.push(change.doc.data())
                })
                .then(() => {
                  console.log(this.cities)
                })
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
