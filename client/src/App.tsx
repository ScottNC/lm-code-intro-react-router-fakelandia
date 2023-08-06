import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Misdemeanour } from './components/Misdemeanour';
import { Confession } from './components/Confession';
import { NotFound } from './components/NotFound';
import { Title } from './components/Title';

function App() {

  return (
    <>
      <Router>
      <header className='header__container'>
        <Title></Title>
        <Navbar></Navbar>
      </header>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/home" Component={Home} />
        <Route path="/misdemeanour" Component={Misdemeanour} />
        <Route path="/confession" Component={Confession} />
        <Route path="/*" Component={NotFound} />
      </Routes>
      </Router>
    </>
  )
}

export default App
