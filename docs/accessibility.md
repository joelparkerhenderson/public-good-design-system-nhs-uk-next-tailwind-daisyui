# Accessibility Guide

This design system targets WCAG 2.1 Level AA compliance. Every component is built with accessibility as a core requirement, not an afterthought.

## Principles

1. **Perceivable** - Content is available to all senses (sight, hearing, touch)
2. **Operable** - All functionality works with keyboard, mouse, and assistive technology
3. **Understandable** - Content and interface behavior are predictable and clear
4. **Robust** - Components work across browsers and assistive technologies

## Built-in Features

### Focus Management

All interactive elements have visible focus indicators:

```css
:focus-visible {
  outline: 3px solid #ffeb3b;  /* Yellow focus ring */
  outline-offset: 2px;
}
```

Mouse users don't see focus outlines (`:focus:not(:focus-visible)` removes them).

### Skip Link

Every page includes a "Skip to main content" link that becomes visible on focus:

```tsx
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Keyboard Navigation

All components support keyboard interaction:

| Component | Keys |
|-----------|------|
| Button | Enter, Space to activate |
| Tabs | Arrow keys to navigate, Enter/Space to select |
| Details | Enter, Space to expand/collapse |
| Checkboxes/Radios | Arrow keys to move, Space to select |
| Select | Arrow keys to navigate options |
| ErrorSummary | Links are focusable, Enter to navigate to field |

### Screen Reader Support

- Semantic HTML elements (`<nav>`, `<main>`, `<header>`, `<footer>`, `<button>`)
- ARIA labels on icon-only elements
- `aria-hidden="true"` on decorative elements (icons, SVGs)
- `aria-describedby` linking fields to hints and errors
- `aria-expanded` on expandable content
- `aria-current="page"` on active navigation items
- Visually hidden text for screen reader context (e.g., "Error:" prefix on error messages)

### Reduced Motion

The global styles respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Mode

```css
@media (prefers-contrast: high) {
  * {
    border-color: CanvasText;
  }
  button, a {
    border: 2px solid;
  }
}
```

### RTL Support

Arabic locale automatically sets `dir="rtl"` on the HTML element. Global styles adjust padding direction for lists:

```css
[dir="rtl"] {
  text-align: right;
}
[dir="rtl"] ul, [dir="rtl"] ol {
  padding-left: 0;
  padding-right: 1.5rem;
}
```

## Component Accessibility Patterns

### Form Fields

Every form field should have:

1. A visible `<Label>` associated via `htmlFor`/`id`
2. Optional `<Hint>` text linked via `aria-describedby`
3. `<ErrorMessage>` when in error state, linked via `aria-describedby`
4. `aria-invalid="true"` when field has errors

```tsx
<Label htmlFor="name">Full name</Label>
<Hint id="name-hint">As shown on your passport</Hint>
<ErrorMessage id="name-error">Enter your full name</ErrorMessage>
<Input
  id="name"
  name="name"
  error="Enter your full name"
  aria-describedby="name-hint name-error"
/>
```

### Error Summary

Placed at the top of the form, lists all errors with links to the relevant fields. Should receive focus when the form is submitted with errors:

```tsx
<ErrorSummary
  title="There is a problem"
  errors={[
    { text: 'Enter your full name', href: '#name' },
    { text: 'Enter your email address', href: '#email' },
  ]}
/>
```

### Navigation

- Use `<nav>` element with `aria-label` to distinguish multiple navigation regions
- Breadcrumb uses `aria-label="Breadcrumb"` and `aria-current="page"` for the current page
- Header navigation items support keyboard expansion

### Tables

- Use `<caption>` for table title
- Use `<thead>` and `<th>` with `scope` attribute
- Consider responsive alternatives for small screens

## Utility Functions

The utils module provides accessibility helpers:

```typescript
import {
  getAriaDescribedBy,
  focusElement,
  isReducedMotion,
  isHighContrast,
  isRTL,
} from '@/utils';

// Build aria-describedby from hint and error
const describedBy = getAriaDescribedBy('hint text', 'error text', 'field-id');
// Returns: "field-id-hint field-id-error"

// Focus an element programmatically
focusElement('#error-summary');

// Check user preferences
if (isReducedMotion()) { /* skip animation */ }
if (isHighContrast()) { /* use system colors */ }
if (isRTL('ar')) { /* adjust layout */ }
```

## Testing Accessibility

### Automated Testing

- Unit tests verify ARIA attributes are present and correct
- Tests check that labels are associated with inputs
- Tests verify keyboard event handlers

### Manual Testing Checklist

- [ ] Tab through all interactive elements - order is logical
- [ ] Activate controls with Enter and Space
- [ ] Navigate with arrow keys where appropriate
- [ ] Test with screen reader (VoiceOver, NVDA, JAWS)
- [ ] Verify color contrast ratios meet 4.5:1 (text) and 3:1 (large text)
- [ ] Test at 200% zoom
- [ ] Test with `prefers-reduced-motion: reduce`
- [ ] Test with `prefers-contrast: high`
- [ ] Test with RTL locale (Arabic)

## Color Contrast

All text colors meet WCAG AA contrast ratios:

| Foreground | Background | Ratio | Passes |
|-----------|------------|-------|--------|
| `#212b32` (text) | `#ffffff` (white) | 14.7:1 | AA, AAA |
| `#4c6272` (secondary) | `#ffffff` (white) | 5.8:1 | AA |
| `#005eb8` (primary) | `#ffffff` (white) | 5.6:1 | AA |
| `#ffffff` (white) | `#005eb8` (primary) | 5.6:1 | AA |
| `#ffffff` (white) | `#007f3b` (green) | 4.6:1 | AA |
| `#212b32` (text) | `#ffeb3b` (focus) | 12.7:1 | AA, AAA |

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [NHS UK Accessibility Guide](https://service-manual.nhs.uk/accessibility)
- [GOV.UK Accessibility Requirements](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apd/)
