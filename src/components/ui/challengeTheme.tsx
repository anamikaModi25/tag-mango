import { useColorModeValue } from "@chakra-ui/react";

export function useChallengeColors() {
  const bg = useColorModeValue("#f7f6fc", "#060b15");
  const frame = useColorModeValue("#f5f7fc", "#050b14");
  const headerBar = useColorModeValue("#1a3b78", "#0d1624");

  const card = useColorModeValue("#ffffff", "#101725");
  const border = useColorModeValue("#F2EFF3", "#232225");
  const text = useColorModeValue("#1d2330", "#e6edfb");
  const muted = useColorModeValue("#0400119C", "#F5F1FFB7");
  const accent = useColorModeValue("#be8a06", "#f0b20f");
  const chip = useColorModeValue("#edf1f7", "#0f1524");
  const overlay = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(0, 0, 0, 0.8)",
  );
  const sidebarChip = useColorModeValue("#F7F6FC", "#030303");
  const sidebarText = useColorModeValue("#211F26", "#FFFFFF");
  const sidebarInActiveText = useColorModeValue("#0400119C", "#F5F1FFB7");
  const sidebarLockIconColor = useColorModeValue("#0400119C", "#F5F1FFB7");
  const challengeMbBg = useColorModeValue(
    "url('/images/mobile-bg.png')",
    "url('/images/mobile-bg-dark.png')",
  );

  return {
    bg,
    frame,
    headerBar,
    card,
    border,
    text,
    muted,
    accent,
    chip,
    overlay,
    sidebarChip,
    sidebarText,
    sidebarInActiveText,
    sidebarLockIconColor,
    challengeMbBg,
  };
}
