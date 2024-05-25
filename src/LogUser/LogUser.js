import React, { useState } from "react";
import { UserProvider, useUserContext, useUserSignUpContext } from "../context/UserContext";
import { FontSizeContextProvider, useFontSizeContext } from "../context/FontSizeContext";
import { ColorSchemeContextProvider, useColorSchemeContext } from "../context/ColorSchemeContext";

import Btn from "../Btn/Btn";
import TimerFromMounting from "../TimerFromMounting/TimerFromMounting";
import { ModalWindowContextProvider, useModalWindowContext } from "../context/ModalWindowContext";
import Modal from "../Modal/Modal";
import "./styles.css";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
//implements whole app inside providers
export default function LogUser() {
  return (
    <UserProvider>
      <FontSizeContextProvider>
        <ColorSchemeContextProvider>
          <ModalWindowContextProvider>
            <LogForm>
              <Settings />
              <Content />
              <Modal>
                <FeedbackForm />
              </Modal>
            </LogForm>
          </ModalWindowContextProvider>
        </ColorSchemeContextProvider>
      </FontSizeContextProvider>
    </UserProvider>
  );
}

//
function LogForm({ children }) {
  const [userLogin, setUserLogin] = useState(); //state for controll input

  const { log, unLog } = useUserSignUpContext();
  const user = useUserContext(); //user data object
  const { fontSize } = useFontSizeContext(); //fond size
  const { colorScheme } = useColorSchemeContext(); //color scheme ('light' or 'dark')
  const { setIsShown: showModalWindow } = useModalWindowContext(); //method to show modal window for feedback

  const formClass = `LogForm ${colorScheme}`; //class for wrapper

  const handleChangeUserLogin = e => {
    if (e.target.value.trim) {
      setUserLogin(e.target.value);
    }
  };

  const handleLogUser = () => {
    log(userLogin);
  };

  const handleUnLogUser = () => {
    unLog();
  };

  const handleShowFeedbackForm = () => {
    showModalWindow(true);
  };
  //displaying control buttons if user is logged
  const controlBtns = user.isLogged && (
    <>
      <Btn onClickHandler={handleUnLogUser} text="Sign Out" /> <Btn onClickHandler={handleShowFeedbackForm} text="Feedback" />
    </>
  );
  return (
    <div style={{ fontSize: `${fontSize}px` }} className={formClass}>
      <div className="formContainer">
        <div style={{ width: "70%" }}>
          <input type="text" onChange={handleChangeUserLogin} />
          <Btn onClickHandler={handleLogUser} text="Log In" />
        </div>
        <TimerFromMounting />
      </div>
      {children}
      <div className="controlBtns">{controlBtns}</div>
    </div>
  );
}
//View settings
export function Settings() {
  const { setFontSize } = useFontSizeContext();
  const { setColorScheme } = useColorSchemeContext();

  return (
    <div className="Settings">
      <Btn text="Small" onClickHandler={() => setFontSize(14)} />
      <Btn text="Medium" onClickHandler={() => setFontSize(18)} />
      <Btn text="Large" onClickHandler={() => setFontSize(22)} />
      <Btn text="Toggle Color Scheme" onClickHandler={() => setColorScheme(prev => (prev === "light" ? "dark" : "light"))} />
    </div>
  );
}
//Content
export function Content() {
  const user = useUserContext();
  const { fontSize } = useFontSizeContext();
  const { colorScheme } = useColorSchemeContext();
  const contentClass = `content content-${colorScheme}`;
  //content to display if user.isLogged === true
  const content = (
    <div className={contentClass}>
      <p>Hello {user.login}</p>
      <h2>Adjust yout font and color scheme</h2>
      <p>Fontsize: {fontSize}</p>
      <p>Color Scheme: {colorScheme}</p>
    </div>
  );
  return <div>{user.isLogged && content}</div>;
}
