import { Button, HStack } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { useDashboardColors } from "./dashboardTheme";

export interface TabItem {
  key: string;
  label: string;
  icon?: IconType;
}

export interface TabNavProps {
  tabs: TabItem[];
  activeKey: string;
  onTabChange: (key: string) => void;
}

export default function TabNav({ tabs, activeKey, onTabChange }: TabNavProps) {
  const { border, text, muted, accent } = useDashboardColors();

  return (
    <HStack
      spacing={0}
      borderBottom={`1px solid ${border}`}
      overflowX="auto"
      sx={{ "&::-webkit-scrollbar": { display: "none" } }}
      px={{ base: 2, md: "208px" }}
    >
      {tabs.map((tab) => {
        const isActive = activeKey === tab.key;
        const Icon = tab.icon;

        return (
          <Button
            key={tab.key}
            variant="ghost"
            px={4}
            py={3}
            h="auto"
            minH="44px"
            fontSize="md"
            fontWeight={isActive ? "600" : "500"}
            color={isActive ? text : muted}
            borderBottom="2px solid"
            borderColor={isActive ? accent : "transparent"}
            borderRadius={0}
            _hover={{ bg: "transparent", color: text }}
            onClick={() => onTabChange(tab.key)}
            leftIcon={
              Icon ? (
                <Icon size={16} color={isActive ? accent : muted} />
              ) : undefined
            }
          >
            {tab.label}
          </Button>
        );
      })}
    </HStack>
  );
}
