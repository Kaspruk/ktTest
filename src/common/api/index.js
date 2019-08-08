import movieFactory from './movies/movie-factory'

export default (Vue) => {
    Vue.prototype.$api = {
        movies: movieFactory()
    };
};
