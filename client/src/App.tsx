import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Misdemeanours } from './components/Misdemeanours';
import { Confession } from './components/Confession';
import { NotFound } from './components/NotFound';
import { Title } from './components/Title';
import { Misdemeanour } from './types/misdemeanours.types';
import { createContext, useState } from 'react';

export const MisdemeanoursContext = createContext<{ extraMisdemeanours : Misdemeanour[], setExtraMisdemeanours: React.Dispatch<React.SetStateAction<Misdemeanour[]>> }>({
  extraMisdemeanours: [],
  setExtraMisdemeanours: () => undefined,
});

function App() {

  const [extraMisdemeanours, setExtraMisdemeanours] = useState<Misdemeanour[]>([]);

  return (
    <>
      <Router>
      <header className='header__container'>
        <Title></Title>
        <Navbar></Navbar>
      </header>
      <MisdemeanoursContext.Provider value={{ extraMisdemeanours, setExtraMisdemeanours }}>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/home" Component={Home} />
          <Route path="/misdemeanour" Component={Misdemeanours} />
          <Route path="/confession" Component={Confession} />
          <Route path="/*" Component={NotFound} />
        </Routes>
      </MisdemeanoursContext.Provider>
      </Router>
    </>
  )
}

export default App
