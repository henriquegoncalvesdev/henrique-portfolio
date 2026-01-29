"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Column, Row, Text, Icon } from "@once-ui-system/core";
import { DemoContainer } from "./DemoContainer";
import styles from "./demos.module.scss";

const breakpoints = [
  { name: "mobile", width: 320, icon: "mobile" },
  { name: "tablet", width: 768, icon: "grid" },
  { name: "desktop", width: 1024, icon: "home" },
];

export function StylingDemo() {
  const [viewportWidth, setViewportWidth] = useState(400);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const getCurrentBreakpoint = () => {
    if (viewportWidth < 480) return "mobile";
    if (viewportWidth < 768) return "tablet";
    return "desktop";
  };

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newWidth = Math.max(200, Math.min(600, e.clientX - rect.left));
    setViewportWidth(newWidth);
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const currentBreakpoint = getCurrentBreakpoint();

  const mobilePreview = (
    <Column gap="12" horizontal="center">
      <Text variant="body-default-s" onBackground="neutral-weak">
        Responsive breakpoint system
      </Text>
      <Row gap="8">
        <div className={styles.badge}>Tailwind</div>
        <div className={styles.badge}>Mobile-first</div>
      </Row>
    </Column>
  );

  return (
    <DemoContainer title="Responsive Design Demo" mobilePreview={mobilePreview}>
      <div className={styles.stylingDemo}>
        {/* Breakpoint indicators */}
        <div className={styles.breakpointIndicator}>
          {breakpoints.map((bp) => (
            <div
              key={bp.name}
              className={`${styles.breakpointBadge} ${
                currentBreakpoint === bp.name ? styles.active : ""
              }`}
            >
              <Icon name={bp.icon as any} size="xs" />
              {bp.name} ({bp.width}px)
            </div>
          ))}
        </div>

        {/* Viewport container with resize handle */}
        <div
          ref={containerRef}
          className={styles.viewportContainer}
          style={{ width: viewportWidth }}
        >
          <motion.div
            className={styles.viewportContent}
            layout
            transition={{ duration: 0.2 }}
          >
            {/* Mock responsive component */}
            <Column gap="12">
              <motion.div
                layout
                style={{
                  display: "flex",
                  flexDirection: currentBreakpoint === "mobile" ? "column" : "row",
                  gap: "12px",
                }}
              >
                <motion.div
                  layout
                  style={{
                    flex: currentBreakpoint === "desktop" ? 2 : 1,
                    padding: "16px",
                    background: "var(--brand-alpha-weak)",
                    borderRadius: "8px",
                  }}
                >
                  <Text variant="label-default-s">Main Content</Text>
                </motion.div>
                <motion.div
                  layout
                  style={{
                    flex: 1,
                    padding: "16px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <Text variant="label-default-s">Sidebar</Text>
                </motion.div>
              </motion.div>

              <Row gap="8" wrap style={{ justifyContent: currentBreakpoint === "mobile" ? "center" : "flex-start" }}>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    layout
                    style={{
                      width: currentBreakpoint === "mobile" ? "100%" : currentBreakpoint === "tablet" ? "45%" : "30%",
                      padding: "12px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "6px",
                      textAlign: "center",
                    }}
                  >
                    <Text variant="body-default-xs">Card {i}</Text>
                  </motion.div>
                ))}
              </Row>
            </Column>
          </motion.div>

          {/* Resize handle */}
          <div className={styles.resizeHandle} onMouseDown={handleMouseDown} />
        </div>

        {/* Width indicator */}
        <Row horizontal="between" vertical="center">
          <Text variant="body-default-xs" onBackground="neutral-weak">
            Drag to resize: {viewportWidth}px
          </Text>
          <Row gap="8">
            {breakpoints.map((bp) => (
              <motion.button
                key={bp.name}
                className={`${styles.button} ${styles.buttonSecondary}`}
                onClick={() => setViewportWidth(bp.width > 600 ? 600 : bp.width)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontSize: "0.7rem", padding: "4px 8px" }}
              >
                {bp.name}
              </motion.button>
            ))}
          </Row>
        </Row>
      </div>
    </DemoContainer>
  );
}

export default StylingDemo;
