import { useContext } from "react";
import { MISDEMEANOURS, MisdemeanourKind, misdemeanourDisplay } from "../types/misdemeanours.types"
import { Filter, MisdemeanourContext } from "./MisdemeanourTable";

export const MisdemeanourFilter : React.FC = () => {

  const changeFilter = (event : React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Filter);
  }

  const {filter, setFilter} = useContext(MisdemeanourContext);
  
  return (
  <select className="table--row--item--menu form__text--answer--select" onChange={changeFilter} value={filter}>
    <option value={'no filter'}>No filter</option>
    {MISDEMEANOURS.map((misdemeanourName : MisdemeanourKind) => (
      <option value={misdemeanourName}>{misdemeanourDisplay[misdemeanourName].slice(-2)}</option>
    ))}
  </select>)
}