"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Column, Row, Text, Icon } from "@once-ui-system/core";
import { DemoContainer } from "./DemoContainer";
import styles from "./demos.module.scss";

type RequestStatus = "idle" | "loading" | "success" | "error";

interface MockUser {
  id: number;
  name: string;
  email: string;
}

const mockUsers: MockUser[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

export function BackendDemo() {
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [data, setData] = useState<MockUser[] | null>(null);
  const [operation, setOperation] = useState<string>("GET");

  const simulateRequest = async (op: string) => {
    setOperation(op);
    setStatus("loading");
    setData(null);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));

    // Simulate occasional errors
    if (Math.random() < 0.1) {
      setStatus("error");
      return;
    }

    setStatus("success");
    if (op === "GET") {
      setData(mockUsers);
    } else if (op === "POST") {
      setData([{ id: 4, name: "New User", email: "new@example.com" }]);
    } else if (op === "DELETE") {
      setData([]);
    }
  };

  const mobilePreview = (
    <Column gap="12" horizontal="center">
      <Text variant="body-default-s" onBackground="neutral-weak">
        REST API simulation
      </Text>
      <Row gap="8">
        <div className={styles.badge}>Node.js</div>
        <div className={styles.badge}>Express</div>
        <div className={styles.badge}>MySQL</div>
      </Row>
    </Column>
  );

  return (
    <DemoContainer title="Backend API Demo" mobilePreview={mobilePreview}>
      <div className={styles.backendDemo}>
        {/* API visualization */}
        <div className={styles.apiVisual}>
          <div className={styles.apiBox}>
            <Text variant="label-default-s">Client</Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              React App
            </Text>
          </div>

          <div className={styles.apiArrow}>
            <span>{operation}</span>
            <div className={styles.dataFlow} />
            <span>Response</span>
          </div>

          <div className={styles.apiBox}>
            <Text variant="label-default-s">Server</Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Express API
            </Text>
          </div>

          <div className={styles.apiArrow}>
            <span>Query</span>
            <div className={styles.dataFlow} />
            <span>Data</span>
          </div>

          <div className={styles.apiBox}>
            <Text variant="label-default-s">Database</Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              MySQL
            </Text>
          </div>
        </div>

        {/* Controls */}
        <Row gap="8" wrap>
          <motion.button
            className={styles.button}
            onClick={() => simulateRequest("GET")}
            disabled={status === "loading"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            GET /users
          </motion.button>
          <motion.button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={() => simulateRequest("POST")}
            disabled={status === "loading"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            POST /users
          </motion.button>
          <motion.button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={() => simulateRequest("DELETE")}
            disabled={status === "loading"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            DELETE /users/1
          </motion.button>
        </Row>

        {/* Status and Response */}
        <Column gap="8">
          <Row gap="8" vertical="center">
            <Text variant="label-default-s">Status:</Text>
            <AnimatePresence mode="wait">
              <motion.div
                key={`status-${status}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`${styles.statusIndicator} ${styles[status]}`}
              >
                <span className={styles.statusDot} />
                {status === "loading" ? "Loading..." : status === "success" ? "200 OK" : status === "error" ? "500 Error" : "Ready"}
              </motion.div>
            </AnimatePresence>
          </Row>

          <div className={styles.responseBox}>
            <AnimatePresence mode="wait">
              {status === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Fetching data...
                </motion.div>
              )}
              {status === "success" && data && (
                <motion.pre
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {JSON.stringify({ status: 200, data }, null, 2)}
                </motion.pre>
              )}
              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ color: "#ef4444" }}
                >
                  {`{ "error": "Internal Server Error" }`}
                </motion.div>
              )}
              {status === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ color: "var(--neutral-on-background-weak)" }}
                >
                  Click a button to make a request
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Column>
      </div>
    </DemoContainer>
  );
}

export default BackendDemo;
