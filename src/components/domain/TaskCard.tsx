import { Avatar, AvatarGroup, Box, Flex, Text, VStack } from "@chakra-ui/react";
import { FiClock } from "react-icons/fi";
import Card from "../ui/Card";
import AppButton from "../ui/AppButton";
import { useDashboardColors } from "../ui/dashboardTheme";
import { BsCheckCircleFill } from "react-icons/bs";

export interface TaskItem {
  title: string;
  button: string;
  subtext?: string;
  endsIn?: string;
  action?: () => void;
}

export interface TaskCardProps {
  headline: string;
  tasks: TaskItem[];
}

export default function TaskCard({ headline, tasks }: TaskCardProps) {
  const { border, muted, heroBg, card } = useDashboardColors();

  return (
    <Card
      sx={{
        backgroundImage: heroBg,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      p={0}
    >
      <Text
        fontSize={{ base: "sm", md: "md" }}
        fontWeight="700"
        textAlign="center"
        py={3}
      >
        {headline}
      </Text>
      <Box background={card} borderRadius="24px">
        {tasks.map((task, idx) => (
          <Flex
            key={task.title}
            borderTop={idx === 0 ? "none" : `1px solid ${border}`}
            justify="space-between"
            gap={4}
            align={{ base: "flex-start", sm: "center" }}
            direction={{ base: "column", sm: "row" }}
            px={5}
            py={4}
          >
            <Box flex={1} minW={0}>
              <Text fontSize="md" fontWeight="600">
                {task.title}
              </Text>
              <Flex mt={2} align="center" gap={2} flexWrap="wrap">
                {task.subtext ? (
                  <AvatarGroup size="xs" max={3}>
                    <Avatar
                      name="Ryan Florence"
                      src="https://bit.ly/ryan-florence"
                    />
                    <Avatar
                      name="Segun Adebayo"
                      src="https://bit.ly/sage-adebayo"
                    />
                    <Avatar
                      name="Kent Dodds"
                      src="https://bit.ly/kent-c-dodds"
                    />
                  </AvatarGroup>
                ) : null}
                {task.subtext ? (
                  <Text color={muted} fontSize="xs">
                    {task.subtext}
                  </Text>
                ) : null}
              </Flex>
            </Box>
            <VStack
              py={2}
              flexDirection={{ base: "row-reverse", md: "column" }}
              justifyContent="space-between"
              w={{ base: "100%", md: "auto" }}
            >
              <AppButton
                size="sm"
                color="white"
                bg="#b98405"
                _hover={{ bg: "#9f7304" }}
                flexShrink={0}
                onClick={task.action}
                leftIcon={<BsCheckCircleFill />}
              >
                {task.button}
              </AppButton>
              {task.endsIn ? (
                <Text
                  fontSize="xs"
                  color="red"
                  fontWeight="600"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <FiClock size={12} />
                  Ends in: {task.endsIn}
                </Text>
              ) : null}
            </VStack>
          </Flex>
        ))}
      </Box>
    </Card>
  );
}
