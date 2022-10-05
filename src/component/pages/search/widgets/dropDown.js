import Select from "react-select";
import { components } from "react-select";
import DropDownStyle from "../values/dropdownStyle";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DropDown = (props) => {
  const [options, setOptions] = useState([]);
  const [focus, setFocus] = useState(false);
  const [selected, setSelected] = useState(
    props.selected ? props.selected : []
  );
  const [type, setType] = useState("or");
  const ValueContainer = (propss) => {
    return (
      <>
        <components.Placeholder {...propss} isFocused={propss.hasValue}>
          {propss.hasValue ? "" : "Countries"}
        </components.Placeholder>
        <components.ValueContainer {...propss}>
          <span className="css-ekcj9h">
            {propss
              .getValue()
              .map((e, i) =>
                i + 1 === propss.getValue().length ? (
                  <>{e.label}</>
                ) : (
                  <>{e.label},</>
                )
              )}
          </span>
        </components.ValueContainer>
      </>
    );
  };
  const changeFocus = () => {
    setFocus(!focus);
    getOptions();
  };
  useEffect(() => {
    props.addFetureFilterDropDown(props.id, selected, type);
  }, [selected, type]);

  const Control = (props) => {
    return (
      <div onClick={changeFocus}>
        <components.Control {...props}></components.Control>
      </div>
    );
  };
  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const getOptions = () => {
    axios
      .get(
        "https://api.battlemetrics.com/game-features/" +
          props.id +
          "/relationships/options?page[size]=200&filter[count]=10:"
      )
      .then((res) => {
        var result = [];
        res.data.data.forEach((element) => {
          result.push({
            label: element.attributes.display,
            value: element.id,
          });
        });
        setOptions(result);
      });
  };
  return (
    <div className="col-md-4">
      <div className="form-group">
        <div>
          <label htmlFor="2e0795dc-d6f7-11e7-8461-23fd914b5689">
            {props.name}
          </label>
          <div className="css-s289sk">
            <div
              className={
                "radio-inline " + (type === "and" ? "css-ahwn0i" : "css-1e2str4")
              }
            >
              <label htmlFor="2e0795dc-d6f7-11e7-8461-23fd914b5689-and">
                <input
                  type="radio"
                  name="2e0795dc-d6f7-11e7-8461-23fd914b5689-bool-mode"
                  id="2e0795dc-d6f7-11e7-8461-23fd914b5689-and"
                  defaultValue="and"
                  defaultChecked=""
                  onClick={(e) => setType("and")}
                />{" "}
                AND
              </label>
            </div>
            <div
              className={
                "radio-inline " + (type === "or" ? "css-ahwn0i" : "css-1e2str4")
              }
            >
              <label htmlFor="2e0795dc-d6f7-11e7-8461-23fd914b5689-or">
                <input
                  type="radio"
                  name="2e0795dc-d6f7-11e7-8461-23fd914b5689-bool-mode"
                  id="2e0795dc-d6f7-11e7-8461-23fd914b5689-or"
                  defaultValue="or"
                  onClick={(e) => setType("or")}
                />{" "}
                OR
              </label>
            </div>
          </div>
        </div>
        <Select
          name="countreis"
          value={selected}
          onChange={(e) => {
            setSelected(e);
          }}
          components={{
            Option,
            ValueContainer,
            Control,
          }}
          isSearchable
          isMulti
          menuIsOpen={focus}
          styles={DropDownStyle}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          allowSelectAll={true}
          options={options}
        />
      </div>
    </div>
  );
};
export default DropDown;
