import { Routes ,Route } from 'react-router-dom'

import React from 'react'
import Landing from './screens/Landing'
import Game from './screens/Game'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/game" element={<Game/>} />
    </Routes>
  )
}

export default App