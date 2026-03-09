import React from "react";
import Card from "./Card";
import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { useChallengeColors } from "./challengeTheme";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiFillPushpin } from "react-icons/ai";
import { FiMessageCircle, FiSmile } from "react-icons/fi";

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
  mediaHeight = { base: "170px", md: "188px" },
  actionsLeft,
  actionsRight,
}) => {
  const { text, muted, border } = useChallengeColors();
  return (
    <Card padding={0}>
      {topBanner}
      {isPinned && (
        <Box
          padding={10}
          color={text}
          fontSize="xs"
          fontWeight="600"
          px={2}
          py={1}
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
      <Box padding={3}>
        <HStack justify="space-between" align="start">
          <HStack align="start" spacing={3}>
            <Avatar size="md" name={authorName} src={url} />
            <Box>
              <Text fontSize="md" fontWeight="600" color={text}>
                {authorName}
              </Text>
              <Text fontSize="xs" color={muted}>
                {timeAgo}
              </Text>
            </Box>
          </HStack>
          <FiMoreHorizontal size={16} color={muted} />
        </HStack>
        <Text mt={3} fontSize="sm" color={text} lineHeight="tall">
          {children}
        </Text>
        {mediaSrc ? (
          <Image
            src={mediaSrc}
            alt={mediaAlt}
            borderRadius="8px"
            mt={3}
            h={mediaHeight}
            w="100%"
            objectFit="cover"
          />
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
                <Image src={"/images/HandSmily.png"} alt="hand" />
                <Image src={"/images/LikeSmily.png"} alt="Like" />
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
    </Card>
  );
};

export default PostCard;
