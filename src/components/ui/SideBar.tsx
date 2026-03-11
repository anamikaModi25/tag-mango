import {
  Box,
  Button,
  VStack,
  Text,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useChallengeColors } from "./challengeTheme";
import { useState, useRef, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { MdOutlineAccessTime } from "react-icons/md";
import { useResponsive } from "../../hooks/useResponsive";
import { FaLock } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { MobNavBg } from "../../Icons/MobNavBg";

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

  const mobileSelectedText = useColorModeValue("#1d2330", "#e6edfb");
  const mobileUnselectedText = useColorModeValue("#6B7280", "#a0aec0");
  const mobileUnselectedHover = useColorModeValue("gray.300", "whiteAlpha.300");
  const { isMobile } = useResponsive();
  const unlockedDay = getUnlockedDay();
  const [selectedDay, setSelectedDay] = useState(unlockedDay);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current || !activeTabRef.current)
      return;
    const scrollEl = scrollContainerRef.current;
    const activeEl = activeTabRef.current;
    const activeRect = activeEl.getBoundingClientRect();
    const activeCenter = activeRect.left + activeRect.width / 2;
    const screenCenter = window.innerWidth / 2;
    const scrollDelta = activeCenter - screenCenter;
    const targetScroll = scrollEl.scrollLeft + scrollDelta;
    scrollEl.scrollTo({
      left: Math.max(
        0,
        Math.min(targetScroll, scrollEl.scrollWidth - scrollEl.clientWidth),
      ),
      behavior: "smooth",
    });
  }, [selectedDay, isMobile]);

  const dayItems: DayItem[] = Array.from({ length: TOTAL_DAYS }).map(
    (_, index) => ({
      day: index + 1,
      locked: index + 1 > unlockedDay,
      done: index + 1 < unlockedDay,
    }),
  );

  if (isMobile) {
    return (
      <Box
        ref={scrollContainerRef}
        overflowX="auto"
        pt={1}
        mx={{ base: -4, sm: -5 }}
        sx={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <HStack
          spacing={3}
          align="stretch"
          minW="min-content"
          pl="calc(50vw - 40px)"
          pr="calc(50vw - 40px)"
        >
          {dayItems.map((item) => {
            const isSelected = selectedDay === item.day;
            return (
              <Button
                key={item.day}
                ref={isSelected ? activeTabRef : undefined}
                variant="unstyled"
                flexShrink={0}
                minW={isSelected ? "80px" : "72px"}
                h={isSelected ? "64px" : "60px"}
                px={isSelected ? 5 : 3}
                position="relative"
                onClick={() => {
                  if (!item.locked) setSelectedDay(item.day);
                }}
                opacity={item.locked ? 0.85 : 1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {isSelected ? (
                  <>
                    <MobNavBg
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 0,
                        color: card,
                      }}
                    />
                    <VStack
                      spacing={0}
                      align="center"
                      py={1}
                      position="relative"
                    >
                      <Text
                        fontSize="11px"
                        fontWeight={700}
                        color={mobileSelectedText}
                        lineHeight="1"
                      >
                        Day
                      </Text>
                      <Text
                        fontSize="24px"
                        fontWeight={700}
                        color={mobileSelectedText}
                        lineHeight="1.1"
                      >
                        {item.day}
                      </Text>
                    </VStack>
                  </>
                ) : (
                  <VStack>
                    <HStack
                      spacing={1.5}
                      align="center"
                      flexWrap="nowrap"
                      whiteSpace="nowrap"
                    >
                      <Text
                        fontSize="12px"
                        fontWeight={500}
                        color={mobileUnselectedText}
                      >
                        Day
                      </Text>
                      <Text
                        fontSize="12px"
                        fontWeight={600}
                        color={mobileUnselectedText}
                      >
                        {item.day}
                      </Text>
                    </HStack>
                    {item.done ? (
                      <Box flexShrink={0}>
                        <BsCheckCircleFill size={12} color="#25c368" />
                      </Box>
                    ) : item.locked ? (
                      <Box flexShrink={0}>
                        <FaLock size={18} color={mobileUnselectedText} />
                      </Box>
                    ) : null}
                  </VStack>
                )}
              </Button>
            );
          })}
        </HStack>
      </Box>
    );
  }

  const rowHeight = 40;
  const rowGap = 16;
  const activeIndex = Math.max(
    0,
    dayItems.findIndex((item) => item.day === selectedDay),
  );
  const topOffset =
    activeIndex * (rowHeight + rowGap) +
    rowHeight -
    (Math.floor((activeIndex - 2) / 2) * rowGap +
      (activeIndex % 2 === 1 ? rowGap / 2 : 0));
  const bHeight =
    activeIndex * (rowHeight + rowGap) -
    (Math.floor((activeIndex - 2) / 2) * rowGap +
      (activeIndex % 2 === 1 ? rowGap / 2 : 0));

  return (
    <Box bg={sidebarChip} position="fixed">
      <Box
        backgroundImage="url('/images/sidebar-bg.png')"
        width="300px"
        minH="87vh"
        backgroundSize="94%"
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
                if (!item.locked) setSelectedDay(item.day);
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
