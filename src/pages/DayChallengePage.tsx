import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  AvatarGroup,
  Stack,
} from "@chakra-ui/react";
import { FiClock } from "react-icons/fi";
import Card from "../components/ui/Card";
import AppBadge from "../components/ui/AppBadge";
import { useChallengeColors } from "../components/ui/challengeTheme";
import PostCard from "../components/ui/PostCard";
import SubscriberPostCard from "../components/ui/SubscriberPostCard";
import { NumberIcon } from "../Icons/NumberIcon";
import ChallengeIntroModal from "../components/ui/ChallengeIntroModal";
import CheckinModal from "../components/ui/CheckinModal";

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

function DayChallengePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCheckinOpen,
    onOpen: onCheckinOpen,
    onClose: onCheckinClose,
  } = useDisclosure();
  const { text, muted, card } = useChallengeColors();
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
      <Flex width="100%" justifyContent="center" px={{ base: 0, md: 4 }}>
        <Box
          w="100%"
          maxW={{ base: "100%", sm: "480px", md: "560px", lg: "600px" }}
          filter={isOpen ? "blur(2px)" : "none"}
          transition="filter 180ms ease"
        >
          <VStack align="stretch" spacing={{ base: 4, md: 6 }} w="100%">
            {submittedPost ? (
              <SubscriberPostCard
                authorName="Ashraf Idrishi"
                timeAgo="Today"
                headerLabel="Your Submission"
                mediaSrc={submittedPost.imageUrl}
                mediaAlt="Submitted challenge check-in"
                likeCount="4"
                commentCount="10"
              >
                {submittedPost.caption}
              </SubscriberPostCard>
            ) : (
              <>
                <Flex
                  justify="space-between"
                  align="center"
                  flexWrap="wrap"
                  gap={{ base: 2, sm: 3 }}
                >
                  <Text
                    fontSize={{ base: "16px", sm: "18px" }}
                    fontWeight={700}
                    lineHeight="24px"
                    color={text}
                  >
                    Your Check-in for Day 1
                  </Text>
                  <AppBadge color="white" bg="red" display="flex" alignItems="center" gap={1}>
                    <FiClock size={12} />
                    Ends in 06h 44m
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
                      inset: "0",
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
                  <HStack
                    align="center"
                    spacing={{ base: 3, md: 4 }}
                    p={{ base: 3, md: 4 }}
                  >
                    <Avatar
                      size={{ base: "md", md: "lg" }}
                      name="Ashraf Idrishi"
                    />
                    <Text
                      fontSize={{ base: "14px", md: "16px" }}
                      lineHeight="24px"
                      color={muted}
                    >
                      Share what you completed today
                    </Text>
                  </HStack>
                </Box>
              </>
            )}

            <Card p={{ base: 4, md: 5 }}>
              <HStack
                justify="center"
                flexWrap="wrap"
                gap={2}
                spacing={0}
              >
                <Text
                  fontSize={{ base: "18px", md: "20px" }}
                  fontWeight={700}
                  lineHeight="28px"
                  color={text}
                >
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
                <Text
                  fontSize={{ base: "18px", md: "20px" }}
                  fontWeight={700}
                  lineHeight="28px"
                  color={text}
                >
                  shared
                </Text>
              </HStack>
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                lineHeight="24px"
                textAlign="center"
                color={text}
                mb={4}
              >
                <b>23+</b> already completed
              </Text>
              <Stack spacing={{ base: 4, md: 5 }}>
                <PostCard
                  authorName="Russell Brunson"
                  timeAgo="3 hrs ago"
                  likeCount="18"
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
                      <Image src="/images/image-2.svg" alt="" boxSize="18px" flexShrink={0} />
                      <Text>Mention Intensity</Text>
                    </HStack>
                    <HStack gap={2}>
                      <Image src="/images/image-3.svg" alt="" boxSize="18px" flexShrink={0} />
                      <Text>Upload Media (Optional)</Text>
                    </HStack>
                    <HStack gap={2}>
                      <Image src="/images/image-4.svg" alt="" boxSize="18px" flexShrink={0} />
                      <Text>Upload Media (Optional)</Text>
                    </HStack>
                    <HStack gap={2}>
                      <Image src="/images/image-5.svg" alt="" boxSize="18px" flexShrink={0} />
                      <Text>Upload Media (Optional)</Text>
                    </HStack>
                  </Stack>
                </PostCard>
                <PostCard
                  authorName="Sayantan Chandra"
                  timeAgo="2h ago"
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
      <ChallengeIntroModal
        isOpen={isOpen}
        onClose={onClose}
        onJoin={handleJoin}
        joined={joined}
        modalText={modalText}
        modalMuted={modalMuted}
        text={text}
      />

      <CheckinModal
        isOpen={isCheckinOpen}
        onClose={resetCheckinModal}
        onSubmit={handleSubmitCheckin}
        caption={caption}
        setCaption={setCaption}
        imageUrl={imageUrl}
        onFileChange={handleFileChange}
        fileInputRef={fileInputRef}
        authorName="Ashraf Idrishi"
        inputBg={inputBg}
        inputBorder={inputBorder}
        modalMuted={modalMuted}
        modalText={modalText}
        uploadBorder={uploadBorder}
        modalUploadBg={modalUploadBg}
        muted={muted}
      />
    </>
  );
}

export default DayChallengePage;
