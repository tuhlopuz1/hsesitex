import { useQuery } from '@tanstack/react-query'
import { request, type CursorList } from '@/shared/api'
import type { LibraryBook, LibraryNews, LibraryUser } from '../model/types'

export const libraryKeys = {
  user: ['library', 'user'] as const,
  books: ['library', 'books'] as const,
  history: ['library', 'history'] as const,
  news: ['library', 'news'] as const,
}

export function useLibraryUser() {
  return useQuery({
    queryKey: libraryKeys.user,
    queryFn: ({ signal }) => request<LibraryUser>('library/users/me', { prefix: 'v3', signal }),
  })
}

export function useLibraryBooks() {
  return useQuery({
    queryKey: libraryKeys.books,
    queryFn: ({ signal }) => request<LibraryBook[]>('library/users/literature', { prefix: 'v3', signal }),
  })
}

export function useLibraryHistory() {
  return useQuery({
    queryKey: libraryKeys.history,
    queryFn: ({ signal }) => request<LibraryBook[]>('library/users/literature/history', { prefix: 'v3', signal }),
  })
}

export function useLibraryNews() {
  return useQuery({
    queryKey: libraryKeys.news,
    queryFn: ({ signal }) => request<CursorList<LibraryNews>>('library/news', { prefix: 'v3', signal }),
    select: (data) => data.items ?? [],
  })
}
