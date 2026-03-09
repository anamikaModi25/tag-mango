import {
  Avatar,
  AvatarGroup,
  Box,
  HStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import Card from "../ui/Card";
import { useDashboardColors } from "../ui/dashboardTheme";

export interface ChallengeCardProps {
  title: string;
  checkIns?: string;
  joined?: string;
  active?: boolean;
  onClick?: () => void;
}

export default function ChallengeCard({
  title,
  checkIns = "0 check-ins",
  joined = "0 joined",
  onClick,
}: ChallengeCardProps) {
  const { muted, text } = useDashboardColors();

  return (
    <Card
      cursor={onClick ? "pointer" : undefined}
      _hover={onClick ? { transform: "translateY(-1px)" } : undefined}
      transition="all 0.2s ease"
      onClick={onClick}
      background="transparent"
    >
      <HStack align="flex-start" spacing={3}>
        <Box flex={1} minW={0}>
          <Text fontSize="sm" fontWeight="600" lineHeight="tight">
            {title}
          </Text>
          <HStack mt={2} spacing={2} align="center" flexWrap="wrap">
            <Text color={text} fontSize="xs">
              <b>{checkIns}</b> check-ins
            </Text>
            <Divider orientation="vertical" height="14px" borderColor={muted} />
            <AvatarGroup size="xs" max={4} spacing="-2">
              <Avatar name="A" bg="blue.400" />
              <Avatar name="B" bg="green.400" />
              <Avatar name="C" bg="purple.400" />
            </AvatarGroup>
            <Text color={text} fontSize="xs">
              <b>{joined}</b> joined
            </Text>
          </HStack>
        </Box>
      </HStack>
    </Card>
  );
}
