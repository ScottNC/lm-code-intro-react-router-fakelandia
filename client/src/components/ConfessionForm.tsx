import { FormEvent, useRef } from "react";
import { MISDEMEANOURS, misdemeanourDisplay } from "../types/misdemeanours.types";

type Reason = typeof MISDEMEANOURS[number] | 'justTalk';

export const ConfessionForm : React.FC = () => {
  const reasons: { [key in Reason]: string } = {...misdemeanourDisplay, justTalk: 'I just want to talk',};

  
  const subjectRef = useRef<HTMLInputElement | null>(null);
  const reasonRef = useRef<HTMLSelectElement | null>(null); 
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = subjectRef.current?.value;
    const reason = reasonRef.current?.value as Reason;
    const description = descriptionRef.current?.value;

    console.log(subject, reason, description);

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
          <textarea className="form__text form__text--answer form__text--answer--fill" rows={7} cols={60} ref={descriptionRef} required/>
        </div>
        <button className="form__text form__text--answer form__text--answer--submit" type="submit">Confess</button>
      </form>
    </fieldset>
  );
}
