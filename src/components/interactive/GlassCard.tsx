"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./GlassCard.module.scss";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  onClick?: () => void;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: delay * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const hoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
  },
};

export function GlassCard({
  children,
  className = "",
  delay = 0,
  hover = true,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={`${styles.glass} ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
      {...(hover && {
        whileHover: "hover",
        whileTap: onClick ? "tap" : undefined,
      })}
      {...(hover && { variants: { ...cardVariants, ...hoverVariants } })}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <motion.div
        className={styles.glassContent}
        initial="rest"
        whileHover="hover"
        variants={hoverVariants}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default GlassCard;
