import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Mounts once inside <Router>. React Router does a client-side swap on
// navigation (no full page reload), so the browser keeps whatever scroll
// position you were at on the previous page. This resets it on every
// pathname change, before the new page's content is visible.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
