import { FormEvent, useContext, useRef } from "react";
import { MISDEMEANOURS, MisdemeanourKind, misdemeanourDisplay } from "../types/misdemeanours.types";
import { MisdemeanoursContext } from "../App";

type Reason = typeof MISDEMEANOURS[number] | 'just-talk';

function rand(x: number): number {
	return Math.random() * x;
}

export const ConfessionForm : React.FC = () => {
  const reasons: { [key in Reason]: string } = {...misdemeanourDisplay, 'just-talk': 'I just want to talk',};

  const { setExtraMisdemeanours } = useContext(MisdemeanoursContext);

  const subjectRef = useRef<HTMLInputElement | null>(null);
  const reasonRef = useRef<HTMLSelectElement | null>(null); 
  const detailsRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = subjectRef.current?.value;
    const reason = reasonRef.current?.value as Reason;
    const details = detailsRef.current?.value;

    const rawResponse = await fetch('http://localhost:8080/api/confess', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subject, reason, details })
    });

    const { success, justTalked } = await rawResponse.json();

    if (success && !justTalked) {
      setExtraMisdemeanours((prevExtra) => [
        ...prevExtra,
        {
          citizenId: Math.floor(rand(66) + rand(90) * rand(823)),
          misdemeanour: reason as MisdemeanourKind,
          date: new Date().toLocaleDateString()
        }
      ]);
    }
  };

  return (
    <fieldset className='form__border'>
      <form className="text" onSubmit={handleSubmit}>
        <div className="form__text--right">
          <label className="form__text">Subject:</label>
          <input className="form__text form__text--answer form__text--answer--fill form__text--right--fill" type="text" ref={subjectRef} required/>
        </div>
        <div className="form__text--right">
          <label className="form__text" >Reason for contact:</label>
          <select className="form__text form__text--answer form__text--answer--select form__text--right--fill" ref={reasonRef}>
          {Object.entries(reasons).map(([key, value]: [string, string]) => (
            <option key={key} value={key}>{value}</option>
          ))}
          </select>
        </div>
        <div className="form__text--answer--fill--big">
          <textarea className="form__text form__text--answer form__text--answer--fill" rows={7} cols={60} ref={detailsRef} required/>
        </div>
        <button className="form__text form__text--answer form__text--answer--submit" type="submit">Confess</button>
      </form>
    </fieldset>
  );
}