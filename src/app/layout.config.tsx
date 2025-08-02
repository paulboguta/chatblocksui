import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <svg
          aria-hidden="true"
          aria-label="Chatblocks Logo"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="currentColor" height="6" rx="2" width="8" x="2" y="8" />
          <rect fill="currentColor" height="6" rx="2" width="8" x="14" y="4" />
          <rect fill="currentColor" height="6" rx="2" width="8" x="12" y="14" />
        </svg>
        chatblocks
      </>
    ),
  },
  links: [],
  githubUrl: 'https://github.com/paulboguta/chatblocksui',
};
