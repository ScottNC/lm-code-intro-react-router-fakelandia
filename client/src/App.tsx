import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Confession } from './components/Confession';
import { NotFound } from './components/NotFound';
import { Misdemeanour } from './types/misdemeanours.types';
import { createContext, useMemo, useState } from 'react';
import { Title } from './components/Title';
import { MisdemeanourTable } from './components/MisdemeanourTable';

export const MisdemeanoursContext = createContext<{ extraMisdemeanours : Misdemeanour[], setExtraMisdemeanours: React.Dispatch<React.SetStateAction<Misdemeanour[]>> }>({
  extraMisdemeanours: [],
  setExtraMisdemeanours: () => undefined,
});

function App() {

  const [extraMisdemeanours, setExtraMisdemeanours] = useState<Misdemeanour[]>([]);
  const extraMisdemeanoursObject = useMemo(() => ({extraMisdemeanours, setExtraMisdemeanours}),[extraMisdemeanours, setExtraMisdemeanours]);

  return (
    <>
      <Router>
      <Title></Title>
      <Navbar></Navbar>
      <MisdemeanoursContext.Provider value={extraMisdemeanoursObject}>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/home" Component={Home} />
          <Route path="/misdemeanour" Component={MisdemeanourTable} />
          <Route path="/confession" Component={Confession} />
          <Route path="/*" Component={NotFound} />
        </Routes>
      </MisdemeanoursContext.Provider>
      </Router>
    </>
  )
}

export default App
