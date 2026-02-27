# Component Guide

## Overview

The design system provides 35 components organized into 6 categories. All components are accessible, themeable, and support internationalization.

## Installation

```tsx
// Import individual components
import { Button, Input, ErrorSummary } from '@public-good/design-system';

// Or import from specific component paths
import { Button } from '@/components/button';
```

## Component Categories

### Form Elements (15)

| Component | Description |
|-----------|-------------|
| **ActionLink** | Forward-pointing link with arrow icon |
| **BackLink** | Back navigation link with left arrow |
| **Button** | Primary, secondary, warning, login, and reverse variants |
| **CharacterCount** | Textarea with live character/word counting |
| **Checkboxes** | Checkbox group with conditional reveal support |
| **DateInput** | Day/month/year input group |
| **ErrorMessage** | Error text with screen reader prefix |
| **ErrorSummary** | Summary box linking to individual field errors |
| **Fieldset** | Group related form fields with legend |
| **Hint** | Descriptive help text for form fields |
| **Input** | Text input with width variants and error states |
| **Label** | Form field label with size variants |
| **Radios** | Radio button group with conditional reveal |
| **Select** | Dropdown select menu |
| **Textarea** | Multi-line text input |

### Navigation (5)

| Component | Description |
|-----------|-------------|
| **Breadcrumb** | Hierarchical navigation trail |
| **Footer** | Page footer with navigation links |
| **Header** | Site header with logo, search, and navigation |
| **Pagination** | Previous/next and numbered page navigation |
| **SkipLink** | Skip to main content link for keyboard users |

### Content Display (9)

| Component | Description |
|-----------|-------------|
| **Card** | Content card with heading, description, and image |
| **ContentsList** | Linked table of contents |
| **Details** | Expandable content with summary/details pattern |
| **Images** | Responsive image with caption |
| **InsetText** | Highlighted text block with left border |
| **NotificationBanner** | Important or success notification |
| **Panel** | Confirmation panel (e.g., "Application complete") |
| **SummaryList** | Key-value list with actions |
| **Table** | Data table with head, body, and responsive support |

### Interactive (3)

| Component | Description |
|-----------|-------------|
| **DoDontList** | Paired do/don't guidance lists |
| **Tag** | Status label (active, white, grey, green, red, etc.) |
| **TaskList** | Checklist with status indicators |

### Layout (2)

| Component | Description |
|-----------|-------------|
| **Tabs** | Tabbed content panels (accordion on mobile) |
| **WarningCallout** | Important warning with yellow highlight |

### Utilities (1)

| Component | Description |
|-----------|-------------|
| **Hero** | Full-width hero banner with heading and image |

## Usage Examples

### Button

```tsx
import { Button } from '@/components';

// Primary button
<Button variant="primary" onClick={handleClick}>Save and continue</Button>

// Secondary button
<Button variant="secondary">Cancel</Button>

// Link button
<Button element="a" href="/next-page">Go to next page</Button>

// Disabled button
<Button disabled>Cannot submit</Button>
```

### Input with Error

```tsx
import { Input, ErrorMessage, Hint, Label } from '@/components';

<div>
  <Label htmlFor="email" size="l">Email address</Label>
  <Hint id="email-hint" text="We'll use this to send notifications" />
  <ErrorMessage id="email-error" text="Enter a valid email address" />
  <Input
    id="email"
    name="email"
    type="email"
    error="Enter a valid email address"
    aria-describedby="email-hint email-error"
  />
</div>
```

### Error Summary

```tsx
import { ErrorSummary } from '@/components';

<ErrorSummary
  title="There is a problem"
  errors={[
    { text: 'Enter your full name', href: '#name' },
    { text: 'Enter a valid email', href: '#email' },
  ]}
/>
```

### Card

```tsx
import { Card } from '@/components';

<Card
  type="clickable"
  heading="Card title"
  headingLevel={3}
  href="/page"
  description="Brief description of the content"
/>
```

### Checkboxes

```tsx
import { Checkboxes } from '@/components';

<Checkboxes
  id="contact"
  name="contact"
  fieldset={{ legend: { text: 'How would you like to be contacted?' } }}
  items={[
    { value: 'email', text: 'Email' },
    { value: 'phone', text: 'Phone' },
    { value: 'text', text: 'Text message' },
  ]}
/>
```

### Tabs

```tsx
import { Tabs } from '@/components';

<Tabs
  id="info"
  title="Information"
  items={[
    { id: 'past', label: 'Past day', content: <p>Past day content</p> },
    { id: 'week', label: 'Past week', content: <p>Past week content</p> },
    { id: 'month', label: 'Past month', content: <p>Past month content</p> },
  ]}
/>
```

### Breadcrumb

```tsx
import { Breadcrumb } from '@/components';

<Breadcrumb
  items={[
    { text: 'Home', href: '/' },
    { text: 'Services', href: '/services' },
    { text: 'Current page' },
  ]}
/>
```

### NotificationBanner

```tsx
import { NotificationBanner } from '@/components';

// Important notification
<NotificationBanner type="important" heading="Important">
  <p>You need to verify your email address.</p>
</NotificationBanner>

// Success notification
<NotificationBanner type="success" heading="Success">
  <p>Your application has been submitted.</p>
</NotificationBanner>
```

## Props Conventions

### Common Props

All components accept these base props:

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |
| `id` | `string` | HTML id attribute |
| `data-testid` | `string` | Test identifier |
| `children` | `ReactNode` | Child elements |

### Content Props

Many components support multiple content modes:

| Prop | Type | Priority | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Highest | React children |
| `html` | `string` | Medium | HTML string (dangerouslySetInnerHTML) |
| `text` | `string` | Lowest | Plain text |

### Error States

Form components support error display:

| Prop | Type | Description |
|------|------|-------------|
| `error` | `string \| object` | Error message or error config |
| `errorMessage` | `object` | Structured error with text/html |

## Accessibility

Every component includes:

- Semantic HTML elements (`<nav>`, `<main>`, `<button>`, etc.)
- ARIA attributes (`aria-label`, `aria-describedby`, `aria-expanded`, etc.)
- Keyboard navigation support
- Focus management
- Screen reader text where visual context is needed
- `role` attributes where HTML semantics are insufficient
