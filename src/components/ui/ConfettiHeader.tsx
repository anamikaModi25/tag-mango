import { keyframes } from "@emotion/react";
import { Box, HStack, Text, useBreakpointValue } from "@chakra-ui/react";

const confettiFall = keyframes`
  0% {
    transform: translateY(-40px) rotate(0deg);
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  92% {
    opacity: 1;
  }
  100% {
    transform: translateY(60px) rotate(540deg);
    opacity: 0;
  }
`;

const textReveal = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const FALLING_CONFETTI = [
  { left: 5, color: "#e53e3e", delay: 0, duration: 2.2, size: 5, shape: "circle" },
  { left: 12, color: "#ecc94b", delay: 0.4, duration: 2.5, size: 4, shape: "rect" },
  { left: 18, color: "#1a202c", delay: 0.1, duration: 2.3, size: 3, shape: "circle" },
  { left: 24, color: "#3182ce", delay: 0.6, duration: 2.4, size: 5, shape: "circle" },
  { left: 32, color: "#38a169", delay: 0.2, duration: 2.6, size: 4, shape: "rect" },
  { left: 38, color: "#ffffff", delay: 0.5, duration: 2.2, size: 3, shape: "circle" },
  { left: 45, color: "#e53e3e", delay: 0.15, duration: 2.5, size: 5, shape: "circle" },
  { left: 52, color: "#ecc94b", delay: 0.35, duration: 2.3, size: 4, shape: "rect" },
  { left: 58, color: "#3182ce", delay: 0.55, duration: 2.4, size: 5, shape: "circle" },
  { left: 65, color: "#38a169", delay: 0.25, duration: 2.6, size: 4, shape: "rect" },
  { left: 72, color: "#1a202c", delay: 0.45, duration: 2.2, size: 3, shape: "circle" },
  { left: 78, color: "#e53e3e", delay: 0.05, duration: 2.7, size: 5, shape: "circle" },
  { left: 85, color: "#ecc94b", delay: 0.3, duration: 2.4, size: 4, shape: "rect" },
  { left: 92, color: "#3182ce", delay: 0.5, duration: 2.3, size: 5, shape: "circle" },
];

const RIBBONS = [
  { left: 8, top: -4, color: "#e53e3e", path: "M0 3 Q4 0 8 3 Q12 6 16 3", delay: 0.2 },
  { left: 28, top: -2, color: "#ecc94b", path: "M0 2 Q6 5 12 2", delay: 0.5 },
  { left: 48, top: -6, color: "#3182ce", path: "M0 4 Q4 1 8 4 Q12 7 16 4", delay: 0.35 },
  { left: 68, top: -3, color: "#38a169", path: "M0 2 Q4 5 8 2", delay: 0.1 },
  { left: 88, top: -5, color: "#e53e3e", path: "M0 3 Q6 0 12 3", delay: 0.45 },
];

function FallingPiece({
  left,
  color,
  delay,
  duration,
  size,
  shape,
}: {
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  shape: string;
}) {
  const baseSize = Math.max(2, size - 1);
  const w = shape === "circle"
    ? { base: baseSize, sm: size }
    : { base: baseSize * 1.5, sm: size * 1.5 };
  const h = { base: baseSize, sm: size };

  return (
    <Box
      position="absolute"
      left={`${left}%`}
      top={{ base: "-16px", md: "-20px" }}
      w={w}
      h={h}
      borderRadius={shape === "circle" ? "full" : "1px"}
      bg={color}
      opacity={0}
      animation={`${confettiFall} ${duration}s ease-in ${delay}s infinite`}
    />
  );
}

function CurledRibbon({
  left,
  top,
  color,
  path,
  delay,
}: {
  left: number;
  top: number;
  color: string;
  path: string;
  delay: number;
}) {
  return (
    <Box
      position="absolute"
      left={`${left}%`}
      top={{ base: -3, sm: -4, md: top }}
      opacity={0.9}
      animation={`${confettiFall} 3s ease-in ${delay}s infinite`}
      w={{ base: "12px", sm: "14px", md: "16px" }}
      h={{ base: "6px", sm: "7px", md: "8px" }}
    >
      <svg width="100%" height="100%" viewBox="0 0 16 8" preserveAspectRatio="xMidYMid meet">
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
}

export interface ConfettiHeaderProps {
  label: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
}

export default function ConfettiHeader({
  label,
  gradient = "linear-gradient(90deg, #e6ffe6 0%, #f0fff0 50%, #e6f7ee 100%)",
  textColor = "#2d6a2d",
  borderColor,
}: ConfettiHeaderProps) {
  const confettiCount = useBreakpointValue({ base: 8, sm: 11, md: 14 }) ?? 14;
  const ribbonCount = useBreakpointValue({ base: 3, sm: 4, md: 5 }) ?? 5;

  return (
    <Box
      h={{ base: "40px", md: "44px" }}
      borderBottom={borderColor ? `1px solid ${borderColor}` : undefined}
      bg={gradient}
      position="relative"
      overflow="hidden"
      borderTopLeftRadius="24px"
      borderTopRightRadius="24px"
    >
      {FALLING_CONFETTI.slice(0, confettiCount).map((p, idx) => (
        <FallingPiece key={`fall-${idx}`} {...p} />
      ))}
      {RIBBONS.slice(0, ribbonCount).map((r, idx) => (
        <CurledRibbon key={`ribbon-${idx}`} {...r} />
      ))}
      <HStack justify="center" h="100%" position="relative" zIndex={1}>
        <Text
          fontSize={{ base: "12px", md: "13px" }}
          fontWeight={700}
          color={textColor}
          letterSpacing="0.02em"
          animation={`${textReveal} 0.4s ease-out 0.15s both`}
        >
          {label}
        </Text>
      </HStack>
    </Box>
  );
}
