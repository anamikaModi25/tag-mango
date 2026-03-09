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
      <Box px={3}>
        <Box
          sx={{
            backgroundImage: challengeMbBg,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
          pb={3}
        >
          <HStack color={text} pt={6} pb={10} justify="space-between">
            <HStack>
              <MdNavigateBefore />{" "}
              <Text fontWeight={700}>9 - Day Fitness Challenge</Text>
            </HStack>
            <FiInfo />
          </HStack>
          <Sidebar />
        </Box>
        <Outlet />
      </Box>
    );
  }
  return (
    <Box pt={{ base: 12, md: 12 }}>
      <Flex
        justify="space-between"
        align="center"
        direction="row"
        px={2}
        py={{ base: 2, md: 3 }}
        background={card}
        borderTop={`1px solid ${border}`}
        borderBottom={`1px solid ${border}`}
        marginTop={{ base: "8px", md: "8px" }}
      >
        <HStack
          spacing={4}
          fontSize={{ base: "xs", md: "sm" }}
          mb={{ base: 2, sm: 0 }}
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
          <Text color={text} fontWeight="700">
            Day 3 of 9
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="sm" color={text} fontWeight="700">
            9-Day Fitness Challenge
          </Text>
          <FiInfo fontSize={18} />
        </HStack>
      </Flex>
      <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={5}>
        <GridItem position="relative">
          <Sidebar />
        </GridItem>
        <GridItem w="100%" pt={3} height="83vh" overflowY="auto">
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default DayChallengeLayout;
