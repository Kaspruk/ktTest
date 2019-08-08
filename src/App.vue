<template>
  <v-app color="">
    <my-header></my-header>
    <v-content>
      <router-view/>
    </v-content>
    <sidebar></sidebar>
  </v-app>
</template>

<script>
import axios from 'axios'

import MyHeader from './spa/header/MyHeader.vue'
import Sidebar from './spa/common/sidebars/sidebar.vue'

export default {
  components: { MyHeader, Sidebar },
  methods: {
    getGenres() {
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=0485215329c893f49b488f10ea7cfb84')
          .then(res => this.$store.commit('setGenres', res.data.genres))
    },
  },
  created(){
    this.getGenres();
  }
}

</script>
