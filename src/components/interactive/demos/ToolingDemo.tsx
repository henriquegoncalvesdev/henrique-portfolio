"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Column, Row, Text, Icon } from "@once-ui-system/core";
import { DemoContainer } from "./DemoContainer";
import styles from "./demos.module.scss";

type StepStatus = "pending" | "active" | "completed" | "error";

interface PipelineStep {
  id: string;
  label: string;
  icon: string;
  duration: number;
}

const pipelineSteps: PipelineStep[] = [
  { id: "commit", label: "Commit", icon: "git", duration: 500 },
  { id: "build", label: "Build", icon: "code", duration: 1500 },
  { id: "test", label: "Test", icon: "sparkle", duration: 1200 },
  { id: "deploy", label: "Deploy", icon: "rocket", duration: 800 },
];

export function ToolingDemo() {
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>(
    pipelineSteps.reduce((acc, step) => ({ ...acc, [step.id]: "pending" }), {})
  );
  const [isRunning, setIsRunning] = useState(false);
  const [currentLog, setCurrentLog] = useState<Array<{ id: string; message: string }>>([]);

  const addLog = useCallback((message: string) => {
    const logEntry = {
      id: `${Date.now()}-${Math.random()}`,
      message: `[${new Date().toLocaleTimeString()}] ${message}`
    };
    setCurrentLog((prev) => [...prev.slice(-4), logEntry]);
  }, []);

  const runPipeline = async () => {
    setIsRunning(true);
    setStepStatuses(pipelineSteps.reduce((acc, step) => ({ ...acc, [step.id]: "pending" }), {}));
    setCurrentLog([]);

    for (const step of pipelineSteps) {
      addLog(`Starting ${step.label}...`);
      setStepStatuses((prev) => ({ ...prev, [step.id]: "active" }));

      await new Promise((resolve) => setTimeout(resolve, step.duration));

      // Simulate occasional test failure
      if (step.id === "test" && Math.random() < 0.15) {
        addLog(`❌ ${step.label} failed!`);
        setStepStatuses((prev) => ({ ...prev, [step.id]: "error" }));
        setIsRunning(false);
        return;
      }

      addLog(`✓ ${step.label} completed`);
      setStepStatuses((prev) => ({ ...prev, [step.id]: "completed" }));
    }

    addLog("🚀 Pipeline completed successfully!");
    setIsRunning(false);
  };

  const mobilePreview = (
    <Column gap="12" horizontal="center">
      <Text variant="body-default-s" onBackground="neutral-weak">
        CI/CD pipeline visualization
      </Text>
      <Row gap="8">
        <div className={styles.badge}>Git</div>
        <div className={styles.badge}>Vercel</div>
        <div className={styles.badge}>Docker</div>
      </Row>
    </Column>
  );

  return (
    <DemoContainer title="CI/CD Pipeline Demo" mobilePreview={mobilePreview}>
      <div className={styles.toolingDemo}>
        {/* Pipeline visualization */}
        <div className={styles.pipeline}>
          {pipelineSteps.map((step, index) => {
            const status = stepStatuses[step.id];
            return (
              <React.Fragment key={step.id}>
                <motion.div
                  className={`${styles.pipelineStep} ${styles[status]}`}
                  animate={{
                    scale: status === "active" ? 1.05 : 1,
                    opacity: status === "pending" ? 0.5 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={styles.stepIcon}
                    animate={{
                      backgroundColor:
                        status === "completed"
                          ? "rgba(34, 197, 94, 0.2)"
                          : status === "error"
                            ? "rgba(239, 68, 68, 0.2)"
                            : status === "active"
                              ? "var(--brand-alpha-medium)"
                              : "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {status === "active" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Icon name="arrowRight" size="s" />
                      </motion.div>
                    ) : status === "completed" ? (
                      <span style={{ color: "#22c55e" }}>✓</span>
                    ) : status === "error" ? (
                      <span style={{ color: "#ef4444" }}>✗</span>
                    ) : (
                      <Icon name={step.icon as any} size="s" />
                    )}
                  </motion.div>
                  <span className={styles.stepLabel}>{step.label}</span>
                </motion.div>

                {index < pipelineSteps.length - 1 && (
                  <motion.div
                    className={`${styles.pipelineConnector} ${
                      stepStatuses[step.id] === "completed" ? styles.active : ""
                    }`}
                    animate={{
                      backgroundColor:
                        stepStatuses[step.id] === "completed"
                          ? "var(--brand-solid-strong)"
                          : "rgba(255, 255, 255, 0.2)",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Controls */}
        <Row gap="12" vertical="center">
          <motion.button
            className={styles.button}
            onClick={runPipeline}
            disabled={isRunning}
            whileHover={{ scale: isRunning ? 1 : 1.02 }}
            whileTap={{ scale: isRunning ? 1 : 0.98 }}
          >
            {isRunning ? "Running..." : "▶ Run Pipeline"}
          </motion.button>
          
          <Row gap="8">
            {Object.values(stepStatuses).filter((s) => s === "completed").length > 0 && (
              <div className={`${styles.statusIndicator} ${styles.success}`}>
                <span className={styles.statusDot} />
                {Object.values(stepStatuses).filter((s) => s === "completed").length}/4 passed
              </div>
            )}
            {Object.values(stepStatuses).some((s) => s === "error") && (
              <div className={`${styles.statusIndicator} ${styles.error}`}>
                <span className={styles.statusDot} />
                Failed
              </div>
            )}
          </Row>
        </Row>

        {/* Logs */}
        <div className={styles.codeBlock} style={{ minHeight: "80px" }}>
          {currentLog.length === 0 ? (
            <span style={{ color: "var(--neutral-on-background-weak)" }}>
              Click "Run Pipeline" to start
            </span>
          ) : (
            currentLog.map((log, index) => (
              <motion.div
                key={`${log}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {log.message}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DemoContainer>
  );
}

export default ToolingDemo;
