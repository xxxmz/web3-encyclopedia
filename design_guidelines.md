# Web3 Terminology Encyclopedia - Design Guidelines

## Design Approach

**Selected Approach:** Hybrid - Modern Web3 Aesthetic + Information Architecture Best Practices

**Justification:** This educational platform requires clarity and usability for learning while embracing the innovative, tech-forward aesthetic of the Web3 space to engage users and establish credibility in the crypto/blockchain community.

**Design Philosophy:** Clean, modern, and exploration-friendly with subtle Web3 visual cues that don't compromise readability.

---

## Core Design Elements

### A. Color Palette

**Dark Mode Primary (Default):**
- Background Primary: `222 15% 12%` (deep charcoal)
- Background Secondary: `222 15% 16%` (elevated surfaces)
- Background Tertiary: `222 15% 20%` (cards, hover states)
- Text Primary: `0 0% 98%` (near white)
- Text Secondary: `220 9% 65%` (muted descriptions)
- Border Subtle: `220 13% 24%` (dividers, card borders)

**Brand Colors:**
- Primary: `260 100% 65%` (vibrant purple - Web3 signature)
- Primary Hover: `260 95% 60%`
- Accent: `180 80% 55%` (cyan - blockchain tech vibe)
- Success/Hot Indicator: `145 65% 55%` (emerald for trending terms)

**Light Mode:**
- Background Primary: `0 0% 99%`
- Background Secondary: `220 15% 97%`
- Text Primary: `222 15% 15%`
- Text Secondary: `220 9% 45%`
- Adjust brand colors for light mode contrast

### B. Typography

**Font Families:**
- Primary (Body): Inter (Google Fonts) - exceptional readability for technical content
- Headings: Inter SemiBold/Bold - maintains consistency while providing hierarchy
- Code/Technical: JetBrains Mono (for inline technical terms if needed)

**Type Scale:**
- Hero/H1: `text-5xl lg:text-6xl` (60-72px) - Bold
- H2 (Section Headers): `text-3xl lg:text-4xl` (36-48px) - SemiBold
- H3 (Term Titles): `text-2xl lg:text-3xl` (30-36px) - SemiBold
- Body: `text-base lg:text-lg` (16-18px) - Regular
- Small/Meta: `text-sm` (14px) - Regular
- Captions: `text-xs` (12px) - Medium

### C. Layout System

**Spacing Units:** Use Tailwind spacing: `2, 3, 4, 6, 8, 12, 16, 20, 24` for consistent rhythm

**Container Strategy:**
- Max width: `max-w-7xl` for main content
- Term cards container: `max-w-6xl`
- Detail content: `max-w-4xl` (optimal reading)
- Padding: `px-4 md:px-6 lg:px-8` for responsiveness

**Grid System:**
- Term cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with `gap-4 lg:gap-6`
- Related terms: `grid-cols-2 lg:grid-cols-4` for compact display

### D. Component Library

**Navigation:**
- Fixed header with glassmorphism effect (`backdrop-blur-xl bg-background/80`)
- Logo + Search bar (future) + Dark mode toggle
- Clean, minimal navigation with focus on search functionality
- Height: `h-16 lg:h-20`

**Term Cards (Homepage):**
- Card style: Subtle elevation with hover lift effect
- Background: `bg-secondary` with `border border-subtle`
- Padding: `p-6`
- Rounded corners: `rounded-xl`
- Shadow: `shadow-sm hover:shadow-lg` transition
- **Content Structure:**
  - Term title: `text-xl font-semibold` with primary color on hover
  - Hot indicator: Small badge with heat icon + click count (`text-xs bg-accent/10 text-accent`)
  - Brief description: `text-sm text-secondary` max 2 lines with ellipsis
  - Category tag: Small pill badge with category color coding
- Hover state: Slight translate-y lift (`-translate-y-1`) + border color intensifies

**Term Detail Page:**
- Hero section with term title: Large typography `text-4xl lg:text-5xl` bold
- Metadata bar: Click count, category, last updated in horizontal flex
- Content sections with clear hierarchy:
  - Definition (most prominent)
  - Background/History
  - Applications/Use Cases
  - Related Terms (grid of clickable cards)
- Breadcrumb navigation at top
- Content in prose-style layout with `max-w-4xl`

**Buttons:**
- Primary: `bg-primary text-white rounded-lg px-6 py-3 font-medium`
- Secondary: `bg-secondary border border-subtle rounded-lg px-6 py-3`
- Text buttons for low-emphasis actions
- All buttons: `transition-all duration-200` for smooth interactions

**Heat/Popularity Indicators:**
- Flame icon + number for trending terms
- Gradient background for top 3 terms (`bg-gradient-to-r from-primary/5 to-accent/5`)
- Animated flame icon for #1 term (subtle pulse)

**Search (Future-ready):**
- Prominent search bar in header: `rounded-full` with icon
- Floating results dropdown with glassmorphism
- Keyboard shortcut indicator (Cmd/Ctrl + K)

### E. Visual Treatments

**Glass Morphism (Selective Use):**
- Header/Navigation only
- Modal overlays
- Not on main content cards (maintains clarity)

**Gradients (Subtle):**
- Accent gradients on hover states only
- Background gradient in hero: Very subtle `from-background via-background to-secondary/20`
- No aggressive gradients that distract from content

**Micro-Interactions:**
- Smooth card hover states (200ms ease transitions)
- Click count increment animation when viewing term details
- Skeleton loading for term cards during data fetch
- Smooth scroll-to-top button with fade-in

**Icons:**
- Heroicons (via CDN) for UI elements
- Fire/flame for hot terms
- Tag icon for categories
- Search icon
- Chevron for navigation

---

## Page-Specific Guidelines

### Homepage
**Structure:**
1. **Header** (fixed, glassmorphism): Logo, search, dark mode toggle
2. **Hero Section** (short, text-focused):
   - Heading: "Web3 术语百科" 
   - Subheading: Brief mission statement
   - Height: `py-16 lg:py-24` (not full viewport)
3. **Hot Terms Banner**: Horizontal scroll of top 5 trending terms with heat indicators
4. **Main Term Grid**: 
   - 3-column responsive grid
   - Each card shows term + brief + heat + category
   - Sorted by popularity (descending)
   - Pagination or infinite scroll for large datasets
5. **Footer**: Minimal - About, Contact, made with info

**No Hero Image Required** - This is a knowledge/utility site where content clarity is paramount

### Term Detail Page
**Structure:**
1. **Breadcrumb**: Home > [Category] > [Term Name]
2. **Term Header**: 
   - Large title
   - Metadata (clicks, category, updated date)
3. **Content Sections**: 
   - Each section in card with subtle background
   - Generous line-height `leading-relaxed` for readability
   - Code snippets with syntax highlighting if technical examples included
4. **Related Terms**: 2x2 or 4-column grid of term cards
5. **Back to Top** button (fixed bottom-right)

---

## Responsive Behavior

**Breakpoints:**
- Mobile: `< 768px` - Single column, larger touch targets
- Tablet: `768px - 1024px` - 2-column grids
- Desktop: `> 1024px` - 3-column grids, full experience

**Mobile Optimizations:**
- Simplified navigation (hamburger if multi-section)
- Larger tap targets (`min-h-12`)
- Reduced padding but maintain readability
- Horizontal scrolling for hot terms banner

---

## Accessibility & UX

- High contrast ratios (WCAG AA minimum)
- Focus indicators on all interactive elements (`ring-2 ring-primary`)
- Semantic HTML structure
- Keyboard navigation support
- Skip to main content link
- Screen reader friendly labels
- Loading states for all async operations
- Error states with clear messaging

---

## Design Inspiration References

Drawing from modern Web3 products:
- **Uniswap**: Clean card-based layouts, purple brand color
- **Coinbase**: Information hierarchy, trustworthy typography
- **Notion**: Reading experience, content-first approach
- **Stripe Docs**: Technical content clarity, dark mode implementation

This creates a credible, modern Web3 knowledge platform that balances aesthetics with usability for learners at all levels.