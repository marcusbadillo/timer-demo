import { useState } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TimerProps {}

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

// Timer commponet
// 	updates every 500s
// 	start button
// 	stop button
// 	reset button
// 	starting val input

export function Timer(props: TimerProps) {
  const [value, SetValue] = useState(0);

  return (
    <StyledTimer className="timer">
      <h1 className="timer-heading">Timer</h1>
      <div className="timer-start">
        <input type="text" value="" />
      </div>
      <div>
        <button className="timer-reset">reset</button>
        <button className="timer-stop">Stop</button>
      </div>
    </StyledTimer>
  );
}

export default Timer;
