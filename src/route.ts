import { useEffect, useState } from 'react'
import type { Text } from './lang'
import { currentRoutePath, routeUrl } from './urls'

// Each page has a camera shot of the same scene, so routing is just
// "which shot", kept in the URL so every page can be linked to.
export type Route = 'landing' | 'projects' | 'experience' | 'about' | 'running'

const PATHS: Record<Route, string> = {
  landing: '/',
  projects: '/projects',
  experience: '/experience',
  about: '/about',
  running: '/running',
}

// what the nav and the tags on the set call each page
export const LABELS: Record<Exclude<Route, 'landing'>, Text> = {
  projects: { en: 'Projects', zh: '项目' },
  experience: { en: 'Experience', zh: '经历' },
  about: { en: 'About', zh: '关于我' },
  running: { en: 'Sports', zh: '运动' },
}

// /projects/<id> is the projects shot, opened on that project's tray
function fromPath(path: string): Route {
  const clean = '/' + (path.split('/')[1] ?? '')
  return (Object.keys(PATHS) as Route[]).find((r) => PATHS[r] === clean) ?? 'landing'
}

export function pathOf(route: Route) {
  return routeUrl(PATHS[route])
}

// An in-page link to another shot: push the path and let useRoute pick it up.
export function follow(e: { preventDefault(): void }, path: string) {
  e.preventDefault()
  history.pushState(null, '', routeUrl(path))
  dispatchEvent(new PopStateEvent('popstate'))
}

export function useRoute() {
  const [path, setPath] = useState(currentRoutePath)
  const route = fromPath(path)

  useEffect(() => {
    const onPop = () => setPath(currentRoutePath())
    addEventListener('popstate', onPop)
    return () => removeEventListener('popstate', onPop)
  }, [])

  const go = (next: Route) => {
    if (next === route) return
    history.pushState(null, '', pathOf(next))
    setPath(PATHS[next])
  }

  return [route, go, path] as const
}
