import { useCountdown } from 'hooks/useCountdown';
import React from 'react';
import ExpiredNotice from './ExpiredNotice';
import ShowCounter from './ShowCounter';
import './time_counter.css';

const CountDownTimer = ({ targetDate }: any) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
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
