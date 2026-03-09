import { Button, type ButtonProps } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { forwardRef } from "react";

export interface AppButtonProps extends Omit<
  ButtonProps,
  "leftIcon" | "rightIcon"
> {
  leftIcon?: IconType | React.ReactElement;
  rightIcon?: IconType | React.ReactElement;
}

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  function AppButton(
    {
      leftIcon: LeftIconOrElement,
      rightIcon: RightIconOrElement,
      children,
      ...props
    },
    ref,
  ) {
    const leftIcon =
      typeof LeftIconOrElement === "function" ? (
        <LeftIconOrElement size={14} />
      ) : (
        LeftIconOrElement
      );
    const rightIcon =
      typeof RightIconOrElement === "function" ? (
        <RightIconOrElement size={14} />
      ) : (
        RightIconOrElement
      );

    return (
      <Button
        ref={ref}
        fontWeight="600"
        borderRadius="full"
        transition="all 0.2s ease"
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

export default AppButton;
