import { IconButton as ChakraIconButton } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { forwardRef } from "react";

export interface AppIconButtonProps {
  "aria-label": string;
  icon: IconType | React.ReactElement;
  variant?: "ghost" | "solid" | "outline";
  colorScheme?: string;
  size?: "xs" | "sm" | "md" | "lg";
  isRound?: boolean;
  [key: string]: unknown;
}

const AppIconButton = forwardRef<HTMLButtonElement, AppIconButtonProps>(
  function AppIconButton(
    { icon: IconOrElement, ...props },
    ref
  ) {
    const iconElement =
      typeof IconOrElement === "function" ? (
        <IconOrElement size={14} />
      ) : (
        IconOrElement
      );

    return (
      <ChakraIconButton
        ref={ref}
        icon={iconElement}
        variant={props.variant ?? "ghost"}
        size={props.size ?? "sm"}
        borderRadius={props.isRound ? "full" : "md"}
        {...props}
      />
    );
  }
);

export default AppIconButton;
