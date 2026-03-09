import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react";
import { FiMessageCircle, FiThumbsUp } from "react-icons/fi";
import Card from "../ui/Card";
import { useDashboardColors } from "../ui/dashboardTheme";

export interface PostCardProps {
  authorName: string;
  authorInitials?: string;
  timeAgo: string;
  title: string;
  content: string;
  likeCount?: string;
  commentCount?: string;
  hotCount?: string;
}

export default function PostCard({
  authorName,
  authorInitials,
  timeAgo,
  title,
  content,
  likeCount = "0",
  commentCount = "0",
  hotCount,
}: PostCardProps) {
  const { text, muted, border } = useDashboardColors();

  return (
    <Card>
      <HStack spacing={3} align="flex-start">
        <Avatar
          size="sm"
          name={authorInitials ?? authorName}
          bgGradient="linear(140deg, #3a6dbe, #10316c)"
        />
        <Box flex={1} minW={0}>
          <Text fontSize="sm" fontWeight="600" color={text}>
            {authorName}
          </Text>
          <Text fontSize="xs" color={muted}>
            {timeAgo}
          </Text>
        </Box>
      </HStack>

      <Text mt={3} fontSize="sm" fontWeight="600" color={text}>
        {title}
      </Text>
      <Text mt={2} fontSize="xs" color={muted} lineHeight="tall">
        {content}
      </Text>

      <Flex
        mt={3}
        pt={3}
        borderTop={`1px solid ${border}`}
        justify="space-between"
        align="center"
        color={muted}
        fontSize="xs"
      >
        {hotCount ? (
          <Text display="flex" alignItems="center" gap={1}>
            <FiThumbsUp size={12} />
            Hot {hotCount}
          </Text>
        ) : (
          <Text>Likes {likeCount}</Text>
        )}
        <Text display="flex" alignItems="center" gap={1}>
          <FiMessageCircle size={12} />
          {commentCount} Comments
        </Text>
      </Flex>
    </Card>
  );
}
