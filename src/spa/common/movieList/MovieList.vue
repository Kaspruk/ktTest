<template>
    <v-container class="ma-0 pa-0" grid-list-lg fluid>
        <template v-if="movies.length">
            <v-layout class="mb-1 mx-0 align-center">
                <span class="title accent--text">All films{{title ? ` in ${title} genre:` : ':'}}</span>
                <v-spacer></v-spacer>
                <template v-if="sorting">
                    <v-flex class="pa-0 mr-4" xs3>
                        <v-select
                            class="pa-0 ma-0"
                            :items="sortingItems"
                            item-text="name"
                            v-model="currentSortingItem"
                            @change="selectSorting()"
                            hide-details
                            return-object>
                        </v-select>
                    </v-flex>
                    <v-btn-toggle v-model="currentSorting" mandatory>
                        <v-btn :value="currentSortingItem.type[0]" color="accent" text>
                            <v-icon color="accent">mdi-arrow-up-bold</v-icon>
                        </v-btn>
                        <v-btn :value="currentSortingItem.type[1]" color="accent" text>
                            <v-icon color="accent">mdi-arrow-down-bold</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                </template>
            </v-layout>
            <v-layout key="movieList" wrap>
                <v-flex v-for="movie in movies" :key="movie.id" xs3>
                    <movie-item :movie="movie"></movie-item>
                </v-flex>
                <v-layout v-if="loadMore" key="loading" class="fill-height align-center justify-center pa-4">
                    <v-progress-circular
                            indeterminate
                            :size="70"
                            :width="6"
                            color="accent">
                    </v-progress-circular>
                </v-layout>
            </v-layout>
        </template>
        <v-layout v-else key="loading" class="fill-height align-center justify-center pa-4">
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

export default {
    name: "MovieList",
    components: { MovieItem },
    props: {
        movies: {
            type: Array,
            default: null,
        },
        infinityScroll: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: ''
        },
        sorting: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            sortingItems: [
                {
                    name: 'Popularity',
                    type: ['popularity.desc', 'popularity.asc']
                },
                {
                    name: 'Release date',
                    type: ['release_date.desc', 'release_date.asc']
                },
                {
                    name: 'Revenue',
                    type: ['revenue.desc', 'revenue.asc']
                },
                {
                    name: 'Primary release date',
                    type: ['primary_release_date.desc', 'primary_release_date.asc']
                },
                {
                    name: 'Original title',
                    type: ['original_title.desc', 'original_title.asc']
                },
                {
                    name: 'Vote average',
                    type: ['vote_average.desc', 'vote_average.asc']
                },
                {
                    name: 'Vote count',
                    type: ['vote_count.desc', 'vote_count.asc']
                }
            ],
            currentSortingItem: [],
            currentSorting: 'popularity.desc',
            loadMore: false,
        }
    },
    methods: {
        windowScroll() {
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                if (bottomOfWindow && this.movies.length) {
                    this.loadMore = true;
                    this.$emit('loadMore')
                }
            };
        },
        selectSorting(){
            this.currentSorting = this.currentSortingItem.type[0];
        },
    },
    mounted() {
        if (this.infinityScroll) this.windowScroll()
    },
    created() {
        this.currentSortingItem = this.sortingItems[0];
    },
    watch: {
        currentSorting(val) {
            this.$emit('sortingBy', val)
        },
        movies(){
            if(this.movies.length > 20)this.loadMore = false;
        }
    }
}
</script>

<style scoped>

</style>
