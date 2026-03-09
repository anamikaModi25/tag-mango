import { useBreakpointValue } from "@chakra-ui/react";

export function useResponsive() {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false }) ?? false;
  const isDesktop = useBreakpointValue({ base: false, lg: true }) ?? false;

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}
