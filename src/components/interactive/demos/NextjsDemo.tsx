"use client";

import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { Column, Row, Text, Icon } from "@once-ui-system/core";
import { DemoContainer } from "./DemoContainer";
import styles from "./demos.module.scss";

const renderingModes = [
  {
    id: "ssr",
    label: "SSR",
    title: "Server-Side Rendering",
    description: "Page rendered on each request",
    steps: ["Request", "Server Render", "HTML Response", "Hydration"],
    benefit: "SEO friendly, fresh data",
  },
  {
    id: "ssg",
    label: "SSG",
    title: "Static Site Generation",
    description: "Page pre-rendered at build time",
    steps: ["Build", "Static HTML", "CDN Cache", "Instant Load"],
    benefit: "Fastest performance",
  },
  {
    id: "isr",
    label: "ISR",
    title: "Incremental Static Regeneration",
    description: "Static with background revalidation",
    steps: ["Static Serve", "Stale Check", "Background Rebuild", "Fresh Cache"],
    benefit: "Best of both worlds",
  },
];

export function NextjsDemo() {
  const mobilePreview = (
    <Column gap="12" horizontal="center">
      <Text variant="body-default-s" onBackground="neutral-weak">
        Next.js rendering strategies
      </Text>
      <Row gap="8" wrap horizontal="center">
        {renderingModes.map((mode) => (
          <div key={mode.id} className={styles.badge}>
            {mode.label}
          </div>
        ))}
      </Row>
    </Column>
  );

  return (
    <DemoContainer title="Next.js Rendering Modes" mobilePreview={mobilePreview}>
      <Tabs.Root defaultValue="ssr" className={styles.tabsRoot}>
        <Tabs.List className={styles.tabsList}>
          {renderingModes.map((mode) => (
            <Tabs.Trigger
              key={mode.id}
              value={mode.id}
              className={styles.tabTrigger}
            >
              {mode.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {renderingModes.map((mode) => (
          <Tabs.Content key={mode.id} value={mode.id} asChild>
            <motion.div
              className={styles.tabContent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Column gap="16">
                <Column gap="4">
                  <Text variant="heading-strong-s">{mode.title}</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {mode.description}
                  </Text>
                </Column>

                Render flow visualization
                <div className={styles.renderFlow}>
                  {mode.steps.map((step, index) => (
                    <motion.div
                      key={`${mode.id}-step-${step}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <div className={styles.flowStep}>
                        <Icon name="arrowRight" size="xs" />
                        <span>{step}</span>
                      </div>
                      {index < mode.steps.length - 1 && (
                        <span className={styles.flowArrow}>→</span>
                      )}
                    </motion.div>
                  ))}
                </div>

                <Row gap="8" vertical="center">
                  <Icon name="sparkle" size="xs" onBackground="brand-weak" />
                  <Text variant="body-default-xs" onBackground="brand-weak">
                    {mode.benefit}
                  </Text>
                </Row>
              </Column>
            </motion.div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </DemoContainer>
  );
}

export default NextjsDemo;
