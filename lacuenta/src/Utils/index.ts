import { useEffect, useMemo, useRef, useState } from 'react';

export const capitalize = (value: string) => {
    if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    } else {
        return value;
    }
};

export const useCloseWhenClickingOutside = (
    initialRef = null,
    onClickingOutside: () => void,
) => {
    const ref: any = useRef(initialRef);
    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClickingOutside();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        // TODO: this component is never unmounting so the hanlder is always being fired when clicking anywhere
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);
    return ref;
};

export const useLongPress = ({
    onLongPress,
    threshold = 400,
    onStart,
    onFinish,
    onCancel,
}: {
    onLongPress: (event: any) => void;
    threshold?: number;
    onStart?: (event: any) => void;
    onFinish?: (event: any) => void;
    onCancel?: (event: any) => void;
}) => {
    const isLongPressActive = useRef(false);
    const isPressed = useRef(false);
    const timerId = useRef();

    return useMemo(() => {
        if (typeof onLongPress !== 'function') {
            return {};
        }

        const start = (event: any) => {
            if (!isMouseEvent(event) && !isTouchEvent(event)) return;

            if (onStart) {
                onStart(event);
            }

            isPressed.current = true;

            // @ts-ignore
            timerId.current = setTimeout(() => {
                onLongPress(event);
                isLongPressActive.current = true;
            }, threshold);
        };

        const cancel = (event: any) => {
            if (!isMouseEvent(event) && !isTouchEvent(event)) return;

            if (isLongPressActive.current) {
                if (onFinish) {
                    onFinish(event);
                }
            } else if (isPressed.current) {
                if (onCancel) {
                    onCancel(event);
                }
            }

            isLongPressActive.current = false;
            isPressed.current = false;

            if (timerId.current) {
                window.clearTimeout(timerId.current);
            }
        };

        const mouseStart = (event: any) => {
            if (window.innerWidth > 500) {
                start(event);
            }
        };
        const mouseCancel = (event: any) => {
            if (window.innerWidth > 500) {
                cancel(event);
            }
        };

        const touchStart = (event: any) => {
            if (window.innerWidth <= 500) {
                start(event);
            }
        };
        const touchCancel = (event: any) => {
            if (window.innerWidth <= 500) {
                cancel(event);
            }
        };

        const mouseHandlers = {
            onMouseDown: mouseStart,
            onMouseUp: mouseCancel,
            onMouseLeave: mouseCancel,
        };

        const touchHandlers = {
            onTouchStart: touchStart,
            onTouchEnd: touchCancel,
        };

        return {
            ...mouseHandlers,
            ...touchHandlers,
        };
    }, [onLongPress, threshold, onCancel, onFinish, onStart]);
};

const isTouchEvent = ({ nativeEvent }: any) => {
    return window.TouchEvent
        ? nativeEvent instanceof TouchEvent
        : 'touches' in nativeEvent;
};

const isMouseEvent = (event: any) => {
    return event.nativeEvent instanceof MouseEvent;
};
