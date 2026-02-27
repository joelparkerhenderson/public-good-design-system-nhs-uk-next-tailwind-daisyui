# Design Tokens

Design tokens are the visual atoms of the design system. They define colors, typography, spacing, breakpoints, and other constants used across all components.

All tokens are defined in `src/styles/tokens.ts` and accessed through the styled-components theme.

## Colors

### Primary Palette

| Token | Value | Usage |
|-------|-------|-------|
| `colors.primary` | `#005eb8` | Primary actions, links, branding |
| `colors.white` | `#ffffff` | Backgrounds, inverse text |
| `colors.black` | `#212b32` | Body text |
| `colors.green` | `#007f3b` | Success states, positive actions |
| `colors.red` | `#d5281b` | Error states, destructive actions |
| `colors.yellow` | `#ffeb3b` | Focus indicators |
| `colors.purple` | `#330072` | Visited links |
| `colors.darkPink` | `#7c2855` | Accent |

### Secondary Palette

| Token | Value | Usage |
|-------|-------|-------|
| `colors.darkBlue` | `#003087` | Hover states for primary color |
| `colors.paleYellow` | `#fff9c4` | Focus hover backgrounds |
| `colors.warmYellow` | `#ffb81c` | Warning indicators |
| `colors.orange` | `#ed8b00` | Warning states |
| `colors.aquaGreen` | `#00a499` | Accent |
| `colors.pink` | `#ae2573` | Accent |

### Greyscale

| Token | Value | Usage |
|-------|-------|-------|
| `colors.grey1` | `#4c6272` | Secondary text |
| `colors.grey2` | `#768692` | Muted text |
| `colors.grey3` | `#aeb7bd` | Borders |
| `colors.grey4` | `#d8dde0` | Light borders, backgrounds |
| `colors.grey5` | `#f0f4f5` | Background surfaces |

### Semantic Aliases

| Token | Maps To | Usage |
|-------|---------|-------|
| `colors.text` | `#212b32` | Default text color |
| `colors.border` | `#aeb7bd` | Default border color |
| `colors.secondary` | `#4c6272` | Secondary text |
| `colors.focus` | `#ffeb3b` | Focus ring color |
| `colors.error` | `#d5281b` | Error messages and borders |
| `colors.background` | `#ffffff` | Page background |

### Semantic Color Groups

```typescript
semanticColors.text.primary      // #212b32
semanticColors.text.secondary    // #4c6272
semanticColors.text.inverse      // #ffffff

semanticColors.background.primary    // #ffffff
semanticColors.background.secondary  // #f0f4f5
semanticColors.background.inverse    // #005eb8

semanticColors.border.primary    // #aeb7bd
semanticColors.border.secondary  // #d8dde0
semanticColors.border.focus      // #ffeb3b

semanticColors.state.success     // #007f3b
semanticColors.state.warning     // #ed8b00
semanticColors.state.error       // #d5281b
semanticColors.state.info        // #005eb8

semanticColors.interactive.primary   // #005eb8
semanticColors.interactive.hover     // #003087
semanticColors.interactive.disabled  // #aeb7bd
```

## Typography

### Font Families

| Token | Value |
|-------|-------|
| `typography.fontFamily.base` | "Frutiger W01", "Helvetica Neue", Helvetica, Arial, sans-serif |
| `typography.fontFamily.mono` | "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace |

### Font Sizes

| Token | Value | Pixels |
|-------|-------|--------|
| `typography.fontSize.xs` | 0.75rem | 12px |
| `typography.fontSize.sm` | 0.875rem | 14px |
| `typography.fontSize.base` | 1rem | 16px |
| `typography.fontSize.lg` | 1.125rem | 18px |
| `typography.fontSize.xl` | 1.25rem | 20px |
| `typography.fontSize['2xl']` | 1.5rem | 24px |
| `typography.fontSize['3xl']` | 1.875rem | 30px |
| `typography.fontSize['4xl']` | 2.25rem | 36px |
| `typography.fontSize['5xl']` | 3rem | 48px |
| `typography.fontSize['6xl']` | 3.75rem | 60px |

### Font Weights

| Token | Value |
|-------|-------|
| `typography.fontWeight.normal` | 400 |
| `typography.fontWeight.medium` | 500 |
| `typography.fontWeight.semibold` | 600 |
| `typography.fontWeight.bold` | 700 |

### Line Heights

| Token | Value |
|-------|-------|
| `typography.lineHeight.tight` | 1.25 |
| `typography.lineHeight.normal` | 1.5 |
| `typography.lineHeight.relaxed` | 1.75 |

## Spacing

Based on a 4px grid system.

| Token | Value | Pixels |
|-------|-------|--------|
| `spacing[0]` | 0 | 0 |
| `spacing[1]` | 0.25rem | 4px |
| `spacing[2]` | 0.5rem | 8px |
| `spacing[3]` | 0.75rem | 12px |
| `spacing[4]` | 1rem | 16px |
| `spacing[5]` | 1.25rem | 20px |
| `spacing[6]` | 1.5rem | 24px |
| `spacing[8]` | 2rem | 32px |
| `spacing[10]` | 2.5rem | 40px |
| `spacing[12]` | 3rem | 48px |
| `spacing[16]` | 4rem | 64px |
| `spacing[20]` | 5rem | 80px |
| `spacing[24]` | 6rem | 96px |
| `spacing[32]` | 8rem | 128px |
| `spacing[40]` | 10rem | 160px |
| `spacing[48]` | 12rem | 192px |
| `spacing[56]` | 14rem | 224px |
| `spacing[64]` | 16rem | 256px |

## Breakpoints

Mobile-first breakpoints.

| Token | Value | Usage |
|-------|-------|-------|
| `breakpoints.sm` | 480px | Small devices |
| `breakpoints.md` | 768px | Tablets |
| `breakpoints.lg` | 1024px | Desktop |
| `breakpoints.xl` | 1280px | Large desktop |
| `breakpoints['2xl']` | 1536px | Extra large desktop |

### Media Queries

Pre-built media query strings for use in styled-components:

```typescript
theme.media.sm   // @media (min-width: 480px)
theme.media.md   // @media (min-width: 768px)
theme.media.lg   // @media (min-width: 1024px)
theme.media.xl   // @media (min-width: 1280px)
theme.media['2xl'] // @media (min-width: 1536px)
```

Usage:

```typescript
const StyledComponent = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  ${({ theme }) => theme.media.md} {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;
```

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `zIndex.hide` | -1 | Hidden elements |
| `zIndex.base` | 0 | Default stacking |
| `zIndex.dropdown` | 1000 | Dropdown menus |
| `zIndex.sticky` | 1020 | Sticky headers |
| `zIndex.fixed` | 1030 | Fixed position elements |
| `zIndex.backdrop` | 1040 | Modal backdrops |
| `zIndex.modal` | 1050 | Modal dialogs |
| `zIndex.popover` | 1060 | Popovers |
| `zIndex.tooltip` | 1070 | Tooltips |
| `zIndex.toast` | 1080 | Toast notifications |

## Border Radius

| Token | Value | Pixels |
|-------|-------|--------|
| `borderRadius.none` | 0 | 0 |
| `borderRadius.sm` | 0.125rem | 2px |
| `borderRadius.base` | 0.25rem | 4px |
| `borderRadius.md` | 0.375rem | 6px |
| `borderRadius.lg` | 0.5rem | 8px |
| `borderRadius.xl` | 0.75rem | 12px |
| `borderRadius['2xl']` | 1rem | 16px |
| `borderRadius['3xl']` | 1.5rem | 24px |
| `borderRadius.full` | 9999px | Fully rounded |

## Box Shadows

| Token | Value |
|-------|-------|
| `boxShadow.sm` | 0 1px 2px rgba(0,0,0,0.05) |
| `boxShadow.base` | 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06) |
| `boxShadow.md` | 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06) |
| `boxShadow.lg` | 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05) |
| `boxShadow.xl` | 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04) |
| `boxShadow.focus` | 0 0 0 3px #ffeb3b |

## Animation

| Token | Value |
|-------|-------|
| `animation.duration.fast` | 150ms |
| `animation.duration.normal` | 300ms |
| `animation.duration.slow` | 500ms |
| `animation.easing.ease` | ease |
| `animation.easing.easeIn` | ease-in |
| `animation.easing.easeOut` | ease-out |
| `animation.easing.easeInOut` | ease-in-out |

## Usage in Components

```typescript
import styled from 'styled-components';

const MyComponent = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.semanticColors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.base};

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.boxShadow.focus};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => theme.spacing[6]};
  }
`;
```
