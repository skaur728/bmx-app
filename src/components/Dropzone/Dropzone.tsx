import { Box, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

import type { Dispatch, SetStateAction } from 'react'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 4,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#d3c0a7',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
}

const focusedStyle = {
  borderColor: '#2196f3',
  backgroundColor: '#dfcab0',
}

const acceptStyle = {
  borderColor: '#00e676',
  backgroundColor: '#D3F9D8',
}

const rejectStyle = {
  borderColor: '#ff1744',
  backgroundColor: '#FFC9C9',
}

const DropzoneComponent = ({
  setFile,
  file,
  error,
}: {
  setFile: Dispatch<SetStateAction<File | null>>
  file: File | null
  error: boolean
}) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 1_000_000,
  })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  useEffect(() => {
    setFile(acceptedFiles[0] || null)
  }, [acceptedFiles])

  return (
    <Box>
      <Box {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <Box textAlign="center">
          {file ? (
            <Typography variant="h4">{file.name}</Typography>
          ) : (
            <Box sx={{ color: error ? '#f44336' : '#000000de' }}>
              <Typography variant="h4">Upload resume</Typography>
              <Typography variant="body1">
                Resume must be <b>.pdf</b> format and not exceed <b>1mb</b>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default DropzoneComponent
