<template>
  <div class="modal" ref="modal" @click="closeModal">
    <div class="modal-wrap" ref="modalWrap" @click.stop>
      <label for="city-name">Enter Location</label>
      <input type="text" name="city-name" placeholder="Search By City Name" v-model="city" />
      <button @click="addCity">Add</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import db from '../firebase/firebase'
import { doc, collection, setDoc } from 'firebase/firestore'
export default {
  name: 'modal',
  props: ['APIkey'],
  data() {
    return {
      city: ''
    }
  },
  methods: {
    closeModal(e) {
      if (e.target === this.$refs.modal) {
        this.$emit('close-modal')
      }
    },
    async addCity() {
      if (this.city === '') {
        alert('Field cannot be empty')
      } else {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&appid=${this.APIkey}`
        )
        const data = await response.data
        setDoc(doc(collection(db, 'cities')), {
          city: this.city,
          currentWeather: data
        }).then(() => {
          this.$emit('close-modal')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    color: white;
  }

  .modal-wrap {
    max-width: 500px;
    border-radius: 8px;
    width: 80%;
    padding: 20px;
    background-color: #31363d;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    input {
      border: none;
      background-color: transparent;
      border-bottom: 1px solid white;
      padding: 6px 4px;
      margin: 10px 0 20px;
      width: 100%;
      color: white;

      &:focus {
        outline: none;
      }
    }

    button {
      background-color: #222325;
      color: white;
      padding: 6px 20px;
      border-radius: 8px;
      border: none;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
