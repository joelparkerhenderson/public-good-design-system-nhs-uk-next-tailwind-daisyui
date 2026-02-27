# Public Good Design System &rarr; NHS UK &rarr; Next Tailwind DaisyUI

A modern, accessible React component library converted from the NHS UK Design System, built with Next.js 15, TypeScript, and styled-components.

One of three variations:

- [NHS UK &rarr; HTML CSS Javascript](https://github.com/joelparkerhenderson/public-good-design-system-nhs-uk-html-css-typescript)
- [NHS UK &rarr; Next.js Tailwind DaisyUI](https://github.com/joelparkerhenderson/public-good-design-system-nhs-uk-next-tailwind-daisyui) (This one)
- [NHS UK &rarr; Svelte Tailwind DaisyUI](https://github.com/joelparkerhenderson/public-good-design-system-nhs-uk-svelte-tailwind-daisyui)

## Overview

This project provides a production-ready component library adapted from the [NHS UK Design System](https://service-manual.nhs.uk/design-system). It retains the accessibility-first principles of the original while modernizing the stack for React/Next.js applications.

### Key Features

- **35 Components** - Buttons, forms, navigation, content display, and layout components
- **Accessibility First** - WCAG AA compliant with keyboard navigation, screen reader support, and focus management
- **Internationalization** - 5 languages (English, Welsh, Arabic, Chinese, Spanish) with RTL support
- **Design Tokens** - Colors, typography, spacing, and breakpoints from NHS UK
- **Comprehensive Testing** - 1063+ unit tests (Vitest) and E2E tests (Playwright)
- **Next.js 15** - Server-side rendering, static generation, and App Router support

## Getting Started

### Prerequisites

- Node.js 20.9.0+ or 22.11.0+
- npm

### Installation

```bash
git clone https://github.com/joelparkerhenderson/public-good-design-system-nhs-uk-next-tailwind-daisyui.git
cd public-good-design-system-nhs-uk-next-tailwind-daisyui
npm install
```

### Development

```bash
npm run dev          # Start development server on port 3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

### Testing

```bash
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run test:e2e         # Run Playwright E2E tests
```

## Architecture

### Tech Stack

| Layer        | Technology                     |
| ------------ | ------------------------------ |
| Framework    | Next.js 15 (App Router)        |
| Language     | TypeScript 5.9 (strict mode)   |
| Styling      | styled-components 6            |
| i18n         | next-intl 4                    |
| Unit Testing | Vitest + React Testing Library |
| E2E Testing  | Playwright                     |
| Deployment   | Vercel                         |

### Project Structure

```
src/
  app/                    # Next.js App Router pages and layouts
    [locale]/             # Locale-based routing
    lib/                  # App utilities (styled-components registry)
  components/             # 35 component directories
    [component-name]/
      Component.tsx       # Implementation
      Component.test.tsx  # Unit tests
      index.ts            # Exports
    index.ts              # Barrel exports for all components
    ThemeProvider.tsx      # styled-components theme wrapper
  styles/
    tokens.ts             # Design tokens (colors, typography, spacing)
    GlobalStyles.tsx       # Global CSS via styled-components
    styled.d.ts           # TypeScript augmentation for theme
  types/                  # Shared TypeScript type definitions
  utils/                  # Utility functions
  i18n/                   # Internationalization configuration
  hooks/                  # Custom React hooks
  middleware.ts           # next-intl locale routing middleware
messages/                 # i18n translation files (en, cy, ar, zh, es)
tests/
  setup.ts                # Vitest setup and global mocks
  utils/test-utils.tsx    # Custom render with ThemeProvider
  e2e/                    # Playwright test specs
```

### Component Pattern

Each component follows this structure:

```tsx
// Typed props interface
interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'warning';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

// styled-components for styling with theme tokens
const StyledButton = styled.button<{ $variant: string }>`
  background-color: ${({ theme, $variant }) => /* theme-based colors */};
`;

// Functional component with forwardRef where appropriate
export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <StyledButton $variant={variant} {...props} />;
}
```

### Design Tokens

```typescript
import { theme } from "@/styles/tokens";

theme.colors.primary; // #005eb8 (NHS Blue)
theme.colors.green; // #007f3b (Success)
theme.colors.red; // #d5281b (Error)
theme.typography.fontSize.base; // 1rem
theme.spacing[4]; // 1rem (16px)
theme.media.md; // @media (min-width: 768px)
```

## Components

### Form Elements (15)

ActionLink, BackLink, Button, CharacterCount, Checkboxes, DateInput, ErrorMessage, ErrorSummary, Fieldset, Hint, Input, Label, Radios, Select, Textarea

### Navigation (5)

Breadcrumb, Footer, Header, Pagination, SkipLink

### Content Display (9)

Card, ContentsList, Details, Images, InsetText, NotificationBanner, Panel, SummaryList, Table

### Interactive (3)

DoDontList, Tag, TaskList

### Layout (2)

Tabs, WarningCallout

### Utilities (1)

Hero

### Usage

```tsx
import { Button, Input, ErrorSummary } from "@public-good/design-system";

function MyForm() {
  return (
    <form>
      <Input
        id="email"
        name="email"
        label="Email address"
        hint="We will only use this for notifications"
        type="email"
      />
      <Button variant="primary">Submit</Button>
    </form>
  );
}
```

## Internationalization

Supported locales: `en` (English), `cy` (Welsh), `ar` (Arabic with RTL), `zh` (Chinese), `es` (Spanish).

Translations are in `messages/*.json`. The `[locale]` route segment and next-intl middleware handle locale detection and routing.

## Accessibility

All components are built to WCAG AA standards:

- Semantic HTML elements
- ARIA attributes and landmarks
- Keyboard navigation
- Focus management with visible focus indicators
- Screen reader compatible
- High contrast mode support
- Reduced motion preference support
- RTL layout support

## Deployment

Configured for Vercel with security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP). See `vercel.json` for full configuration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Run `npm run test && npm run typecheck && npm run lint`
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- [NHS UK Design System](https://service-manual.nhs.uk/design-system) - Original design system
- [GOV.UK Design System](https://design-system.service.gov.uk/) - Design inspiration
