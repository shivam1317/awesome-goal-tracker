import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
// Dark mode color: #2D3748
const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;
