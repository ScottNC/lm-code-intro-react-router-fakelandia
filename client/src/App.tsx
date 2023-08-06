import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Misdemeanours } from './components/Misdemeanours';
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
        <Route path="/misdemeanour" Component={Misdemeanours} />
        <Route path="/confession" Component={Confession} />
        <Route path="/*" Component={NotFound} />
      </Routes>
      </Router>
    </>
  )
}

export default App
