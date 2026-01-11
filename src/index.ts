export interface VibeColors {
  [key: string]: string[];
}

export const VIBES: VibeColors = {
  ocean: ["#06b6d4", "#0891b2", "#0e7490", "#155e75", "#164e63"],
  sunset: ["#f97316", "#fb923c", "#fbbf24", "#dc2626", "#ea580c"],
  fire: ["#ef4444", "#f97316", "#fb923c", "#fbbf24", "#dc2626"],
  forest: ["#22c55e", "#16a34a", "#15803d", "#166534", "#84cc16"],
  bubble: ["#ec4899", "#f0abfc", "#db2777", "#c026d3", "#e879f9"],
  daybreak: ["#fbbf24", "#fde047", "#facc15", "#f59e0b", "#fb923c"],
  crystal: ["#a78bfa", "#c4b5fd", "#8b5cf6", "#a855f7", "#d8b4fe"],
  ice: ["#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9", "#e0f2fe"],
  stealth: ["#6b7280", "#9ca3af", "#4b5563", "#374151", "#1f2937"],
};

export type VibeName = keyof typeof VIBES;

export interface GradientCircle {
  cx: number;
  cy: number;
  r: number;
  color: string;
}

export interface AvatarData {
  bgColor: string;
  gradients: GradientCircle[];
  vibe: VibeName;
}

/**
 * Hash a string to generate a deterministic number
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Get a vibe name based on input hash
 */
export function getVibeForInput(input: string): VibeName {
  const vibeList = Object.keys(VIBES) as VibeName[];
  const hash = hashString(input);
  return vibeList[hash % vibeList.length];
}

/**
 * Generate avatar data (colors, positions, etc.)
 */
export function generateAvatarData(input: string, vibe?: VibeName): AvatarData {
  const selectedVibe = vibe || getVibeForInput(input);
  const colors = VIBES[selectedVibe];
  const hash = hashString(input);
  const gradients: GradientCircle[] = [];

  for (let i = 0; i < 4; i++) {
    const seedHash = hash + i * 1234;
    const color = colors[seedHash % colors.length];
    const angle = (seedHash % 360) * (Math.PI / 180);
    const distance = 30 + (seedHash % 40);
    const cx = 50 + Math.cos(angle) * distance;
    const cy = 50 + Math.sin(angle) * distance;
    const r = 50 + (seedHash % 30);
    gradients.push({ cx, cy, r, color });
  }

  return {
    bgColor: colors[hash % colors.length],
    gradients,
    vibe: selectedVibe,
  };
}

/**
 * Generate SVG string for avatar
 */
export function generateAvatarSVG(
  input: string,
  vibe?: VibeName,
  size: number = 200
): string {
  const data = generateAvatarData(input, vibe);
  const { bgColor, gradients } = data;

  const gradientDefs = gradients
    .map(
      (g, i) => `    <radialGradient id="g${i}-${input.replace(
        /[^a-zA-Z0-9]/g,
        ""
      )}" cx="${g.cx}%" cy="${g.cy}%" r="${g.r}%">
      <stop offset="0%" style="stop-color:${g.color};stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:${g.color};stop-opacity:0" />
    </radialGradient>`
    )
    .join("\n");

  const rects = gradients
    .map(
      (g, i) =>
        `    <rect width="${size}" height="${size}" fill="url(#g${i}-${input.replace(
          /[^a-zA-Z0-9]/g,
          ""
        )})" />`
    )
    .join("\n");

  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="blur-${input.replace(/[^a-zA-Z0-9]/g, "")}">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
    </filter>
${gradientDefs}
  </defs>
  <rect width="${size}" height="${size}" fill="${bgColor}" />
  <g filter="url(#blur-${input.replace(/[^a-zA-Z0-9]/g, "")})">
${rects}
  </g>
</svg>`;
}

/**
 * Generate data URL for use in img src
 */
export function generateAvatarDataURL(
  input: string,
  vibe?: VibeName,
  size: number = 200
): string {
  const svg = generateAvatarSVG(input, vibe, size);
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Generate CSS gradient string
 */
export function generateCSSGradient(input: string, vibe?: VibeName): string {
  const selectedVibe = vibe || getVibeForInput(input);
  const colors = VIBES[selectedVibe];
  const hash = hashString(input);

  const gradients: string[] = [];
  for (let i = 0; i < 4; i++) {
    const seedHash = hash + i * 1234;
    const colorIndex = seedHash % colors.length;
    const color = colors[colorIndex];
    const angle = seedHash % 360;
    const x = 20 + (seedHash % 60);
    const y = 20 + ((seedHash * 7) % 60);
    const size = 40 + (seedHash % 40);

    gradients.push(
      `radial-gradient(circle at ${x}% ${y}%, ${color}, transparent ${size}%)`
    );
  }

  return gradients.join(", ");
}
