import { ConfessionForm } from "./ConfessionForm";

export const Confession : React.FC = () => {


  return (
    <><div className="text">
      <p className="text__paragraph">
        It's very difficult to catch people committing midemeanours so we appreciate it when citizens confess to us directly.
      </p>
      <p className="text__paragraph">
        However, if you're just having a hard day and need to vent the you're welcome to contact us here too. Up to you!
      </p>
    </div><ConfessionForm></ConfessionForm></>
  );
}