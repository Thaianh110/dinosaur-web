import React from 'react'
import {CircularProgress} from '@mui/material'

const Loading = () => {
  return (
    <div className='w-full h-full bg-overlay absolute inset-0 flex items-center justify-center'>
      <CircularProgress />
    </div>    
  )
}

export default Loading