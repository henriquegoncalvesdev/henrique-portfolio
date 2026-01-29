"use client";

import { motion, type Variants } from "framer-motion";
import { Column, Row, Text, Media } from "@once-ui-system/core";
import { GlassCard } from "./GlassCard";
import styles from "./Timeline.module.scss";
import type { ReactNode } from "react";

interface TimelineImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface TimelineItemProps {
  company: string;
  role: string;
  timeframe: string;
  achievements: ReactNode[];
  images?: TimelineImage[];
  index: number;
  isLast?: boolean;
}

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const achievementVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.4,
    },
  }),
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function TimelineItem({
  company,
  role,
  timeframe,
  achievements,
  images = [],
  index,
  isLast = false,
}: TimelineItemProps) {
  return (
    <Row fillWidth className={styles.timelineItem}>
      {/* Timeline track */}
      <Column horizontal="center" className={styles.track}>
        <motion.div
          className={styles.dot}
          variants={dotVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className={styles.dotPulse}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        {!isLast && (
          <motion.div
            className={styles.line}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          />
        )}
      </Column>

      {/* Content */}
      <motion.div
        className={styles.content}
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <GlassCard delay={index} hover={false}>
          <Column gap="16" fillWidth>
            {/* Header */}
            <Row fillWidth horizontal="between" vertical="start" wrap gap="8">
              <Column gap="4">
                <Text id={company} variant="heading-strong-l">
                  {company}
                </Text>
                <Text variant="body-default-s" onBackground="brand-weak">
                  {role}
                </Text>
              </Column>
              <Text variant="heading-default-xs" onBackground="neutral-weak" className={styles.timeframe}>
                {timeframe}
              </Text>
            </Row>

            {/* Achievements */}
            <Column as="ul" gap="12" className={styles.achievements}>
              {achievements.map((achievement, i) => (
                <motion.li
                  key={`${company}-achievement-${i}`}
                  variants={achievementVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className={styles.achievementItem}
                >
                  <Text variant="body-default-m">{achievement}</Text>
                </motion.li>
              ))}
            </Column>

            {/* Images */}
            {images.length > 0 && (
              <Row fillWidth gap="12" wrap paddingTop="8">
                {images.map((image, i) => (
                  <motion.div
                    key={`${company}-img-${i}`}
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className={styles.imageWrapper}
                  >
                    <Row
                      border="neutral-medium"
                      radius="m"
                      style={{
                        aspectRatio: `${image.width}/${image.height}`,
                      }}
                      className={styles.imageContainer}
                    >
                      <Media
                        enlarge
                        radius="m"
                        sizes="300px"
                        alt={image.alt}
                        src={image.src}
                      />
                    </Row>
                  </motion.div>
                ))}
              </Row>
            )}
          </Column>
        </GlassCard>
      </motion.div>
    </Row>
  );
}

interface TimelineProps {
  experiences: {
    company: string;
    role: string;
    timeframe: string;
    achievements: ReactNode[];
    images?: TimelineImage[];
  }[];
}

export function Timeline({ experiences }: TimelineProps) {
  return (
    <Column fillWidth gap="0" className={styles.timeline}>
      {experiences.map((experience, index) => (
        <TimelineItem
          key={`${experience.company}-${experience.role}-${index}`}
          {...experience}
          index={index}
          isLast={index === experiences.length - 1}
        />
      ))}
    </Column>
  );
}

export default Timeline;
