const images: Record<string, string> = import.meta.glob('/src/assets/images/**/*.webp', {
  eager: true,
  import: 'default',
})

export default function getImageUrl(imgName: string): string {
  const path = `/src/assets/images/${imgName}`
  const mod = images[path]

  if (!mod) {
    return ''
  }

  return mod
}
