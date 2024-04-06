import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import { Home } from './pages/home/home'
import { History } from './pages/history/history'
import { createContext, useState } from 'react'

export const AppContext = createContext();

function App() {

  const [searchedWord, setSearchedWord] = useState<string[]>([])
  console.log(searchedWord);
  

  return (
    <div className="app">
      <AppContext.Provider value={{searchedWord, setSearchedWord}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/history'  element={<History />} />
        </Routes>
      </Router>
      </AppContext.Provider>
    </div>
  )
}

export default App
