import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BtnTimer } from '@spreetail/ui';

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

interface InputRow {
  hide: boolean;
}
const StyledInputRow = styled.div<InputRow>`
  display: ${({ hide }) => (hide ? 'none' : 'block')};
`;
const INTERVAL_TIME = 500;

export function Timer() {
  const [id, setId] = useState<null | NodeJS.Timeout>(null);
  const [seconds, setSeconds] = useState<number>(0);
  const [inputVal, setInputVal] = useState<number>(0);
  const [hide, setHide] = useState<boolean>(true);

  const start = () => {
    if (id) return;
    createTimer();
  };

  const stop = useCallback(() => {
    console.log('stop ID:', id);

    if (id !== null) {
      clearInterval(id);
    }
    setId(null);
  }, [id, setId]);

  const reset = () => {
    stop();
    setSeconds(0);
    createTimer();
  };

  const inputTime = () => {
    setInputVal(0);
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

  const handleInputChange = (input: number) => {
    if (id !== null) stop();
    if (Number.isNaN(input)) return;
    setInputVal(input);
  };

  const submit = () => {
    setSeconds(inputVal);
    start();
    setHide(true);
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
      <StyledInputRow hide={hide}>
        <label htmlFor="input">
          Input time (seconds)
          <input
            id="input"
            type="text"
            value={inputVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(parseInt(e.target.value))
            }
          />
          <BtnTimer className="btn timer-submit" onClick={submit}>
            Submit
          </BtnTimer>
        </label>
      </StyledInputRow>
      <div className="timer--time">{seconds}</div>
      <div>
        <BtnTimer className="btn timer-start" onClick={start}>
          Start
        </BtnTimer>
        <BtnTimer className="btn timer-reset" hide={!hide} onClick={reset}>
          Reset
        </BtnTimer>
        <BtnTimer className="btn timer-stop" onClick={stop}>
          Stop
        </BtnTimer>
        <BtnTimer
          className={`btn timer-input-time`}
          hide={!hide}
          onClick={inputTime}
        >
          Input Time
        </BtnTimer>
      </div>
    </StyledTimer>
  );
}

export default Timer;
