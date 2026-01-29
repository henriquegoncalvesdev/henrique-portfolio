"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Column, Row, Text } from "@once-ui-system/core";
import { DemoContainer } from "./DemoContainer";
import styles from "./demos.module.scss";

function inferType(value: string): { type: string; color: string } {
  if (value === "") return { type: "undefined", color: "#6b7280" };
  if (value === "true" || value === "false") return { type: "boolean", color: "#f59e0b" };
  if (value === "null") return { type: "null", color: "#6b7280" };
  if (value === "undefined") return { type: "undefined", color: "#6b7280" };
  if (!isNaN(Number(value)) && value.trim() !== "") return { type: "number", color: "#22c55e" };
  if (value.startsWith("[") && value.endsWith("]")) return { type: "array", color: "#8b5cf6" };
  if (value.startsWith("{") && value.endsWith("}")) return { type: "object", color: "#ec4899" };
  if (value.startsWith('"') && value.endsWith('"')) return { type: "string", color: "#3b82f6" };
  if (value.startsWith("'") && value.endsWith("'")) return { type: "string", color: "#3b82f6" };
  return { type: "string", color: "#3b82f6" };
}

export function TypeScriptDemo() {
  const [inputValue, setInputValue] = useState('42');

  const typeInfo = useMemo(() => inferType(inputValue), [inputValue]);

  const mobilePreview = (
    <Column gap="12" horizontal="center">
      <Text variant="body-default-s" onBackground="neutral-weak">
        TypeScript type inference
      </Text>
      <Row gap="8">
        <div className={styles.badge}>Type Safety</div>
        <div className={styles.badge}>IntelliSense</div>
      </Row>
    </Column>
  );

  return (
    <DemoContainer title="TypeScript Type Inference" mobilePreview={mobilePreview}>
      <div className={styles.tsDemo}>
        <Column gap="8">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Enter a value to see type inference:
          </Text>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Try: 42, true, null, [1,2,3], {key: value}"
            className={styles.tsInput}
          />
        </Column>

        <AnimatePresence mode="wait">
          <motion.div
            key={typeInfo.type}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={styles.typeInference}
          >
            <span className={styles.typeLabel}>Inferred type:</span>
            <motion.span
              className={styles.typeValue}
              style={{ color: typeInfo.color }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3 }}
            >
              {typeInfo.type}
            </motion.span>
          </motion.div>
        </AnimatePresence>

        <div className={styles.codeBlock}>
{`// TypeScript infers the type automatically
const value = ${inputValue || "undefined"};
//    ^? const value: ${typeInfo.type}

// Type guard example
function process(input: unknown) {
  if (typeof input === "${typeInfo.type}") {
    // TypeScript knows input is ${typeInfo.type} here
    return input;
  }
}`}
        </div>

        <Row gap="8" wrap>
          {["42", "true", '"hello"', "[1, 2]", "null"].map((example) => (
            <motion.button
              key={example}
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={() => setInputValue(example)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ fontSize: "0.75rem", padding: "6px 12px" }}
            >
              {example}
            </motion.button>
          ))}
        </Row>
      </div>
    </DemoContainer>
  );
}

export default TypeScriptDemo;
