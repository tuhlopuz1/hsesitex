import { createBrowserRouter } from 'react-router'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { AppShell } from '@/widgets/app-shell'
import { lazyPage as page } from './lazyPage'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: page(() => import('@/pages/login'), 'LoginPage') },
      { path: 'auth/callback', element: page(() => import('@/pages/auth-callback'), 'AuthCallbackPage') },
      { path: 'schedule', element: page(() => import('@/pages/schedule'), 'SchedulePage') },
      { path: 'grades', element: page(() => import('@/pages/grades'), 'GradesPage') },
      { path: 'deadlines', element: page(() => import('@/pages/deadlines'), 'DeadlinesPage') },
      { path: 'rooms', element: page(() => import('@/pages/rooms'), 'RoomsPage') },
      { path: 'people', element: page(() => import('@/pages/people'), 'PeoplePage') },
      { path: 'people/:email', element: page(() => import('@/pages/person'), 'PersonPage') },
      { path: 'food', element: page(() => import('@/pages/food'), 'FoodPage') },
      { path: 'food/:cafeId', element: page(() => import('@/pages/food'), 'CafePage') },
      { path: 'library', element: page(() => import('@/pages/library'), 'LibraryPage') },
      { path: 'notifications', element: page(() => import('@/pages/notifications'), 'NotificationsPage') },
      { path: 'navigation', element: page(() => import('@/pages/navigation'), 'NavigationPage') },
      { path: 'profile', element: page(() => import('@/pages/profile'), 'ProfilePage') },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
], { basename: import.meta.env.BASE_URL })
