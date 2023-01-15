import axios from 'axios'
import { useMemo } from 'react'
import useSWR, { mutate, useSWRConfig } from 'swr'

import type { AxiosError } from 'axios'

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    return res.data
  })

const useAnnouncement = () => {
  const { mutate } = useSWRConfig()

  const {
    data,
    error: applicationError,
    isValidating,
  } = useSWR<{ announcements: Array<IAnnouncement> }, AxiosError>(
    `/api/slack`,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 1000 * 30,
    }
  )

  const announcements = useMemo(() => data?.announcements || [], [data])
  const loading = useMemo(() => isValidating, [isValidating])

  const revalidate = () => mutate(`/api/slack`)

  return {
    announcements,
    loading,
    error: applicationError,
    revalidate,
  }
}

export default useAnnouncement
