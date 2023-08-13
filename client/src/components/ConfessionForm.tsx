import { FormEvent, useContext, useRef, useState } from "react";
import { MISDEMEANOURS, MisdemeanourKind, misdemeanourDisplay } from "../types/misdemeanours.types";
import { MisdemeanoursContext } from "../App";
import { ErrorMessage } from "./ErrorMessage";

type Reason = typeof MISDEMEANOURS[number] | 'just-talk';

function rand(x: number): number {
	return Math.random() * x;
}

export const ConfessionForm : React.FC = () => {
  const reasons: { [key in Reason]: string } = {...misdemeanourDisplay, 'just-talk': 'I just want to talk',};

  const { setExtraMisdemeanours } = useContext(MisdemeanoursContext);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    const { success, justTalked, message } = await rawResponse.json();

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
    else if (!success)
      setErrorMessage(message);
  };

  return (
    <>
    <div className="form">
      <fieldset className='form__border'>
        <form className="text" onSubmit={handleSubmit}>
          <div className="form__text">
            <label className="form__text--label">Subject:</label>
            <input className="form__text form__text--answer form__text--answer--fill" type="text" ref={subjectRef} required/>
          </div>
          <div className="form__text">
            <label className="form__text--label" >Reason for contact:</label>
            <select className="form__text form__text--answer form__text--answer--select" ref={reasonRef}>
            {Object.entries(reasons).map(([key, value]: [string, string]) => (
              <option key={key} value={key}>{value}</option>
            ))}
            </select>
          </div>
          <div className="form__text">
          <label className="form__text--label" >Details:</label>
            <textarea className="form__text form__text--answer form__text--answer--fill" rows={5} cols={30} ref={detailsRef} required/>
          </div>
          <button className="form__text form__text--answer form__text--answer--submit" type="submit">Confess</button>
        </form>
        <ErrorMessage message={errorMessage}></ErrorMessage>
      </fieldset>
    </div>
    </>
  );
}