import { useEffect, useState } from "react";
import { Misdemeanour } from "../types/misdemeanours.types";
import { MisdemeanourRow } from "./MisdemeanourRow";

export const MisdemeanourTable : React.FC = () => {

  const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/misdemeanours/3")
      .then(response => response.json())
      .then(data => setMisdemeanours(data.misdemeanours))
  },[])

  return (<>
    <div className="text">
      <table className="table">
        <tr className="table--row">
          <th className="table--row--item table--row--item--title">Citizen ID</th>
          <th className="table--row--item table--row--item--title">Date</th>
          <th className="table--row--item table--row--item--title">Misdeameanour</th>
          <th className="table--row--item table--row--item--title">Punishment Idea</th>
        </tr>
        {misdemeanours.map((misdemeanour: Misdemeanour) => (<>
          <MisdemeanourRow citizenId={misdemeanour.citizenId} date={misdemeanour.date} misdemeanour={misdemeanour.misdemeanour}></MisdemeanourRow>
        </>))}
      </table> 
    </div>
  </>)
};