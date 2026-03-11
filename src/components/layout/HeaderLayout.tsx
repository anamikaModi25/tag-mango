import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { FiSun, FiMoon, FiBell } from "react-icons/fi";
import { useDashboardColors } from "../ui/dashboardTheme";
import { BackstageIcon } from "../../Icons/BackstageIcon";
import { FaChevronDown } from "react-icons/fa";
import { FireIcon } from "../../Icons/FireIcon";
import { useResponsive } from "../../hooks/useResponsive";
import { useMemo } from "react";

function HeaderLayout() {
  const { isMobile } = useResponsive();
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const { bg, frame, headerText, border } = useDashboardColors();
  const isChallengeRoute = pathname.startsWith("/challenge/");
  const menuBg = useColorModeValue("#ffffff", "#111a2b");
  const menuText = useColorModeValue("#1d2330", "#e6edfb");
  const menuHoverBg = useColorModeValue("#f3f6fc", "#1a2740");
  const menuActiveBg = useColorModeValue("#e8eef9", "#243553");
  const headerBg = isChallengeRoute
    ? colorMode === "dark"
      ? "#1A191B"
      : "rgba(255, 255, 255, 0.92)"
    : "transparent";

  const showHeader = useMemo(() => {
    if (isMobile && isChallengeRoute) {
      return false;
    }
    return true;
  }, [isChallengeRoute, isMobile]);

  return (
    <Box minH="100vh" bg={bg}>
      {showHeader ? (
        <Flex
          color={headerText}
          px={{ base: 4, md: 6 }}
          py={3}
          align="center"
          justify="space-between"
          position="fixed"
          top="0"
          zIndex="10"
          width="100%"
          bg={headerBg}
          backdropFilter={isChallengeRoute ? "blur(10px)" : "none"}
          borderBottom={isChallengeRoute ? `1px solid ${border}` : "none"}
        >
          <HStack
            spacing={2}
            fontWeight="700"
            fontSize={{ base: "sm", md: "md" }}
          >
            <BackstageIcon width="202px" height="27px" color={headerText} />
          </HStack>

          <HStack spacing={{ base: 1, sm: 2 }} flexWrap="nowrap">
            <Button
              variant="ghost"
              leftIcon={<FireIcon fontSize={18} />}
              rounded="full"
              background="#EBEAF814"
              color={headerText}
            >
              30
            </Button>
            <IconButton
              aria-label="Notifications"
              variant="outline"
              rounded="full"
              color={headerText}
              borderColor={headerText}
              opacity={0.9}
              _hover={{ opacity: 1, bg: "whiteAlpha.200" }}
              icon={<FiBell size={18} />}
              size="sm"
              display={{ base: "none", md: "flex" }}
            />
            <Menu>
              <MenuButton
                as={Box}
                cursor="pointer"
                rounded="full"
                px={1}
                py={1}
                _hover={{ bg: "whiteAlpha.200" }}
              >
                <HStack spacing={1}>
                  <Avatar
                    size="sm"
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                  />
                  {!isMobile ? <FaChevronDown size={12} /> : null}
                </HStack>
              </MenuButton>
              <MenuList
                bg={menuBg}
                color={menuText}
                borderColor={border}
                minW="170px"
                p={1}
                shadow="xl"
              >
                <MenuItem
                  icon={<FiSun />}
                  bg={colorMode === "light" ? menuActiveBg : "transparent"}
                  fontWeight={colorMode === "light" ? "600" : "500"}
                  borderRadius="md"
                  _hover={{ bg: menuHoverBg }}
                  onClick={() => {
                    if (colorMode !== "light") {
                      toggleColorMode();
                    }
                  }}
                >
                  Light Mode
                </MenuItem>
                <MenuItem
                  icon={<FiMoon />}
                  bg={colorMode === "dark" ? menuActiveBg : "transparent"}
                  fontWeight={colorMode === "dark" ? "600" : "500"}
                  borderRadius="md"
                  _hover={{ bg: menuHoverBg }}
                  onClick={() => {
                    if (colorMode !== "dark") {
                      toggleColorMode();
                    }
                  }}
                >
                  Dark Mode
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      ) : null}

      <Box mx="auto" bg={frame} pt={showHeader ? "56px" : 0}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default HeaderLayout;
