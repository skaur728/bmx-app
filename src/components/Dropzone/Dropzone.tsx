import { Box, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import type { CSSProperties, Dispatch, SetStateAction } from 'react'

const baseStyle: CSSProperties = {
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
  const [uploadError, setUploadError] = useState('')

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
    onDrop: (_, fileRejections) => {
      // success
      if (!fileRejections.length) return

      const fileRej = fileRejections[0]
      const { errors } = fileRej
      if (errors.length && errors[0].code === 'file-too-large') {
        setUploadError('File too large')
      }
    },
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

  useEffect(() => {
    if (!uploadError) return

    const timeout = setTimeout(() => setUploadError(''), 1500)

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timeout)
    }
  }, [uploadError])

  return (
    <Box>
      <Box {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <Box textAlign="center">
          {(() => {
            if (file) return <Typography variant="h4">{file.name}</Typography>

            if (uploadError)
              return (
                <Typography variant="h5" sx={{ color: '#e53c2f' }}>
                  {uploadError}
                </Typography>
              )

            return (
              <Box sx={{ color: error ? '#f44336' : '#000000de' }}>
                <Typography variant="h5">
                  <b>Drag and drop</b> or <b>click</b> to upload resume
                </Typography>
                <Typography variant="body1">
                  Resume must be <b>.pdf</b> format and not exceed <b>1 mb</b>
                </Typography>
              </Box>
            )
          })()}
        </Box>
      </Box>
    </Box>
  )
}

export default DropzoneComponent
