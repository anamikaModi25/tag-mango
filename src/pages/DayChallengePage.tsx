import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { keyframes } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useDisclosure,
  AvatarGroup,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import Card from "../components/ui/Card";
import AppButton from "../components/ui/AppButton";
import AppBadge from "../components/ui/AppBadge";
import { useChallengeColors } from "../components/ui/challengeTheme";
import PostCard from "../components/ui/PostCard";
import { NumberIcon } from "../Icons/NumberIcon";
import { FaImage } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaSmile } from "react-icons/fa";
import CustomModal from "../components/ui/CustomModal";

const INTRO_SEEN_KEY = "day9_intro_seen";
const JOINED_KEY = "day9_joined";

const safeStorageGet = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeStorageSet = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // no-op
  }
};

const confettiDrop = keyframes`
  from {
    transform: translateY(-10px) rotate(0deg);
    opacity: 0;
  }
  to {
    transform: translateY(18px) rotate(260deg);
    opacity: 1;
  }
`;

function DayChallengePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCheckinOpen,
    onOpen: onCheckinOpen,
    onClose: onCheckinClose,
  } = useDisclosure();
  const { text, muted, border, card } = useChallengeColors();
  const modalMuted = useColorModeValue("gray.600", "#8d9bb6");
  const modalText = useColorModeValue("gray.800", "#e6edfb");
  const inputBg = useColorModeValue("#f7f8fc", "#151d2d");
  const inputBorder = useColorModeValue("#e3e7f0", "#2a3248");
  const uploadBorder = useColorModeValue("#DBD8E0", "#3a445e");
  const modalUploadBg = useColorModeValue("#F2EFF3", "#232225");

  const [joined, setJoined] = useState(
    () => safeStorageGet(JOINED_KEY) === "true",
  );
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [submittedPost, setSubmittedPost] = useState<{
    caption: string;
    imageUrl: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const seen = safeStorageGet(INTRO_SEEN_KEY) === "true";
    if (!seen) {
      safeStorageSet(INTRO_SEEN_KEY, "true");
      onOpen();
    }
  }, [onOpen]);

  const handleJoin = () => {
    safeStorageSet(JOINED_KEY, "true");
    setJoined(true);
    onClose();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmitCheckin = () => {
    if (!caption.trim() || !imageUrl) return;
    setSubmittedPost({ caption: caption.trim(), imageUrl });
    setCaption("");
    setImageUrl(null);
    onCheckinClose();
  };

  const resetCheckinModal = () => {
    setCaption("");
    setImageUrl(null);
    onCheckinClose();
  };

  return (
    <>
      <Flex width="100%" justifyContent="center">
        <Box
          maxW={{ base: "100%", md: "70%", lg: "60%" }}
          filter={isOpen ? "blur(2px)" : "none"}
          transition="filter 180ms ease"
        >
          <VStack align="stretch" spacing={4}>
            {submittedPost ? (
              <PostCard
                authorName="Ashraf Idrishi"
                timeAgo="Today"
                likeCount="4"
                commentCount="10"
                mediaSrc={submittedPost.imageUrl}
                mediaAlt="Submitted challenge check-in"
                topBanner={
                  <Box
                    h="40px"
                    borderBottom={`1px solid ${border}`}
                    bg="linear-gradient(90deg, #e9f9ef 0%, #f4fcf7 60%, #e6f7ee 100%)"
                    position="relative"
                    borderTopLeftRadius="24px"
                    borderTopEndRadius="24px"
                  >
                    <HStack justify="center" h="100%">
                      <Text fontSize="xs" fontWeight="700" color="#21693e">
                        Your Submission
                      </Text>
                    </HStack>
                    {[10, 24, 40, 56, 70, 82, 94].map((left, idx) => (
                      <Box
                        key={left}
                        position="absolute"
                        left={`${left}%`}
                        top="-4px"
                        w="4px"
                        h="8px"
                        borderRadius="full"
                        bg={idx % 2 === 0 ? "#6fd78b" : "#f2b24c"}
                        animation={`${confettiDrop} 1.2s ease ${idx * 0.08}s infinite alternate`}
                      />
                    ))}
                  </Box>
                }
              >
                {submittedPost.caption}
              </PostCard>
            ) : (
              <>
                <Flex justify="center" align="center" sx={{ gap: 2 }}>
                  <Text fontSize="18px" fontWeight="700" color={text}>
                    Today&apos;s check-in
                  </Text>
                  <AppBadge color="white" bg="red">
                    Ends in 20h 44m
                  </AppBadge>
                </Flex>
                <Box
                  cursor="pointer"
                  _hover={{ transform: "translateY(-1px)" }}
                  transition="all 150ms ease"
                  onClick={onCheckinOpen}
                  sx={{
                    position: "relative",
                    background: card,
                    borderRadius: "24px",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: "0", // border width
                      borderRadius: "inherit",
                      padding: "2px",
                      background:
                        "linear-gradient(90.51deg, #B8860B 1.44%, #FFF0D1 97.91%)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      pointerEvents: "none",
                    },
                  }}
                >
                  <HStack align="center" spacing={3} p={3}>
                    <Avatar size="md" name="Ashraf Idrishi" />
                    <Text fontSize="md" color={muted}>
                      Share what you completed today
                    </Text>
                  </HStack>
                </Box>
              </>
            )}

            <Card>
              <HStack justify="center">
                <Text fontSize="xl" fontWeight="700" color={text}>
                  See what others
                </Text>
                <AvatarGroup size="xs" max={3}>
                  <Avatar
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                  />
                  <Avatar
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                  />
                  <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                </AvatarGroup>
                <Text fontSize="xl" fontWeight="700" color={text}>
                  shared
                </Text>
              </HStack>
              <Text fontSize="md" textAlign="center" color={text} mb={3}>
                <b>85+</b> participants already completed
              </Text>
              <Stack spacing={4}>
                <PostCard
                  authorName="Russell Brunson"
                  timeAgo="3 Hours ago"
                  likeCount="4"
                  commentCount="10"
                  isPinned
                >
                  <Text>
                    This 9-day fitness challenge is designed to help you build
                    consistency, boost energy, and feel stronger—one day at a
                    time. Each day comes with a simple, achievable fitness task
                    that fits easily into your routine, no matter your current
                    fitness level.
                  </Text>
                  <Stack gap={2} mt={3}>
                    <HStack gap={2}>
                      <NumberIcon fontSize="18px" />
                      <Text>Minimum 20 minutes of sit-up</Text>
                    </HStack>
                    <HStack gap={2}>
                      <Image src="/images/image-2.svg" />
                      <Text>Mention Intensity</Text>
                    </HStack>
                    <HStack gap={2}>
                      <Image src="/images/image-3.svg" />
                      <Text>Upload Media (Optional)</Text>
                    </HStack>
                    <HStack gap={2}>
                      <Image src="/images/image-4.svg" />

                      <Text>Upload Media (Optional)</Text>
                    </HStack>
                    <HStack gap={2}>
                      <Image src="/images/image-5.svg" />
                      <Text>Upload Media (Optional)</Text>
                    </HStack>
                  </Stack>
                </PostCard>
                <PostCard
                  authorName="Sayantan Chandra"
                  timeAgo="1 Hours ago"
                  likeCount="4"
                  commentCount="10"
                >
                  <Text>
                    Completed today’s challenge workout, one step closer to my
                    goal.
                  </Text>
                </PostCard>
                <PostCard
                  authorName="Pappu Saha"
                  timeAgo="2 days ago"
                  likeCount="4"
                  commentCount="10"
                >
                  <Text>
                    Today’s challenge workout completed—feeling stronger already
                  </Text>
                </PostCard>
              </Stack>
            </Card>
          </VStack>
        </Box>
      </Flex>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        header={
          <Box p={2}>
            <Image src="/images/Image.jpg" sx={{ borderRadius: "24px" }} />
          </Box>
        }
      >
        <>
          <Text fontWeight="700" fontSize="24px" color={modalText}>
            9-Day Fitness Challenge
          </Text>
          <HStack>
            <Text fontSize="sm" color={modalMuted}>
              9 check-ins
            </Text>
            <Divider orientation="vertical" height="14px" />
            <AvatarGroup size="xs" max={3}>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            </AvatarGroup>
            <Text fontSize="sm" color={modalMuted}>
              75 participants joined
            </Text>
          </HStack>

          <Text mt={3} fontSize="lg" fontWeight="600" color={modalText}>
            Description
          </Text>
          <Text mt={1} fontSize="md" color={text}>
            This 9-day fitness challenge is designed to help you build
            consistency, boost energy, and feel stronger—one day at a time. Each
            day comes with a simple, achievable fitness task that fits easily
            into your routine, no matter your current fitness level.
          </Text>
          <Text mt={5} textAlign="center" fontSize="sm" color={text}>
            Join the challenge and start your journey
          </Text>
          <AppButton
            mt={2}
            w="100%"
            bg="#b98405"
            color="white"
            _hover={{ bg: "#9f7304" }}
            onClick={handleJoin}
          >
            {joined ? "Joined" : "Join Now"}
          </AppButton>
        </>
      </CustomModal>

      <CustomModal
        isOpen={isCheckinOpen}
        onClose={resetCheckinModal}
        header={
          <VStack spacing={3} align="baseline">
            <Avatar size="lg" name="Ashraf Idrishi" />
            <Text fontSize="sm" fontWeight="600" color={modalText}>
              Ashraf Idrishi
            </Text>
          </VStack>
        }
      >
        <>
          <Textarea
            mt={2}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What did you complete today?"
            bg={inputBg}
            borderColor={inputBorder}
            _placeholder={{ color: modalMuted }}
            fontSize="sm"
            resize="none"
            rows={1}
            sx={{ background: "none", border: "none" }}
          />
          <Box
            mt={3}
            border={`1px solid ${uploadBorder}`}
            p={1}
            borderRadius="8px"
          >
            <Box
              borderRadius="8px"
              h={{ base: "200px", md: "300px" }}
              display="grid"
              placeItems="center"
              cursor="pointer"
              overflow="hidden"
              background={modalUploadBg}
              onClick={() => fileInputRef.current?.click()}
              p={{ base: 2, md: 5 }}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="checkin upload"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              ) : (
                <VStack spacing={2} color={modalMuted}>
                  <FiUpload size={24} />
                  <Text fontSize="sm" width={{ md: "300px" }}>
                    Images/Videos should be horizontal, at least 1280x720px. The
                    maximum image size should be 2MB.
                  </Text>
                </VStack>
              )}
            </Box>
          </Box>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            display="none"
            onChange={handleFileChange}
          />
          <Flex mt={4} justify="space-between" align="center">
            <HStack spacing={2}>
              <Button
                size="md"
                variant="ghost"
                colorScheme="blue"
                rounded="full"
                aria-label="Add photo"
                background="#E6F4FE"
                p={3}
                minW="auto"
              >
                <FaImage size={14} />
              </Button>
              <Button
                size="md"
                variant="ghost"
                colorScheme="red"
                rounded="full"
                aria-label="Add reaction"
                background="#FEEBEC"
                p={3}
                minW="auto"
              >
                <FaPlayCircle size={14} />
              </Button>
              <Button
                size="md"
                variant="ghost"
                colorScheme="yellow"
                rounded="full"
                aria-label="Add emoji"
                background="#FFF0D1"
                p={3}
                minW="auto"
              >
                <FaSmile size={14} />
              </Button>
            </HStack>
            <AppButton
              size="md"
              bg="#b98405"
              color="white"
              _hover={{ bg: "#9f7304" }}
              isDisabled={!caption.trim() || !imageUrl}
              onClick={handleSubmitCheckin}
              _disabled={{
                background: modalUploadBg,
                color: muted,
              }}
            >
              Submit Check-in
            </AppButton>
          </Flex>
        </>
      </CustomModal>
    </>
  );
}

export default DayChallengePage;
