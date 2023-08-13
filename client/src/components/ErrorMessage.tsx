type ErrorProps = {
  message: string | null
}

export const ErrorMessage : React.FC<ErrorProps> = ({message}) => {
  if (message)
    return (
      <div className="text text--error">
        <p className="text__paragraph">
          {message}
        </p>
      </div>
    );
  else
    return (<></>);
};
