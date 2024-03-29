import * as _webvitals from 'web-vitals';
import { inject } from '@vercel/analytics';

import print from './print';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

let webvitals = _webvitals as Record<string, any>
for (var item in webvitals) webvitals[item]((metric: MetricType) => sendMetrics(metric));

type MetricType = { id: string; name: string; value: { toString: () => string; }; };
!window['injected'] && import.meta.env.PROD ? (inject(), window['injected'] = true) : 0;

function sendMetrics(metric: MetricType) {
  if (!import.meta.env.PROD) return

  let connection_type = (navigator as any)?.connection?.effectiveType ?? '';

  const body = {
    dsn: import.meta.env.VERCEL_ANALYTICS_ID ?? '',
    id: metric.id,
    page: location.href,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: connection_type,
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: 'application/x-www-form-urlencoded',
  });

  print('📊 ' + metric.name, metric.value.toString());

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else fetch(vitalsUrl, {
    body: blob,
    method: 'POST',
    credentials: 'omit',
    keepalive: true,
  });
}
