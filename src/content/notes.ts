import { assetUrl } from '../urls'
// The notebook on the About desk. Newest entry is the open page; older
// ones are earlier pages. Paragraphs are separated by a blank line;
// [text](/about/x.jpg) opens that picture over the page, ![alt](/about/x.jpg)
// puts a small round picture in the line, and
// ![alt](/about/x.jpg /about/full/x.jpg) opens the larger one on click.

import type { Text } from '../lang'

export type Note = {
  date: string
  title: Text
  body: Text
}

export const portrait: { src?: string; alt: string } = {
  src: assetUrl('/board/kris-portrait.jpg'),
  alt: 'Kris Tong',
}

export const notes: Note[] = [
  {
    date: '2026-11-18',
    title: { en: 'About me', zh: '关于我' },
    body: {
      en: `Hi, I’m Kris Tong. I’m an undergraduate at Zhejiang University and a visiting student at UC Berkeley for Fall 2026. I’m interested in computer vision, generative models, and computational photography.

I enjoy drawing, photography, and visual design. I like having a way to make things by hand, even if it’s just a quick sketch.

I like to hang out with my friends, travel around, and read books. I’m a big sports fan, and in my free time I like to run, bike, hike, and go to the gym. I’ve run a few half marathons and keep a [race log](/running) with photos from race day!`,
      zh: `Hi，我是童钶槿，我是浙江大学24级本科生，2026年秋季在 UC Berkeley 访问学习。我的兴趣领域聚焦在计算机视觉、生成模型和计算摄影方向！

我喜欢画画、摄影和视觉设计，也喜欢动手做点东西，探索一些奇思妙想。

我喜欢和朋友一起逛街、到处旅行，也喜欢看书。我超级喜欢运动，平时会跑步、骑车、徒步、健身。如果你感兴趣的话，请[点击这里](/running)，来看看我跑过的马拉松！`,
    },
  },
]
