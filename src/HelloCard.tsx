import styles from "./HelloCard.module.css"
import clsx from "clsx"
import { useState } from "react"

export default function HelloCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <div
        className={clsx(styles["surface"], isHovered && styles["surface-hover"])}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={clsx(styles["stack"], styles["stack-vertical"])}>
          <h2 className={styles["text-heading"]}>
            Hello, FRAMELAB
          </h2>
          <p className={styles["text-body"]}>
            A design-first language that compiles to React.
          </p>
        </div>
      </div>
    </>
  )
}
