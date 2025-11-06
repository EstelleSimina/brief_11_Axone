import { BrowserRouter, Routes, Route } from 'react-router';
import Homepage from './pages/homepage/Homepage';
import SigninForm from './pages/connexion/SignIn'
import Signup from './pages/inscription/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import SnippetList from './pages/exploration/ExplorationSnippet';
import SnippetDetails from './pages/detailSnippet/DetailSnippet';
import Profile from './pages/profile/Profile';
import ErrorPage from './pages/errorPage/ErrorPage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/connexion" element={<SigninForm />} />
        <Route path="/inscription" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exploration" element={<SnippetList />} />
        <Route path="/exploration/:id" element={<SnippetDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
