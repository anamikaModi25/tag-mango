import { useColorModeValue } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export function useDashboardColors() {
  const { pathname } = useLocation();
  const isChallengeRoute = pathname.startsWith("/challenge/");
  const bg = useColorModeValue("#f7f6fc", "#060b15");
  const frame = useColorModeValue("#f5f7fc", "#050b14");
  const headerBar = useColorModeValue("#1a3b78", "#0d1624");
  const headerText = useColorModeValue(
    isChallengeRoute ? "black" : "white",
    "#e6edfb",
  );
  const heroBg = useColorModeValue(
    "url('images/light-bg.jpg')",
    "url('images/dark-bg.jpg')",
  );

  const card = useColorModeValue("#ffffff", "#101725");
  const border = useColorModeValue(
    isChallengeRoute ? "#F2EFF3" : "#d7deeb",
    isChallengeRoute ? "#232225" : "#1d2b42",
  );
  const text = useColorModeValue("#1d2330", "#e6edfb");
  const muted = useColorModeValue("#687790", "#8d9bb6");
  const accent = useColorModeValue("#be8a06", "#f0b20f");
  const chip = useColorModeValue("#edf1f7", "#0f1524");

  return {
    bg,
    frame,
    headerBar,
    headerText,
    heroBg,
    card,
    border,
    text,
    muted,
    accent,
    chip,
  };
}
