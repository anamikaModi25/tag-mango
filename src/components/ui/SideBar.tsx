import { Box, Button, VStack, Text, HStack } from "@chakra-ui/react";
import { useChallengeColors } from "./challengeTheme";
import { useState, useMemo } from "react";
import { FiCheck } from "react-icons/fi";
import { MdOutlineAccessTime } from "react-icons/md";
import { useResponsive } from "../../hooks/useResponsive";
import { FaLock } from "react-icons/fa";

type DayItem = {
  day: number;
  locked: boolean;
  done: boolean;
};

const TOTAL_DAYS = 9;
const DAY_MS = 24 * 60 * 60 * 1000;
const CHALLENGE_START_KEY = "day_challenge_start_date";

const getTodayStart = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
};

const getUnlockedDay = () => {
  if (typeof window === "undefined") {
    return 1;
  }

  const todayStart = getTodayStart();
  const storedStart = window.localStorage.getItem(CHALLENGE_START_KEY);
  const challengeStart = Number(storedStart);

  if (!storedStart || Number.isNaN(challengeStart)) {
    window.localStorage.setItem(CHALLENGE_START_KEY, String(todayStart));
    return 1;
  }

  const elapsedDays = Math.floor((todayStart - challengeStart) / DAY_MS);
  return Math.min(TOTAL_DAYS, Math.max(1, elapsedDays + 1));
};

const Sidebar = () => {
  const {
    overlay,
    sidebarChip,
    sidebarText,
    sidebarInActiveText,
    sidebarLockIconColor,
    card,
  } = useChallengeColors();
  const { isMobile } = useResponsive();
  const unlockedDay = getUnlockedDay();
  const [selectedDay, setSelectedDay] = useState(unlockedDay);
  const rowHeight = isMobile ? 34 : 40;
  const rowGap = isMobile ? 10 : 16;

  const dayItems: DayItem[] = Array.from({ length: TOTAL_DAYS }).map(
    (_, index) => ({
      day: index + 1,
      locked: index + 1 > unlockedDay,
      done: index + 1 < unlockedDay,
    }),
  );

  const activeIndex = Math.max(
    0,
    dayItems.findIndex((item) => item.day === selectedDay),
  );
  const { topOffset, bHeight } = useMemo(() => {
    const base = activeIndex * (rowHeight + rowGap);

    const adjust =
      Math.floor((activeIndex - 2) / 2) * rowGap +
      (activeIndex % 2 === 1 ? rowGap / 2 : 0);

    return {
      topOffset: base + rowHeight - adjust,
      bHeight: base - adjust,
    };
  }, [activeIndex, rowHeight, rowGap]);

  if (isMobile) {
    return (
      <HStack>
        {dayItems.map((item) => (
          <Button
            key={item.day}
            variant="ghost"
            h={`${rowHeight}px`}
            px="8px"
            pl={4}
            justifyContent="space-between"
            _hover={{ bg: sidebarChip }}
            onClick={() => {
              if (item.locked) {
                //do nothing
              } else {
                setSelectedDay(item.day);
              }
            }}
            opacity={item.locked ? 0.68 : 1}
            fontSize="1rem"
            sx={
              selectedDay === item.day
                ? {
                    background: card,
                    borderTopLeftRadius: "999px",
                    borderBottomLeftRadius: "999px",
                  }
                : {}
            }
          >
            <VStack
              fontSize="sm"
              color={
                selectedDay === item.day ? sidebarText : sidebarInActiveText
              }
              fontWeight={selectedDay === item.day ? "600" : "500"}
            >
              <Text>Day {selectedDay !== item.day ? item.day : null}</Text>
              {selectedDay === item.day ? (
                <Text fontSize="md">{item.day}</Text>
              ) : item.done ? (
                <FiCheck size={18} color="#25c368" />
              ) : item.locked ? (
                <FaLock size={18} color={sidebarLockIconColor} />
              ) : (
                <Box w="8px" h="8px" />
              )}
            </VStack>
          </Button>
        ))}
      </HStack>
    );
  }
  return (
    <Box bg={sidebarChip} position="fixed">
      <Box
        backgroundImage="url('/images/sidebar-bg.png')"
        width={{ base: "100%", md: "300px" }}
        minH={{ base: "auto", md: "87vh" }}
        backgroundSize={{ base: "100%", md: "94%" }}
        backgroundRepeat="no-repeat"
        backgroundPosition="left"
        position="relative"
      >
        <Box
          position="absolute"
          sx={{
            inset: 0,
            backdropFilter: "blur(20px)",
            background: overlay,
            height: `${bHeight}px`,
            borderBottomRightRadius: "22px",
          }}
        />
        <Box
          position="absolute"
          sx={{
            inset: 0,
            backdropFilter: "blur(20px)",
            background: overlay,
            top: `${bHeight}px`,
            height: `${rowHeight}px`,
            width: "30px",
          }}
        />
        <Box
          position="absolute"
          sx={{
            inset: 0,
            top: `${topOffset}px`,
            backdropFilter: "blur(20px)",
            background: overlay,
            borderTopRightRadius: "22px",
          }}
        />
        <VStack
          align="stretch"
          spacing={2}
          position="relative"
          zIndex={1}
          py={4}
          pl={2}
        >
          {dayItems.map((item) => (
            <Button
              key={item.day}
              variant="ghost"
              h={`${rowHeight}px`}
              px="8px"
              pl={4}
              justifyContent="space-between"
              _hover={{ bg: sidebarChip }}
              onClick={() => {
                if (item.locked) {
                  //do nothing
                } else {
                  setSelectedDay(item.day);
                }
              }}
              opacity={item.locked ? 0.68 : 1}
              fontSize="1rem"
              sx={
                selectedDay === item.day
                  ? {
                      background: sidebarChip,
                      borderTopLeftRadius: "999px",
                      borderBottomLeftRadius: "999px",
                    }
                  : {}
              }
            >
              <HStack
                fontSize="sm"
                color={
                  selectedDay === item.day ? sidebarText : sidebarInActiveText
                }
                fontWeight={selectedDay === item.day ? "600" : "500"}
              >
                {item.day === unlockedDay ? <MdOutlineAccessTime /> : null}
                <Text>Day - {item.day}</Text>
              </HStack>
              {item.done ? (
                <FiCheck size={14} color="#25c368" />
              ) : item.locked ? (
                <FaLock size={12} color={sidebarLockIconColor} />
              ) : (
                <Box w="8px" h="8px" />
              )}
            </Button>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default Sidebar;
