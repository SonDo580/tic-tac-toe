import { useMediaQuery } from "react-responsive";

export default function useScreen() {
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  return { isMobile };
}
