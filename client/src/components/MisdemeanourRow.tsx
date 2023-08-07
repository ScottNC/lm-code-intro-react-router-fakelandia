import { Misdemeanour, misdemeanourDisplay } from "../types/misdemeanours.types"

export const MisdemeanourRow : React.FC<Misdemeanour> = ({citizenId, date, misdemeanour}) => (<>
  <tr className="table--row">
    <td className="table--row--item table--row--item--text">{citizenId}</td>
    <td className="table--row--item table--row--item--text">{date}</td>
    <td className="table--row--item table--row--item--text">{misdemeanourDisplay[misdemeanour]}</td>
    <td className="table--row--item">
      <img src={`https://picsum.photos/200/150?random=${citizenId}`}/>
    </td>
  </tr>
</>);