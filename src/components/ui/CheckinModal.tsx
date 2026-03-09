import type { ChangeEvent, RefObject } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { FaImage, FaPlayCircle, FaSmile } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import AppButton from "./AppButton";

interface CheckinModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
  caption: string;
  setCaption: (value: string) => void;
  imageUrl: string | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  authorName?: string;
  inputBg: string;
  inputBorder: string;
  modalMuted: string;
  modalText: string;
  uploadBorder: string;
  modalUploadBg: string;
  muted: string;
}

export default function CheckinModal({
  isOpen,
  onClose,
  onSubmit,
  caption,
  setCaption,
  imageUrl,
  onFileChange,
  fileInputRef,
  authorName = "Ashraf Idrishi",
  inputBg,
  inputBorder,
  modalMuted,
  modalText,
  uploadBorder,
  modalUploadBg,
  muted,
}: CheckinModalProps) {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  const modalBg = useColorModeValue("white", "#101725");
  const modalHeaderBg = useColorModeValue(
    "url(/images/modal-bg.jpg)",
    "url(/images/modal-bg-dark.jpg)",
  );
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const firstName = authorName.split(" ")[0] ?? authorName;

  const canSubmit = caption.trim().length > 0 && !!imageUrl;

  const actionIcons = (
    <HStack justify="center" spacing={4}>
      <Button
        size="md"
        variant="ghost"
        rounded="full"
        aria-label="Add photo"
        bg="#E6F4FE"
        p={3}
        minW="auto"
        onClick={() => fileInputRef.current?.click()}
      >
        <FaImage size={18} color="#3182ce" />
      </Button>
      <Button
        size="md"
        variant="ghost"
        rounded="full"
        aria-label="Add video"
        bg="#FEEBEC"
        p={3}
        minW="auto"
        onClick={() => fileInputRef.current?.click()}
      >
        <FaPlayCircle size={18} color="#e53e3e" />
      </Button>
      <Button
        size="md"
        variant="ghost"
        rounded="full"
        aria-label="Add emoji"
        bg="#FFF0D1"
        p={3}
        minW="auto"
      >
        <FaSmile size={18} color="#b7791f" />
      </Button>
    </HStack>
  );

  const mediaPreview = (
    <Box
      borderRadius="12px"
      overflow="hidden"
      cursor="pointer"
      onClick={() => fileInputRef.current?.click()}
      position="relative"
      bg={modalUploadBg}
      border={`1px solid ${uploadBorder}`}
    >
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt="checkin upload"
            w="100%"
            h={{ base: "220px", md: "280px" }}
            objectFit="cover"
          />
          <Flex
            position="absolute"
            inset={0}
            align="center"
            justify="center"
            bg="blackAlpha.200"
          >
            <Box
              w="56px"
              h="56px"
              borderRadius="full"
              bg="whiteAlpha.800"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FaPlayCircle size={28} color="#4a5568" />
            </Box>
          </Flex>
        </>
      ) : (
        <Flex
          flexDirection="column"
          align="center"
          justify="center"
          h={{ base: "200px", md: "260px" }}
          color={modalMuted}
          gap={3}
        >
          <FiUpload size={32} />
          <Text fontSize="sm" textAlign="center" px={4}>
            Images/Videos should be horizontal, at least 1280x720px. Max 2MB.
          </Text>
        </Flex>
      )}
    </Box>
  );

  const mobileContent = (
    <>
      <VStack align="stretch" spacing={3} mb={4}>
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="What did you complete today?"
          bg="transparent"
          border="none"
          _placeholder={{ color: modalMuted }}
          fontSize="md"
          resize="none"
          minH="60px"
          p={0}
          _focus={{ boxShadow: "none" }}
        />
      </VStack>
      {mediaPreview}
    </>
  );

  const desktopContent = (
    <>
      <Textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="What did you complete today?"
        bg={inputBg}
        borderColor={inputBorder}
        _placeholder={{ color: modalMuted }}
        fontSize="sm"
        resize="none"
        minH="80px"
        mb={4}
      />
      {mediaPreview}
    </>
  );

  const fileInput = (
    <Input
      ref={fileInputRef}
      type="file"
      accept="image/*,video/*"
      display="none"
      onChange={onFileChange}
    />
  );

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay backdropFilter="blur(4px)" />
        <DrawerContent
          h="100vh"
          maxH="100vh"
          bg={modalBg}
          borderTopLeftRadius="24px"
          borderTopRightRadius="24px"
          display="flex"
          flexDirection="column"
        >
          <Flex
            direction="column"
            backgroundImage={modalHeaderBg}
            backgroundSize="cover"
            borderTopLeftRadius="24px"
            borderTopRightRadius="24px"
          >
            <Flex px={4} py={3} justify="space-between" align="center">
              <IconButton
                aria-label="Close"
                variant="ghost"
                size="lg"
                icon={<IoClose size={24} />}
                onClick={onClose}
              />
              <AppButton
                size="sm"
                bg="#b98405"
                color="white"
                _hover={{ bg: "#9f7304" }}
                isDisabled={!canSubmit}
                onClick={onSubmit}
                _disabled={{ bg: modalUploadBg, color: muted }}
              >
                Submit
              </AppButton>
            </Flex>
            <Flex px={4} pb={4} align="center" gap={3}>
              <Avatar size="md" name={authorName} flexShrink={0} />
              <Text fontSize="md" fontWeight={600} color={modalText}>
                {firstName}
              </Text>
            </Flex>
          </Flex>
          <DrawerBody p={4} overflowY="auto" flex={1} minH={0}>
            {fileInput}
            {mobileContent}
          </DrawerBody>
          <Flex
            p={4}
            pt={2}
            justify="center"
            borderTop="1px solid"
            borderColor={borderColor}
            bg={modalBg}
          >
            {actionIcons}
          </Flex>
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
        <ModalBody p={0}>
          <Flex
            backgroundImage={modalHeaderBg}
            backgroundSize="cover"
            p={5}
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
          >
            <VStack align="baseline" spacing={2}>
              <Avatar size="lg" name={authorName} />
              <Text fontSize="sm" fontWeight={600} color={modalText}>
                {authorName}
              </Text>
            </VStack>
          </Flex>
          <Box p={5}>
            {fileInput}
            {desktopContent}
            <Flex mt={4} justify="space-between" align="center" flexWrap="wrap" gap={3}>
              {actionIcons}
              <AppButton
                size="md"
                bg="#b98405"
                color="white"
                _hover={{ bg: "#9f7304" }}
                isDisabled={!canSubmit}
                onClick={onSubmit}
                _disabled={{ bg: modalUploadBg, color: muted }}
              >
                Submit Check-in
              </AppButton>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
