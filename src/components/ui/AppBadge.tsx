import { Badge, type BadgeProps, useColorModeValue } from "@chakra-ui/react";

export interface AppBadgeProps extends BadgeProps {
  variant?: "accent" | "success" | "warning" | "info" | "default";
}

export default function AppBadge({
  variant = "default",
  children,
  ...props
}: AppBadgeProps) {
  const accentBg = useColorModeValue("gold.100", "gold.900");
  const accentColor = useColorModeValue("gold.800", "gold.200");
  const successBg = useColorModeValue("green.100", "green.900");
  const successColor = useColorModeValue("green.800", "green.200");
  const warningBg = useColorModeValue("orange.100", "orange.900");
  const warningColor = useColorModeValue("orange.800", "orange.200");
  const infoBg = useColorModeValue("blue.100", "blue.900");
  const infoColor = useColorModeValue("blue.800", "blue.200");
  const defaultBg = useColorModeValue("gray.100", "gray.700");
  const defaultColor = useColorModeValue("gray.700", "gray.200");

  const variantMap: Record<string, { bg: string; color: string }> = {
    accent: { bg: accentBg, color: accentColor },
    success: { bg: successBg, color: successColor },
    warning: { bg: warningBg, color: warningColor },
    info: { bg: infoBg, color: infoColor },
    default: { bg: defaultBg, color: defaultColor },
  };

  const styles = variantMap[variant] ?? variantMap.default;

  return (
    <Badge
      px={2}
      py={0.5}
      borderRadius="full"
      fontSize="xs"
      fontWeight="600"
      {...styles}
      {...props}
    >
      {children}
    </Badge>
  );
}
