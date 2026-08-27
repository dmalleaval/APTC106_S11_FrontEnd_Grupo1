import React from "react";
import Svg, { Path, Circle, Rect } from "react-native-svg";

// Mismo set de íconos (mismos paths) que la versión HTML del prototipo,
// re-implementados como componentes react-native-svg.
const ICONS = {
  wifi: (
    <>
      <Path d="M2 8.5a17 17 0 0 1 20 0" />
      <Path d="M5.5 12.5a12 12 0 0 1 13 0" />
      <Path d="M9 16.3a6.5 6.5 0 0 1 6 0" />
      <Circle cx="12" cy="19.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  "arrow-left": (
    <>
      <Path d="M19 12H5" />
      <Path d="M11 6l-6 6 6 6" />
    </>
  ),
  "arrow-up-right": (
    <>
      <Path d="M7 17 17 7" />
      <Path d="M8 7h9v9" />
    </>
  ),
  mail: (
    <>
      <Rect x="3" y="5" width="18" height="14" rx="2" />
      <Path d="m3.5 6 8.5 7 8.5-7" />
    </>
  ),
  camera: (
    <>
      <Path d="M4 8h3l1.6-2.4A2 2 0 0 1 10.3 4h3.4a2 2 0 0 1 1.7 1L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <Circle cx="12" cy="13.5" r="3.4" />
    </>
  ),
  key: (
    <>
      <Circle cx="7.5" cy="15.5" r="4.5" />
      <Path d="m10.6 12.4 8.4-8.4" />
      <Path d="M16 6.5 18 4.5" />
      <Path d="M18.5 9 21 6.5" />
    </>
  ),
  "shield-check": (
    <>
      <Path d="M12 3 5 6v6c0 4.6 3 7.9 7 9 4-1.1 7-4.4 7-9V6l-7-3Z" />
      <Path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  store: (
    <>
      <Path d="M4 9V5.6L5.5 3h13L20 5.6V9" />
      <Path d="M4 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
      <Path d="M5 9v11h14V9" />
      <Path d="M10 20v-5.5h4V20" />
    </>
  ),
  user: (
    <>
      <Circle cx="12" cy="8" r="3.6" />
      <Path d="M4.5 20c1.3-3.8 4-5.6 7.5-5.6s6.2 1.8 7.5 5.6" />
    </>
  ),
  "shopping-bag": (
    <>
      <Path d="M6 8h12l1 12.5H5L6 8Z" />
      <Path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  map: (
    <>
      <Path d="M9 4 3 6.2v13.6L9 17.6l6 2.2 6-2.2V4.2L15 6.4Z" />
      <Path d="M9 4v13.6" />
      <Path d="M15 6.4V20" />
    </>
  ),
  clock: (
    <>
      <Circle cx="12" cy="12" r="8.5" />
      <Path d="M12 7.5V12l3.2 2" />
    </>
  ),
  eye: (
    <>
      <Path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <Circle cx="12" cy="12" r="3" />
    </>
  ),
  check: <Path d="m5 12.5 4.5 4.5L19 7.5" />,
  power: (
    <>
      <Path d="M12 3.5v8" />
      <Path d="M7 6.2a8 8 0 1 0 10 0" />
    </>
  ),
  motorbike: (
    <>
      <Circle cx="5.5" cy="17.5" r="3" />
      <Circle cx="18.5" cy="17.5" r="3" />
      <Path d="M8.5 17.5h7l-2-6h-5l-2 3.5" />
      <Path d="M12.5 11.5h4l2 3" />
      <Path d="M6 11.5h3" />
    </>
  ),
  star: (
    <Path
      d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  scooter: (
    <>
      <Circle cx="5.5" cy="18.5" r="2.5" />
      <Circle cx="17.5" cy="18.5" r="2.5" />
      <Path d="M5.5 18.5h6l3-8h3.5" />
      <Path d="M11.5 10.5h-3" />
      <Path d="M17.5 18.5h-3l-1.5-4" />
      <Path d="M17 6.5h2.2" />
    </>
  ),
  lock: (
    <>
      <Rect x="5" y="11" width="14" height="9" rx="2" />
      <Path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    </>
  ),
  pin: (
    <>
      <Path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
      <Circle cx="12" cy="9.5" r="2.3" />
    </>
  ),
  "chevron-right": <Path d="m9 6 6 6-6 6" />,
};

export default function Icon({ name, size = 24, color = "#22252a", style }) {
  const glyph = ICONS[name];
  if (!glyph) return null;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      color={color}
    >
      {glyph}
    </Svg>
  );
}
