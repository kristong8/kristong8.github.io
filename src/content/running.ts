import { assetUrl } from '../urls'
import type { Text } from '../lang'

export type Race = {
  name: Text
  shortName?: Text
  date?: string // YYYY-MM-DD, used for ordering when known
  distance?: string
  chipTime?: string // Official net time, HH:MM:SS
  photos?: { src: string; alt: Text }[]
  certificate?: { src: string; kind: 'image' | 'pdf' }
  resultUrl?: string
}

export const races: Race[] = [
  {
    name: { en: '2026 Berkeley Half Marathon', zh: '2026 伯克利半程马拉松' },
    shortName: { en: 'Berkeley Half’26', zh: '伯克利半马’26' },
    date: '2026-11-15',
    distance: '21.0975 km',
    photos: [
      {
        src: assetUrl('/running-media/2026-berkeley-half-marathon-photo.jpg'),
        alt: { en: 'Kris holding her Berkeley Half Marathon medal', zh: 'Kris 手拿伯克利半马奖牌' },
      },
      {
        src: assetUrl('/running-media/2026-berkeley-half-marathon-photo-02.jpg'),
        alt: { en: 'Friends holding a cheering poster at the Berkeley Half Marathon', zh: '伯克利半马结束后和朋友一起举着加油海报' },
      },
    ],
    certificate: { src: assetUrl('/running-media/2026-berkeley-half-marathon-certificate.png'), kind: 'image' },
  },
  {
    name: { en: '2025 Zhejiang University New Year’s Campus Run', zh: '2025 中国青年跑浙江大学站暨浙江大学校园迎新跑' },
    shortName: { en: 'ZJU New Year Run’25', zh: '浙大迎新跑’25' },
    date: '2025-12-31',
    distance: '21.0975 km',
    photos: [{
      src: assetUrl('/running-media/2025-zju-new-year-campus-run-photo.jpg'),
      alt: { en: 'Finisher medal from the Zhejiang University New Year’s Campus Run', zh: '浙江大学校园迎新跑完赛奖牌' },
    }],
    certificate: { src: assetUrl('/running-media/2025-zju-new-year-campus-run-certificate.jpg'), kind: 'image' },
  },
  {
    name: { en: '2025 Fenghua Half Marathon', zh: '2025 奉化马拉松（半程）' },
    shortName: { en: 'Fenghua’25', zh: '奉化’25' },
    date: '2025-03-22',
    distance: '21.0975 km',
    photos: [
      {
        src: assetUrl('/running-media/2025-fenghua-half-marathon-photo.jpg'),
        alt: { en: 'Group photo at the 2025 Fenghua Marathon', zh: '2025 奉化半马参赛合照' },
      },
      {
        src: assetUrl('/running-media/2025-fenghua-half-marathon-photo-02.jpg'),
        alt: { en: 'Kris on the 2025 Fenghua Marathon course', zh: 'Kris 在 2025 奉化半马赛道上' },
      },
    ],
    certificate: { src: assetUrl('/running-media/2025-fenghua-half-marathon-certificate.png'), kind: 'image' },
  },
  {
    name: { en: '2024 Zhejiang University Campus Half Marathon', zh: '2024 浙江大学第七届校园半程马拉松' },
    shortName: { en: 'ZJU Campus Half’24', zh: '浙大校园半马’24' },
    date: '2024-12-31',
    distance: '21.0975 km',
    photos: [{
      src: assetUrl('/running-media/2024-zju-campus-half-marathon-photo.jpg'),
      alt: { en: 'Kris running the Zhejiang University Campus Half Marathon', zh: 'Kris 在浙江大学校园半马赛道上' },
    }],
    certificate: { src: assetUrl('/running-media/2024-zju-campus-half-marathon-certificate.png'), kind: 'image' },
  },
  {
    name: { en: '2024 Hangzhou Women’s Half Marathon', zh: '2024 杭州女子半程马拉松' },
    shortName: { en: 'Hangzhou Women’s Half’24', zh: '杭州女子半马’24' },
    date: '2024-12-01',
    distance: '21.0975 km',
    photos: [
      {
        src: assetUrl('/running-media/2024-hangzhou-womens-half-marathon-photo.jpg'),
        alt: { en: 'Kris in front of the Hangzhou Women’s Half Marathon backdrop', zh: 'Kris 在杭州女子半马赛事背景板前' },
      },
      {
        src: assetUrl('/running-media/2024-hangzhou-womens-half-marathon-photo-02.jpg'),
        alt: { en: 'Zhejiang University runners at the Hangzhou Women’s Half Marathon', zh: '浙大跑友在杭州女子半马现场的合照' },
      },
      {
        src: assetUrl('/running-media/2024-hangzhou-womens-half-marathon-photo-03.jpg'),
        alt: { en: 'Kris wearing her medal after the Hangzhou Women’s Half Marathon', zh: 'Kris 戴着杭州女子半马奖牌' },
      },
    ],
    certificate: { src: assetUrl('/running-media/2024-hangzhou-womens-half-marathon-certificate.png'), kind: 'image' },
  },
  {
    name: { en: '2024 Fenghua Marathon', zh: '2024 奉化马拉松' },
    shortName: { en: 'Fenghua’24', zh: '奉化’24' },
    date: '2024-03-24',
    photos: [
      {
        src: assetUrl('/running-media/2024-fenghua-marathon-photo-01.jpg'),
        alt: { en: 'Kris running at the 2024 Fenghua Marathon', zh: 'Kris 在 2024 奉化马拉松赛道上' },
      },
      {
        src: assetUrl('/running-media/2024-fenghua-marathon-photo-02.jpg'),
        alt: { en: 'Group photo at the 2024 Fenghua Marathon', zh: '2024 奉化马拉松参赛合照' },
      },
    ],
  },
]
