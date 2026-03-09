# @kleroai/react

Official React SDK for [Klero](https://klero.ai) — embed feedback boards, roadmaps, changelogs, surveys, and widgets in your React app.

## Installation

```bash
npm install @kleroai/react
```

## Quick Start

Components can be used **with or without** `<KleroProvider>`.

### With KleroProvider (shared config)

```tsx
import { KleroProvider, KleroFeedback, KleroWidget } from '@kleroai/react';

function App() {
  return (
    <KleroProvider projectSlug="your-project">
      <KleroFeedback />
      <KleroWidget />
    </KleroProvider>
  );
}
```

### Without KleroProvider (standalone)

```tsx
import { KleroFeedback, KleroWidget } from '@kleroai/react';

function App() {
  return (
    <>
      <KleroFeedback projectSlug="your-project" />
      <KleroWidget projectSlug="your-project" />
    </>
  );
}
```

## Components

### `<KleroProvider>`

Optional wrapper that provides shared configuration to all child Klero components.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `projectSlug` | `string` | Yes | Your Klero project slug |
| `baseUrl` | `string` | No | Custom base URL (defaults to `https://{slug}.klero.ai`) |
| `customerToken` | `string` | No | JWT for authenticated users |
| `loginUrl` | `string` | No | Redirect URL for unauthenticated users |

### Shared config props

All components accept the same optional config props, which override any values from a parent `<KleroProvider>`:

| Prop | Type | Description |
|------|------|-------------|
| `projectSlug` | `string` | Your Klero project slug |
| `baseUrl` | `string` | Custom base URL |
| `customerToken` | `string` | JWT for authenticated users |
| `loginUrl` | `string` | Redirect URL for unauthenticated users |

### `<KleroFeedback />`

Renders an inline feedback board. Accepts config props and standard `<div>` props for styling.

### `<KleroRoadmap />`

Renders an inline roadmap. Accepts config props, standard `<div>` props, and an optional `roadmapSlug` to show a specific roadmap.

| Prop | Type | Description |
|------|------|-------------|
| `roadmapSlug` | `string` | Specific roadmap to display |

### `<KleroChangelog />`

Renders an inline changelog. Accepts config props and standard `<div>` props for styling.

### `<KleroWidget />`

Renders a floating widget button (appended to `document.body`). Accepts config props.

### `<KleroSurvey />`

Displays a survey modal. Accepts config props plus:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `surveyUlid` | `string` | Yes | Survey ULID |
| `onComplete` | `(data: KleroSurveyCompletedEvent) => void` | No | Fired on submission |
| `onClose` | `(data: KleroSurveyClosedEvent) => void` | No | Fired on close |
| `onError` | `(data: KleroSurveyErrorEvent) => void` | No | Fired on error |

## Hooks

### `useKleroSurvey()`

Programmatically open/close a survey.

```tsx
const { open, close } = useKleroSurvey();
open('survey-ulid');
```

### `useKleroWidget()`

Programmatically open/close the widget.

```tsx
const { open, close } = useKleroWidget();
open();
```

### `useKleroEvents(callbacks)`

Listen to Klero postMessage events.

```tsx
useKleroEvents({
  'klero:survey:completed': (data) => console.log(data),
  'klero:survey:closed': (data) => console.log(data),
  'klero:widget:opened': () => console.log('Widget opened'),
});
```

### `useKleroScript(baseUrl)`

Low-level hook that loads the Klero script and returns `{ loaded, error }`. Useful for advanced use cases where you need to know when the script is ready.

```tsx
const { loaded, error } = useKleroScript('https://your-project.klero.ai');
```

## TypeScript

The following types are exported:

```ts
import type {
  KleroConfig,
  KleroSurveyCompletedEvent,
  KleroSurveyClosedEvent,
  KleroSurveyErrorEvent,
  KleroEventMap,
  KleroEventType,
} from '@kleroai/react';
```

## SSR Support

All components are SSR-safe (Next.js, Remix, etc). DOM access only occurs in `useEffect`.

## License

MIT