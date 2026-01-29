"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Column, Row, Text, Tag, Icon, Media } from "@once-ui-system/core";
import { GlassCard } from "./GlassCard";
import styles from "./SkillCard.module.scss";

interface SkillImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface SkillTag {
  name: string;
  icon?: string;
}

interface SkillCardProps {
  title: string;
  description: React.ReactNode;
  tags: SkillTag[];
  images?: SkillImage[];
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

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export function SkillCard({
  title,
  description,
  tags,
  images = [],
  index = 0,
}: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasImages = images.length > 0;

  return (
    <GlassCard delay={index} hover={true} onClick={() => setIsExpanded(!isExpanded)}>
      <Column gap="16" fillWidth>
        {/* Header - always visible */}
        <Row fillWidth horizontal="between" vertical="center">
          <Row gap="12" vertical="center">
            <Text id={title} variant="heading-strong-l">
              {title}
            </Text>
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
              key={`${title}-${tag.name}`}
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
            >
              <Column gap="16" paddingTop="8">
                {/* Description */}
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {description}
                </Text>

                {/* Images */}
                {hasImages && (
                  <Row fillWidth gap="12" wrap paddingTop="8">
                    {images.map((image, imgIndex) => (
                      <motion.div
                        key={`${title}-img-${imgIndex}`}
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        custom={imgIndex}
                        className={styles.imageWrapper}
                      >
                        <Row
                          border="neutral-medium"
                          radius="m"
                          style={{
                            aspectRatio: `${image.width}/${image.height}`,
                            minWidth: "200px",
                            maxWidth: "300px",
                          }}
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint for expandable content */}
        {!isExpanded && (hasImages || description) && (
          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.hint}>
            Click to {hasImages ? "see examples" : "expand"}
          </Text>
        )}
      </Column>
    </GlassCard>
  );
}

export default SkillCard;
