<template>
    <v-app-bar color="primary" fixed clipped-left app>
        <v-app-bar-nav-icon color="white" @click="showSidebar"></v-app-bar-nav-icon>
        <router-link class="logoTip" to="/">
            <img src="../../assets/img/logo.svg" alt=""/>
        </router-link>
        <v-spacer></v-spacer>
        <v-flex class="find_movie" xs3>
            <autocomplete-search></autocomplete-search>
        </v-flex>
    </v-app-bar>
</template>

<script>
import EventBus from './../../event-bus.js'
import AutocompleteSearch from '../common/autocomleteSearch/SearchAutocomplete.vue'

export default {
    name: "MyHeader",
    components: { AutocompleteSearch },
    data() {
        return {
            drawer: false,
        }
    },
    methods: {
        showSidebar() {
            this.drawer = !this.drawer;
            EventBus.$emit('showSidebar', this.drawer)
        }
    }
}
</script>

<style scoped>

</style>
