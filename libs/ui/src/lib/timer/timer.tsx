import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */

const StyledTimer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 40%;
  max-width: 400px;
  padding: 2px 16px;
  font-family: 'Roboto', sans-serif;
  margin: 10px;
  border-radius: 30px;
  padding: 20px;
  text-align: center;
  .timer-heading {
    text-transform: uppercase;
    font-weight: 900;
  }
`;

interface InputTime {
  hide: boolean;
}
const StyledInputTime = styled.div<InputTime>`
  display: ${({ hide }) => (hide ? 'none' : 'block')};
`;

const INTERVAL_TIME = 500;

export function Timer() {
  const [seconds, setSeconds] = useState<number>(0);
  const [inputVal, setInputVal] = useState<number>(0);
  const [id, setId] = useState<null | NodeJS.Timeout>(null);
  // const [active, setActive] = useState<boolean>(true);
  const [hide, setHide] = useState<boolean>(true);

  // const setTimer = (input: number) => {
  //   console.log(input);
  //   setSeconds(input);
  // };

  const start = () => {
    createTimer();
  };

  const stop = useCallback(() => {
    console.log('stop ID:', id);

    if (id !== null) {
      clearInterval(id);
    }
    setId(null);
    // setSeconds(0);
    // setActive(false);
  }, [id, setId]);

  const reset = () => {
    stop();
    setSeconds(0);
    createTimer();
  };

  const inputTime = () => {
    stop();
    setHide(false); // show input
  };

  const createTimer = () => {
    const intervalId = setInterval(() => {
      setSeconds((s) => s + 1);
    }, INTERVAL_TIME);

    console.log('intervalId', intervalId);

    setId(intervalId);
  };

  useEffect(() => {
    if (id === null) {
      createTimer();
    }
    return () => stop();
  }, []);

  return (
    <StyledTimer className="timer">
      <h1 className="timer--heading">Timer</h1>
      <StyledInputTime hide={hide}>
        <label htmlFor="input">
          Input time (seconds)
          <input
            id="input"
            type="text"
            value={inputVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (id !== null) {
                stop();
              }

              setInputVal(parseInt(e.target.value));
            }}
          />
        </label>
      </StyledInputTime>
      <div className="timer--time">{seconds}</div>
      <div>
        <button className="btn timer-start" onClick={start}>
          Start
        </button>
        <button className="btn timer-reset" onClick={reset}>
          Reset
        </button>
        <button className="btn timer-stop" onClick={stop}>
          Stop
        </button>
        <button
          className={`btn timer-input-time ${hide ? 'hide' : 'show'}`}
          onClick={inputTime}
        >
          Input Time
        </button>
      </div>
    </StyledTimer>
  );
}

export default Timer;
