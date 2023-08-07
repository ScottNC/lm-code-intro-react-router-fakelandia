import { useContext } from "react";
import { MISDEMEANOURS, MisdemeanourKind, misdemeanourDisplay } from "../types/misdemeanours.types"
import { Filter, FilterContext } from "./MisdemeanourTable";
import {v4} from 'uuid';

export const MisdemeanourFilter : React.FC = () => {

  const changeFilter = (event : React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Filter);
  }

  const {filter, setFilter} = useContext(FilterContext);
  
  return (
  <select className="table--row--item--menu form__text--answer--select" onChange={changeFilter} value={filter}>
    <option key={v4()} value={'no filter'}>No filter</option>
    {MISDEMEANOURS.map((misdemeanourName : MisdemeanourKind) => (
      <option key={v4()} value={misdemeanourName}>{misdemeanourDisplay[misdemeanourName].slice(-2)}</option>
    ))}
  </select>)
}