import { BrowserRouter, Routes, Route } from 'react-router';
import SnippetList from './pages/exploration/ExplorationPage';
import Homepage from './pages/homepage/HomePage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/exploration" element={<SnippetList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
