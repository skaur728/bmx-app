import axios from 'axios'
import { useMemo } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import useAuth from './useAuth'

import type { AxiosError } from 'axios'

const fetcher = (url: string, year: string) =>
  axios.get(url, { params: { year } }).then((res) => res.data)

const useApplication = () => {
  const { mutate } = useSWRConfig()

  const { user, status, error } = useAuth()

  const {
    data,
    error: applicationError,
    isValidating,
  } = useSWR<{ applications: Record<string, IApplication> }, AxiosError>(
    () => (user ? [`/api/application`, '2023'] : null),
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const applications = useMemo(() => data?.applications || {}, [data])
  const loading = useMemo(
    () => isValidating || status !== 'authenticated',
    [isValidating, status]
  )

  const revalidate = () => mutate([`/api/application`, '2023'])

  return {
    user,
    applications,
    loading,
    error: applicationError || error,
    revalidate,
  }
}

export default useApplication
