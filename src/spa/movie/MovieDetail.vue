<template>
    <div  class="fill-height">
        <div v-if="!loading" class="movie">
            <v-layout align-center justify-center>
                <div class="movie_background-poster">
                    <v-img  v-if="movie.backdrop_path"
                            :lazy-src="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path"
                            aspect-ratio="1"
                            min-height="300"
                            gradient="to bottom, rgba(8,28,36,.85), rgba(8,28,36,.85)">
                    </v-img>
                </div>
                <v-container class="movie_content" pa-0>
                    <v-layout>
                        <v-flex xs6>
                            <v-img v-if="movie.poster_path" :lazy-src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" elevation="10" contain></v-img>
                        </v-flex>
                        <v-flex xs6>
                            <p class="display-2 accent--text mb-2">{{ movie.title }}</p>
                            <p class="title white--text">{{ movie.tagline }}</p>
                            <p class="white--text">{{ movie.overview }}</p>
                            <div v-if="movie.genres.length" class="movie_content-item">
                                <p class="title accent--text mb-0">Genres:</p>
                                <router-link
                                    v-for="(genre, i) in movie.genres"
                                    :key="genre.id"
                                    :to="{ name: 'Genre', params: { genre: genre.name.toLowerCase(), id: genre.id } }"
                                    class="white--text"
                                    :class="i === movie.genres.length-1 || 'mr-2'">{{ i === movie.genres.length-1 ? genre.name : `${genre.name},`}}</router-link>
                            </div>
                            <div class="movie_content-item">
                                <p class="title accent--text mb-0">Ratings:</p>
                                <v-rating
                                        :value="movie.vote_average/2"
                                        color="yellow darken-3"
                                        background-color="grey darken-1"
                                        empty-icon="$vuetify.icons.ratingFull"
                                        half-increments
                                        dense
                                        readonly
                                ></v-rating>
                                <span>/ {{movie.vote_average}}</span>
                            </div>
                            <div class="movie_content-item">
                                <p class="title accent--text mb-0">Runtime:</p>
                                <span>{{movie.runtime}}min</span>
                            </div>
                            <div class="movie_content-item">
                                <p class="title accent--text mb-0">Release date:</p>
                                <span>{{dataRelease}}</span>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-layout>
            <v-container v-if="similarMovie.length" class="movie_description">
                <other-movies :movies="similarMovie" title="Similar movies"></other-movies>
            </v-container>
        </div>
        <v-layout v-else class="fill-height align-center justify-center pa-4">
            <v-progress-circular
                    indeterminate
                    :size="90"
                    :width="8"
                    color="accent">
            </v-progress-circular>
        </v-layout>
    </div>
</template>

<script>
import moment from 'moment'
import OtherMovies from '../common/otherMovies/OtherMovies.vue'

export default {
    name: "MovieDetail",
    components: { OtherMovies },
    data() {
        return {
            movie: null,
            loading: false,
            similarMovie: null,
        }
    },
    computed: {
        dataRelease() {
            return moment(this.movie.release_date).format("DD MMMM YYYY")
        }
    },
    methods: {
        getMovieDetail(movieId) {
            this.loading = true;
            this.$api.movies.getDetails(movieId || this.$route.params.movieId).then(res => {
                this.movie = res;
                this.getSimilarMovies()
            })
        },
        getSimilarMovies() {
            this.similarMovie = [];
            this.$api.movies.getSimilar(this.movie.id).then( res => this.similarMovie = res.results);
            this.loading = false;
        }
    },
    created(){
        this.getMovieDetail()
    },
    watch: {
         '$route' (to) {
             this.getMovieDetail(to.params.movieId);
         }
    }
}
</script>

<style scoped>

</style>
