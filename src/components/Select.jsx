import { styled } from "goober";
import {useEffect, useState, useRef} from "react";
import debounce from "lodash/debounce"
import filter from "lodash/filter"
import sortBy from "lodash/sortBy"
import {sanatizeQueries} from "../helpers/sanatizeQueries";
import { ReactComponent as LoadingSvg } from '../assets/spinner.svg';
import useGetColor from "../hooks/useGetColor";
import {SelectedColorsList} from "./ColorsList";


const textInputStyle = {
  lineHeight: "26px",
  width: "100%",
  color: "black",
};

const Select = () => {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const inputEl = useRef(null);
  const isDisabled = selectedColors.length >= 3;
  const {data, loading} = useGetColor({query});
  useEffect(() => {
    setQueryResults(sortBy(data, ["name"]));
  }, [data]);

  const onUserQuery = debounce((e) => {
    const userQueryString = e.target.value
      setQuery(sanatizeQueries(userQueryString));
  }, 500)

  const onSelectColor = (selectedColor) => (() => {
    if(isDisabled){
      return null;
    }
    setSelectedColors((prevColors) =>
      [...filter(prevColors, (prevColor) => prevColor.name != selectedColor.name), selectedColor]
    );
  });

  const onDeselectColor = (selectedColor) => (() => {
    setSelectedColors((prevColors) =>
      [...filter(prevColors, (prevColor) => prevColor.name != selectedColor.name)]
    );
  });

  const onClear = () => {
    setSelectedColors([]);
    inputEl.current.value = "";
    setQuery("");
  }

  return (
    <Wrapper>
      <SelectControl>
        <TextInputWrapper>
          <SelectedColorsList onClickHandler={onDeselectColor} colors={selectedColors} isSelected/>
          <input ref={inputEl} style={textInputStyle} type="text" disabled={isDisabled} placeholder="Select..." onChange={onUserQuery}/>
          <ClearButton onClick={onClear}>Clear</ClearButton>
        </TextInputWrapper>
        {loading ? <LoadingSvg/>: <SelectedColorsList onClickHandler={onSelectColor} colors={queryResults}/>}
      </SelectControl>
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  margin: 0 auto;
  text-align: left;
`;

const SelectControl = styled("div")`
  max-width: 680px;
  width: 100%;
`;

const TextInputWrapper = styled("div")`
  border-radius: 4px;
  backgroundColor: white;
  display: flex;
  padding: 10px;
`;

const ClearButton = styled("button")`
  width: auto;
  background: white;
  color: grey;
`;

export default Select;
