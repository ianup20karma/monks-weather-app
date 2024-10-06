import { useEffect } from "react";

var timerId = 0;
interface ClockComponentProps { time: Date, setTime?: Function, updatable: boolean }
interface ClockComponentPropsFuncMandatory { time: Date, setTime: Function, updatable: boolean }
export default function Clock(props: ClockComponentProps) {
  useEffect(() => {
    clearInterval(timerId);
    if (props.updatable) {
      timerId = setInterval(() => {
        console.log("🚀 ~ useEffect ~ props.updatable:", props.updatable)
        const newTime = new Date(props.time.setSeconds(props.time.getSeconds() + 1));
        (props as ClockComponentPropsFuncMandatory).setTime(newTime);
      }, 1000);
    }
  }, [])

  return (
    <div className="clock">
      <div className="hour_hand" style={{ transform: `rotateZ(${props.time.getHours() * 30}deg)` }}/>
      <div className="min_hand" style={{ transform: `rotateZ(${props.time.getMinutes() * 6}deg)` }}/>
      <div className="sec_hand" style={{ transform: `rotateZ(${props.time.getSeconds() * 6}deg)` }}/>
    </div>
  );
}