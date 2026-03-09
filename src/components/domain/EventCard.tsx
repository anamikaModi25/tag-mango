import { Avatar, Box, Grid, Text } from "@chakra-ui/react";
import Card from "../ui/Card";
import AppButton from "../ui/AppButton";
import { useDashboardColors } from "../ui/dashboardTheme";
import { PiVideoCameraThin } from "react-icons/pi";

export interface EventCardProps {
  title: string;
  time: string;
  hostName?: string;
  hostInitials?: string;
  live?: boolean;
  onJoin?: () => void;
  showJoinButton?: boolean;
  showBg?: boolean;
  noBg?: boolean;
}

export default function EventCard({
  title,
  time,
  hostName = "Host",
  hostInitials = "H",
  live = false,
  onJoin,
  showJoinButton = true,
  showBg = false,
  noBg = false,
}: EventCardProps) {
  const { muted, heroBg } = useDashboardColors();

  return (
    <Card
      sx={
        showBg
          ? {
              backgroundImage: heroBg,
              backgroundPosition: "bottom",
              backgroundSize: "cover",
            }
          : noBg
            ? {
                background: "transparent",
              }
            : {}
      }
    >
      <Grid
        templateColumns={
          showJoinButton
            ? { base: "40px 1fr auto", sm: "66px 1fr auto" }
            : "40px 1fr"
        }
        gap={3}
        alignItems="center"
      >
        <Box justifySelf="center" position="relative" flexShrink={0}>
          <Avatar
            size="md"
            name={hostInitials}
            bgGradient="linear(140deg, #3a6dbe, #10316c)"
            src="https://bit.ly/sage-adebayo"
          />
          {live && (
            <Box
              position="absolute"
              bottom="-7px"
              left="-8px"
              bg="red.500"
              color="white"
              fontSize="9px"
              fontWeight="700"
              px={1.5}
              py={0.5}
              borderRadius="full"
              whiteSpace="nowrap"
            >
              &#9675; LIVE NOW
            </Box>
          )}
        </Box>
        <Box minW={0}>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="600"
            lineHeight="tight"
            noOfLines={1}
          >
            {title}
          </Text>
          <Text
            mt={1}
            color={muted}
            fontSize="sm"
            display="flex"
            alignItems="center"
            gap={1}
          >
            {time}
          </Text>
        </Box>
        {showJoinButton && (
          <AppButton
            size="sm"
            color="white"
            bg="#b98405"
            _hover={{ bg: "#9f7304" }}
            onClick={onJoin}
            leftIcon={<PiVideoCameraThin />}
          >
            Join
          </AppButton>
        )}
      </Grid>
    </Card>
  );
}
