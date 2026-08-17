// Outline-iconen in mockup-stijl (stroke 1.5, kleur via currentColor).
// Vervangt de emoji's: rustiger en premium.

type IconProps = { size?: number; className?: string; filled?: boolean };

function Base({
  size = 20,
  className,
  children,
  filled = false,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export const IconHeart = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 20.5 4.7 13a4.9 4.9 0 0 1 0-7 4.6 4.6 0 0 1 6.6 0l.7.7.7-.7a4.6 4.6 0 0 1 6.6 0 4.9 4.9 0 0 1 0 7Z" />
  </Base>
);

export const IconCart = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 7.5h12l1.3 12a1 1 0 0 1-1 1.1H5.7a1 1 0 0 1-1-1.1Z" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
  </Base>
);

export const IconSearch = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Base>
);

export const IconUser = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </Base>
);

export const IconGift = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="8.5" width="16" height="4" rx="1" />
    <path d="M5.5 12.5V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-6.5M12 8.5V20" />
    <path d="M12 8.5c-1.5 0-4-.5-4-2.5a2 2 0 0 1 4 0c0-1.1.9-2 2-2s2 .9 2 2c0 2-2.5 2.5-4 2.5Z" />
  </Base>
);

export const IconDiamond = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 4h10l4 5.5L12 20.5 3 9.5Z" />
    <path d="M3 9.5h18M12 4l-3 5.5 3 11 3-11-3-5.5" />
  </Base>
);

export const IconSparkle = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3c.6 3.9 2.4 5.7 6.5 6.5-4.1.8-5.9 2.6-6.5 6.5-.6-3.9-2.4-5.7-6.5-6.5C9.6 8.7 11.4 6.9 12 3Z" />
    <path d="M18.5 15c.3 1.9 1.1 2.7 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.3 2.7-1.1 3-3Z" />
  </Base>
);

export const IconTruck = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </Base>
);

export const IconLock = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </Base>
);

export const IconReturn = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9h11a5 5 0 0 1 0 10H8" />
    <path d="m8 5-4 4 4 4" />
  </Base>
);

export const IconPlay = (p: IconProps) => (
  <Base {...p} filled>
    <path d="M8 5.5v13l11-6.5Z" stroke="none" />
  </Base>
);

export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const IconBox = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5Z" />
    <path d="M4 8.5 12 13l8-4.5M12 13v7" />
  </Base>
);

export const IconMail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4.5 7.5 7.5 6 7.5-6" />
  </Base>
);

export const IconChevronRight = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 5 7 7-7 7" />
  </Base>
);

export const IconClose = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const IconCopy = (p: IconProps) => (
  <Base {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </Base>
);

export const IconMapPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-7-5.4-7-11a7 7 0 0 1 14 0c0 5.6-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);
