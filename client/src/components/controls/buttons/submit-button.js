import styled from 'styled-components'

const StyledButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default function SubmitButton(props) {

  const getClasses = () => {
    let classes = "btn btn-primary " + ((props.className) ? props.className + " " : " ");

    classes += ((props.large) ? "btn-lg" : "") + " ";
    classes += ((props.small) ? "btn-sm" : "") + " ";

    return classes.trim();
  };

  return (
    <StyledButton type="submit" className={getClasses()} disabled={props.disabled}>{ props.label }</StyledButton>
  );
}
