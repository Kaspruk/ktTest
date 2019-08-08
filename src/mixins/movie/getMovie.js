export default {
    data() {
        return {
            movies: [],
            getMoviesParams: {
                page: 1,
                sort_by: 'popularity.desc',
                with_genres: ''
            }
        }
    },
    methods: {
        getMoreMovies() {
            this.getMoviesParams.page += 1;
            this.getMovies();
        },
        sortingBy(sortParam) {
            this.getMoviesParams.sort_by = sortParam;
            this.movies = [];
            this.getMovies()
        },
    }
}
