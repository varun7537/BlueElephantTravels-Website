# Blue Elephant — Homepage

A premium, responsive homepage for a curated luxury travel brand. Built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS** wired to CSS variables (single source of truth for design tokens)
- **Framer Motion** for entrance and hover animations
- **lucide-react** for icons
- **next/font** for `Plus Jakarta Sans` (headings) and `Inter` (body)

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Structure

```
src/
├── app/
│   ├── globals.css      # Imports variables.css + typography.css, defines utilities
│   ├── layout.tsx       # Fonts, metadata, root HTML
│   └── page.tsx         # Composes the homepage
├── components/
│   ├── homepage/
│   │   ├── Hero.tsx
│   │   ├── Destinations.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTA.tsx
│   │   ├── Instagram.tsx
│   │   └── index.ts
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   └── utils.ts         # cn() class-name helper
└── styles/
    ├── variables.css    # Design tokens (colors, fonts, spacing, radii)
    └── typography.css   # Fluid h1–h6 + p scale via clamp()
```

## Design tokens

All brand colors, fonts, spacing, and radii live in `src/styles/variables.css`. Edit there and they propagate everywhere — including Tailwind utility classes (`bg-primary`, `text-text-primary`, `rounded-xl`, etc.), thanks to the wiring in `tailwind.config.ts`.

## Notes

- Destination and Instagram images are hot-linked from Unsplash for demo. Swap them for production assets in `public/` and update `next.config.mjs` `remotePatterns` if you keep external hosts.
- Sections expose anchor ids (`#hero`, `#destinations`, `#features`, `#testimonials`, `#contact`, `#instagram`) so the navbar smooth-scrolls work out of the box.
- Reduced-motion is respected via `prefers-reduced-motion`.
