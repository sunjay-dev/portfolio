"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo } from "react";
import * as MdxComponents from "@/components/blog/MdxComponents";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMDXComponent(code: string): React.ComponentType<any> {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

const sharedComponents = {
  ...MdxComponents,
};

export function MDXContent({ code }: { code: string }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={sharedComponents} />;
}
