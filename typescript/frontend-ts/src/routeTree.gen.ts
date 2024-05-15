/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TeamsImport } from './routes/teams'
import { Route as SeasonsImport } from './routes/seasons'
import { Route as SearchImport } from './routes/search'
import { Route as MaratonImport } from './routes/maraton'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as TeamsCompareImport } from './routes/teams_.compare'
import { Route as TeamsLinkNameImport } from './routes/teams.$linkName'
import { Route as SeasonSeasonIdImport } from './routes/season.$seasonId'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const TeamsRoute = TeamsImport.update({
  path: '/teams',
  getParentRoute: () => rootRoute,
} as any)

const SeasonsRoute = SeasonsImport.update({
  path: '/seasons',
  getParentRoute: () => rootRoute,
} as any)

const SearchRoute = SearchImport.update({
  path: '/search',
  getParentRoute: () => rootRoute,
} as any)

const MaratonRoute = MaratonImport.update({
  path: '/maraton',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TeamsCompareRoute = TeamsCompareImport.update({
  path: '/teams/compare',
  getParentRoute: () => rootRoute,
} as any)

const TeamsLinkNameRoute = TeamsLinkNameImport.update({
  path: '/$linkName',
  getParentRoute: () => TeamsRoute,
} as any)

const SeasonSeasonIdRoute = SeasonSeasonIdImport.update({
  path: '/season/$seasonId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/maraton': {
      id: '/maraton'
      path: '/maraton'
      fullPath: '/maraton'
      preLoaderRoute: typeof MaratonImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchImport
      parentRoute: typeof rootRoute
    }
    '/seasons': {
      id: '/seasons'
      path: '/seasons'
      fullPath: '/seasons'
      preLoaderRoute: typeof SeasonsImport
      parentRoute: typeof rootRoute
    }
    '/teams': {
      id: '/teams'
      path: '/teams'
      fullPath: '/teams'
      preLoaderRoute: typeof TeamsImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/season/$seasonId': {
      id: '/season/$seasonId'
      path: '/season/$seasonId'
      fullPath: '/season/$seasonId'
      preLoaderRoute: typeof SeasonSeasonIdImport
      parentRoute: typeof rootRoute
    }
    '/teams/$linkName': {
      id: '/teams/$linkName'
      path: '/$linkName'
      fullPath: '/teams/$linkName'
      preLoaderRoute: typeof TeamsLinkNameImport
      parentRoute: typeof TeamsImport
    }
    '/teams/compare': {
      id: '/teams/compare'
      path: '/teams/compare'
      fullPath: '/teams/compare'
      preLoaderRoute: typeof TeamsCompareImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  DashboardRoute,
  MaratonRoute,
  SearchRoute,
  SeasonsRoute,
  TeamsRoute: TeamsRoute.addChildren({ TeamsLinkNameRoute }),
  AboutLazyRoute,
  SeasonSeasonIdRoute,
  TeamsCompareRoute,
})

/* prettier-ignore-end */
