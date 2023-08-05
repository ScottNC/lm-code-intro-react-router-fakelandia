import './App.css'
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Misdemeanour } from './components/Misdemeanour';
import { Confession } from './components/Confession';
import { NotFound } from './components/NotFound';

function App() {

  return (
    <>
      <Router>
      <h1>Fakelandia Justice Department</h1>
      <Navbar></Navbar>
      <Routes>
        <Route path="/home" Component={Home} />
        <Route path="/misdemeanour" Component={Misdemeanour} />
        <Route path="/confession" Component={Confession} />
        <Route Component={NotFound} />
      </Routes>
      </Router>
    </>
  )
}

export default App
