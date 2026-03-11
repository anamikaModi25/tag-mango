import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdNavigateBefore } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { useChallengeColors } from "../ui/challengeTheme";
import Sidebar, { getUnlockedDay, TOTAL_DAYS } from "../ui/SideBar";
import { FiInfo } from "react-icons/fi";
import { useResponsive } from "../../hooks/useResponsive";

const TOP_HEADER_HEIGHT = 56;

function DayChallengeLayout() {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const { border, text, muted, card, challengeMbBg, bg } = useChallengeColors();
  const headerBg = useColorModeValue(card, "#1D1D21B2");
  const [selectedDay, setSelectedDay] = useState(getUnlockedDay);

  if (isMobile) {
    return (
      <Box minH="100vh" data-challenge-page>
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          zIndex={9}
          sx={{
            backgroundImage: challengeMbBg,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        >
          <HStack
            color={text}
            pt={6}
            pb={10}
            justify="space-between"
            spacing={2}
            minH="48px"
          >
            <HStack spacing={2} flex={1} minW={0}>
              <Box flexShrink={0} as="span" onClick={() => navigate("/")}>
                <MdNavigateBefore size={24} />
              </Box>
              <Text
                fontWeight={700}
                fontSize={{ base: "14px", sm: "16px" }}
                lineHeight="24px"
                noOfLines={1}
              >
                Day {selectedDay} of {TOTAL_DAYS}
              </Text>
            </HStack>
            <Box flexShrink={0}>
              <FiInfo size={20} />
            </Box>
          </HStack>
          <Sidebar
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
          />
        </Box>
        <Box
          pt="180px"
          pb={6}
          px={4}
          bg={bg}
        >
          <Outlet />
        </Box>
      </Box>
    );
  }
  return (
    <Box minH="100vh" data-challenge-page>
      <Flex
        position="fixed"
        left={0}
        right={0}
        zIndex={9}
        justify="space-between"
        align="center"
        direction="row"
        minH="56px"
        background={headerBg}
        borderTop={`1px solid ${border}`}
        borderBottom={`1px solid ${border}`}
      >
        <HStack
          spacing={4}
          fontSize={{ md: "13px", lg: "14px" }}
          align="center"
        >
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<MdNavigateBefore size={18} />}
            onClick={() => navigate("/")}
            color={muted}
            _hover={{ color: text, bg: "transparent" }}
          >
            Back
          </Button>
          <Divider orientation="vertical" height="16px" />
          <Text color={text} fontWeight={700} lineHeight="20px">
            Day {selectedDay} of {TOTAL_DAYS}
          </Text>
        </HStack>
        <HStack spacing={2}>
          <Text
            fontSize={{ md: "13px", lg: "14px" }}
            color={text}
            fontWeight={700}
            lineHeight="20px"
          >
            9-Day Fitness Challenge
          </Text>
          <FiInfo size={18} />
        </HStack>
      </Flex>
      <Box pt={`${TOP_HEADER_HEIGHT}px`} aria-hidden />
      <Grid
        templateColumns={{ md: "300px 1fr", lg: "300px minmax(0, 1fr)" }}
        gap={{ md: 6, lg: 8 }}
      >
        <GridItem position="relative">
          <Sidebar
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
          />
        </GridItem>
        <GridItem
          w="100%"
          minW={0}
          pt={{ md: 2, lg: 3 }}
          minH={{ md: "calc(100vh - 200px)", lg: "calc(100vh - 220px)" }}
          overflowY="auto"
        >
          <Box h="100%" minH="200px" bg={bg}>
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default DayChallengeLayout;
