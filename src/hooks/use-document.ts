import { useState } from 'react'
import { firestore } from '../firebase'

type ReturnType<T> = {
  data: T | undefined
  loading: boolean
  error: boolean | string
  get: (id: string) => Promise<void>
  add: (values: Omit<T, 'id'>) => Promise<void>
  update: (id: string, newValues: Omit<T, 'id'>) => Promise<void>
  remove: (id: string) => Promise<void>
}

export const useDocument = <T extends { id: string }>(
  collection: string
): ReturnType<T> => {
  const [data, setData] = useState<T | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean | string>(false)

  const get = async (id: string): Promise<void> => {
    setLoading(true)

    try {
      const doc = await firestore.collection(collection).doc(id).get()

      setData({ ...doc.data(), id: doc.id } as T)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const add = async (values: Omit<T, 'id'>): Promise<void> => {
    setLoading(true)

    try {
      await firestore.collection(collection).add(values)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: string, newValues: Omit<T, 'id'>): Promise<void> => {
    setLoading(true)

    try {
      await firestore.collection(collection).doc(id).update(newValues)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string): Promise<void> => {
    setLoading(true)

    try {
      await firestore.collection(collection).doc(id).delete()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, get, add, update, remove }
}
