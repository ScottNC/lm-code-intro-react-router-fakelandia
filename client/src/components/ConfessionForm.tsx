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
    <form className="text" onSubmit={handleSubmit}>
      <div>
        <label>Subject:</label>
        <input type="text" ref={subjectRef} required/>
      </div>
      <div>
        <label>Reason for contact:</label>
        <select ref={reasonRef}>
        {Object.entries(reasons).map(([key, value]: [string, string]) => (
          <option key={key} value={key}>{value}</option>
        ))}
        </select>
      </div>
      <div>
        <textarea rows={5} ref={descriptionRef} required/>
      </div>
      <button type="submit">Confess</button>
    </form>
  );
}
