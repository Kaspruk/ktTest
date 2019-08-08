<template>
    <v-app-bar color="primary" fixed clipped-left app>
        <v-container>
            <v-layout>
                <v-toolbar-items>
                    <v-btn to="/" class="home-btn" color="accent" text>Home</v-btn>
                    <v-btn color="accent" @click="showSidebar" text>Genre</v-btn>
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-flex class="find_movie" xs3>
                    <autocomplete-search></autocomplete-search>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app-bar>
</template>

<script>
import EventBus from './../../event-bus.js'
import AutocompleteSearch from './../common/autocomleteSearch/searchAutocomplete.vue'

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
