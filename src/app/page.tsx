import { ActionLink, BackLink } from '@/components';

export default function HomePage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <main id="main-content">
        <BackLink text="Back to overview" href="/" />

        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ color: '#005eb8', fontSize: '3rem', marginBottom: '1rem' }}>
            Public Good Design System
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#4c6272', maxWidth: '600px', margin: '0 auto' }}>
            A modern, accessible React component library converted from NHS UK Design System,
            built with Next.js, TypeScript, and styled-components.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <ActionLink
              text="View component documentation"
              href="/components"
            />
          </div>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: '#ffffff',
            border: '2px solid #aeb7bd',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h3 style={{ color: '#005eb8', marginBottom: '0.75rem' }}>Design Tokens</h3>
            <p style={{ color: '#4c6272', marginBottom: '1rem' }}>
              Comprehensive design tokens including colors, typography, spacing, and breakpoints
              converted from NHS UK Design System.
            </p>
            <span style={{
              background: '#007f3b',
              color: '#ffffff',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>Ready</span>
          </div>

          <div style={{
            background: '#ffffff',
            border: '2px solid #aeb7bd',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h3 style={{ color: '#005eb8', marginBottom: '0.75rem' }}>Accessibility First</h3>
            <p style={{ color: '#4c6272', marginBottom: '1rem' }}>
              WCAG AA compliant components with built-in keyboard navigation,
              screen reader support, and focus management.
            </p>
            <span style={{
              background: '#007f3b',
              color: '#ffffff',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>Ready</span>
          </div>

          <div style={{
            background: '#ffffff',
            border: '2px solid #aeb7bd',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h3 style={{ color: '#005eb8', marginBottom: '0.75rem' }}>Internationalization</h3>
            <p style={{ color: '#4c6272', marginBottom: '1rem' }}>
              Multi-language support including English, Welsh, Arabic, Chinese,
              and Spanish with RTL layout support.
            </p>
            <span style={{
              background: '#007f3b',
              color: '#ffffff',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>Ready</span>
          </div>

          <div style={{
            background: '#ffffff',
            border: '2px solid #aeb7bd',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h3 style={{ color: '#005eb8', marginBottom: '0.75rem' }}>Testing</h3>
            <p style={{ color: '#4c6272', marginBottom: '1rem' }}>
              Comprehensive testing with Vitest for unit tests and Playwright
              for end-to-end testing across all components.
            </p>
            <span style={{
              background: '#007f3b',
              color: '#ffffff',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>Complete</span>
          </div>

          <div style={{
            background: '#ffffff',
            border: '2px solid #aeb7bd',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h3 style={{ color: '#005eb8', marginBottom: '0.75rem' }}>35 Components</h3>
            <p style={{ color: '#4c6272', marginBottom: '1rem' }}>
              Complete set of UI components converted from NHS UK Design System,
              including buttons, forms, navigation, and layout components.
            </p>
            <span style={{
              background: '#007f3b',
              color: '#ffffff',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>Complete</span>
          </div>

          <div style={{
            background: '#ffffff',
            border: '2px solid #aeb7bd',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h3 style={{ color: '#005eb8', marginBottom: '0.75rem' }}>Next.js Ready</h3>
            <p style={{ color: '#4c6272', marginBottom: '1rem' }}>
              Optimized for Next.js with server-side rendering,
              static generation, and modern React patterns.
            </p>
            <span style={{
              background: '#007f3b',
              color: '#ffffff',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>Ready</span>
          </div>
        </div>

        <section style={{
          background: '#f0f4f5',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h2>Development Status</h2>
          <p>
            <strong>Project Setup:</strong> Complete<br />
            <strong>Design System Foundation:</strong> Complete<br />
            <strong>Component Conversion:</strong> Complete (35/35 components)<br />
            <strong>Testing Infrastructure:</strong> Complete (1063+ tests)<br />
            <strong>Documentation:</strong> Complete
          </p>
        </section>
      </main>
    </div>
  );
}