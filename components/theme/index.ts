import dynamic from "next/dynamic";

// React 18 hydration issues - disable SSR for now
// https://github.com/vercel/next.js/discussions/35773
const ThemeSelector = dynamic(() => import("./themeSelector"), {
  ssr: false
});

export { ThemeSelector };
