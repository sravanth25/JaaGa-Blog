import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// Polyfill ReactDOM.findDOMNode for React 19 compatibility
if (typeof window !== "undefined") {
  (ReactDOM as any).findDOMNode = (ReactDOM as any).findDOMNode || function(componentOrElement: any) {
    if (!componentOrElement) return null;
    if (componentOrElement instanceof HTMLElement || componentOrElement instanceof Element) {
      return componentOrElement;
    }
    if (typeof componentOrElement === "object") {
      if (componentOrElement.current) {
        return componentOrElement.current;
      }
      // If it's a React element instance, we might find its actual DOM node
      for (const key in componentOrElement) {
        if (componentOrElement[key] instanceof HTMLElement || componentOrElement[key] instanceof Element) {
          return componentOrElement[key];
        }
      }
    }
    return componentOrElement;
  };
}

createRoot(document.getElementById("root")!).render(<App />);
