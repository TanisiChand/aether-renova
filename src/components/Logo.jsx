/**
 * Aether Renova brand mark — the official logo asset, used unaltered.
 * (AR Construction shares this same mark.)
 */
export default function Logo({ className = '' }) {
  return (
    <img
      src="/logos/aether.svg"
      alt="Aether Renova"
      className={className}
      draggable="false"
    />
  )
}
