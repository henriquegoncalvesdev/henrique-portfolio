"use client";

import {
  AvatarGroup,
  Media,
  Column,
  Flex,
  Heading,
  SmartLink,
  Tag,
  Text,
  Row,
} from "@once-ui-system/core";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  featured?: boolean;
  problem?: string;
  solution?: string;
  stack?: string[];
  outcome?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  featured = false,
  problem,
  solution,
  stack = [],
  outcome,
}) => {
  return (
    <Column fillWidth gap="m" className={styles.projectCard}>
      {/* Preview Section */}
      <div className={styles.previewWrapper}>
        {images.length > 0 && (
          <Media
            priority={priority}
            enlarge
            src={images[0]}
            alt={title}
            aspectRatio="16 / 9"
            sizes="(max-width: 960px) 100vw, 960px"
          />
        )}
      </div>

      {/* Content Section */}
      <Column
        fillWidth
        paddingX="l"
        paddingTop="16"
        paddingBottom="24"
        gap="24"
      >
        {/* Title + Featured Badge */}
        {title && (
          <Row fillWidth horizontal="between" vertical="center" gap="12">
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
            {featured && (
              <Tag size="s" label="Featured" onSolid="brand-medium" />
            )}
          </Row>
        )}

        <Column fillWidth gap="20" maxWidth="l">
          {/* Problem → Solution → Outcome */}
          {(problem || solution || outcome) && (
            <Column gap="20">
              {solution && (
                <Text variant="body-default-l" onBackground="neutral-medium" wrap="balance">
                  {solution}
                </Text>
              )}
              {problem && (
                <Text variant="body-default-s" onBackground="neutral-weak">
                  <strong>Problem:</strong> {problem}
                </Text>
              )}
              {outcome && (
                <Text variant="body-default-s" onBackground="neutral-weak">
                  <strong>Outcome:</strong> {outcome}
                </Text>
              )}
            </Column>
          )}

          {/* Fallback to original description if new fields not provided */}
          {!solution && !problem && description?.trim() && (
            <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
              {description}
            </Text>
          )}

          {/* Tech Stack */}
          {stack.length > 0 && (
            <Row gap="8" wrap>
              {stack.map((tech) => (
                <Tag
                  key={`${title}-tech-${tech}`}
                  size="s"
                  label={tech}
                  onSolid="neutral-weak"
                />
              ))}
            </Row>
          )}

          {/* CTAs */}
          <Flex gap="24" wrap>
            {content?.trim() && (
              <SmartLink
                suffixIcon="arrowRight"
                style={{ margin: "0", width: "fit-content" }}
                href={href}
              >
                <Text variant="body-default-s">Case Study</Text>
              </SmartLink>
            )}
            {link && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={link}
              >
                <Text variant="body-default-s">Live Demo</Text>
              </SmartLink>
            )}
          </Flex>

          {/* Team Avatars at bottom */}
          {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
        </Column>
      </Column>
    </Column>
  );
};
