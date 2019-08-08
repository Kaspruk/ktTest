<template>
    <v-navigation-drawer
            v-model="drawer"
            color="primary"
            fixed
            clipped
            app>
        <v-layout class="align-start justify-start routes-wrapper" column wrap>
            <p class="white--text ml-2 mb-0 title">Genres:</p>
            <router-link v-for="genre in genres" :key="genre.id" :to="{ name: 'Genre', params: { genre: genre.name.toLowerCase(), id: genre.id } }">
                <span>{{ genre.name }}</span>
            </router-link>
        </v-layout>
    </v-navigation-drawer>
</template>

<script>
import EventBus from './../../../event-bus.js'

export default {
    name: "sidebar",
    data() {
        return {
            drawer: false,
        }
    },
    computed: {
        genres() {
            return this.$store.getters.getGenres;
        }
    },
    mounted(){
        EventBus.$on('showSidebar', val => this.drawer = val);
    },
    beforeDestroy() {
        EventBus.$off('showSidebar');
    }
}
</script>

<style scoped>

</style>
