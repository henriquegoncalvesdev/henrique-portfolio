"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Column, Text } from "@once-ui-system/core";
import styles from "./ProgressTOC.module.scss";

interface ProgressTOCProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  showSubItems?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const subItemVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.1 },
    },
  },
};

export function ProgressTOC({ structure, showSubItems = false }: ProgressTOCProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [activeItem, setActiveItem] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const visibleSections = structure.filter((section) => section.display);

  // Calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    visibleSections.forEach((section) => {
      const element = document.getElementById(section.title);
      if (element) sectionObserver.observe(element);

      // Observe sub-items
      section.items.forEach((item) => {
        const itemElement = document.getElementById(item);
        if (itemElement) itemObserver.observe(itemElement);
      });
    });

    return () => {
      sectionObserver.disconnect();
      itemObserver.disconnect();
    };
  }, [visibleSections]);

  const scrollTo = useCallback((id: string, offset = 80) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const getSectionProgress = (sectionIndex: number): number => {
    const sectionCount = visibleSections.length;
    const sectionSize = 100 / sectionCount;
    const sectionStart = sectionIndex * sectionSize;
    const sectionEnd = (sectionIndex + 1) * sectionSize;

    if (scrollProgress < sectionStart) return 0;
    if (scrollProgress >= sectionEnd) return 100;

    return ((scrollProgress - sectionStart) / sectionSize) * 100;
  };

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Global progress bar */}
      <div className={styles.progressTrack}>
        <motion.div
          className={styles.progressFill}
          style={{ height: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <Column gap="24" className={styles.nav}>
        {visibleSections.map((section, sectionIndex) => {
          const isActive = activeSection === section.title;
          const sectionProgress = getSectionProgress(sectionIndex);
          const isPast = sectionProgress >= 100;

          return (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className={styles.section}
            >
              {/* Section dot and line */}
              <div className={styles.sectionTrack}>
                <motion.div
                  className={`${styles.dot} ${isActive ? styles.dotActive : ""} ${isPast ? styles.dotPast : ""}`}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    backgroundColor: isActive
                      ? "var(--brand-solid-strong)"
                      : isPast
                        ? "var(--brand-solid-medium)"
                        : "var(--neutral-alpha-medium)",
                  }}
                  transition={{ duration: 0.2 }}
                />
                {sectionIndex < visibleSections.length - 1 && (
                  <div className={styles.sectionLine}>
                    <motion.div
                      className={styles.sectionLineFill}
                      style={{ height: `${sectionProgress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Section content */}
              <div className={styles.sectionContent}>
                <motion.button
                  className={`${styles.sectionButton} ${isActive ? styles.sectionButtonActive : ""}`}
                  onClick={() => scrollTo(section.title)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Text
                    variant={isActive ? "label-strong-s" : "label-default-s"}
                    onBackground={isActive ? "brand-strong" : "neutral-weak"}
                  >
                    {section.title}
                  </Text>
                </motion.button>

                {/* Sub-items */}
                <AnimatePresence>
                  {showSubItems && isActive && section.items.length > 0 && (
                    <motion.div
                      variants={subItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={styles.subItems}
                    >
                      {section.items.map((item) => {
                        const isItemActive = activeItem === item;
                        return (
                          <motion.button
                            key={item}
                            className={`${styles.subItemButton} ${isItemActive ? styles.subItemButtonActive : ""}`}
                            onClick={() => scrollTo(item)}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className={`${styles.subDot} ${isItemActive ? styles.subDotActive : ""}`} />
                            <Text
                              variant="body-default-xs"
                              onBackground={isItemActive ? "brand-medium" : "neutral-weak"}
                            >
                              {item}
                            </Text>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </Column>
    </motion.div>
  );
}

export default ProgressTOC;
