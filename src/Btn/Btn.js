//Btn component for buttons
import React from "react";
import { useColorSchemeContext } from "../context/ColorSchemeContext";
import "./styles.css";

export default function Btn({ text, onClickHandler, disabled }) {
  const scheme = useColorSchemeContext();
  const btnClass = `btn btn-${scheme.colorScheme}`;

  return (
    <button className={btnClass} onClick={onClickHandler} disabled={disabled}>
      {text}
    </button>
  );
}
