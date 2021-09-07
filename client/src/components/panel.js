import { createRef, useEffect } from 'react';
import styled from 'styled-components'
import Icon from './icon';
import withLoader from './load-indicator';

const StyledContainer = styled.div`
  border: 1px solid #DDD;
  border-radius: 25px;
  padding: 30px;
  background-color: #FFF;
  box-shadow: 7px 7px 3px rgb(0 0 0 / 50%);
  margin-top: 30px;

  &.small {
    width: 600px;
  }
  
  &.medium {
    width: 900px;
  }
  
  &.large {
    width: 1200px;
  }
  
`;

const StyledHeader = styled.div`
  position: relative;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 30px;
  border: 1px solid #CCC;
  border-radius: 10px;
  background-color: #DED;
  color: lightseagreen; /* Antes: #097890; */
  box-shadow: 5px 5px 3px rgb(0 0 0 / 50%);
  height: 68px;
`;

const StyledTitle = styled.h2`
  position: absolute;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid #CCC;
  border-radius: 10px;
  background-color: #DED;
  color: lightseagreen; /* Antes: #097890; */
  box-shadow: 5px 5px 3px rgb(0 0 0 / 50%);
  font-family: cursive;
  display: inline;

  &.full-width {
    width: calc(100% - 20px);
  }

  &.with-action-width {
    width: calc(100% - 75px);
  }
`;

const StyledAcctionsContainer = styled.div`
  position: absolute;
  margin-right: 10px;
  right: 0px;
  top: 5px;
  border: 1px solid #CCC;
  border-radius: 10px;
  box-shadow: 5px 5px 3px rgb(0 0 0 / 50%);
  height: 50px;
  padding-left: 8px;
  padding-right: 8px;
`;

const StyledAcctionContainer = styled.div`
  & > .separation {
    padding: 0px;
  }
  border: 1px solid #CCC;
  border-radius: 6px;
  margin-top: 8px;
`;


// prop.size: "small", "medium", "large"
function Panel(props) {
  const titleRef = createRef();
  
  useEffect(() => {
    if (props.actions) {
      titleRef.current.classList.add("with-action-width");
    }
    else {
      titleRef.current.classList.add("full-width");
    }  
  });

  return (
    <StyledContainer className={"container panel-container " + props.size}>
      <div className="row justify-content-center">
        <div>
          <StyledHeader>
            <StyledTitle ref={titleRef} >
              {props.title}
            </StyledTitle>
            {(props.actions) ? 
              <StyledAcctionsContainer>
                {props.actions.map((item, index) => (
                  <StyledAcctionContainer className="btn-secondary" key={item.id} >
                    <Icon fontName={item.icon} onClick={() => item.action()} medium ></Icon>
                  </StyledAcctionContainer>            
                ))}
              </StyledAcctionsContainer>
            : <></> }
          </StyledHeader>
          {props.children}
        </div>        
      </div>
    </StyledContainer>
  )
}

export default withLoader('model')(Panel);
