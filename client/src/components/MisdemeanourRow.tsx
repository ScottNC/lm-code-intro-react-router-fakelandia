import { Misdemeanour } from "../types/misdemeanours.types"
import { MISDEMEANOURS } from "../types/misdemeanours.types"

const misdemeanourDisplay : {[key in typeof MISDEMEANOURS[number]] : string} = {
  rudeness: 'Mild Public Rudeness 🤪',
  lift: 'Speaking in a Lift 🗣',
  vegetables: 'Not Eating Your Vegetables 🥗',
  united: 'Supporting Manchester United 😈'
}

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