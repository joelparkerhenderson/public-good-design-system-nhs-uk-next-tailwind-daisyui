# Internationalization (i18n)

The design system supports multiple languages using [next-intl](https://next-intl-docs.vercel.app/).

## Supported Locales

| Code | Language | Direction | Status |
|------|----------|-----------|--------|
| `en` | English | LTR | Default |
| `cy` | Welsh | LTR | Complete |
| `ar` | Arabic | RTL | Complete |
| `zh` | Chinese (Simplified) | LTR | Complete |
| `es` | Spanish | LTR | Complete |

## How It Works

### Routing

Locales are handled via the `[locale]` dynamic route segment:

```
/           → English (default, no prefix)
/cy/        → Welsh
/ar/        → Arabic
/zh/        → Chinese
/es/        → Spanish
```

The middleware in `src/middleware.ts` detects the user's preferred locale and redirects accordingly. The `localePrefix: 'as-needed'` setting means the default locale (`en`) doesn't show a prefix.

### Configuration

Locale list is defined in `src/i18n/request.ts`:

```typescript
export const locales = ['en', 'cy', 'ar', 'zh', 'es'] as const;
export type Locale = (typeof locales)[number];
```

The `getRequestConfig` function loads the appropriate translation file:

```typescript
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

### Translation Files

Translation files are JSON files in the `messages/` directory:

```
messages/
  en.json    # English
  cy.json    # Welsh
  ar.json    # Arabic
  zh.json    # Chinese
  es.json    # Spanish
```

### Message Structure

Messages are organized by scope:

```json
{
  "home": {
    "title": "Public Good Design System",
    "description": "A modern, accessible React component library..."
  },
  "components": {
    "characterCount": {
      "charactersRemaining": "You have {count} {count, plural, one {character} other {characters}} remaining"
    },
    "pagination": {
      "previous": "Previous",
      "next": "Next"
    }
  },
  "errors": {
    "required": "This field is required"
  },
  "common": {
    "yes": "Yes",
    "no": "No"
  }
}
```

### ICU Message Format

Translations support ICU message syntax for:

**Pluralization:**
```json
"You have {count} {count, plural, one {character} other {characters}} remaining"
```

**Number formatting:**
```json
"Page {page}"
```

## Using Translations in Components

### Client Components

```tsx
'use client';
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('components.pagination');

  return (
    <nav>
      <a href="/prev">{t('previous')}</a>
      <a href="/next">{t('next')}</a>
    </nav>
  );
}
```

### With Parameters

```tsx
const t = useTranslations('components.characterCount');

// Pass interpolation values
t('charactersRemaining', { count: 50 });
// → "You have 50 characters remaining"

t('charactersRemaining', { count: 1 });
// → "You have 1 character remaining"
```

## RTL Support

Arabic is the only RTL locale. The locale layout sets the `dir` attribute:

```tsx
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

Global styles handle RTL adjustments:

```css
[dir="rtl"] {
  text-align: right;
}
[dir="rtl"] ul,
[dir="rtl"] ol {
  padding-left: 0;
  padding-right: 1.5rem;
}
```

The `isRTL()` utility function can be used in components:

```typescript
import { isRTL } from '@/utils';

if (isRTL('ar')) {
  // Adjust component layout for RTL
}
```

## Adding a New Locale

1. Add the locale code to `src/i18n/request.ts`:

```typescript
export const locales = ['en', 'cy', 'ar', 'zh', 'es', 'fr'] as const;
```

2. Create the translation file `messages/fr.json` with all required keys (use `en.json` as a template).

3. Update the middleware matcher in `src/middleware.ts`:

```typescript
export const config = {
  matcher: ['/', '/(cy|ar|zh|es|fr)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
```

4. If the locale is RTL, update the `dir` attribute in `src/app/[locale]/layout.tsx`:

```typescript
dir={['ar', 'he'].includes(locale) ? 'rtl' : 'ltr'}
```

## Translation File Reference

### Required Keys

All locale files must include these top-level sections:

- `home` - Homepage content
- `components` - Component-specific translations
- `errors` - Error messages
- `accessibility` - Screen reader text
- `common` - Shared labels (yes, no, cancel, etc.)

### Component Keys

| Component | Key Path | Notes |
|-----------|----------|-------|
| CharacterCount | `components.characterCount.*` | Uses plural forms |
| ErrorSummary | `components.errorSummary.*` | Title and description |
| Pagination | `components.pagination.*` | Previous, next, page labels |
| SkipLink | `components.skipLink.*` | Skip to main content |
| Details | `components.details.*` | Show/hide labels |
| Tabs | `components.tabs.*` | Contents label |
| Breadcrumb | `components.breadcrumb.*` | ARIA label |
| BackLink | `components.backLink.*` | Back text |
| NotificationBanner | `components.notificationBanner.*` | Type labels |
| WarningCallout | `components.warningCallout.*` | Warning text |
| InsetText | `components.insetText.*` | Information label |
| Tag | `components.tag.*` | Status labels |
