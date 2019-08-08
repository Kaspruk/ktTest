import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './spa/homePage/HomePage.vue'
import Movies from './spa/movie/MovieDetail.vue'
import Genre from './spa/genre/Genre.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/movie/:movieId',
      name: 'MovieDetail',
      component: Movies,
    },
    {
      path: '/genre/:genre',
      name: 'Genre',
      component: Genre,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
