import React from 'react'
import Loader from 'react-loaders';

const Loading = () => {
  return (
    <div className="flex w-full justify-center place-items-center h-screen">
        <Loader type="pacman" />
    </div>
  )
}

export default Loading;