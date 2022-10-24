import { Box } from '@mui/material'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useUserAgent } from 'next-useragent'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

import type { NextPageContext } from 'next'

type Props = {
  children: React.ReactNode
  uaString?: string
}

const HorizontalScroller = ({ children, uaString }: Props) => {
  const ua = useUserAgent(uaString || window.navigator.userAgent)

  const scrollRef = useRef<HTMLElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)

  const [scrollRange, setScrollRange] = useState(0)
  const [viewportW, setViewportW] = useState(0)

  useLayoutEffect(() => {
    if (scrollRef.current) setScrollRange(scrollRef.current.scrollWidth)
  }, [scrollRef])

  const onResize = useCallback((entries: ResizeObserverEntry[]) => {
    entries.forEach((entry) => {
      setScrollRange(entry.contentRect.width)
    })

    setViewportW(document.documentElement.clientWidth)
  }, [])

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries))
    if (scrollRef.current) resizeObserver.observe(scrollRef.current)
    return () => resizeObserver.disconnect()
  }, [onResize])

  const { scrollYProgress, scrollXProgress } = useScroll()
  const transform = useTransform(
    ua.isMobile ? scrollXProgress : scrollYProgress,
    [0, 1],
    [0, -scrollRange + viewportW]
  )

  const physics = ua.isMobile
    ? { damping: 15, mass: 0.3, stiffness: 60 }
    : { damping: 15, mass: 0.5, stiffness: 50 }

  const spring = useSpring(transform, physics)

  // const onScrollTo = (elem: HTMLElement) => {
  //   window.scrollTo(0, elem.getBoundingClientRect().left + window.scrollY - 10)
  // }

  return (
    <>
      <Box
        sx={{ position: 'fixed', willChange: 'transform', left: 0, right: 0 }}
      >
        <motion.section
          ref={scrollRef}
          style={{
            x: spring,
            width: 'max-content',
            height: '100vh',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              '& > *:not(:first-of-type)': { marginLeft: '-1px' },
            }}
          >
            {children}
          </Box>
        </motion.section>
      </Box>
      <Box
        ref={ghostRef}
        sx={{
          height: ua.isMobile ? '10px' : scrollRange,
          width: ua.isMobile ? scrollRange : '100%',
        }}
      />
    </>
  )
}

export default HorizontalScroller

export function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      uaString: context?.req?.headers['user-agent'],
    },
  }
}
