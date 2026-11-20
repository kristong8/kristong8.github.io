import type { Text } from '../lang'

export const site: { name: Text; greeting: Text; caption: Text; place: Text; email: string; links: { label: Text; href: Text }[] } = {
  name: { en: 'Kris Tong', zh: '童钶槿' },
  greeting: { en: "Hello, I'm", zh: 'Hello，我是' },
  caption: { en: 'Computer vision, graphics & creative tools', zh: '计算机视觉、图形学与创意工具' },
  place: { en: 'Berkeley · 2026', zh: '伯克利 · 2026' },
  email: 'kkristong@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kris-tong-507638443/' },
    { label: { en: 'CV', zh: '简历' }, href: { en: '/documents/cv.html', zh: '/documents/cv.html?lang=zh' } },
  ],
}
