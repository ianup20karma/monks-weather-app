import Clock from "./Clock";

export function StaticClock(props: { time: Date }) {
  return <Clock time={props.time} />
}