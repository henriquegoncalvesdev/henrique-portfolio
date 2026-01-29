export { DemoContainer } from "./DemoContainer";
export { ReactDemo } from "./ReactDemo";
export { NextjsDemo } from "./NextjsDemo";
export { TypeScriptDemo } from "./TypeScriptDemo";
export { StylingDemo } from "./StylingDemo";
export { BackendDemo } from "./BackendDemo";
export { ToolingDemo } from "./ToolingDemo";

// Demo registry - maps skill titles to demo components
import { lazy, ComponentType } from "react";

export const demoRegistry: Record<string, ComponentType> = {
  "React": lazy(() => import("./ReactDemo")),
  "Next.js": lazy(() => import("./NextjsDemo")),
  "TypeScript + JavaScript": lazy(() => import("./TypeScriptDemo")),
  "Styling / UI": lazy(() => import("./StylingDemo")),
  "Backend + Database": lazy(() => import("./BackendDemo")),
  "Tooling / Deploy": lazy(() => import("./ToolingDemo")),
};
