<template>
    <v-container pt-5>
        <movie-list :movies="movies" :title="this.$route.params.genre" infinityScroll sorting @loadMore="getMoreMovies()" @sortingBy="sortingBy($event)"></movie-list>
    </v-container>
</template>

<script>
import MovieList from '../common/movieList/MovieList'
import _ from 'lodash'

import movieMixin from './../../mixins/movie/getMovie'

export default {
    name: "Genre",
    components: { MovieList },
    mixins: [movieMixin],
    computed: {
        genres () {
            return this.$store.getters.getGenres
        }
    },
    watch: {
        genres(val) {
            if(val) this.getMovies()
        },
        '$route' (to) {
            this.movies = [];
            this.getMovies(to.params.id);
        }
    },
    methods: {
        getGenreId() {
            const arr = _.find(this.genres, { 'name': this.$route.params.genre[0].toUpperCase() + this.$route.params.genre.slice(1) });
            return arr.id
        },
        getMovies(id) {
            this.getMoviesParams.with_genres = id || (this.$route.params.id ? this.$route.params.id : this.getGenreId());
            this.$api.movies.discover(this.getMoviesParams).then(res => this.movies = this.movies.concat(res.results))
        },
    },
    created(){
        this.getMovies();
    },
}
</script>

<style scoped>

</style>
