<template>
    <v-container pt-5>
        <other-movies :movies="popularMovies" title="Popular movies"></other-movies>
        <div class="divider"></div>
        <other-movies :movies="topRatedMovies" title="Top rated movies"></other-movies>
        <div class="divider"></div>
        <movie-list :movies="movies" infinityScroll sorting @loadMore="getMoreMovies()" @sortingBy="sortingBy($event)"></movie-list>
    </v-container>
</template>

<script>
import MovieList from '../common/movieList/MovieList'
import OtherMovies from '../common/otherMovies/OtherMovies'

import movieMixin from './../../mixins/movie/getMovie'

export default {
    name: "HomePage",
    components: { MovieList, OtherMovies },
    mixins: [movieMixin],
    data() {
        return {
            topRatedMovies: [],
            popularMovies: [],
        }
    },
    methods: {
        getTopRated() {
            this.$api.movies.getTopRated().then(res => this.topRatedMovies = res.results)
        },
        getPopular() {
            this.$api.movies.getPopular().then(res => this.popularMovies = res.results)
        },
        getMovies() {
            this.$api.movies.discover(this.getMoviesParams).then(res => this.movies = this.movies.concat(res.results))
        },
    },
    created(){
        this.getTopRated();
        this.getPopular();
        this.getMovies();
    }
}
</script>

<style scoped>

</style>
