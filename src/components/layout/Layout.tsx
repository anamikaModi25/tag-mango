import {
  Avatar,
  Box,
  Button,
  Grid,
  HStack,
  Link,
  Text,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import TabNav from "../ui/TabNav";
import { useDashboardColors } from "../ui/dashboardTheme";
import { useState } from "react";
import { FaLink } from "react-icons/fa";
import { FaBandcamp } from "react-icons/fa";
import { PiTicket } from "react-icons/pi";

function Layout() {
  const [activeTab, setActiveTab] = useState("backstage");
  const { heroBg, border, text, muted } = useDashboardColors();

  return (
    <>
      <Box
        bgImage={heroBg}
        sx={{
          backdropFilter: "blur(552px)",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
        pb={5}
      >
        <Grid
          maxW="1320px"
          mx="auto"
          pb={{ base: 3, md: 4 }}
          px={{ base: 2, md: 4, lg: 4 }}
          pt={{ base: 20, md: 20 }}
          templateColumns={{
            base: "106px minmax(0,1fr)",
            md: "150px minmax(0,1fr) auto",
          }}
          gap={{ base: 3, md: 4 }}
          alignItems={{ base: "center", md: "center" }}
        >
          <Avatar
            width={{ base: "96px", md: "142px" }}
            height={{ base: "96px", md: "142px" }}
            name="Russell Brunson"
            src="https://bit.ly/sage-adebayo"
          />

          <Stack minW={0} spacing={2}>
            <Box>
              <Text
                m={0}
                fontSize={{ base: "lg", md: "5xl" }}
                lineHeight="1"
                fontWeight="700"
                color={text}
              >
                Russell Brunson
              </Text>
              <Text
                mt={2}
                color={muted}
                fontSize={{ base: "xs", md: "md" }}
                display="flex"
                alignItems="center"
                gap={1}
              >
                Digital Coach
              </Text>
            </Box>
            <Text
              mt={2}
              fontSize={{ base: "xs", md: "md" }}
              fontWeight="600"
              color={text}
              display={{ base: "none", md: "block" }}
            >
              1M+ entrepreneurs &#9679; NYT bestselling author
            </Text>
            <HStack
              spacing={3}
              flexWrap="wrap"
              gap={2}
              display={{ base: "flex", md: "none" }}
            >
              <Text fontSize="14px" as="span" fontWeight="700" color={text}>
                20K
              </Text>
              <Text fontSize="12px" as="span" color={muted}>
                Subscribers
              </Text>
              <Divider
                orientation="vertical"
                height="14px"
                borderColor={muted}
              />
              <Text fontSize="14px" as="span" fontWeight="600" color={text}>
                123
              </Text>
              <Text fontSize="12px" as="span" color={muted}>
                Posts
              </Text>
              <Divider
                orientation="vertical"
                height="14px"
                borderColor={muted}
              />
              <Text fontSize="14px" as="span" fontWeight="600" color={text}>
                32
              </Text>
              <Text
                as="span"
                color={muted}
                fontSize={{ base: "12px", md: "14px" }}
              >
                Streams
              </Text>
            </HStack>
            <HStack color="#0588F0" display={{ base: "none", md: "block" }}>
              <FaLink />
              <Link
                href="#"
                mt={1}
                display="inline-flex"
                alignItems="center"
                color="#0588F0"
                fontSize="sm"
                _hover={{ textDecoration: "underline" }}
              >
                https://www.instagram.com/russellbrunson
              </Link>
            </HStack>
          </Stack>

          <Grid
            gridColumn={{ base: "1 / -1", md: "auto" }}
            templateColumns={{ base: "1fr", md: "auto auto" }}
            justifyContent={{ base: "flex-start", md: "unset" }}
            alignItems="center"
            gap={3}
            fontSize="sm"
            color={muted}
          >
            <Button
              gridColumn={{ base: "auto", md: "1 / -1" }}
              size="sm"
              variant="unstyled"
              borderColor={text}
              fontSize="sm"
              color={text}
              fontWeight="600"
              justifySelf={{ md: "end" }}
              rounded="full"
              border="1px solid"
              padding="5px 10px"
              display={{ base: "none", md: "block" }}
            >
              Share Profile
            </Button>
            <HStack
              spacing={3}
              flexWrap="wrap"
              gap={2}
              display={{ base: "none", md: "flex" }}
            >
              <Text as="span" fontWeight="700" color={text}>
                20K
              </Text>
              <Text fontSize="14px" as="span" color={muted}>
                Subscribers
              </Text>
              <Divider
                orientation="vertical"
                height="14px"
                borderColor={muted}
              />
              <Text as="span" fontWeight="600" color={text}>
                123
              </Text>
              <Text fontSize="14px" as="span" color={muted}>
                Posts
              </Text>
            </HStack>
          </Grid>
        </Grid>

        <TabNav
          tabs={[
            { key: "backstage", label: "Backstage", icon: FaBandcamp },
            { key: "passes", label: "Passes", icon: PiTicket },
          ]}
          activeKey={activeTab}
          onTabChange={setActiveTab}
        />
      </Box>
      <Outlet />
    </>
  );
}

export default Layout;
