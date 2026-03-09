import {
  Avatar,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import EventCard from "../components/domain/EventCard";
import ChallengeCard from "../components/domain/ChallengeCard";
import TaskCard from "../components/domain/TaskCard";
import PostCard from "../components/ui/PostCard";
import { useDashboardColors } from "../components/ui/dashboardTheme";
import { BsChevronDown } from "react-icons/bs";

function HomePage() {
  const navigate = useNavigate();
  const { muted, text } = useDashboardColors();

  const challengeCards = [
    {
      title: "14-Day Mindfulness Challenge",
      checkIns: "14",
      joined: "104",
      active: true,
    },
    {
      title: "30-Day Healthy Eating Challenge",
      checkIns: "30",
      joined: "104",
      active: false,
    },
  ];

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "minmax(0,1fr) 320px" }}
      gap={{ base: 4, md: 6 }}
      pt={{ base: 3, md: 4 }}
      px={{ base: 2, md: "208px" }}
    >
      <VStack spacing={4} align="stretch">
        <EventCard
          title="AMA: Growth, Sales & Mindset"
          time="10:00 - 11:00 AM"
          hostInitials="A"
          live
          onJoin={() => {}}
          showBg
        />

        <TaskCard
          headline="Complete today's task before time runs out"
          tasks={[
            {
              title: "9-day Fitness Challenge",
              button: "Check in for Day 3",
              subtext: "23+ checked in today",
              endsIn: "00h 44m",
              action: () => navigate("/challenge/day-9"),
            },
            {
              title: "21-Day Productivity Boost",
              button: "Check in for Day 16",
              subtext: "23+ checked in today",
              endsIn: "10h 50m",
            },
          ]}
        />

        <Card cursor="pointer" _hover={{ opacity: 0.8 }} py={2.5}>
          <Flex align="center" gap={3} color={text} fontSize="sm">
            <Avatar size="sm" name="You" src="https://bit.ly/sage-adebayo" />
            <Text>What&apos;s on your mind?</Text>
          </Flex>
        </Card>

        <Flex
          justify="space-between"
          color={muted}
          align="center"
          fontSize="xs"
          gap={2}
        >
          <Flex align="center" gap={1} display={{ base: "none", md: "flex" }}>
            <Text>
              Showing posts from:{" "}
              <Text as="span" color={text} fontWeight={600}>
                All Passes
              </Text>
            </Text>
            <BsChevronDown />
          </Flex>
          <Button
            colorScheme="gray"
            rounded="full"
            rightIcon={<BsChevronDown />}
            display={{ base: "block", md: "none" }}
          >
            All Passes
          </Button>
          <HStack>
            <Text>
              Posted by:{" "}
              <Text as="span" color={text} fontWeight={600}>
                Everyone
              </Text>
            </Text>
            <BsChevronDown />
          </HStack>
        </Flex>

        <PostCard
          authorName="Russell Brunson"
          timeAgo="3 hrs ago"
          likeCount="15"
          commentCount="10"
          url="https://bit.ly/sage-adebayo"
        >
          Welcome to our community! We are thrilled to have you here. Dive into
          a world of shared knowledge, vibrant discussions, and endless
          opportunities. Feel free to introduce yourself, connect with fellow
          members, and let the learning journey begin.
        </PostCard>
        <PostCard
          authorName="Russell Brunson"
          timeAgo="3 hrs ago"
          likeCount="15"
          commentCount="10"
          url="https://bit.ly/sage-adebayo"
        >
          Welcome to our community! We are thrilled to have you here. Dive into
          a world of shared knowledge, vibrant discussions, and endless
          opportunities. Feel free to introduce yourself, connect with fellow
          members, and let the learning journey begin.
        </PostCard>
      </VStack>

      <VStack
        spacing={5}
        align="stretch"
        display={{ base: "none", md: "flex" }}
      >
        <GridItem>
          <Text mb={2} color={text} fontSize="sm" fontWeight="600">
            Upcoming Workshop
          </Text>
          <EventCard
            title="AMA: Growth, Sales & Mindset"
            time="10 - 11:00 AM - Tomorrow"
            hostInitials="A"
            showJoinButton={false}
            noBg
          />
        </GridItem>

        <GridItem>
          <Text mb={2} color={text} fontSize="sm" fontWeight="600">
            Explore New Challenges
          </Text>
          <VStack spacing={3} align="stretch">
            {challengeCards.map((item) => (
              <ChallengeCard
                key={item.title}
                title={item.title}
                checkIns={item.checkIns}
                joined={item.joined}
              />
            ))}
          </VStack>
        </GridItem>
      </VStack>
    </Grid>
  );
}

export default HomePage;
