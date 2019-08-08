<template>
    <v-card>
        <router-link v-if="movie" :to="{ name: 'MovieDetail', params: { movieId: movie.id } }" class="text-decoration-none">
            <v-img
                    height="380px"
                    :class="movie.poster_path ? '' : 'without-image'"
                    :lazy-src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                    gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.6)"
                    class="white--text">
                <v-card-title class="align-end justify-center text-center title fill-height"><span class="text-center">{{movie.title}}</span></v-card-title>
            </v-img>
        </router-link>
        <v-layout v-else class="fill-height align-center justify-center pa-4">
            <v-progress-circular
                    indeterminate
                    :size="50"
                    :width="5"
                    color="accent">
            </v-progress-circular>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    name: "MovieItem",
    props: {
        movie: {
            type: Object,
            default: null,
        }
    }
}
</script>

<style scoped>

</style>
