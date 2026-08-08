const images = import.meta.glob('/src/assets/images/**/*.webp', {
  eager: true,
  import: 'default',
})

export default function getImageUrl(imgName) {
  const path = `/src/assets/images/${imgName}`
  const mod = images[path]
  if (!mod) {
    console.error('找不到圖片:', path)
    return ''
  }
  return mod
}
