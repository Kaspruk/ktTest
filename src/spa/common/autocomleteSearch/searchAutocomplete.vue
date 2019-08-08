<template>
    <v-autocomplete
            label="Search movie"
            color="white"
            v-model="selectMovie"
            :items="movies"
            :search-input.sync="search"
            :loading="loading"
            @change="endSearch"
            item-text="title"
            item-value="id"
            flat
            solo-inverted
            hide-no-data
            hide-details>
        <template v-slot:item="{ item }">
            <template @click="search = null; focus = false">
                <v-list-item-avatar
                        color="accent"
                        class="headline font-weight-light white--text">
                    <v-img v-if="item.poster_path" :src="'https://image.tmdb.org/t/p/w500' + item.poster_path"></v-img>
                    <template v-else>{{ item.title.charAt(0) }}</template>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>

<script>
import _ from 'lodash';

export default {
    name: "searchAutocomplete",
    data() {
        return {
            toPmLoading: true,
            search: '',
            movies: [],
            selectMovie: '',
            loading: false,
            focus: false,
        }
    },
    methods: {
        endSearch() {
            this.$router.push({ name: 'MovieDetail', params: { movieId: this.selectMovie } });
            this.search = '';
            this.selectMovie = null;
        },
        getSearchMovie() {
            this.loading = true;
            this.$api.movies.getSearchMovie(this.search).then((res) => {
                this.movies = res.results;
                this.loading = false;
                if (!res.results.length) this.selectMovie = 'Nothing find'
            });
        },

    },
    watch: {
        search: _.debounce(function (newVal) {
                if (newVal !== '' && newVal !== null) this.getSearchMovie();
            }, 1000),
    },
}
</script>

<style scoped>

</style>
