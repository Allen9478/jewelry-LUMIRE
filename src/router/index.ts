import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/Works',
        name: 'Works',
        component: () => import('@/views/works/WorksView.vue'),
      },
      {
        path: '/Works/:id',
        name: 'Work',
        component: () => import('@/views/works/WorkDetailView.vue'),
      },
      {
        path: '/Artists',
        name: 'Artists',
        component: () => import('@/views/artists/ArtistsView.vue'),
      },
      {
        path: '/Artists/:id',
        name: 'ArtistsDetail',
        component: () => import('@/views/artists/ArtistDetail.vue'),
      },
      {
        path: '/About',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
      },
      {
        path: '/Exhibitions',
        name: 'Exhibitions',
        component: () => import('@/views/ExhibitionsView.vue'),
      },
      {
        path: '/Contact',
        name: 'Contact',
        component: () => import('@/views/ContactView.vue'),
      },
      //auth版面,不套用header/footer,還不知怎麼寫暫時先這樣要查
      {
        path: '/Login',
        name: 'Login',
        component: () => import('@/views/auth/LoginView.vue'),
      },
      //404頁面
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
