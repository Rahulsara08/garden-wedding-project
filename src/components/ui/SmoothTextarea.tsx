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

export interface SmoothTextareaProps
  extends ComponentPropsWithoutRef<"textarea"> {
  wrapperClassName?: string;
  caretClassName?: string;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

export const SmoothTextarea = forwardRef<
  HTMLTextAreaElement,
  SmoothTextareaProps
>(
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
    const caretY = useMotionValue(0);
    const caretOpacity = useMotionValue(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const mirrorRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<HTMLSpanElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useImperativeHandle(
      forwardedRef,
      () => textareaRef.current as HTMLTextAreaElement
    );

    const isControlled = value !== undefined;
    const textareaValue = isControlled ? String(value) : internalValue;

    const springCaretX = useSpring(
      caretX,
      prefersReducedMotion
        ? { stiffness: 10000, damping: 100, mass: 0.1 }
        : springConfig
    );

    const springCaretY = useSpring(
      caretY,
      prefersReducedMotion
        ? { stiffness: 10000, damping: 100, mass: 0.1 }
        : springConfig
    );

    const syncMirrorStyles = () => {
      const textarea = textareaRef.current;
      const mirror = mirrorRef.current;
      if (!textarea || !mirror) return;

      const styles = window.getComputedStyle(textarea);
      mirror.style.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
      mirror.style.lineHeight = styles.lineHeight;
      mirror.style.letterSpacing = styles.letterSpacing;
      mirror.style.paddingLeft = styles.paddingLeft;
      mirror.style.paddingRight = styles.paddingRight;
      mirror.style.paddingTop = styles.paddingTop;
      mirror.style.paddingBottom = styles.paddingBottom;
      mirror.style.borderWidth = styles.borderWidth;
      mirror.style.width = `${textarea.clientWidth}px`;
      mirror.style.boxSizing = "border-box";
    };

    const updateCaretFromTextarea = (target: HTMLTextAreaElement) => {
      if (document.activeElement !== target) {
        caretOpacity.set(0);
        return;
      }

      const selectionStart = target.selectionStart ?? 0;
      const selectionEnd = target.selectionEnd ?? 0;
      const hasSelection = selectionStart !== selectionEnd;

      if (hasSelection) {
        caretOpacity.set(0);
        return;
      }

      const mirror = mirrorRef.current;
      if (!mirror) return;

      syncMirrorStyles();

      const text = target.value;
      const textBefore = text.slice(0, selectionStart);
      const textAfter = text.slice(selectionStart);

      mirror.innerHTML = "";
      const beforeNode = document.createTextNode(textBefore);
      const marker = document.createElement("span");
      marker.textContent = "\u200b"; // zero-width space
      const afterNode = document.createTextNode(textAfter);

      mirror.appendChild(beforeNode);
      mirror.appendChild(marker);
      mirror.appendChild(afterNode);

      const markerLeft = marker.offsetLeft - target.scrollLeft;
      const markerTop = marker.offsetTop - target.scrollTop;

      const styles = window.getComputedStyle(target);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingRight = parseFloat(styles.paddingRight) || 0;
      const minX = paddingLeft;
      const maxX = target.clientWidth - paddingRight;

      caretX.set(Math.min(Math.max(markerLeft, minX), maxX));
      caretY.set(markerTop);
      caretOpacity.set(1);
    };

    const updateCaretRef = useRef(updateCaretFromTextarea);
    updateCaretRef.current = updateCaretFromTextarea;

    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea && document.activeElement === textarea) {
        updateCaretRef.current(textarea);
      }
    }, [textareaValue]);

    useEffect(() => {
      const textarea = textareaRef.current;
      const container = containerRef.current;
      if (!textarea || !container) return;

      const updateCaretIfFocused = () => {
        if (document.activeElement === textarea) {
          updateCaretRef.current(textarea);
        }
      };

      const handleSelectionChange = () => {
        if (document.activeElement !== textarea) return;
        requestAnimationFrame(() => {
          if (document.activeElement === textarea) {
            updateCaretRef.current(textarea);
          }
        });
      };

      document.addEventListener("selectionchange", handleSelectionChange);
      if (document.fonts) {
        document.fonts.addEventListener("loadingdone", updateCaretIfFocused);
        void document.fonts.ready.then(updateCaretIfFocused);
      }
      textarea.addEventListener("scroll", updateCaretIfFocused);

      const resizeObserver = new ResizeObserver(updateCaretIfFocused);
      resizeObserver.observe(container);

      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
        if (document.fonts) {
          document.fonts.removeEventListener("loadingdone", updateCaretIfFocused);
        }
        textarea.removeEventListener("scroll", updateCaretIfFocused);
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
        <div className="relative w-full">
          <textarea
            {...props}
            ref={textareaRef}
            value={textareaValue}
            placeholder={placeholder}
            style={{
              caretColor: "transparent",
              ...style,
            }}
            className={cn(
              "w-full bg-transparent outline-none text-forest placeholder:text-sage/60 font-sans resize-none",
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
                if (textareaRef.current)
                  updateCaretRef.current(textareaRef.current);
              });
            }}
            onKeyUp={(e) => {
              onKeyUp?.(e);
              requestAnimationFrame(() => {
                if (textareaRef.current)
                  updateCaretRef.current(textareaRef.current);
              });
            }}
            onClick={(e) => {
              onClick?.(e);
              requestAnimationFrame(() => {
                if (textareaRef.current)
                  updateCaretRef.current(textareaRef.current);
              });
            }}
            onSelect={(e) => {
              onSelect?.(e);
              requestAnimationFrame(() => {
                if (textareaRef.current)
                  updateCaretRef.current(textareaRef.current);
              });
            }}
          />

          {/* Hidden mirror element for multiline caret measurement */}
          <div
            ref={mirrorRef}
            aria-hidden="true"
            className="pointer-events-none invisible absolute top-0 left-0 whitespace-pre-wrap break-words overflow-hidden"
          />

          {/* Smooth spring caret */}
          <motion.div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute h-[1.15em] w-[2px] rounded-full bg-[#B68D4C]",
              isFocused ? "animate-pulse" : "",
              caretClassName
            )}
            style={{
              left: 0,
              top: 0,
              x: springCaretX,
              y: springCaretY,
              opacity: caretOpacity,
            }}
          />
        </div>
      </div>
    );
  }
);

SmoothTextarea.displayName = "SmoothTextarea";
