import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useResponsive } from "../../hooks/useResponsive";
import AppButton from "./AppButton";

const PROGRESS_CIRCLES = [
  { value: 25, color: "#e53e3e" },
  { value: 50, color: "#3182ce" },
  { value: 75, color: "#e53e3e" },
];

function ProgressCircle({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  return (
    <Box position="relative" w="40px" h="40px" flexShrink={0}>
      <svg width="40" height="40" viewBox="0 0 40 40" style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="3"
        />
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />
      </svg>
      <Text
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontSize="10px"
        fontWeight={700}
        color="white"
      >
        {value}%
      </Text>
    </Box>
  );
}

function WavyLine() {
  return (
    <Box w="100%" h="24px" overflow="hidden" opacity={0.8}>
      <svg
        width="100%"
        height="24"
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
      >
        <path
          d="M0 12 Q25 8 50 12 T100 12 T150 12 T200 12"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
}

interface ChallengeIntroModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onJoin: VoidFunction;
  joined: boolean;
  modalText: string;
  modalMuted: string;
  text: string;
}

export default function ChallengeIntroModal({
  isOpen,
  onClose,
  onJoin,
  joined,
  modalText,
  modalMuted,
  text,
}: ChallengeIntroModalProps) {
  const { isMobile } = useResponsive();
  const modalBg = useColorModeValue("white", "#101725");
  const grabberBg = useColorModeValue("gray.300", "gray.600");

  const imageSrc = useColorModeValue(
    "/images/Image.jpg",
    "/images/modal-bg-dark.jpg",
  );

  const content = (
    <>
      <Box
        position="relative"
        overflow="hidden"
        borderTopLeftRadius={{ base: "24px", md: "12px" }}
        borderTopRightRadius={{ base: "24px", md: "12px" }}
      >
        <Box
          position="absolute"
          top={4}
          right={4}
          zIndex={1}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {PROGRESS_CIRCLES.map(({ value, color }) => (
            <ProgressCircle key={value} value={value} color={color} />
          ))}
        </Box>
        <Box position="absolute" bottom={4} left={0} right={0} zIndex={1}>
          <WavyLine />
        </Box>
        <Box
          as="img"
          src={imageSrc}
          alt="Challenge"
          w="100%"
          h={{ base: "200px", md: "180px" }}
          objectFit="cover"
          borderTopLeftRadius={{ base: "24px", md: "12px" }}
          borderTopRightRadius={{ base: "24px", md: "12px" }}
        />
      </Box>
      <Box p={{ base: 4, md: 5 }}>
        <Text
          fontWeight={700}
          fontSize={{ base: "20px", md: "24px" }}
          lineHeight="28px"
          color={modalText}
        >
          9-Day Fitness Challenge
        </Text>
        <HStack spacing={2} flexWrap="wrap" mt={2}>
          <HStack spacing={2}>
            <Box
              bg="#b98405"
              color="white"
              borderRadius="full"
              p={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FaPlay size={10} />
            </Box>
            <Text fontSize={{ base: "13px", md: "14px" }} color={modalMuted}>
              9 check-ins
            </Text>
          </HStack>
          <Divider orientation="vertical" height="14px" />
          <HStack spacing={2}>
            <AvatarGroup size="xs" max={3}>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            </AvatarGroup>
            <Text fontSize={{ base: "13px", md: "14px" }} color={modalMuted}>
              75+ joined
            </Text>
          </HStack>
        </HStack>
        <Text
          mt={4}
          fontSize={{ base: "16px", md: "18px" }}
          fontWeight={600}
          lineHeight="24px"
          color={modalText}
        >
          Description
        </Text>
        <Text mt={2} fontSize={{ base: "14px", md: "16px" }} color={text}>
          This 9-day challenge is designed to help you build the habit of showing
          up every day. You&apos;ll complete one small, focused action daily—without
          overwhelm—to build clarity and confidence, and to prove that
          consistency, not motivation, is what drives real and lasting progress.
        </Text>
        <Text
          mt={5}
          textAlign="center"
          fontSize={{ base: "13px", md: "14px" }}
          color={text}
        >
          Join the challenge and start your journey
        </Text>
        <AppButton
          mt={3}
          w="100%"
          bg="#b98405"
          color="white"
          _hover={{ bg: "#9f7304" }}
          onClick={onJoin}
        >
          {joined ? "Joined" : "Join Now"}
        </AppButton>
      </Box>
    </>
  );

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay backdropFilter="blur(4px)" />
        <DrawerContent
          maxH="90vh"
          h="auto"
          bg={modalBg}
          borderTopLeftRadius="24px"
          borderTopRightRadius="24px"
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
        >
          <Flex pt={3} pb={2} justify="center">
            <Box
              w="40px"
              h="4px"
              borderRadius="full"
              bg={grabberBg}
            />
          </Flex>
          <DrawerBody p={0} overflowY="auto">
            {content}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent
        borderRadius="12px"
        bg={modalBg}
        maxW={{ sm: "400px", md: "480px" }}
        mx={{ base: 4, md: 6 }}
      >
        <ModalCloseButton />
        <ModalBody p={0}>{content}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
