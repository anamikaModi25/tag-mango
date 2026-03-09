import { Box, type BoxProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import { useDashboardColors } from "./dashboardTheme";

export interface CardProps extends BoxProps {
  /** Card variant */
  variant?: "elevated" | "outline" | "filled" | "subtle";
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "outline", children, ...props },
  ref,
) {
  const { card, border } = useDashboardColors();

  const baseStyles = {
    bg: card,
    border: `1px solid ${border}`,
    borderRadius: "24px",
    p: 3,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  };

  const variants = {
    elevated: {
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      border: "1px solid transparent",
    },
    outline: {},
    filled: {
      border: "none",
    },
    subtle: {
      bg: "transparent",
      border: "1px dashed",
      borderColor: border,
    },
  };

  return (
    <Box
      ref={ref}
      {...baseStyles}
      {...variants[variant]}
      transition="all 0.2s ease"
      {...props}
    >
      {children}
    </Box>
  );
});

export default Card;
