import React, { useContext, useState, useRef, useEffect } from "react";
import { useColorSchemeContext } from "../context/ColorSchemeContext";
import Btn from "../Btn/Btn";
import "./styles.css";
//displays timer for time from mounting element
export default function TimerFromMounting() {
  const timerId = useRef(null);
  const [startTime, setStartTime] = useState(new Date());
  const [time, setTime] = useState(`00:00:00`);
  const { colorScheme } = useColorSchemeContext();
  const timerClass = `TimerFromMounting ${colorScheme}`;

  const getTimeStr = start => {
    const curTime = new Date();
    const diff = curTime - start;
    const hour = Math.floor(diff / 1000 / 60 / 60);
    const min = Math.floor((diff / 1000 / 60) % 60);
    const sec = Math.floor((diff / 1000) % 60);
    return `${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };

  useEffect(() => {
    timerId.current = setTimeout(function tick() {
      if (timerId.current) {
        const timeStr = getTimeStr(startTime);
        setTime(timeStr);
      }
      timerId.current = setTimeout(tick, 1000);
    }, 1000);

    return () => {
      clearTimeout(timerId.current);
    };
  }, [startTime]);

  const handleResetTimer = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
      setTime("00:00:00");
      setStartTime(new Date());
    }
  };

  return (
    <div className={timerClass}>
      <p>{time}</p>
      <Btn text={"Reset Counter"} onClickHandler={handleResetTimer} />
    </div>
  );
}
