export default function Clock(props: { time: Date }) {
  return (
    <div className="clock">
      <div className="hour_hand" style={{ transform: `rotateZ(${(props.time as Date).getHours() * 30}deg)` }}/>
      <div className="min_hand" style={{ transform: `rotateZ(${(props.time as Date).getMinutes() * 6}deg)` }}/>
      <div className="sec_hand" style={{ transform: `rotateZ(${(props.time as Date).getSeconds() * 6}deg)` }}/>
    </div>
  )
}