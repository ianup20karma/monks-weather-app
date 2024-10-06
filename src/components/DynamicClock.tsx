import { useEffect } from 'react'
import { ClockComponentPropsWithUpdateMethod } from '../interfaces';

var timerId = 0;
export default function DynamicClock(props: ClockComponentPropsWithUpdateMethod) {
  useEffect(() => {
    clearInterval(timerId);
    timerId = setInterval(() => {
      if (props.time instanceof Date) {
        const newTime = new Date((props.time as Date).setSeconds((props.time as Date).getSeconds() + 1));
        props.setTime(newTime);
      }
    }, 1000);
  }, [])
  
  return (
    <div className="clock">
      <div className="hour_hand" style={{ transform: `rotateZ(${(props.time as Date).getHours() * 30}deg)` }}/>
      <div className="min_hand" style={{ transform: `rotateZ(${(props.time as Date).getMinutes() * 6}deg)` }}/>
      <div className="sec_hand" style={{ transform: `rotateZ(${(props.time as Date).getSeconds() * 6}deg)` }}/>
    </div>
  );
}