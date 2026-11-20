const base = import.meta.env?.BASE_URL ?? '/'
const hashRoutes = import.meta.env?.VITE_GITHUB_PAGES === 'true' || base !== '/'

export function assetUrl(url: string) {
  return url.startsWith('/') && !url.startsWith('//') ? base + url.slice(1) : url
}

// GitHub Pages serves the project directory but does not rewrite nested
// routes to the app. Keep shareable routes in the hash on that deployment.
export function routeUrl(path: string) {
  return !hashRoutes ? path : base + (path === '/' ? '' : '#' + path)
}

export function currentRoutePath() {
  return !hashRoutes ? location.pathname : location.hash.slice(1) || '/'
}
