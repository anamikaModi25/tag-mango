import type { ReactElement } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";

interface IProps {
  children: ReactElement;
  isOpen: boolean;
  onClose: VoidFunction;
  header: ReactElement;
}

const CustomModal: React.FC<IProps> = ({
  children,
  isOpen,
  onClose,
  header,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  const modalBg = useColorModeValue("white", "#101725");
  const grabberBg = useColorModeValue("gray.300", "gray.600");
  const modalHeaderBg = useColorModeValue(
    "url(/images/modal-bg.jpg)",
    "url(/images/modal-bg-dark.jpg)",
  );

  const content = (
    <>
      <Flex
        justify="space-between"
        align="center"
        borderTopLeftRadius={{ base: 24, md: 10 }}
        borderTopRightRadius={{ base: 24, md: 10 }}
        backgroundImage={modalHeaderBg}
        backgroundSize="cover"
        p={{ base: 4, md: 5 }}
      >
        {header}
      </Flex>
      <Box p={{ base: 4, md: 5 }}>{children}</Box>
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
            <Box w="40px" h="4px" borderRadius="full" bg={grabberBg} />
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
};

export default CustomModal;
