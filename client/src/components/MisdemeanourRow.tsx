import { Misdemeanour, misdemeanourDisplay } from "../types/misdemeanours.types"

export const MisdemeanourRow : React.FC<Misdemeanour> = ({citizenId, date, misdemeanour, options}) => {

  const text = options ? `Subject: ${options.subject}\n Reason: ${misdemeanourDisplay[misdemeanour]}\n Details: ${options.details}`
    : misdemeanourDisplay[misdemeanour];

  return (
    <>
      <tr className="table--row">
        <td className="table--row--item table--row--item--text">{citizenId}</td>
        <td className="table--row--item table--row--item--text">{date}</td>
        <td className="table--row--item table--row--item--text">{text}</td>
        <td className="table--row--item table--row--item--punishment">
          <img className="image--table" src={`https://picsum.photos/200/150?random=${citizenId}`} alt={`Punishment for Citizen ${citizenId}`}/>
        </td>
      </tr>
    </>
  );
};