import { useEffect, useState } from 'react'

import HorizontalScroller from './HorizontalScroller'

type Props = {
  children: React.ReactNode
}

const HorizontalScrollerWrapper = ({ children }: Props) => {
  const [showChild, setShowChild] = useState(false)

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null
  }

  return <HorizontalScroller>{children}</HorizontalScroller>
}

export default HorizontalScrollerWrapper
