"use client";

import React, {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface SmoothInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  type?: "text" | "password" | "email" | "tel" | "url" | "search";
  wrapperClassName?: string;
  caretClassName?: string;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

const PASSWORD_CHAR =
  typeof navigator !== "undefined" &&
  navigator.userAgent.match(/firefox|fxios/i)
    ? "\u25CF"
    : "\u2022";

export const SmoothInput = forwardRef<HTMLInputElement, SmoothInputProps>(
  (
    {
      className,
      wrapperClassName,
      caretClassName,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onClick,
      onSelect,
      type = "text",
      placeholder,
      style,
      springConfig = { stiffness: 500, damping: 32, mass: 0.4 },
      ...props
    },
    forwardedRef
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const [isFocused, setIsFocused] = useState(false);
    const caretX = useMotionValue(0);
    const caretOpacity = useMotionValue(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

    const isControlled = value !== undefined;
    const inputValue = isControlled ? String(value) : internalValue;

    const springCaretX = useSpring(
      caretX,
      prefersReducedMotion
        ? { stiffness: 10000, damping: 100, mass: 0.1 }
        : springConfig
    );

    const syncMeasureSpan = () => {
      const input = inputRef.current;
      const measureSpan = measureRef.current;
      if (!input || !measureSpan) return;

      const styles = window.getComputedStyle(input);
      const isPassword = input.type === "password";

      let fontSize = styles.fontSize;
      if (
        PASSWORD_CHAR === "\u2022" &&
        isPassword &&
        typeof navigator !== "undefined" &&
        !navigator.userAgent.match(/chrome|chromium|crios/i)
      ) {
        fontSize = `${parseFloat(fontSize) + 6.25}px`;
      }

      measureSpan.style.font = `${styles.fontStyle} ${styles.fontWeight} ${fontSize} ${styles.fontFamily}`;
      measureSpan.style.letterSpacing = styles.letterSpacing;
      measureSpan.style.fontFeatureSettings = styles.fontFeatureSettings;
      measureSpan.style.fontVariationSettings = styles.fontVariationSettings;
    };

    const measurePrefixWidth = (text: string) => {
      const input = inputRef.current;
      const measureSpan = measureRef.current;
      if (!input || !measureSpan) return null;

      syncMeasureSpan();
      // Replace spaces with non-breaking space for accurate trailing width measurement
      measureSpan.textContent = text.replace(/ /g, "\u00A0");

      const paddingLeft =
        parseFloat(window.getComputedStyle(input).paddingLeft) || 0;

      return text.length > 0
        ? measureSpan.offsetWidth + paddingLeft
        : paddingLeft;
    };

    const scrollCaretIntoView = (
      target: HTMLInputElement,
      absoluteWidth: number
    ) => {
      const styles = window.getComputedStyle(target);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingRight = parseFloat(styles.paddingRight) || 0;
      const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
      const visibleRight =
        target.scrollLeft + target.clientWidth - paddingRight;
      const visibleLeft = target.scrollLeft + paddingLeft;

      if (absoluteWidth > visibleRight) {
        target.scrollLeft = Math.min(
          absoluteWidth - target.clientWidth + paddingRight,
          maxScroll
        );
        return;
      }

      if (absoluteWidth < visibleLeft) {
        target.scrollLeft = Math.max(0, absoluteWidth - paddingLeft);
      }
    };

    const getCaretIndex = (target: HTMLInputElement) => {
      const selectionStart = target.selectionStart ?? 0;
      const selectionEnd = target.selectionEnd ?? 0;

      if (selectionStart === selectionEnd) {
        return selectionStart;
      }

      return target.selectionDirection === "backward"
        ? selectionStart
        : selectionEnd;
    };

    const updateCaretFromInput = (target: HTMLInputElement) => {
      if (document.activeElement !== target) {
        caretOpacity.set(0);
        return;
      }

      const selectionStart = target.selectionStart ?? 0;
      const selectionEnd = target.selectionEnd ?? 0;
      const hasSelection = selectionStart !== selectionEnd;
      const caretIndex = getCaretIndex(target);
      const isPassword = target.type === "password";
      const textBeforeCaret = isPassword
        ? PASSWORD_CHAR.repeat(caretIndex)
        : target.value.slice(0, caretIndex);

      const absoluteWidth = measurePrefixWidth(textBeforeCaret);
      if (absoluteWidth === null) return;

      scrollCaretIntoView(target, absoluteWidth);

      const styles = window.getComputedStyle(target);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingRight = parseFloat(styles.paddingRight) || 0;
      const caretPosition = absoluteWidth - target.scrollLeft;
      const minX = paddingLeft;
      const maxX = target.clientWidth - paddingRight;
      const isCaretVisible =
        caretPosition >= minX - 2 && caretPosition <= maxX + 2;

      caretX.set(Math.min(Math.max(caretPosition, minX), maxX));

      if (!isCaretVisible || hasSelection) {
        caretOpacity.set(0);
        return;
      }

      caretOpacity.set(1);
    };

    const updateCaretRef = useRef(updateCaretFromInput);
    updateCaretRef.current = updateCaretFromInput;

    useEffect(() => {
      const input = inputRef.current;
      if (input && document.activeElement === input) {
        updateCaretRef.current(input);
      }
    }, [inputValue]);

    useEffect(() => {
      const input = inputRef.current;
      const container = containerRef.current;
      if (!input || !container) return;

      const updateCaretIfFocused = () => {
        if (document.activeElement === input) {
          updateCaretRef.current(input);
        }
      };

      const handleSelectionChange = () => {
        if (document.activeElement !== input) return;
        requestAnimationFrame(() => {
          if (document.activeElement === input) {
            updateCaretRef.current(input);
          }
        });
      };

      document.addEventListener("selectionchange", handleSelectionChange);
      if (document.fonts) {
        document.fonts.addEventListener("loadingdone", updateCaretIfFocused);
        void document.fonts.ready.then(updateCaretIfFocused);
      }
      input.addEventListener("scroll", updateCaretIfFocused);

      const resizeObserver = new ResizeObserver(updateCaretIfFocused);
      resizeObserver.observe(container);

      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
        if (document.fonts) {
          document.fonts.removeEventListener("loadingdone", updateCaretIfFocused);
        }
        input.removeEventListener("scroll", updateCaretIfFocused);
        resizeObserver.disconnect();
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full rounded-xl transition-all duration-200",
          wrapperClassName
        )}
      >
        <div className="relative w-full flex items-center">
          <input
            {...props}
            ref={inputRef}
            type={type}
            value={inputValue}
            placeholder={placeholder}
            style={{
              caretColor: "transparent",
              ...style,
            }}
            className={cn(
              "w-full bg-transparent outline-none text-forest placeholder:text-sage/60 font-sans",
              className
            )}
            onChange={(e) => {
              if (!isControlled) setInternalValue(e.target.value);
              onChange?.(e);
              requestAnimationFrame(() => {
                updateCaretRef.current(e.target);
              });
            }}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
              requestAnimationFrame(() => {
                updateCaretRef.current(e.target);
              });
            }}
            onBlur={(e) => {
              setIsFocused(false);
              caretOpacity.set(0);
              onBlur?.(e);
            }}
            onKeyDown={(e) => {
              onKeyDown?.(e);
              requestAnimationFrame(() => {
                if (inputRef.current) updateCaretRef.current(inputRef.current);
              });
            }}
            onKeyUp={(e) => {
              onKeyUp?.(e);
              requestAnimationFrame(() => {
                if (inputRef.current) updateCaretRef.current(inputRef.current);
              });
            }}
            onClick={(e) => {
              onClick?.(e);
              requestAnimationFrame(() => {
                if (inputRef.current) updateCaretRef.current(inputRef.current);
              });
            }}
            onSelect={(e) => {
              onSelect?.(e);
              requestAnimationFrame(() => {
                if (inputRef.current) updateCaretRef.current(inputRef.current);
              });
            }}
          />

          {/* Hidden measurement span with matching font metrics */}
          <span
            ref={measureRef}
            aria-hidden="true"
            className="pointer-events-none invisible absolute top-0 left-0 whitespace-pre"
          />

          {/* Skiper106 spring-physics smooth caret */}
          <motion.div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 h-[68%] w-[2px] rounded-full bg-[#B68D4C]",
              isFocused ? "animate-pulse" : "",
              caretClassName
            )}
            style={{
              left: 0,
              x: springCaretX,
              opacity: caretOpacity,
            }}
          />
        </div>
      </div>
    );
  }
);

SmoothInput.displayName = "SmoothInput";
