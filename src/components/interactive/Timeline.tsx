"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Column, Row, Text, Tag } from "@once-ui-system/core";
import { GlassCard } from "./GlassCard";
import { Lightbox } from "./Lightbox";
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
  featured?: boolean;
  stack?: string[];
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
  featured = false,
  stack = [],
}: TimelineItemProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (src: string, alt: string) => {
    setActiveMedia({ src, alt });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveMedia(null);
  };

  return (
    <>
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
                repeat: Number.POSITIVE_INFINITY,
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
                  <Row gap="12" vertical="center" wrap>
                    <Text id={company} variant="heading-strong-l">
                      {company}
                    </Text>
                    {featured && (
                      <Tag size="s" label="Featured" onSolid="brand-medium" />
                    )}
                  </Row>
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
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${company}-achievement-${typeof achievement === 'string' ? achievement : i}`}
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

              {/* Tech Stack */}
              {stack.length > 0 && (
                <Row gap="8" wrap paddingTop="8">
                  {stack.map((tech) => (
                    <Tag
                      key={`${company}-tech-${tech}`}
                      size="s"
                      label={tech}
                      onSolid="neutral-weak"
                    />
                  ))}
                </Row>
              )}

              {/* Images & Videos */}
              {images.length > 0 && (
                <Row fillWidth gap="12" wrap paddingTop="8">
                  {images.map((image, i) => {
                    const isVideo = image.src.endsWith('.mp4') || image.src.endsWith('.webm') || image.src.endsWith('.mov');
                    return (
                      <motion.div
                        key={`${company}-media-${image.src}`}
                        variants={imageVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={i}
                        className={styles.imageWrapper}
                      >
                        <button
                          type="button"
                          onClick={() => openLightbox(image.src, image.alt)}
                          className={styles.mediaButton}
                          style={{
                            aspectRatio: `${image.width}/${image.height}`,
                          }}
                          aria-label={`View ${image.alt}`}
                        >
                          <div className={isVideo ? styles.videoContainer : styles.mediaContainer}>
                            {isVideo ? (
                              <video
                                src={image.src}
                                muted
                                loop
                                playsInline
                                className={styles.mediaThumbnail}
                                onMouseEnter={(e) => e.currentTarget.play()}
                                onMouseLeave={(e) => {
                                  e.currentTarget.pause();
                                  e.currentTarget.currentTime = 0;
                                }}
                              >
                                <track kind="captions" />
                              </video>
                            ) : (
                              <img
                                src={image.src}
                                alt={image.alt}
                                className={styles.mediaThumbnail}
                              />
                            )}
                            <div className={styles.mediaOverlay}>
                              <span className={styles.expandIcon}>⤢</span>
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    );
                  })}
                </Row>
              )}
            </Column>
          </GlassCard>
        </motion.div>
      </Row>

      {/* Lightbox Modal */}
      {activeMedia && (
        <Lightbox
          src={activeMedia.src}
          alt={activeMedia.alt}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

interface TimelineProps {
  experiences: {
    company: string;
    role: string;
    timeframe: string;
    achievements: ReactNode[];
    images?: TimelineImage[];
    featured?: boolean;
    stack?: string[];
  }[];
}

export function Timeline({ experiences }: TimelineProps) {
  return (
    <Column fillWidth gap="0" className={styles.timeline}>
      {experiences.map((experience, index) => (
        <TimelineItem
          key={`experience-${experience.company}-${experience.timeframe}`}
          {...experience}
          index={index}
          isLast={index === experiences.length - 1}
        />
      ))}
    </Column>
  );
}

export default Timeline;
