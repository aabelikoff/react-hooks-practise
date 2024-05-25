//Modal window Specifies showing its content as children props
import React from "react";
import { useModalWindowContext } from "../context/ModalWindowContext";
import "./styles.css";

export default function Modal({ children }) {
  const { isShown } = useModalWindowContext();
  //shows if ModalWindowContext isShown === true
  return isShown && <div className="Modal">{children}</div>;
}
