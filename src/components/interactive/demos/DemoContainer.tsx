"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Row, Column, Text, Icon } from "@once-ui-system/core";
import styles from "./demos.module.scss";

interface DemoContainerProps {
  title: string;
  children: ReactNode;
  mobilePreview?: ReactNode;
  allowFullscreen?: boolean;
}

export function DemoContainer({
  title,
  children,
  mobilePreview,
  allowFullscreen = true,
}: DemoContainerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      {/* Desktop view */}
      <div className={styles.demoContainer}>
        <Row
          horizontal="between"
          vertical="center"
          className={styles.demoHeader}
          paddingBottom="12"
        >
          <Text variant="label-default-s" onBackground="neutral-weak">
            {title}
          </Text>
          {allowFullscreen && (
            <Dialog.Root open={isFullscreen} onOpenChange={setIsFullscreen}>
              <Dialog.Trigger asChild>
                <motion.button
                  className={styles.fullscreenButton}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View fullscreen"
                >
                  <Icon name="arrowUpRightFromSquare" size="xs" />
                </motion.button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className={styles.dialogOverlay} />
                <Dialog.Content className={styles.dialogContent}>
                  <Column fillWidth fillHeight padding="24" gap="16">
                    <Row horizontal="between" vertical="center">
                      <Dialog.Title asChild>
                        <Text variant="heading-strong-m">{title}</Text>
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <motion.button
                          className={styles.closeButton}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Close"
                        >
                          <Icon name="x" size="s" />
                        </motion.button>
                      </Dialog.Close>
                    </Row>
                    <div className={styles.dialogBody}>{children}</div>
                  </Column>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          )}
        </Row>

        {/* Desktop: Full demo */}
        <div className={styles.desktopDemo}>{children}</div>

        {/* Mobile: Simplified preview */}
        <div className={styles.mobileDemo}>{mobilePreview || children}</div>
      </div>
    </>
  );
}

export default DemoContainer;
