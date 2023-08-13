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

  const [disableButton, setDisableButton] = useState<boolean>(true);

  const subjectRef = useRef<HTMLInputElement | null>(null);
  const reasonRef = useRef<HTMLSelectElement | null>(null); 
  const detailsRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (event: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const subject = subjectRef.current?.value;
    const details = detailsRef.current?.value;

    console.log(!subject || !details);

    setDisableButton(!subject || !details);
  }

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
    <div className="text text--block">
        <p className="text__paragraph">
          It's very difficult to catch people committing midemeanours so we appreciate it when citizens confess to us directly.
        </p>
        <p className="text__paragraph">
          However, if you're just having a hard day and need to vent the you're welcome to contact us here too. Up to you!
        </p>
    </div>
    <div className="form">
      <fieldset className='form__border'>
        <form className="text" onSubmit={handleSubmit}>
          <div className="form__text">
            <label className="form__text--label">Subject:</label>
            <input data-testid="Subject" className="form__text form__text--answer form__text--answer--fill" type="text" onChange={handleChange} ref={subjectRef} />
          </div>
          <div className="form__text">
            <label className="form__text--label" >Reason for contact:</label>
            <select data-testid="Reason" className="form__text form__text--answer form__text--answer--select" ref={reasonRef}>
            {Object.entries(reasons).map(([key, value]: [string, string]) => (
              <option key={key} value={key}>{value}</option>
            ))}
            </select>
          </div>
          <div className="form__text">
          <label className="form__text--label" >Details:</label>
            <textarea data-testid="Details" className="form__text form__text--answer form__text--answer--fill" onChange={handleChange} rows={5} cols={30} ref={detailsRef} />
          </div>
          <button className="form__text form__text--answer form__text--answer--submit" disabled={disableButton} type="submit">Confess</button>
        </form>
        <ErrorMessage message={errorMessage}></ErrorMessage>
      </fieldset>
    </div>
    </>
  );
}