import { assetUrl } from '../urls'
// Photos pinned on the About corkboard: two rows of three. Put image files in
// public/board/: `src` is the print on the board, `full` optionally supplies
// a different file for the image viewer.
// For artwork, set `fit: 'contain'` to keep the whole composition on the print.
// A short caption is written under the photo. Without `src` the slot shows a
// placeholder print.

export type Photo = { src?: string; full?: string; caption?: string; fit?: 'contain' }

export const photos: Photo[] = [
  { src: assetUrl('/board/sketchbook-spread.webp'), caption: 'Sketchbook spread', fit: 'contain' },
  { src: assetUrl('/board/comic-panels.webp'), caption: 'Black-and-white comic panels', fit: 'contain' },
  { src: assetUrl('/board/spider-verse-collage.webp'), caption: 'Spider-Verse collage', fit: 'contain' },
  { src: assetUrl('/board/coffee-shop-sketch.webp'), caption: 'Coffee shop sketch', fit: 'contain' },
  { src: assetUrl('/board/basketball-panels.webp'), caption: 'Basketball comic panels', fit: 'contain' },
  { src: assetUrl('/board/landscape-drawing.webp'), caption: 'Landscape drawing', fit: 'contain' },
]
