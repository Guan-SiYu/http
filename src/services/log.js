import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
function init() {
    Sentry.init({
        dsn:
            'https://db58cc91030b446f88833dc9a3d6b156@o411937.ingest.sentry.io/5545691',
        integrations: [new Integrations.BrowserTracing()],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
    })
}
function log(error) {
    Raven('ex', error)
}
export default { init, log }
