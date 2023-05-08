import { useEffect } from 'react';

export const capitalize = (value: string) => {
    if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    } else {
        return value;
    }
};
