import { useCountdown } from 'hooks/useCountdown';
import React, { useEffect } from 'react';
import ShowCounter from './ShowCounter';
import './time_counter.css';

const CountDownTimer = ({ targetDate, handeCheckCountDownFinish }: any) => {
  const [days, hours, minutes, seconds, timeTotal] = useCountdown(targetDate);

  useEffect(() => {
    if (timeTotal <= 0) handeCheckCountDownFinish();
  }, [timeTotal]);

  if (days + hours + minutes + seconds <= 0) {
    return null;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountDownTimer;
