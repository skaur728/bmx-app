import { Autocomplete } from '@mui/material'
import { useState } from 'react'

import LEVELOFSTUDIES from '@/constants/levelofstudies'
import useFuse from '@/hooks/useFuse'
import { TextField } from '@/styles/custom'

import type { Dispatch, SetStateAction } from 'react'

type Props = {
  value: string | null
  setValue: Dispatch<SetStateAction<string | null>>
}

const LevelOfStudySelect = ({ value, setValue }: Props) => {
  const [query, setQuery] = useState('')
  const results = useFuse(LEVELOFSTUDIES, query)

  return (
    <Autocomplete
      options={results}
      fullWidth
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      inputValue={query}
      onInputChange={(e, newValue) => setQuery(newValue || '')}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Level of Study"
          variant="standard"
          sx={{ margin: 0 }}
        />
      )}
    />
  )
}

export default LevelOfStudySelect
