<template>
    <v-container class="ma-0 pa-0" fluid>
        <template v-if="movies.length">
            <v-layout class="mb-3 align-center">
                <span class="title accent--text">{{title}}:</span>
                <v-spacer></v-spacer>
                <template v-if="movies.length > 4">
                    <v-btn color="accent" class="mr-2" @click="prevSlide"><v-icon>mdi-arrow-left-bold</v-icon></v-btn>
                    <v-btn color="accent" @click="nextSlide"><v-icon>mdi-arrow-right-bold</v-icon></v-btn>
                </template>
            </v-layout>
            <slick ref="slick" :options="slickOptions">
                <movie-item v-for="movie in movies" :key="movie.id" :movie="movie"></movie-item>
            </slick>
        </template>
        <v-layout v-else class="fill-height align-center justify-center pa-4">
            <v-progress-circular
                    indeterminate
                    :size="70"
                    :width="6"
                    color="accent">
            </v-progress-circular>
        </v-layout>
    </v-container>
</template>

<script>
import MovieItem from '../movieItem/MovieItem.vue'
import Slick from 'vue-slick';

export default {
    name: "OtherMovies",
    components: { MovieItem, Slick },
    data() {
        return {
            slickOptions: {
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: false,
                dots: false,
            },
        };
    },
    props: {
        movies: {
            type: Array,
            default: Boolean
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        prevSlide() {
            this.$refs.slick.prev();
        },
        nextSlide() {
            this.$refs.slick.next();
        }
    },
}
</script>

<style scoped>

</style>
