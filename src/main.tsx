import { createRoot } from "react-dom/client";
import App, { preloadRoute } from "./App.tsx";
import "./index.css";

// The landing page's code first, so the first render is the page itself and
// never a loading state over the pre-rendered HTML.
const mount = () => createRoot(document.getElementById("root")!).render(<App />);
preloadRoute(window.location.pathname).then(mount, mount);
