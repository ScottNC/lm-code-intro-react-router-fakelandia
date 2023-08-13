import { useState, useEffect } from "react";
import { News } from "../types/misdemeanours.types";

export const Headline: React.FC = () => {
  const [news, setNews] = useState<News | null | undefined>(undefined);

  useEffect(() => {
    fetch("http://localhost:8080/api/headline")
      .then(response => response.json())
      .then(data => setNews(data))
  },[])

  if (news === undefined)
    return (
      <div className="text text--block">
        <p className="text__paragraph">
          Daily News Loading...
        </p>
      </div>
    );
  else if (news === null) return (<></>);
  else
    return (
      <div className="text text--block">
        <h2>
          Fakelandian Daily News
        </h2>
        <h3 className="text__paragraph">
          {news.headline}
        </h3>
        <img className="image--headline" src={`https://picsum.photos/500/400?headline=1`} alt={`Daily News`}/>
        {news.report?.split('\n\n').map((paragraph: string) => (
          <p className="text__paragraph">
            {paragraph}
        </p>
        ))}
      </div>
  );
}

