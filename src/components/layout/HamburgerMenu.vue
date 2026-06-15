<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { navItems } from '@/constants/navigations'
const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
  document.body.style.overflow = isOpen.value ? 'hidden' : ''
}

function closeMenu() {
  isOpen.value = false
  document.body.style.overflow = ''
}

function handleKeydown(e) {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>
<template>
  <div class="hamburger-wrapper">
    <!-- 觸發按鈕 -->
    <button
      @click="toggleMenu"
      class="hamburger-btn"
      :class="{ 'is-open': isOpen }"
      :aria-expanded="isOpen"
      aria-label="Toggle navigation menu"
    >
      <span class="bar bar-top"></span>
      <span class="bar bar-mid"></span>
      <span class="bar bar-bot"></span>
    </button>

    <!-- 全螢幕選單遮罩 -->
    <Teleport to="body">
      <Transition name="overlay">
        <div v-if="isOpen" class="menu-overlay" @click.self="closeMenu">
          <!-- 左側裝飾線 -->
          <div class="deco-line"></div>

          <!-- 選單內容 -->
          <nav class="menu-nav">
            <RouterLink
              aria-label="回首頁"
              :to="{ name: 'home' }"
              @click="closeMenu"
              class="inline-flex flex-col font-serif self-start text-center text-gold-500 mt-12 menu-logo-animation"
            >
              <span class="text-[28px] tracking-[0.1em]">LUMIÈRE</span>
              <span class="text-[9px] tracking-[0.2em]">JEWELRY GALLERY</span>
            </RouterLink>

            <!-- 主要連結 -->
            <ul class="menu-links">
              <li
                v-for="(item, index) in navItems"
                :key="item.name"
                class="menu-item"
                :style="{ '--delay': `${0.1 + index * 0.07}s` }"
              >
                <RouterLink :to="item.to" class="menu-link" @click="closeMenu">
                  <span class="item-number">0{{ index + 1 }}</span>
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-arrow">→</span>
                </RouterLink>
              </li>
            </ul>

            <!-- 底部資訊 -->
            <div class="menu-footer">
              <div class="footer-divider"></div>

              <BaseButton
                variant="ghost"
                tag="RouterLink"
                to="/login"
                @click="closeMenu"
                class="header-icon inline-flex normal-case"
                aria-label="會員"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span>Member</span>
              </BaseButton>

              <p class="footer-copy">© 2026 Lumière Jewelry Gallery. All Rights Reserved.</p>
            </div>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* ── 漢堡按鈕 ── */
.hamburger-btn {
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
  position: relative;
  z-index: var(--z-toast);
}

.bar {
  display: block;
  height: 1px;
  background: var(--color-gold-50);
  transition: all 0.45s var(--ease-luxury);
  transform-origin: right center;
}

.bar-top {
  width: 28px;
}
.bar-mid {
  width: 20px;
}
.bar-bot {
  width: 24px;
}

/* 開啟時 X 形態 */
.hamburger-btn.is-open .bar-top {
  width: 26px;
  transform: rotate(-45deg) translateY(-6px);
}
.hamburger-btn.is-open .bar-mid {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger-btn.is-open .bar-bot {
  width: 24px;
  transform: rotate(45deg) translateY(6px);
}

.hamburger-btn:hover .bar-top {
  width: 28px;
}
.hamburger-btn:hover .bar-mid {
  width: 28px;
}
.hamburger-btn:hover .bar-bot {
  width: 28px;
}

/* ── 全螢幕遮罩 ── */
.menu-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-black);
  z-index: var(--z-modal);
  display: flex;
  align-items: stretch;
  overflow: hidden;
}

/* ── 裝飾線 ── */
.deco-line {
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--color-gold-400) 30%,
    var(--color-gold-400) 70%,
    transparent 100%
  );
  margin: 0 60px;
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
.menu-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 60px 80px 60px 0;
  max-width: 560px;
}

/* ── Logo ── */
.menu-logo-animation {
  animation: fadeUp 0.6s 0.05s var(--ease-luxury) both;
}

/* ── 連結清單 ── */
.menu-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  animation: fadeUp 0.6s var(--delay, 0.1s) var(--ease-luxury) both;
  border-bottom: 1px solid rgba(214, 180, 106, 0.102);
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  text-decoration: none;
  color: var(--color-cream);
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
}

.menu-link::before {
  content: '';
  position: absolute;
  left: -100%;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(214, 180, 106, 0.05), transparent);
  transition: left 0.5s ease;
}

.menu-link:hover::before {
  left: 100%;
}

.menu-link:hover {
  color: var(--color-gold-500);
}
.menu-link:active {
  color: var(--color-gold-500);
  transform: translateX(4px);
}
.item-number {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--color-gold-500);
  opacity: 0.6;
  width: 24px;
  flex-shrink: 0;
}

.item-name {
  font-family: var(--font-serif);
  font-size: 36px;
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1;
  flex: 1;
  transition: transform 0.3s var(--ease-luxury);
}

.menu-link:hover .item-name {
  transform: translateX(8px);
}

.item-arrow {
  font-size: 18px;
  color: var(--color-gold-500);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s var(--ease-luxury);
}

.menu-link:hover .item-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ── Footer ── */
.menu-footer {
  animation: fadeUp 0.6s 0.55s var(--ease-luxury) both;
}

.footer-divider {
  width: 40px;
  height: 1px;
  background: var(--color-gold-500);
  margin-bottom: 20px;
  opacity: 0.5;
}

.footer-copy {
  font-family: var(--font-sans);
  font-size: 11px;
  color: var(--color-gray-muted);
  letter-spacing: 0.05em;
  margin-top: 12px;
  opacity: 0.5;
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

/* ── RWD ── */
@media (max-width: 640px) {
  .deco-line {
    margin: 0 24px;
  }

  .menu-nav {
    padding: 40px 32px 40px 0;
  }

  .item-name {
    font-size: 28px;
  }

  .menu-link {
    padding: 16px 0;
  }
}
</style>
