import { useEffect, useRef } from "react";
import { keyframes } from "@emotion/react";
import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import confetti from "canvas-confetti";

const slideUpFromBottom = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const textReveal = keyframes`
  0% {
    transform: scale(0.92);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const gradientShimmer = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.97;
  }
`;

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const DEFAULTS = {
  startVelocity: 12,
  spread: 360,
  ticks: 80,
  gravity: -0.4,
  angle: 90,
  zIndex: 0,
  colors: [
    "#e53e3e",
    "#ecc94b",
    "#3182ce",
    "#38a169",
    "#d53f8c",
    "#805ad5",
    "#dd6b20",
  ],
};

export interface ConfettiHeaderProps {
  label: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
}

export default function ConfettiHeader({
  label,
  gradient,
  textColor,
  borderColor,
}: ConfettiHeaderProps) {
  const defaultGradient = useColorModeValue(
    "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 50%, #e8f5e9 100%)",
    "linear-gradient(135deg, #1a2e1a 0%, #0f1f0f 50%, #1a2e1a 100%)",
  );
  const defaultTextColor = useColorModeValue("#2e7d32", "#68d391");
  const containerRef = useRef<HTMLDivElement>(null);
  const confettiInstanceRef = useRef<ReturnType<typeof confetti.create> | null>(
    null,
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.borderRadius = "inherit";
    canvas.style.zIndex = "0";
    container.insertBefore(canvas, container.firstChild);

    const instance = confetti.create(canvas, {
      resize: true,
      disableForReducedMotion: true,
    });
    confettiInstanceRef.current = instance;

    const fireConfetti = () => {
      const opts = {
        ...DEFAULTS,
        particleCount: 20,
      };

      instance({
        ...opts,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: randomInRange(0.85, 1.05),
        },
      });
      instance({
        ...opts,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: randomInRange(0.85, 1.05),
        },
      });
    };

    fireConfetti();
    const interval = setInterval(fireConfetti, 700);

    return () => {
      clearInterval(interval);
      instance.reset();
      confettiInstanceRef.current = null;
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      h={{ base: "48px", sm: "52px", md: "60px" }}
      borderBottom={borderColor ? `1px solid ${borderColor}` : undefined}
      bg={gradient ?? defaultGradient}
      position="relative"
      overflow="hidden"
      borderTopLeftRadius="24px"
      borderTopRightRadius="24px"
      animation={`${gradientShimmer} 4s ease-in-out infinite`}
    >
      <Box
        position="absolute"
        inset={0}
        overflow="hidden"
        borderTopLeftRadius="24px"
        borderTopRightRadius="24px"
        animation={`${slideUpFromBottom} 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`}
      >
        <HStack justify="center" h="100%" position="relative" zIndex={1}>
          <Text
            fontSize={{ base: "12px", sm: "13px", md: "14px" }}
            fontWeight={700}
            color={textColor ?? defaultTextColor}
            letterSpacing="0.02em"
            animation={`${textReveal} 0.5s ease-out 0.2s both`}
          >
            {label}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}
