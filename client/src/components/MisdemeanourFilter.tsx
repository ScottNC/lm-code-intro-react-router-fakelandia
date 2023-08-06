import { useContext } from "react";
import { MISDEMEANOURS } from "../types/misdemeanours.types"
import { Filter, MisdemeanourContext } from "./MisdemeanourTable";

export const MisdemeanourFilter : React.FC = () => {

  const changeFilter = (event : React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Filter);
  }

  const {filter, setFilter} = useContext(MisdemeanourContext);
  
  return (
  <select className="table--row--item--menu" onChange={changeFilter} value={filter}>
    {['no filter', ...MISDEMEANOURS].map((misdemeanourName : string) => (
      <option value={misdemeanourName}>{misdemeanourName}</option>
    ))}
  </select>)
}