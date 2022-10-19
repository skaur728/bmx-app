import Fuse from 'fuse.js'
import * as React from 'react'

/**
 * A React Hook that filters an array using the Fuse.js fuzzy-search library.
 *
 * @param list The array to filter.
 * @param searchTerm The search term to filter by.
 * @param fuseOptions Options for Fuse.js.
 *
 * @returns The filtered array.
 *
 * @see https://fusejs.io/
 */
function useFuse<T>(
  list: T[],
  searchTerm: string,
  fuseOptions?: Fuse.IFuseOptions<T>
) {
  const fuse = React.useMemo(
    () => new Fuse(list, fuseOptions),
    [list, fuseOptions]
  )

  const results = React.useMemo(
    () => fuse.search(searchTerm).map(({ item }) => item),
    [fuse, searchTerm]
  )

  return results
}

export default useFuse
