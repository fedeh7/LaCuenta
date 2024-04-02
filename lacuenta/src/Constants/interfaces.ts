import { foodNameValues } from './index';

export type foodValues = (typeof foodNameValues)[number]; // This way we can have a string literal for every value of the array, the array has to be declared in a special way
