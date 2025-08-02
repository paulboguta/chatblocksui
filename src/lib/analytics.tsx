import Script from 'next/script';
import { env } from '@/env';

export function Analytics() {
  if (env.NODE_ENV === 'development') {
    return <></>;
  }

  return (
    <Script
      data-website-id={env.NEXT_PUBLIC_UMAMI_TRACKING_ID}
      defer
      src={`${env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
    />
  );
}
