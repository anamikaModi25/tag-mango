import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react";
import { FiMessageCircle } from "react-icons/fi";
import { IoHeartOutline } from "react-icons/io5";
import { HiOutlineEye } from "react-icons/hi";
import Card from "../ui/Card";
import { useDashboardColors } from "../ui/dashboardTheme";

export interface FeedPostCardProps {
  authorName: string;
  authorInitials?: string;
  timeAgo: string;
  /** Greeting/title line with emojis (e.g. "👋 Welcome to Our Community! ✨") */
  greeting: string;
  /** Body text with emojis */
  body: string;
  likeCount?: string;
  commentCount?: string;
}

export default function FeedPostCard({
  authorName,
  authorInitials,
  timeAgo,
  greeting,
  body,
  likeCount = "0",
  commentCount = "0",
}: FeedPostCardProps) {
  const { text, muted, border } = useDashboardColors();

  return (
    <Card>
      {/* Post header: avatar, name, timestamp */}
      <HStack spacing={3} align="flex-start" mb={4}>
        <Avatar
          size="sm"
          name={authorInitials ?? authorName}
          bgGradient="linear(140deg, #3a6dbe, #10316c)"
          flexShrink={0}
        />
        <Box flex={1} minW={0}>
          <Flex align="baseline" gap={2} flexWrap="wrap">
            <Text fontSize="sm" fontWeight="600" color={text}>
              {authorName}
            </Text>
            <Text fontSize="xs" color={muted}>
              {timeAgo}
            </Text>
          </Flex>
        </Box>
      </HStack>

      {/* Greeting - bold with emojis */}
      <Text
        fontSize={{ base: "sm", md: "md" }}
        fontWeight="600"
        color={text}
        mb={3}
        lineHeight="tall"
      >
        {greeting}
      </Text>

      {/* Body text */}
      <Text
        fontSize={{ base: "xs", md: "sm" }}
        color={muted}
        lineHeight="1.6"
        whiteSpace="pre-wrap"
      >
        {body}
      </Text>

      {/* Footer: reactions left, comments right */}
      <Flex
        mt={4}
        pt={4}
        borderTop={`1px solid ${border}`}
        justify="space-between"
        align="center"
        color={muted}
        fontSize="xs"
      >
        <HStack spacing={4}>
          <HStack spacing={1}>
            <IoHeartOutline size={14} />
            <Text>{likeCount}</Text>
          </HStack>
          <Box as={HiOutlineEye} size={14} />
          <HStack spacing={1}>
            <FiMessageCircle size={14} />
          </HStack>
        </HStack>
        <Text color={muted}>{commentCount} Comments</Text>
      </Flex>
    </Card>
  );
}
