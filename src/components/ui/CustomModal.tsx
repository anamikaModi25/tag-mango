import type { ReactElement } from "react";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Flex,
  useColorModeValue,
  Box,
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
  const modalBg = useColorModeValue("white", "#101725");
  const modalHeaderBg = useColorModeValue(
    "url(/images/modal-bg.jpg)",
    "url(/images/modal-bg-dark.jpg)",
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="12px" bg={modalBg}>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Flex
            justify="space-between"
            align="center"
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            backgroundImage={modalHeaderBg}
            backgroundSize="cover"
            p={5}
          >
            {header}
          </Flex>
          <Box p={5}>{children}</Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
