import { resolve } from "path";

export function delay(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}