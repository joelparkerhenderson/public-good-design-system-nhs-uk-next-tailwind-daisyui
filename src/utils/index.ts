/**
 * Utility functions for the Public Good Design System
 */

// Class name utilities
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Generate unique IDs for components
export function generateId(prefix?: string): string {
  const id = Math.random().toString(36).substring(2, 11);
  return prefix ? `${prefix}-${id}` : id;
}

// Accessibility utilities
export function getAriaDescribedBy(
  hint?: string,
  error?: string,
  id?: string
): string | undefined {
  const describedBy = [];
  
  if (hint && id) {
    describedBy.push(`${id}-hint`);
  }
  
  if (error && id) {
    describedBy.push(`${id}-error`);
  }
  
  return describedBy.length > 0 ? describedBy.join(' ') : undefined;
}

// Focus management
export function focusElement(selector: string | HTMLElement): void {
  const element = typeof selector === 'string' 
    ? document.querySelector(selector) as HTMLElement
    : selector;
    
  if (element && element.focus) {
    element.focus();
  }
}

// Keyboard event utilities
export function isEnterKey(event: React.KeyboardEvent): boolean {
  return event.key === 'Enter';
}

export function isSpaceKey(event: React.KeyboardEvent): boolean {
  return event.key === ' ' || event.key === 'Space';
}

export function isEscapeKey(event: React.KeyboardEvent): boolean {
  return event.key === 'Escape' || event.key === 'Esc';
}

export function isArrowKey(event: React.KeyboardEvent): boolean {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key);
}

// String utilities
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Date utilities
export function formatDate(date: Date, locale: string = 'en-GB'): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

// Number utilities
export function formatNumber(num: number, locale: string = 'en-GB'): string {
  return new Intl.NumberFormat(locale).format(num);
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Local storage utilities
export function getFromStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setToStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage quota exceeded or disabled
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch {
    // Storage access denied
  }
}

// Media query utilities
export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function isHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-contrast: high)').matches;
}

// RTL utilities
export function isRTL(locale?: string): boolean {
  const rtlLocales = ['ar', 'he', 'fa', 'ur'];
  const currentLocale = locale || (typeof window !== 'undefined' ? document.documentElement.lang : 'en');
  return rtlLocales.includes(currentLocale.substring(0, 2));
}

// Component display name utility
export function setDisplayName(component: React.ComponentType<any>, name: string): void {
  component.displayName = name;
}