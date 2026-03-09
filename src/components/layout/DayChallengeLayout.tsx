import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { MdNavigateBefore } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { useChallengeColors } from "../ui/challengeTheme";
import Sidebar from "../ui/SideBar";
import { FiInfo } from "react-icons/fi";
import { useResponsive } from "../../hooks/useResponsive";

function DayChallengeLayout() {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const { border, text, muted, card, challengeMbBg } = useChallengeColors();

  if (isMobile) {
    return (
      <Box minH="100vh">
        <Box
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
              <Box flexShrink={0} as="span">
                <MdNavigateBefore size={24} />
              </Box>
              <Text
                fontWeight={700}
                fontSize={{ base: "14px", sm: "16px" }}
                lineHeight="24px"
                noOfLines={1}
              >
                9-Day Fitness Challenge
              </Text>
            </HStack>
            <Box flexShrink={0}>
              <FiInfo size={20} />
            </Box>
          </HStack>
          <Sidebar />
        </Box>
        <Box pt={4} pb={6} px={4} bg={{ base: card, md: "none" }}>
          <Outlet />
        </Box>
      </Box>
    );
  }
  return (
    <Box pt={12} minH="100vh">
      <Flex
        justify="space-between"
        align="center"
        direction="row"
        px={{ md: 6, lg: 8 }}
        py={{ md: 3, lg: 4 }}
        minH="56px"
        background={card}
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
            Day 3 of 9
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
      <Grid
        templateColumns={{ md: "300px 1fr", lg: "300px minmax(0, 1fr)" }}
        gap={{ md: 6, lg: 8 }}
      >
        <GridItem position="relative">
          <Sidebar />
        </GridItem>
        <GridItem
          w="100%"
          minW={0}
          pt={{ md: 2, lg: 3 }}
          minH={{ md: "calc(100vh - 200px)", lg: "calc(100vh - 220px)" }}
          overflowY="auto"
        >
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default DayChallengeLayout;
