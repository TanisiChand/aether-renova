const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
)

const VARIANTS = {
  primary:
    'bg-aether-accent text-black hover:shadow-[0_0_30px_rgba(0,240,152,0.4)] hover:-translate-y-0.5',
  secondary:
    'bg-white/[0.06] border border-white/30 text-white hover:border-aether-accent hover:bg-aether-accent/10 hover:text-aether-accent',
}

const SIZES = {
  sm: 'px-6 py-2.5 text-xs',
  md: 'px-8 py-4 text-sm',
}

/**
 * Shared call-to-action button — single source of truth for button styling
 * (padding, font, weight, tracking, shape, hover) across every section.
 * Renders as <a> when `href` is set, otherwise <button>.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  withArrow = true,
  children,
  className = '',
  ...props
}) {
  const classes = [
    'group inline-flex items-center justify-center gap-2 rounded-full',
    'font-sans font-semibold tracking-wide',
    'transition-all duration-300 cursor-pointer',
    SIZES[size],
    VARIANTS[variant],
    className,
  ].join(' ')

  const content = (
    <>
      {children}
      {withArrow && <ArrowIcon />}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  )
}
