import type { FC } from "react";

export type IconProps = { className?: string };

const base = (className?: string) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: className ?? "h-6 w-6",
  "aria-hidden": true,
});

export const IconSigma: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M17.5 6.5V4.5h-11l6.5 7.5-6.5 7.5h11v-2" />
    <path d="M4.5 4.5v2M4.5 17.5v2" />
  </svg>
);

export const IconPower: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M4 20h4v-4h4v-4h4V8h4" />
    <path d="M17 2.5l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z" />
  </svg>
);

export const IconXeq: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M4.5 6l7 12M11.5 6l-7 12" />
    <path d="M15.5 10h5M15.5 14h5" />
  </svg>
);

export const IconTriangle: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M12 4L21.5 19.5h-19z" />
    <path d="M12 9.5a3 3 0 012.4 4" opacity=".55" />
  </svg>
);

export const IconGrid: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M4.5 3.5v17h16" />
    <path d="M4.5 3.5l2 2M4.5 3.5l2-2M20.5 20.5l-2 2M20.5 20.5l-2-2" />
    <circle cx="14.5" cy="9" r="1.6" fill="currentColor" stroke="none" />
    <path d="M14.5 9v11.5M14.5 9H4.5" strokeDasharray="2.5 2.5" opacity=".6" />
  </svg>
);

export const IconChart: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M3.5 20.5h17" />
    <path d="M6.5 20.5v-6M11 20.5V6.5M15.5 20.5v-9.5M20 20.5V10" strokeWidth="2.6" />
  </svg>
);

export const IconFlask: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M9.5 3h5M10.5 3v5.2L4.7 18.5A2 2 0 006.5 21.5h11a2 2 0 001.8-3L13.5 8.2V3" />
    <path d="M7.5 15h9" />
    <circle cx="10.5" cy="18" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="14" cy="17.2" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const IconAtom: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <ellipse cx="12" cy="12" rx="9" ry="3.8" />
    <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
  </svg>
);

export const IconFlame: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M12 3c1.5 3.5 6 5.5 6 10a6 6 0 01-12 0c0-2.8 1.6-4.2 2.8-6.5.9 1.6 2.6 1.9 3.2-3.5z" />
    <path d="M12 21a3 3 0 003-3c0-1.8-1.5-2.6-3-4.5-1.5 1.9-3 2.7-3 4.5a3 3 0 003 3z" opacity=".55" />
  </svg>
);

export const IconBolt: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M13 2.5L5 13.5h5.5L9.5 21.5l8-11h-5.5z" />
  </svg>
);

export const IconSunlight: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.2 5.2L7 7M17 17l1.8 1.8M18.8 5.2L17 7M7 17l-1.8 1.8" />
  </svg>
);

export const IconPlug: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M9 3v5M15 3v5" />
    <path d="M7 8h10v3a5 5 0 01-10 0z" />
    <path d="M12 16v5" />
  </svg>
);

export const IconCircle: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    <path d="M12 12l6-6" strokeDasharray="2.5 2.5" opacity=".65" />
  </svg>
);

export const IconTimer: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <circle cx="12" cy="13.5" r="7.5" />
    <path d="M12 9.5v4l2.8 2" />
    <path d="M9.5 2.5h5M12 2.5V6" />
    <path d="M18.5 5.5l1.5 1.5" />
  </svg>
);

export const IconStar: FC<IconProps & { filled?: boolean }> = ({ className, filled = false }) => (
  <svg {...base(className)} fill={filled ? "currentColor" : "none"}>
    <path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 16.9l-5.4 2.9 1.1-6.1-4.5-4.3 6.1-.8z" />
  </svg>
);

export const IconTrophy: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M7 4h10v5a5 5 0 01-10 0z" />
    <path d="M7 5.5H4a3 3 0 003 4.5M17 5.5h3a3 3 0 01-3 4.5" />
    <path d="M12 14v3.5M8.5 21h7M9.5 17.5h5V21h-5z" />
  </svg>
);

export const IconBrain: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M9.5 4A2.5 2.5 0 007 6.5c-1.8.3-3 1.6-3 3.5 0 .9.3 1.7.9 2.3A3.2 3.2 0 006 17.5 3.4 3.4 0 009.5 21c1 0 1.8-.3 2.5-.9V4.9A2.6 2.6 0 009.5 4z" />
    <path d="M14.5 4A2.5 2.5 0 0117 6.5c1.8.3 3 1.6 3 3.5 0 .9-.3 1.7-.9 2.3A3.2 3.2 0 0118 17.5 3.4 3.4 0 0114.5 21c-1 0-1.8-.3-2.5-.9V4.9A2.6 2.6 0 0114.5 4z" />
    <path d="M9.5 9.5c1 .4 1.5 1.2 1.5 2.5M14.5 9.5c-1 .4-1.5 1.2-1.5 2.5" opacity=".6" />
  </svg>
);

export const IconPencil: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 013 3L8 19z" />
    <path d="M14.5 6.5l3 3M4 20l4-1" />
  </svg>
);

export const IconCheck: FC<IconProps> = ({ className }) => (
  <svg {...base(className)} strokeWidth={2.6}>
    <path d="M4.5 12.5l5 5L19.5 6.5" />
  </svg>
);

export const IconCross: FC<IconProps> = ({ className }) => (
  <svg {...base(className)} strokeWidth={2.6}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconArrowL: FC<IconProps> = ({ className }) => (
  <svg {...base(className)} strokeWidth={2.2}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const IconShuffle: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M3 7h3.5c5.5 0 6 10 11.5 10H21" />
    <path d="M3 17h3.5c1.6 0 2.9-.9 4-2M21 7h-3c-1.6 0-2.9.9-4 2" />
    <path d="M18.5 4.5L21 7l-2.5 2.5M18.5 14.5L21 17l-2.5 2.5" />
  </svg>
);

export const IconSpark: FC<IconProps> = ({ className }) => (
  <svg {...base(className)} fill="currentColor" stroke="none">
    <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
  </svg>
);

export const IconEye: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconRefresh: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M4 12a8 8 0 0114-5.3L20.5 9" />
    <path d="M20.5 4.5V9H16" />
    <path d="M20 12a8 8 0 01-14 5.3L3.5 15" />
    <path d="M3.5 19.5V15H8" />
  </svg>
);

export const IconLogo: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className ?? "h-8 w-8"} aria-hidden>
    <polygon
      points="7.2,1.5 16.8,1.5 22.5,7.2 22.5,16.8 16.8,22.5 7.2,22.5 1.5,16.8 1.5,7.2"
      fill="currentColor"
    />
    <text
      x="12"
      y="16.6"
      textAnchor="middle"
      fontSize="12.5"
      fontFamily="Lalezar, Vazirmatn, sans-serif"
      fill="var(--color-paper)"
    >
      ۸
    </text>
  </svg>
);

export const IconBubble: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <circle cx="9" cy="9" r="3.4" />
    <circle cx="16.5" cy="13.5" r="2.3" />
    <circle cx="8" cy="17.5" r="1.7" />
    <circle cx="17.5" cy="5.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const IconHand: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M8 12.5V6.8a1.4 1.4 0 012.8 0v4.7" />
    <path d="M10.8 11V4.9a1.4 1.4 0 012.8 0V11" />
    <path d="M13.6 11V6.2a1.4 1.4 0 012.8 0v6.3" />
    <path d="M16.4 12.5v-1.3a1.4 1.4 0 012.8 0v4.3a6.5 6.5 0 01-6.5 6.5h-1.4a6.5 6.5 0 01-6.5-6.5v-2.9a1.4 1.4 0 012.8 0" />
  </svg>
);

export const IconHeart: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M12 20.5S4.5 16 2.9 11.4C1.8 8.2 3.8 5 7 5c2 0 3.6 1.1 5 3.2C13.4 6.1 15 5 17 5c3.2 0 5.2 3.2 4.1 6.4C19.5 16 12 20.5 12 20.5z" />
    <path d="M5 11.5h3.2l1.3-2 2 3.5 1.3-1.5H16" opacity=".6" />
  </svg>
);

export const IconGear: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="4.4" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8" />
  </svg>
);

export const IconMagnet: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M5.5 3.5h4.2V11a2.3 2.3 0 004.6 0V3.5h4.2V11a6.5 6.5 0 01-13 0z" />
    <path d="M5.5 8h4.2M14.3 8h4.2" />
  </svg>
);

export const IconWave: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M2.5 12q2.35-7.5 4.75 0t4.75 0 4.75 0 4.75 0" />
    <path d="M4 18.5q2-3.5 4 0t4 0 4 0" opacity=".5" />
  </svg>
);

export const IconFish: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M2.5 12S6 6.5 12 6.5c3.8 0 6.8 2.4 9.5 5.5-2.7 3.1-5.7 5.5-9.5 5.5-6 0-9.5-5.5-9.5-5.5z" />
    <circle cx="8.5" cy="11" r="0.9" fill="currentColor" stroke="none" />
    <path d="M12.5 8.5c-1 2.3-1 4.7 0 7" opacity=".5" />
  </svg>
);

export const IconLeaf: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M5 19.5C5 9.5 12 5 20.5 4c-1 8.5-5.5 15.5-15.5 15.5z" />
    <path d="M5 19.5c2.8-5.8 6.8-9 11-11.5" opacity=".6" />
  </svg>
);

export const IconHex: FC<IconProps> = ({ className }) => (
  <svg {...base(className)}>
    <path d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z" />
    <path d="M12 12L3.8 7.25M12 12l8.2-4.75M12 12v9.5" opacity=".5" />
  </svg>
);

export const TOPIC_ICONS: Record<string, FC<IconProps>> = {
  sigma: IconSigma,
  power: IconPower,
  xeq: IconXeq,
  triangle: IconTriangle,
  grid: IconGrid,
  chart: IconChart,
  flask: IconFlask,
  atom: IconAtom,
  flame: IconFlame,
  bolt: IconBolt,
  sunlight: IconSunlight,
  plug: IconPlug,
  circle: IconCircle,
  timer: IconTimer,
  bubble: IconBubble,
  brain: IconBrain,
  hand: IconHand,
  heart: IconHeart,
  gear: IconGear,
  magnet: IconMagnet,
  wave: IconWave,
  fish: IconFish,
  leaf: IconLeaf,
  hex: IconHex,
};
