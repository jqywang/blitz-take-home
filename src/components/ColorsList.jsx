import isEmpty from "lodash/isEmpty";
import { styled } from "goober";
import { ReactComponent as CloseSvg } from '../assets/close.svg';


export const SelectedColorsList = ({colors, onClickHandler, isSelected, buttonStyle={}}) => {
  if(isEmpty(colors)) {
    return null;
  }

  const ButtonComponent = isSelected ? SelectedButton : QueryButton;
  return (
    <>
      {colors.map((color) =>
        (
          <ButtonComponent
            onClick={onClickHandler(color)}
            color={color}
          />
      ))}
    </>
  );
};

const closeSvgStyle = {
  position: "relative",
  top: "7px",
  marginLeft: "5px",
};

const SelectedButton = (props) => (
  <SelectedButtonInput
    onClick={props.onClick}
    key={props.color.name}
    style={{backgroundColor: props.color.hex}}
  >
    {props.color.name}
    <CloseSvg style={closeSvgStyle}/>
  </SelectedButtonInput>
);

const QueryButton = (props) => (
  <QueryButtonWrapper
    onClick={props.onClick}
    key={props.color.name}
    style={{backgroundColor: props.color.hex}}
  >
    {props.color.name}
  </QueryButtonWrapper>
);



const SelectedButtonInput = styled("button")`
  display: flex;
  color: white;
  border-radius: 4px;
  padding : 5px 10px;
  text-align: left;
  height: 36px;
  whiteSpace: nowrap;
  marginRight: 5px;
  position: relative;
  height: auto;
`;

const QueryButtonWrapper = styled("button")`
  backgroundColor: white;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  textAlign: left;
  marginTop: 10px;
`;
