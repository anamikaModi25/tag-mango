import React, { useRef, useState } from "react";
import Card from "./Card";
import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Text,
  Button,
  Image,
  Center,
} from "@chakra-ui/react";
import { useChallengeColors } from "./challengeTheme";
import { FiMoreHorizontal, FiPlay } from "react-icons/fi";
import { AiFillPushpin } from "react-icons/ai";
import { FiMessageCircle, FiSmile } from "react-icons/fi";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".ogg", ".m3u8"];

function isVideoUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => lower.includes(ext));
}

interface IProps {
  authorName: string;
  timeAgo: string;
  content?: string;
  likeCount?: string;
  commentCount?: string;
  hotCount?: string;
  isPinned?: boolean;
  url?: string;
  children?: React.ReactNode;
  topBanner?: React.ReactNode;
  mediaSrc?: string;
  mediaAlt?: string;
  mediaType?: "image" | "video";
  mediaHeight?: { base: string; md: string } | string;
  actionsLeft?: React.ReactNode;
  actionsRight?: React.ReactNode;
}

const PostCard: React.FC<IProps> = ({
  authorName,
  timeAgo,
  likeCount,
  commentCount,
  isPinned,
  url,
  children,
  topBanner,
  mediaSrc,
  mediaAlt = "Post media",
  mediaType,
  mediaHeight = { base: "170px", sm: "180px", md: "188px" },
  actionsLeft,
  actionsRight,
}) => {
  const { text, muted, border, card } = useChallengeColors();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const isVideo =
    mediaType === "video" ||
    (mediaType !== "image" && mediaSrc && isVideoUrl(mediaSrc));

  const handlePlayClick = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setVideoPlaying(!videoPlaying);
  };

  const cardContent = (
    <>
      {isPinned && (
        <Box
          color={text}
          fontSize={{ base: "12px", md: "13px" }}
          fontWeight={600}
          px={{ base: 3, md: 4 }}
          py={2}
          borderBottom="1px solid"
          borderColor={border}
          display="flex"
          alignItems="center"
          gap={2}
        >
          <AiFillPushpin size={14} />
          This is a pinned post
        </Box>
      )}
      <Box padding={{ base: 3, md: 4 }}>
        <HStack justify="space-between" align="start">
          <HStack align="start" spacing={{ base: 3, md: 4 }}>
            <Avatar size="md" name={authorName} src={url} />
            <Box>
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={600}
                lineHeight="24px"
                color={text}
              >
                {authorName}
              </Text>
              <Text
                fontSize={{ base: "12px", md: "13px" }}
                color={muted}
              >
                {timeAgo}
              </Text>
            </Box>
          </HStack>
          <FiMoreHorizontal size={16} color={muted} />
        </HStack>
        <Text
          mt={3}
          fontSize={{ base: "13px", md: "14px" }}
          lineHeight="1.5"
          color={text}
        >
          {children}
        </Text>
        {mediaSrc ? (
          isVideo ? (
            <Box
              position="relative"
              mt={3}
              borderRadius="8px"
              overflow="hidden"
              cursor="pointer"
              h={mediaHeight}
              onClick={handlePlayClick}
            >
              <video
                ref={videoRef}
                src={mediaSrc}
                muted
                playsInline
                loop
                onPlay={() => setVideoPlaying(true)}
                onPause={() => setVideoPlaying(false)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {!videoPlaying && (
                <Center
                  position="absolute"
                  inset={0}
                  bg="blackAlpha.400"
                  transition="opacity 0.2s"
                  _hover={{ bg: "blackAlpha.500" }}
                >
                  <Center
                    w="56px"
                    h="56px"
                    borderRadius="full"
                    bg="whiteAlpha.900"
                    color="gray.800"
                  >
                    <FiPlay size={28} style={{ marginLeft: 4 }} />
                  </Center>
                </Center>
              )}
            </Box>
          ) : (
            <Image
              src={mediaSrc}
              alt={mediaAlt}
              borderRadius="8px"
              mt={3}
              h={mediaHeight}
              w="100%"
              objectFit="cover"
            />
          )
        ) : null}
        <HStack justify="space-between" align="center" mt={4}>
          {actionsLeft ? (
            actionsLeft
          ) : (
            <HStack>
              <Button
                colorScheme="gray"
                rounded="full"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Text as="span" fontSize="sm">🙏</Text>
                <Text as="span" fontSize="sm">❤️</Text>
                {likeCount}
              </Button>
              <IconButton
                rounded="full"
                aria-label="Like"
                icon={<FiSmile size={12} />}
              />
              <IconButton
                rounded="full"
                aria-label="Comment"
                icon={<FiMessageCircle size={12} />}
              />
            </HStack>
          )}
          {actionsRight ? (
            actionsRight
          ) : (
            <Text mt={2} fontSize="xs" color={muted}>
              {commentCount} Comments
            </Text>
          )}
        </HStack>
      </Box>
    </>
  );

  const cardProps = {
    padding: 0,
    bg: card,
    borderColor: border,
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    _hover: { boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
  };

  const contentBoxProps = topBanner
    ? {
        mt: "-16px",
        bg: card,
        borderRadius: "28px",
        position: "relative" as const,
        zIndex: 1,
        boxShadow: "0 -2px 8px rgba(0,0,0,0.04)",
      }
    : undefined;

  return (
    <Card {...cardProps}>
      {topBanner}
      {topBanner ? (
        <Box {...contentBoxProps}>{cardContent}</Box>
      ) : (
        cardContent
      )}
    </Card>
  );
};

export default PostCard;
