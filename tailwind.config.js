/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // screens 放在 theme 根層才能覆蓋預設值
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    screens: {
      // 品牌化命名，語意更清晰
      mobile: '390px', // iPhone 14 基準
      tablet: '768px', // iPad
      laptop: '1024px', // 小筆電
      desktop: '1280px', // 主要桌機
      wide: '1536px', // 超寬螢幕（選用）
    },

    extend: {
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🎨 色彩系統
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      colors: {
        gold: {
          50: '#fffaf0',
          100: '#f8ebc8',
          200: '#f1d999',
          300: '#e8c46f',
          400: '#D6B46A',
          500: '#c9a04d',
          600: '#a98335',
          700: '#866626',
          800: '#5e4819',
          900: '#3a2c0f',
        },
        black: {
          DEFAULT: '#080808',
          soft: '#121212',
        },
        cream: {
          DEFAULT: '#F8F5EF',
        },
        gray: {
          muted: '#A7A7A7',
        },
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🔤 字型
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      fontFamily: {
        serif: ['"Playfair Display"', '"Noto Serif TC"', 'serif'], //標題
        sans: ['Inter', '"Noto Sans TC"', 'sans-serif'], //內文
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 📐 字體大小
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      fontSize: {
        display: ['3.5rem', { lineHeight: '1.1', letterSpacing: '0.04em' }], // 56px
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '0.03em' }], // 36px
        heading: ['2rem', { lineHeight: '1.25', letterSpacing: '0.02em' }], // 32px
        'heading-sm': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0.01em' }], // 24px
        subhead: ['1.25rem', { lineHeight: '1.4' }], // 20px
        'subhead-sm': ['1.125rem', { lineHeight: '1.4' }], // 18px
        label: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.14em' }], // 12px
        'label-lg': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.12em' }], // 14px
        body: ['1rem', { lineHeight: '1.75' }], // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.65' }], // 14px
        price: ['1.375rem', { lineHeight: '1.2', letterSpacing: '0.02em' }], // 22px
        'price-sm': ['1.125rem', { lineHeight: '1.2', letterSpacing: '0.01em' }], // 18px
        btn: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.12em' }], // 13px
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 📏 字距
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      letterSpacing: {
        display: '0.15em',
        luxury: '0.25em',
        button: '0.12em',
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 📦 間距
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      spacing: {
        128: '32rem',
        144: '36rem',
        4.5: '1.125rem',
        13: '3.25rem',
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        38: '9.5rem',
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 📐 最大寬度
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      maxWidth: {
        container: '1280px',
        content: '720px',
        card: '360px',
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🆕 Container Padding 系統
      // 統一全站左右 padding，手機到桌機
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      padding: {
        'page-x-mobile': '1rem', // 16px  手機頁面左右
        'page-x-tablet': '2.5rem', // 40px  平板
        'page-x-laptop': '4rem', // 64px  小筆電
        'page-x-desktop': '6rem', // 96px  桌機
        'section-y-sm': '4rem', // 64px  Section 上下（手機）
        'section-y-lg': '8rem', // 128px Section 上下（桌機）
        'card-inner': '1.25rem', // 20px  卡片內距
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 📷 元件尺寸
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      height: {
        'hero-sm': '480px',
        'hero-md': '560px',
        'hero-lg': '700px',
        'card-img-sm': '220px',
        'card-img-md': '300px',
        'card-img-lg': '380px',
        'nav-sm': '56px',
        'nav-lg': '72px',
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🆕 Z-Index 系統
      // 命名清楚，避免寫 z-[99] 這種魔法數字
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      zIndex: {
        base: '0',
        card: '10', // 商品卡 hover 效果
        dropdown: '20', // 下拉選單
        sticky: '30', // 置頂元素（如篩選欄）
        navbar: '40', // 導覽列
        overlay: '50', // 背景遮罩
        modal: '60', // Modal 視窗
        toast: '70', // 通知提示
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🆕 Background Image
      // 品牌常用的漸層與紋理
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      backgroundImage: {
        // 金色光澤漸層（按鈕、標題裝飾）
        'gold-sheen': 'linear-gradient(135deg, #e8c46f 0%, #D6B46A 40%, #a98335 100%)',

        // 深色頁面底部漸層（Hero 遮罩）
        'hero-fade':
          'linear-gradient(to bottom, rgba(8,8,8,0) 0%, rgba(8,8,8,0.6) 60%, rgba(8,8,8,0.95) 100%)',

        // 卡片 hover 時的底部文字遮罩
        'card-fade': 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0) 60%)',

        // 分隔區塊用的橫向金色細線漸層
        'gold-line': 'linear-gradient(to right, transparent, #D6B46A, transparent)',

        // 頁面整體質感底色（非純黑，有微妙紋理感）
        'page-texture': 'linear-gradient(160deg, #0f0f0f 0%, #080808 50%, #0a0905 100%)',
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // ✨ 動畫
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'in-out-soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🌫 陰影
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      boxShadow: {
        'gold-glow': '0 0 24px rgba(198, 160, 77, 0.25)',
        card: '0 8px 40px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 16px 56px rgba(0, 0, 0, 0.18)',
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🔘 圓角
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      borderRadius: {
        card: '2px',
      },
    },
  },
  plugins: [],
}
