# vibes-avatar

> Deterministic gradient avatars with good vibes - inspired by [Laravel Avatars](https://avatars.laravel.cloud)

Generate beautiful mesh gradient avatars completely client-side with zero dependencies and no HTTP calls needed!

## 🎨 Inspiration

This package is inspired by Taylor Otwell's [Laravel Avatars](https://avatars.laravel.cloud), but runs entirely locally without requiring any HTTP requests. Perfect for generating deterministic, beautiful gradient avatars for your users!

## Why use this instead of Laravel Avatars?

✅ **No HTTP calls** - Everything runs client-side  
✅ **Faster** - No network latency  
✅ **Offline support** - Works without internet  
✅ **Zero dependencies** - Lightweight and simple  
✅ **Same deterministic output** - Same input = same avatar

## Installation

\`\`\`bash
npm install vibes-avatar
\`\`\`

## Usage

### Basic JavaScript/TypeScript

\`\`\`javascript
import { generateAvatarSVG, generateAvatarDataURL } from 'vibes-avatar';

// Generate SVG string
const svg = generateAvatarSVG('user@example.com');

// Generate data URL for img src
const dataUrl = generateAvatarDataURL('user@example.com');

// With specific vibe
const svgWithVibe = generateAvatarSVG('user@example.com', 'ocean');

// Custom size
const largeSvg = generateAvatarSVG('user@example.com', 'sunset', 400);
\`\`\`

### React Component

\`\`\`jsx
import { Avatar } from 'vibes-avatar/react';

function UserProfile() {
return (
<Avatar
input="user@example.com"
size={120}
vibe="ocean" // Optional - auto-selects if not provided
/>
);
}
\`\`\`

### HTML/CSS

\`\`\`html
<img id="avatar" />

<script type="module">
  import { generateAvatarDataURL } from 'vibes-avatar';
  
  document.getElementById('avatar').src = 
    generateAvatarDataURL('user@example.com');
</script>

\`\`\`

## API

### `generateAvatarSVG(input, vibe?, size?)`

Generates an SVG string.

- `input`: string - Any text (email, UUID, name, etc.)
- `vibe`: string (optional) - One of: ocean, sunset, fire, forest, bubble, daybreak, crystal, ice, stealth
- `size`: number (optional) - Size in pixels (default: 200)

### `generateAvatarDataURL(input, vibe?, size?)`

Generates a data URL for use in img src.

### `generateAvatarData(input, vibe?)`

Returns raw avatar data (colors, positions, etc.) for custom rendering.

### `getVibeForInput(input)`

Returns the auto-selected vibe for a given input.

## Available Vibes

- `ocean` - Blues and cyans
- `sunset` - Oranges and reds
- `fire` - Reds and yellows
- `forest` - Greens
- `bubble` - Pinks and magentas
- `daybreak` - Yellows
- `crystal` - Purples
- `ice` - Light blues
- `stealth` - Grays

## Features

✅ Deterministic - same input always produces same avatar
✅ Zero dependencies
✅ No HTTP calls - everything runs locally
✅ TypeScript support
✅ React components included
✅ Lightweight (~2KB gzipped)
✅ Works in browser and Node.js

## License

MIT
