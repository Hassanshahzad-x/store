import React, { useEffect, useRef } from 'react'
import Router from 'next/router'
import LinkContext from './LinkContext'

/**
 * Provides a context that allows links to pass data directly to pages via the `pageData` prop.
 */
export default function LinkContextProvider({ children }) {
  const linkPageData = useRef(null)

  useEffect(() => {
    const onRouteChangeComplete = () => (linkPageData.current = undefined)
    Router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      Router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  return <LinkContext.Provider value={linkPageData}>{children}</LinkContext.Provider>
}
