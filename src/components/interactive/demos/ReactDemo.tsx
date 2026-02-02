"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Column, Row, Text } from "@once-ui-system/core";
import { DemoContainer } from "./DemoContainer";
import styles from "./demos.module.scss";

export function ReactDemo() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [lastAction, setLastAction] = useState<string>("initialized");

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, [count]);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    setLastAction("increment");
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
    setLastAction("decrement");
  };

  const handleReset = () => {
    setCount(0);
    setLastAction("reset");
  };

  const mobilePreview = (
    <Column gap="12" horizontal="center">
      <Text variant="body-default-s" onBackground="neutral-weak">
        Interactive counter using React Hooks
      </Text>
      <Row gap="8" vertical="center">
        <div className={styles.badge}>useState</div>
        <div className={styles.badge}>useEffect</div>
      </Row>
    </Column>
  );

  return (
    <DemoContainer title="React Hooks Demo" mobilePreview={mobilePreview}>
      <div className={styles.reactDemo}>
        {/* Hook indicators */}
        <Row gap="12" wrap>
          <div className={styles.hookIndicator}>
            <motion.div
              className={styles.hookDot}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
              key={count}
            />
            <span>useState: {count}</span>
          </div>
          <div className={styles.hookIndicator}>
            <motion.div
              className={styles.hookDot}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
              key={renderCount}
            />
            <span>useEffect renders: {renderCount}</span>
          </div>
        </Row>

        {/* State visualization */}
        <div className={styles.stateDisplay}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`count-${count}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={styles.stateValue}
            >
              {count}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <Row gap="8" horizontal="center">
          <motion.button
            className={styles.counterButton}
            onClick={handleDecrement}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            −
          </motion.button>
          <motion.button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={handleReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Reset
          </motion.button>
          <motion.button
            className={styles.counterButton}
            onClick={handleIncrement}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            +
          </motion.button>
        </Row>

        {/* Code preview */}
        <div className={styles.codeBlock}>
{`const [count, setCount] = useState(${count});

useEffect(() => {
  // Triggered on count change
  console.log("Count:", ${count});
}, [count]);

// Last action: ${lastAction}`}
        </div>
      </div>
    </DemoContainer>
  );
}

export default ReactDemo;
