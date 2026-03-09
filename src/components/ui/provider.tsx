"use client";

import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "Poppins, Manrope, Segoe UI, sans-serif",
    body: "Poppins, Manrope, Segoe UI, sans-serif",
  },
  colors: {
    gold: {
      50: "#fef9e7",
      100: "#fdf0c4",
      200: "#fbe89d",
      300: "#f9df76",
      400: "#f7d750",
      500: "#f0b20f",
      600: "#b98405",
      700: "#9f7304",
      800: "#856203",
      900: "#6b5002",
    },
  },
});

export function Provider({ children }: { children: React.ReactElement }) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </ChakraProvider>
  );
}
