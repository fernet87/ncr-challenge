
export default function SubmitButton(props) {

  const getClasses = () => {
    let classes = "btn btn-primary " + ((props.className) ? props.className + " " : " ");

    classes += ((props.large) ? "btn-lg" : "") + " ";
    classes += ((props.small) ? "btn-sm" : "") + " ";

    return classes.trim();
  };

  return (
    <button type="submit" className={getClasses()} disabled={props.disabled}>{ props.label }</button>
  );
}
