import { Box, Button, Grid, useColorMode } from "@chakra-ui/react";
import { useDashboardColors } from "../ui/dashboardTheme";

export interface DaySelectorProps {
  days: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function DaySelector({
  days,
  selectedIndex,
  onSelect,
}: DaySelectorProps) {
  const { text, muted, border } = useDashboardColors();
  const { colorMode } = useColorMode();

  return (
    <Box
      position="relative"
      borderRadius="full"
      p={1}
      overflow="hidden"
      border="1px solid"
      borderColor={border}
    >
      <Box
        position="absolute"
        top="4px"
        left="4px"
        w="41px"
        h="calc(100% - 8px)"
        borderRadius="full"
        bg="white"
        opacity={colorMode === "light" ? 0.8 : 0.2}
        transition="transform 220ms ease"
        transform={`translateX(${selectedIndex * 45}px)`}
      />
      <Grid
        templateColumns={`repeat(${days.length}, minmax(38px, 1fr))`}
        position="relative"
        zIndex={1}
      >
        {days.map((day, index) => (
          <Button
            key={day}
            variant="ghost"
            size="xs"
            h="26px"
            minW={0}
            px={0}
            fontSize="xs"
            fontWeight={selectedIndex === index ? "600" : "500"}
            color={selectedIndex === index ? text : muted}
            _hover={{ bg: "transparent" }}
            onClick={() => onSelect(index)}
          >
            {day}
          </Button>
        ))}
      </Grid>
    </Box>
  );
}
