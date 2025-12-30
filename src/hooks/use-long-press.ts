import { useRef, useCallback } from 'react';

export function useLongPress(
    onLongPress: () => void,
    onClick: () => void,
    { shouldPreventDefault = true, delay = 500 } = {}
) {
    const timeout = useRef<NodeJS.Timeout>();
    const target = useRef<EventTarget>();

    const start = useCallback(
        (event: React.MouseEvent | React.TouchEvent) => {
            if (shouldPreventDefault && event.target) {
                event.target.addEventListener('touchend', preventDefault, {
                    passive: false,
                });
                target.current = event.target;
            }
            timeout.current = setTimeout(() => {
                onLongPress();
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault]
    );

    const clear = useCallback(
        (event: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
            timeout.current && clearTimeout(timeout.current);
            shouldTriggerClick && !timeout.current && onClick();

            if (shouldPreventDefault && target.current) {
                target.current.removeEventListener('touchend', preventDefault);
            }
        },
        [shouldPreventDefault, onClick]
    );

    return {
        onMouseDown: (e: React.MouseEvent) => start(e),
        onTouchStart: (e: React.TouchEvent) => start(e),
        onMouseUp: (e: React.MouseEvent) => {
            // If timeout exists, it means long press didn't fire, so it's a click
            if (timeout.current) {
                clearTimeout(timeout.current);
                onClick();
            }
        },
        onMouseLeave: (e: React.MouseEvent) => {
            // Cancel if mouse leaves
            if (timeout.current) clearTimeout(timeout.current);
        },
        onTouchEnd: (e: React.TouchEvent) => {
            if (timeout.current) {
                clearTimeout(timeout.current);
                onClick();
            }
        }
    };
}

const preventDefault = (e: Event) => {
    if (!('touches' in e)) return;
    if (e.touches.length < 2 && e.preventDefault) {
        e.preventDefault();
    }
};
