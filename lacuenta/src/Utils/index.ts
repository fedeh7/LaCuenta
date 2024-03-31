import { useEffect, useRef } from 'react';

let idCounter = 0;

export const getNewId = () => {
    idCounter++;
    return idCounter;
};
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
