import { atom } from "nanostores";
import { type Gradient, type Color } from "./types";

export const $gradient = atom<Gradient>({colors: [], type: 'linear', position: {x: 50, y: 50}, angle: 0, size: 1});

export const setGradient = (gradient: Gradient) => $gradient.set(gradient);
export const setGradientPosition = (x: number, y: number) => $gradient.set({...$gradient.get(), position: {x, y}})

// Utility to normalize index so it wraps around
const wrapIndex = (index: number, length: number) => {
  return ((index % length) + length) % length;
};

export const shiftColor = (from: number, to: number) => {
  const colors = [...$gradient.get().colors];
  if (colors.length === 0) return;
  const fromIdx = wrapIndex(from, colors.length);
  const toIdx = wrapIndex(to, colors.length);
  const [moved] = colors.splice(fromIdx, 1);
  colors.splice(toIdx, 0, moved);
  $gradient.set({ ...$gradient.get(), colors });
};

export const addColor = (color: Color, index?: number) => {
    console.log("ADD COLOR", color)
  const colors = [...$gradient.get().colors];
  if (typeof index === "number") {
    const wrappedIndex = wrapIndex(index, colors.length + 1); // allow inserting at end
    colors.splice(wrappedIndex, 0, color);
  } else {
    colors.push(color);
  }
  console.log('adding color', colors)
  $gradient.set({ ...$gradient.get(), colors });
};

export const removeColor = (index: number) => {
  const colors = [...$gradient.get().colors];
  if (colors.length === 0) return;
  const wrappedIndex = wrapIndex(index, colors.length);
  colors.splice(wrappedIndex, 1);
  $gradient.set({ ...$gradient.get(), colors });
};

export const changeColor = (index: number, newColor: Color) => {
  const colors = [...$gradient.get().colors];
  if (colors.length === 0) return;
  const wrappedIndex = wrapIndex(index, colors.length);
  colors[wrappedIndex] = newColor;
  $gradient.set({ ...$gradient.get(), colors });
};