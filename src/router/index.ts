import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/works',
        name: 'works',
        component: () => import('@/views/works/WorksView.vue'),
      },
      {
        path: '/works/:id',
        name: 'work-detail',
        component: () => import('@/views/works/WorkDetailView.vue'),
      },
      {
        path: '/artists',
        name: 'artists',
        component: () => import('@/views/artists/ArtistsView.vue'),
      },
      {
        path: '/artists/:id',
        name: 'artists-detail',
        component: () => import('@/views/artists/ArtistDetail.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
      },
      {
        path: '/exhibitions',
        name: 'exhibitions',
        component: () => import('@/views/ExhibitionsView.vue'),
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('@/views/ContactView.vue'),
      },
      //auth版面,不套用header/footer,還不知怎麼寫暫時先這樣要查
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue'),
        meta: { hideFooter: true }, //footer在登入不展現
      },
      //404頁面
      {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
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
