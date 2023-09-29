import { useEffect } from 'react';

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
