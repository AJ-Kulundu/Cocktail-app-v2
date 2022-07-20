import React from 'react'
import Loader from 'react-loaders';

const Loading = () => {
  return (
    <div className="flex justify-center w-full">
        <Loader type="pacman" />
    </div>
  )
}

export default Loading;