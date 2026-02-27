# Testing Guide

The design system uses Vitest for unit tests and Playwright for end-to-end tests.

## Unit Testing (Vitest)

### Setup

Test configuration is in `vitest.config.ts`. The test environment uses jsdom with React Testing Library.

Global setup in `tests/setup.ts` provides:
- `@testing-library/jest-dom` matchers (toBeInTheDocument, toHaveAttribute, etc.)
- Automatic cleanup after each test
- Mocks for browser APIs (IntersectionObserver, ResizeObserver, matchMedia, localStorage, scrollTo, focus)

### Custom Render

Use the custom `render` function from `tests/utils/test-utils.tsx` instead of the default. It wraps components in the ThemeProvider:

```tsx
import { render, screen } from '../../tests/utils/test-utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button text="Click me" />);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

### Running Tests

```bash
npm run test             # Run all tests once
npm run test:watch       # Watch mode (re-run on changes)
npm run test:coverage    # Generate coverage report

# Run a specific test file
npx vitest src/components/button/Button.test.tsx

# Run tests matching a pattern
npx vitest --testNamePattern="renders with"
```

### Coverage

Coverage is configured with V8 provider. Thresholds (all at 80%):

| Metric | Threshold |
|--------|-----------|
| Branches | 80% |
| Functions | 80% |
| Lines | 80% |
| Statements | 80% |

Coverage excludes: `node_modules/`, `tests/`, `dist/`, `.next/`, `src/types/`, `*.d.ts`, `*.config.*`

Reports are generated in text, JSON, and HTML formats.

### Writing Tests

#### Testing Rendering

```tsx
it('renders with default props', () => {
  render(<Button text="Submit" />);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Submit');
});
```

#### Testing Props

```tsx
it('applies variant class', () => {
  render(<Button text="Submit" variant="secondary" />);
  const button = screen.getByRole('button');
  // Check styled-components rendered output or attributes
  expect(button).toBeInTheDocument();
});

it('renders as anchor when href provided', () => {
  render(<Button text="Link" element="a" href="/page" />);
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/page');
});
```

#### Testing Accessibility

```tsx
it('has correct ARIA attributes', () => {
  render(
    <Input
      id="email"
      name="email"
      label="Email"
      error="Enter a valid email"
      aria-describedby="email-error"
    />
  );
  const input = screen.getByRole('textbox');
  expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('email-error'));
});

it('is keyboard accessible', () => {
  const handleClick = vi.fn();
  render(<Button text="Submit" onClick={handleClick} />);
  const button = screen.getByRole('button');
  button.focus();
  expect(button).toHaveFocus();
});
```

#### Testing User Interactions

```tsx
import userEvent from '@testing-library/user-event';

it('calls onClick when clicked', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<Button text="Submit" onClick={handleClick} />);

  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Testing Error States

```tsx
it('renders error message', () => {
  render(
    <Input
      id="name"
      name="name"
      label="Name"
      error="Enter your name"
    />
  );
  expect(screen.getByText('Enter your name')).toBeInTheDocument();
});
```

## E2E Testing (Playwright)

### Setup

Configuration is in `playwright.config.ts`. Tests run against the dev server on `localhost:3000`.

Browser matrix:
- Chromium (Desktop Chrome)
- Firefox
- WebKit (Desktop Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)
- Microsoft Edge
- Google Chrome

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npx playwright test --ui

# Run specific test file
npx playwright test tests/e2e/homepage.spec.ts

# Run in specific browser
npx playwright test --project=chromium

# Generate test report
npx playwright show-report
```

### Writing E2E Tests

```typescript
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Public Good Design System/);
    await expect(page.getByRole('heading', { name: 'Public Good Design System' })).toBeVisible();
  });

  test('skip link works', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skipLink).toBeFocused();
  });

  test('is responsive', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
```

### Playwright Features Used

- `screenshot: 'only-on-failure'` - Captures screenshots on test failures
- `trace: 'on-first-retry'` - Records traces for debugging retries
- `fullyParallel: true` - Tests run in parallel
- CI mode: 2 retries, single worker

## Test File Organization

```
src/components/
  button/
    Button.test.tsx      # Unit tests co-located with component

tests/
  setup.ts               # Global test setup and mocks
  utils/
    test-utils.tsx        # Custom render with ThemeProvider
  e2e/
    homepage.spec.ts      # Homepage E2E tests
    action-link.spec.ts   # ActionLink E2E tests
```

## Best Practices

1. **Test behavior, not implementation** - Test what the user sees and interacts with, not internal state
2. **Use accessible queries** - Prefer `getByRole`, `getByLabelText`, `getByText` over `getByTestId`
3. **Test accessibility** - Verify ARIA attributes, keyboard navigation, and screen reader text
4. **Test error states** - Every form component should test its error rendering
5. **Keep tests focused** - One assertion per concept, descriptive test names
6. **Use the custom render** - Always import from `tests/utils/test-utils` for ThemeProvider
