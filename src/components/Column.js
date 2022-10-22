import { Lock, LockOpen } from "./Icons";
import chroma from "chroma-js";

function Column({ color, lock, lockColor, id, copyToClipboard }) {
  return(
    <div className={ chroma(color).luminance() <= 0.5 ? "column white" : "column black" }>
      <h2 onClick={()=>{ copyToClipboard(color) }}>{ color }</h2>
      <button onClick={()=>{ lockColor(id) }}>
        { lock ? <Lock color={ color } /> : <LockOpen color={ color } /> }
      </button>
    </div>
  )
}

export default Column