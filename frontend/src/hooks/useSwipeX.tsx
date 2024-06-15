// Third party
import { useEffect, useRef } from "react";
// Utility
import { animate, nthPower, makeEaseOut } from "@/utils/animate";

type PointerCoordsX = {
  lastX: number;
  lastScrollLeft: number;
};

export function useSwipeX() {
  const containerRef = useRef<HTMLElement>();
  const animationFrameId = useRef<() => void>();
  const isDragging = useRef(false);
  const isThrottled = useRef(false);
  const lastDelta = useRef(0);
  const distanceMovedBeforePointerRelease = useRef(0);
  const pointerCoords = useRef<PointerCoordsX>({
    lastX: 0,
    lastScrollLeft: 0,
  });
  const deltaMultiplier = 1.5;
  const animationThreshold = 50;
  const distanceMovedThreshold = 50;

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (animationFrameId.current) {
        animationFrameId.current();
      }

      event.preventDefault();

      const currentX = event.pageX - container.offsetLeft;
      const currentScrollLeft = container.scrollLeft;
      pointerCoords.current = {
        lastX: currentX,
        lastScrollLeft: currentScrollLeft,
      };

      isDragging.current = true;
      container.setAttribute("data-pointer-down", "");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging.current || isThrottled.current) {
        return;
      }

      isThrottled.current = true;

      requestAnimationFrame(() => {
        isThrottled.current = false;

        if (!container) {
          return;
        }

        const currentX = event.pageX - container.offsetLeft;
        lastDelta.current = currentX - pointerCoords.current.lastX;
        container.scrollLeft =
          pointerCoords.current.lastScrollLeft -
          lastDelta.current * deltaMultiplier;
        distanceMovedBeforePointerRelease.current += Math.abs(
          lastDelta.current
        );
        pointerCoords.current.lastX = currentX;
        pointerCoords.current.lastScrollLeft = container.scrollLeft;
      });
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      container.removeAttribute("data-pointer-down");

      if (distanceMovedBeforePointerRelease.current < distanceMovedThreshold) {
        distanceMovedBeforePointerRelease.current = 0;
        return;
      }

      distanceMovedBeforePointerRelease.current = 0;
      const start = container.scrollLeft;

      animationFrameId.current = animate({
        duration: 500,
        timing: makeEaseOut(nthPower.bind(null, 3)),
        draw: (progress: number) => {
          container.scrollLeft =
            start +
            progress * animationThreshold * (lastDelta.current < 0 ? 1 : -1);
        },
      });
    };

    const handlePointerCancel = () => {
      if (animationFrameId.current) {
        animationFrameId.current();
      }

      isDragging.current = false;
      container.removeAttribute("data-pointer-down");
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [containerRef]);

  return { containerRef };
}
