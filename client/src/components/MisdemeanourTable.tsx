import React, { createContext, useEffect, useState } from "react";
import { Misdemeanour } from "../types/misdemeanours.types";
import { MisdemeanourRow } from "./MisdemeanourRow";
import { MisdemeanourFilter } from "./MisdemeanourFilter";
import { MISDEMEANOURS } from "../types/misdemeanours.types";

export type Filter = typeof MISDEMEANOURS[number] | 'no filter';

export const MisdemeanourContext = createContext<{ misdemeanours: Misdemeanour[]; filter: Filter; setFilter: React.Dispatch<React.SetStateAction<Filter>> }>({
  misdemeanours: [],
  filter: 'no filter',
  setFilter: () => undefined,
});


export const MisdemeanourTable: React.FC = () => {
  const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);
  
  const [filter, setFilter] = useState<Filter>('no filter');

  useEffect(() => {
    fetch("http://localhost:8080/api/misdemeanours/10")
      .then(response => response.json())
      .then(data => setMisdemeanours(data.misdemeanours))
  },[])

  const filterMisdemeanour = (misdemeanour: Misdemeanour) => {
    return filter === 'no filter' || misdemeanour.misdemeanour === filter;
  }

  return misdemeanours.length ? (
    <MisdemeanourContext.Provider value={{ misdemeanours, filter, setFilter }}>
      <div className="text">
        <table className="table">
          <tr className="table--row">
            <th className="table--row--item table--row--item--title"><p>Citizen ID</p></th>
            <th className="table--row--item table--row--item--title"><p>Date</p></th>
            <th className="table--row--item table--row--item--title"><p>Misdemeanour</p> <MisdemeanourFilter /> </th>
            <th className="table--row--item table--row--item--title"><p>Punishment Idea</p></th>
          </tr>
          {misdemeanours.filter(filterMisdemeanour).map((misdemeanour: Misdemeanour) => (
            <MisdemeanourRow citizenId={misdemeanour.citizenId} date={misdemeanour.date} misdemeanour={misdemeanour.misdemeanour}/>
          ))}
        </table>
      </div>
    </MisdemeanourContext.Provider>
  ) : (
    <div className="text">
      <p className="text__paragraph">
        Misdemeanours Loading....
      </p>
    </div>
  );
};
