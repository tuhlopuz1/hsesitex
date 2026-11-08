import { lazy, Suspense, type ComponentType } from 'react'
import { Spinner } from '@/shared/ui'

/** Code-splits a page that its slice exports by name. */
export function lazyPage<K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) {
  const Component = lazy<ComponentType>(() => load().then((m) => ({ default: m[name] })))
  return (
    <Suspense fallback={<Spinner />}>
      <Component />
    </Suspense>
  )
}
