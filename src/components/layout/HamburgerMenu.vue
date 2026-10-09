<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { navItems } from '@/constants/navigations'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRoute, useRouter } from 'vue-router'
import { useScrollDirection } from '@/composables/useScrollDirection'
import AppLogo from './AppLogo.vue'
import LangSwitch from '@/components/ui/LangSwitch.vue'
import MenuLink from './menu/MenuLink.vue'
import UserActionButton from './menu/UserActionButton.vue'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { isHeaderVisible } = useScrollDirection()
const isOpen = ref(false)
const isActive = (matchNames: string[]) => matchNames.includes(String(route.name))

function toggleMenu() {
  isOpen.value = !isOpen.value
  document.body.style.overflow = isOpen.value ? 'hidden' : ''
}

function closeMenu() {
  isOpen.value = false
  document.body.style.overflow = ''
}
// KeyboardEvent是內建的型別
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMenu()
}

function goToLogin() {
  closeMenu()
  router.push({ name: 'login' })
}

async function handleLogout() {
  await authStore.logout()
  closeMenu()
  router.push('/')
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>
<template>
  <div class="hamburger tablet:hidden">
    <!-- 全螢幕選單遮罩 -->
    <Teleport to="body">
      <!-- 觸發按鈕 -->
      <button
        @click="toggleMenu"
        class="hamburger__btn"
        :class="{ 'is-open': isOpen, 'hamburger__btn--hidden': !isHeaderVisible && !isOpen }"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation menu"
      >
        <span class="hamburger__bar hamburger__bar--top"></span>
        <span class="hamburger__bar hamburger__bar--mid"></span>
        <span class="hamburger__bar hamburger__bar--bot"></span>
      </button>
      <Transition name="overlay">
        <div v-if="isOpen" class="menu__overlay" @click.self="closeMenu">
          <!-- 左側裝飾線 -->
          <div class="menu__deco-line"></div>

          <!-- 選單內容 -->
          <nav class="menu__nav">
            <RouterLink
              aria-label="回首頁"
              :to="{ name: 'home' }"
              @click="closeMenu"
              class="inline-flex flex-col font-serif self-start text-center text-gold-500 mt-12 menu__logo"
            >
              <AppLogo />
            </RouterLink>

            <!-- 主要連結 -->
            <ul class="menu__links">
              <li
                v-for="(item, index) in navItems"
                v-fade-in="{ delay: 100 + index * 70, y: 24, duration: 600 }"
                :key="item.name"
                class="menu__item"
              >
                <MenuLink
                  :to="item.to"
                  :index="index"
                  :label="t(item.labelKey)"
                  :active="isActive(item.matchNames)"
                  @navigate="closeMenu"
                />
              </li>
            </ul>

            <!-- 底部資訊 -->
            <div v-fade-in="{ delay: 600, y: 24, duration: 600 }" class="menu__footer">
              <LangSwitch variant="mobile" class="mb-2" />
              <UserActionButton
                v-if="authStore.user"
                :label="`${authStore.displayName}/${t('common.signOut')}`"
                @click="handleLogout"
              />
              <UserActionButton v-else :label="t('common.signIn')" @click="goToLogin" />
            </div>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.hamburger__btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: var(--z-index-modal);
  position: fixed;
  top: 24px;
  left: 24px;
  transition: transform 0.3s ease;
  transform: translateY(0); /* 顯示狀態：在原本位置 */
}
.hamburger__btn--hidden {
  transform: translateY(-80px);

  pointer-events: none;
}
@media (min-width: 768px) {
  .hamburger__btn {
    display: none;
  }
}
.hamburger__bar {
  display: block;
  height: 1px;
  background: var(--color-gold-50);
  transition: all 0.45s var(--ease-luxury);
  transform-origin: right center;
}

.hamburger__bar--top {
  width: 28px;
}
.hamburger__bar--mid {
  width: 20px;
}
.hamburger__bar--bot {
  width: 24px;
}

.hamburger__btn.is-open .hamburger__bar--top {
  width: 26px;
  transform: rotate(-45deg) translateY(-6px);
}
.hamburger__btn.is-open .hamburger__bar--mid {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger__btn.is-open .hamburger__bar--bot {
  width: 24px;
  transform: rotate(45deg) translateY(6px);
}

.hamburger__btn:hover .hamburger__bar--top {
  width: 28px;
}
.hamburger__btn:hover .hamburger__bar--mid {
  width: 28px;
}
.hamburger__btn:hover .hamburger__bar--bot {
  width: 28px;
}

/* ── 全螢幕遮罩 ── */
.menu__overlay {
  position: fixed;
  inset: 0;
  background: var(--color-black);
  z-index: var(--z-index-overlay);
  display: flex;
  align-items: stretch;
  overflow: hidden;
}

/* ── 裝飾線 ── */
.menu__deco-line {
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--color-gold-400) 30%,
    var(--color-gold-400) 70%,
    transparent 100%
  );
  margin: 0 24px;
  opacity: 0.4;
  animation: lineReveal 0.8s var(--ease-luxury) forwards;
}

@keyframes lineReveal {
  from {
    transform: scaleY(0);
    opacity: 0;
  }
  to {
    transform: scaleY(1);
    opacity: 0.4;
  }
}

/* ── 選單 Nav ── */
.menu__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 40px 32px 40px 0;
  max-width: 560px;
}

/* ── Logo ── */
.menu__logo {
  animation: fadeUp 0.6s 0.05s var(--ease-luxury) both;
}

/* ── 連結清單(連結本身的樣式在 menu/MenuLink.vue) ── */
.menu__links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu__item {
  border-bottom: 1px solid rgba(214, 180, 106, 0.102);
}

/* ── 進場動畫 ── */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Vue Transition ── */
.overlay-enter-active {
  animation: overlayIn 0.6s var(--ease-luxury) forwards;
}
.overlay-leave-active {
  animation: overlayOut 0.45s var(--ease-luxury) forwards;
}

@keyframes overlayIn {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0% 0 0);
  }
}

@keyframes overlayOut {
  from {
    clip-path: inset(0 0% 0 0);
    opacity: 1;
  }
  to {
    clip-path: inset(0 0 0 100%);
    opacity: 0;
  }
}
</style>
