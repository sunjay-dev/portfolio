"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo } from "react";

// Velite compiles MDX to a function string. We evaluate it here.
// This is the standard pattern for Velite MDX rendering.
// See: https://velite.js.org/guide/with-mdx

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMDXComponent(code: string): React.ComponentType<any> {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MDXContent({ code }: { code: string }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component />;
}
