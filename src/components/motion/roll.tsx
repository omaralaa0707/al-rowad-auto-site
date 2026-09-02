"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * This site's arrival: roll. Nothing on a page about not waiting should fade
 * up out of nothing — content is already moving when it appears and simply
 * comes to rest, entering along the reading direction so RTL rolls in from
 * the right and LTR from the left.
 *
 * Driven by a `data-seen` attribute written straight to the DOM rather than
 * React state, so the observer stays out of the render cycle. The animation
 * touches only opacity and transform — never clip-path, which would collapse
 * the observed element's intersection rect to zero and stop the observer ever
 * firing.
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

const delayVar = (delay: number) => ({ "--roll-delay": `${delay}ms` }) as CSSProperties;

export function Roll({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  id?: string;
}) {
  const ref = useOnScreen<HTMLElement>();
  const Component = Tag as unknown as (props: Record<string, unknown>) => ReactElement;

  return (
    <Component ref={ref} id={id} data-roll="" className={className} style={delayVar(delay)}>
      {children}
    </Component>
  );
}

/** The rule under a heading, drawn from its leading edge. */
export function GoRule({
  className,
  delay = 0,
  tone = "signal",
}: {
  className?: string;
  delay?: number;
  tone?: "signal" | "go" | "ink";
}) {
  const ref = useOnScreen<HTMLDivElement>();
  const bg = tone === "go" ? "bg-go" : tone === "ink" ? "bg-ink" : "bg-signal";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-rule=""
      className={cn("h-[2px] w-full origin-[left_center] rtl:origin-[right_center]", bg, className)}
      style={delayVar(delay)}
    />
  );
}
