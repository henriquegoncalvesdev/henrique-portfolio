"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Column, Row, Text, Tag, Icon } from "@once-ui-system/core";
import { GlassCard } from "./GlassCard";
import { demoRegistry } from "./demos";
import styles from "./SkillCard.module.scss";

interface SkillTag {
  name: string;
  icon?: string;
}

interface SkillCardProps {
  title: string;
  description: React.ReactNode;
  tags: SkillTag[];
  index?: number;
}

const contentVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

function DemoLoader() {
  return (
    <div className={styles.demoLoader}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Icon name="arrowRight" size="m" onBackground="neutral-weak" />
      </motion.div>
      <Text variant="body-default-s" onBackground="neutral-weak">
        Loading demo...
      </Text>
    </div>
  );
}

export function SkillCard({
  title,
  description,
  tags,
  index = 0,
}: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Check if there's a demo for this skill
  const DemoComponent = demoRegistry[title];
  const hasDemo = !!DemoComponent;

  return (
    <GlassCard delay={index} hover={true} onClick={() => setIsExpanded(!isExpanded)}>
      <Column gap="16" fillWidth>
        {/* Header - always visible */}
        <Row fillWidth horizontal="between" vertical="center">
          <Row gap="12" vertical="center">
            <Text id={title} variant="heading-strong-l">
              {title}
            </Text>
            {hasDemo && (
              <motion.div
                className={styles.interactiveBadge}
                animate={{ opacity: isExpanded ? 0 : 1 }}
              >
                <Icon name="sparkle" size="xs" />
                <span>Interactive</span>
              </motion.div>
            )}
          </Row>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={styles.expandIcon}
          >
            <Icon name="chevronDown" size="s" onBackground="neutral-weak" />
          </motion.div>
        </Row>

        {/* Tags - always visible with stagger animation */}
        <Row wrap gap="8">
          {tags.map((tag, tagIndex) => (
            <motion.div
              key={`${title}-tag-${tagIndex}`}
              variants={tagVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={tagIndex}
            >
              <Tag
                size="l"
                prefixIcon={tag.icon}
                className={styles.tag}
              >
                {tag.name}
              </Tag>
            </motion.div>
          ))}
        </Row>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              style={{ overflow: "hidden" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Column gap="16" paddingTop="8">
                {/* Description */}
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {description}
                </Text>

                {/* Interactive Demo */}
                {hasDemo && (
                  <Suspense fallback={<DemoLoader />}>
                    <DemoComponent />
                  </Suspense>
                )}
              </Column>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint for expandable content */}
        {!isExpanded && (
          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.hint}>
            Click to {hasDemo ? "try interactive demo" : "expand"}
          </Text>
        )}
      </Column>
    </GlassCard>
  );
}

export default SkillCard;
