import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

type Props = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

const GenderSelect = ({ value, setValue }: Props) => {
  const [other, setOther] = useState('')

  useEffect(() => {
    if (value && !other && value !== 'male' && value !== 'female')
      setOther(value)
  }, [value])

  return (
    <Box>
      <FormControl>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          value={value !== 'male' && value !== 'female' ? 'other' : value}
          onChange={(e) => {
            if (e.target.value !== 'other') setValue(e.target.value)
            else setValue(other)
          }}
          name="gender-radio-buttons"
        >
          <Box>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </Box>
          <Box>
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </Box>
          <Box>
            <FormControlLabel
              value="other"
              control={<Radio />}
              label={
                <TextField
                  label="Other"
                  value={value !== 'male' && value !== 'female' ? value : other}
                  onChange={(e) => {
                    setValue(e.target.value.toLowerCase())
                    setOther(e.target.value.toLowerCase())
                  }}
                  required={value !== 'male' && value !== 'female'}
                  size="small"
                  autoComplete="off"
                />
              }
            />
          </Box>
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default GenderSelect
