import { env } from '@/env';
import Script from 'next/script';

export function Analytics() {
  if (env.NODE_ENV === 'development') return <></>;

  return (
   <Script
      defer
      data-website-id={env.NEXT_PUBLIC_UMAMI_TRACKING_ID}
      src={`${env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
    />
  );
}