//Form to display inside a Modal component
import React, { useState, useRef } from "react";
import Input from "../Input/Input";
import Btn from "../Btn/Btn";
import { useModalWindowContext } from "../context/ModalWindowContext";
import "./styles.css";

export default function FeedbackForm() {
  const [form, setForm] = useState({ fullName: "", feedback: "" });
  const [isValid, setIsValid] = useState(false);
  const formElement = useRef(null);
  const { setIsShown } = useModalWindowContext(); //use ModalWindowContext method to hide Modal component

  const handleOnFormChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setIsValid(formElement.current.checkValidity());
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    setIsShown(false);
    formElement.current.reset();
  };
  return (
    <form onChange={handleOnFormChange} onSubmit={handleOnSubmit} className="FeedbackForm" ref={formElement}>
      <Input type="text" id="fullName" name="fullName" placeholder="Full Name" required={true} value={form.fullName} />
      <Input type="textarea" id="feedback" name="feedback" placeholder="Feedback" required={true} value={form.feedback} />
      <Btn type="submit" value="Send" text="Send" disabled={!isValid} />
      <button className="btn-close" onClick={() => setIsShown(false)}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </form>
  );
}
