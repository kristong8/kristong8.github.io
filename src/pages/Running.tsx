import { useState, type KeyboardEvent } from 'react'
import { races } from '../content/running'
import { t, useLang } from '../lang'
import { PhotoViewer } from './Pages'

const labels = {
  title: { en: 'Running log', zh: '跑步记录' },
  empty: { en: 'No races added yet.', zh: '暂无赛事记录。' },
  races: { en: 'Races', zh: '选择赛事' },
  pages: { en: 'Race pages', zh: '赛事翻页' },
  previous: { en: 'Previous race', zh: '上一场' },
  next: { en: 'Next race', zh: '下一场' },
  certificate: { en: 'Finisher certificate', zh: '完赛证书' },
  viewPhoto: { en: 'Enlarge race photo', zh: '查看参赛照片' },
  viewCertificate: { en: 'Enlarge certificate', zh: '查看完赛证书' },
  pdf: { en: 'View certificate (PDF) ↗', zh: '查看证书（PDF）↗' },
}

const byDate = [...races].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))

export function Running() {
  const lang = useLang()
  const [at, setAt] = useState(0)
  const [selected, select] = useState<number | null>(null)
  const race = byDate[at]

  if (!race) {
    return <section className="race-gallery" aria-label={t(labels.title, lang)}>
      <div className="sheet race-gallery__frame race-gallery__empty">{t(labels.empty, lang)}</div>
    </section>
  }

  const title = t(race.name, lang)
  const media = (race.photos ?? []).map(({ src, alt }) => ({
    src, caption: t(alt, lang), action: t(labels.viewPhoto, lang), kind: 'photo',
  }))
  if (race.certificate?.kind === 'image') {
    media.push({
      src: race.certificate.src,
      caption: title + ' · ' + t(labels.certificate, lang),
      action: t(labels.viewCertificate, lang),
      kind: 'certificate',
    })
  }
  const dateLabel = race.date && new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeZone: 'UTC' })
    .format(new Date(race.date))

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    const direction = event.key === 'ArrowLeft' ? -1 : 1
    setAt((index) => Math.max(0, Math.min(byDate.length - 1, index + direction)))
  }

  return <>
    <section className="race-gallery" aria-labelledby="running-title" onKeyDown={onKeyDown}>
      <h1 className="sr-only" id="running-title">{t(labels.title, lang)}</h1>
      <nav className="race-gallery__tabs" aria-label={t(labels.races, lang)}>
        {byDate.map(({ name, shortName }, index) => (
          <button key={index} type="button" onClick={() => setAt(index)}
            aria-current={index === at || undefined} aria-controls="race-frame" aria-label={t(name, lang)}>
            {t(shortName ?? name, lang)}
          </button>
        ))}
      </nav>

      <article className="sheet race-gallery__frame" id="race-frame" aria-labelledby="race-title">
        <div className={media.length ? 'race-slide' : 'race-slide race-slide--text'} key={at}>
          <header className="race-slide__copy">
            <h2 id="race-title">{title}</h2>
            {(race.date || race.distance) && (
              <p className="meta race-slide__meta">
                {race.date && <time dateTime={race.date}>{dateLabel}</time>}
                {race.date && race.distance && <span aria-hidden="true"> / </span>}
                {race.distance && <span>{race.distance}</span>}
              </p>
            )}
            {race.certificate?.kind === 'pdf' && (
              <div className="slide__actions">
                <a href={race.certificate.src} target="_blank" rel="noreferrer">{t(labels.pdf, lang)}</a>
              </div>
            )}
          </header>
          {media.length > 0 && (
            <div className="race-slide__media">
              {media.map(({ src, caption, action, kind }, index) => (
                <button key={src} type="button" className="race-slide__image" data-kind={kind} aria-label={action + ' · ' + caption}
                  onClick={() => select(index)}>
                  <img src={src} alt={caption} />
                </button>
              ))}
            </div>
          )}
        </div>
      </article>
      <p className="sr-only" aria-live="polite">{title}</p>

      <nav className="race-gallery__pager" aria-label={t(labels.pages, lang)}>
        <button type="button" className="race-gallery__arrow" aria-label={t(labels.previous, lang)} aria-controls="race-frame"
          disabled={at === 0} onClick={() => setAt(at - 1)}>←</button>
        {byDate.map(({ name }, index) => (
          <button key={index} type="button" className="race-gallery__dot" onClick={() => setAt(index)}
            aria-current={index === at || undefined} aria-controls="race-frame" aria-label={t(name, lang)} />
        ))}
        <button type="button" className="race-gallery__arrow" aria-label={t(labels.next, lang)} aria-controls="race-frame"
          disabled={at === byDate.length - 1} onClick={() => setAt(at + 1)}>→</button>
      </nav>
    </section>
    {selected !== null && <PhotoViewer photos={media} at={selected} setAt={select} />}
  </>
}
