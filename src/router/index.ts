import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw, RouterOptions } from 'vue-router'
import i18n from '@/i18n'
import { watch } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useUiStore } from '@/stores/useUiStore'

function waitForAuthReady() {
  const authStore = useAuthStore()

  if (authStore.isAuthReady) {
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    const stop = watch(
      () => authStore.isAuthReady,
      (ready) => {
        if (ready) {
          stop()
          resolve()
        }
      },
    )
  })
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { titleKey: 'pageTitle.home' },
      },
      {
        path: '/works',
        name: 'works',
        component: () => import('@/views/works/WorksView.vue'),
        meta: { titleKey: 'pageTitle.works' },
      },
      {
        path: '/works/:id',
        name: 'works-detail',
        component: () => import('@/views/works/WorkDetailView.vue'),
        meta: { titleKey: 'pageTitle.works' },
      },
      {
        path: '/artists',
        name: 'artists',
        component: () => import('@/views/artists/ArtistsView.vue'),
        meta: { titleKey: 'pageTitle.artists' },
      },
      {
        path: '/artists/:id',
        name: 'artists-detail',
        component: () => import('@/views/artists/ArtistDetail.vue'),
        meta: { titleKey: 'pageTitle.artists' },
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
        meta: { titleKey: 'pageTitle.about' },
      },
      {
        path: '/exhibitions',
        name: 'exhibitions',
        component: () => import('@/views/ExhibitionsView.vue'),
        meta: { titleKey: 'pageTitle.exhibitions' },
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('@/views/ContactView.vue'),
        meta: { hideFooter: true, titleKey: 'pageTitle.contact' },
      },
      {
        path: '/favorites',
        name: 'favorites',
        component: () => import('@/views/FavoritesView.vue'),
        beforeEnter: async (to, from) => {
          await waitForAuthReady()

          const authStore = useAuthStore()
          if (authStore.isLoggedIn) return

          const uiStore = useUiStore()
          uiStore.setPendingRedirect(to.fullPath)

          if (from.name) {
            return false
          }
          return { name: 'home' }
        },
        meta: { titleKey: 'pageTitle.favorites' },
      },
      {
        path: '/auth',
        component: () => import('@/layouts/AuthLayout.vue'),
        meta: { hideFooter: true },
        children: [
          {
            path: 'login',
            name: 'login',
            component: () => import('@/views/auth/LoginView.vue'),
            meta: { titleKey: 'pageTitle.login' },
          },
          {
            path: 'register',
            name: 'register',
            component: () => import('@/views/auth/RegisterView.vue'),
            meta: { titleKey: 'pageTitle.register' },
          },
          {
            path: 'forgot-password',
            name: 'forgot-password',
            component: () => import('@/views/auth/ForgotPasswordView.vue'),
            meta: { titleKey: 'pageTitle.forgotPassword' },
          },
        ],
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/NotFoundView.vue'),
        meta: { titleKey: 'pageTitle.notFound' },
      },
    ],
  },
]

const routerOptions: RouterOptions = {
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  // 參數加底線TS會略過
  scrollBehavior(_to, _from, savedPosition) {
    // 如果瀏覽器有動作紀錄，就回去原本動作的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  },
}
const router = createRouter(routerOptions)
function updateTitle(): void {
  const key = router.currentRoute.value.meta.titleKey
  const title = typeof key === 'string' ? i18n.global.t(key) : ''
  document.title = title ? `${title} | LUMIÈRE` : 'LUMIÈRE'
}

router.afterEach(updateTitle)
watch(i18n.global.locale, updateTitle)

export default router
