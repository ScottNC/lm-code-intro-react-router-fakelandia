import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Misdemeanour, MISDEMEANOURS } from "../types/misdemeanours.types";
import { MisdemeanourRow } from "./MisdemeanourRow";
import { MisdemeanourFilter } from "./MisdemeanourFilter";
import { MisdemeanoursContext } from "../App";
import { v4 } from "uuid";

export type Filter = typeof MISDEMEANOURS[number] | 'no filter';

export const FilterContext = createContext<{ filter: Filter; setFilter: React.Dispatch<React.SetStateAction<Filter>> }>({
  filter: 'no filter',
  setFilter: () => undefined,
});


export const MisdemeanourTable: React.FC = () => {
  const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);
  
  const [filter, setFilter] = useState<Filter>('no filter');

  const { extraMisdemeanours } = useContext(MisdemeanoursContext);

  const filterObject = useMemo(() => ({filter, setFilter}),[filter, setFilter]);

  useEffect(() => {
    fetch("http://localhost:8080/api/misdemeanours/10")
      .then(response => response.json())
      .then(data => setMisdemeanours(data.misdemeanours))
  },[])

  const filterMisdemeanour = (misdemeanour: Misdemeanour) => {
    return filter === 'no filter' || misdemeanour.misdemeanour === filter;
  }

  return misdemeanours.length ? (
    <FilterContext.Provider value={filterObject}>
      <div className="text">
        <table className="table">
          <tbody>
            <tr className="table--row">
              <th className="table--row--item table--row--item--title"><p>Citizen ID</p></th>
              <th className="table--row--item table--row--item--title"><p>Date</p></th>
              <th className="table--row--item table--row--item--title"><p>Misdemeanour</p> <MisdemeanourFilter /> </th>
              <th className="table--row--item table--row--item--title table--row--item--punishment"><p className="table--row--item--punishment">Punishment Idea</p></th>
            </tr>
            {[...extraMisdemeanours, ...misdemeanours].filter(filterMisdemeanour).map((misdemeanour: Misdemeanour) => (
              <MisdemeanourRow key={v4()} citizenId={misdemeanour.citizenId} date={misdemeanour.date} misdemeanour={misdemeanour.misdemeanour}/>
            ))}
          </tbody>
        </table>
      </div>
    </FilterContext.Provider>
  ) : (
    <div className="text text--block">
      <p className="text__paragraph">
        Misdemeanours Loading....
      </p>
    </div>
  );
};
