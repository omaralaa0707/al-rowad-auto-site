"use client";

import {
  useEffect,
  useRef,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * This site's one motion: a single reveal per section, opacity 0→1 plus a
 * small rise, ~450ms ease-out, and it only ever plays once. No per-item
 * stagger — wrap a whole section's content in one `Roll`, not each card or
 * row inside it.
 *
 * Driven by a `data-seen` attribute written straight to the DOM rather than
 * React state, so the observer stays out of the render cycle. The animation
 * touches only opacity and transform — never clip-path, which would collapse
 * the observed element's intersection rect to zero and stop the observer
 * ever firing.
 */
export function useOnScreen<T extends HTMLElement>(rootMargin = "-8% 0px -8% 0px") {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}

export function Roll({
  children,
  className,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  const ref = useOnScreen<HTMLElement>();
  const Component = Tag as unknown as (props: Record<string, unknown>) => ReactElement;

  return (
    <Component ref={ref} id={id} data-roll="" className={className}>
      {children}
    </Component>
  );
}

/** The rule under a heading — a static hairline, no separate animation. */
export function GoRule({
  className,
  tone = "signal",
}: {
  className?: string;
  tone?: "signal" | "go" | "ink";
}) {
  const bg = tone === "go" ? "bg-go" : tone === "ink" ? "bg-ink" : "bg-signal";

  return (
    <div aria-hidden="true" className={cn("h-[2px] w-full", bg, className)} />
  );
}
