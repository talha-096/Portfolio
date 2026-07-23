import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the CV URL with a cache-busting timestamp parameter.
 * Mobile browsers aggressively cache static PDF files by URL;
 * appending a timestamp forces mobile browsers to fetch the updated CV.
 */
export const getCvUrl = () => {
  return `/CV.pdf?v=${Date.now()}`;
};

