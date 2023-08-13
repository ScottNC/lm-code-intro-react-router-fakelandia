import { useState, useEffect } from "react";

export const Headline: React.FC = () => {
  const [headline, setHeadline] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    fetch("http://localhost:8080/api/headline")
      .then(response => response.text())
      .then(data => setHeadline(data))
  },[])

  if (headline === undefined)
    return (
      <div className="text text--block">
        <p className="text__paragraph">
          Healine Loading...
        </p>
      </div>
    );
  else if (headline === null) return (<></>);
  else
    return (
      <div className="text text--block">
        <h2>
          Fakelandian Daily News
        </h2>
        <h3 className="text__paragraph">
          {headline}
        </h3>
        <img className="image--headline" src={`https://picsum.photos/500/400?headline=1`} alt={`Daily News`}/>
      </div>
  );
}

