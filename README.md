# @klero/react

Official React SDK for [Klero](https://klero.ai) — embed feedback boards, roadmaps, changelogs, surveys, and widgets in your React app.

## Installation

```bash
npm install @klero/react
```

## Quick Start

```tsx
import { KleroProvider, KleroFeedback, KleroWidget } from '@klero/react';

function App() {
  return (
    <KleroProvider projectSlug="your-project">
      <KleroFeedback />
      <KleroWidget position="bottom-right" tabs={['feedback', 'changelog']} />
    </KleroProvider>
  );
}
```

## Components

### `<KleroProvider>`

Wraps your app and provides shared configuration to all Klero components.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `projectSlug` | `string` | Yes | Your Klero project slug |
| `baseUrl` | `string` | No | Custom base URL (defaults to `https://{slug}.klero.ai`) |
| `customerToken` | `string` | No | JWT for authenticated users |
| `loginUrl` | `string` | No | Redirect URL for unauthenticated users |

### `<KleroFeedback />`

Renders an inline feedback board. Accepts standard `<div>` props for styling.

### `<KleroRoadmap />`

Renders an inline roadmap. Optional `roadmapSlug` prop to show a specific roadmap.

### `<KleroChangelog />`

Renders an inline changelog.

### `<KleroWidget />`

Renders a floating widget button (appended to `document.body`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Widget position |
| `tabs` | `('feedback' \| 'roadmap' \| 'changelog')[]` | All tabs | Visible tabs |
| `defaultTab` | `string` | First tab | Initially active tab |

### `<KleroSurvey />`

Displays a survey modal.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `surveyUlid` | `string` | Yes | Survey ULID |
| `onComplete` | `(data) => void` | No | Fired on submission |
| `onClose` | `(data) => void` | No | Fired on close |
| `onError` | `(data) => void` | No | Fired on error |

## Hooks

### `useKleroSurvey()`

```tsx
const { open, close } = useKleroSurvey();
open('survey-ulid');
```

### `useKleroWidget()`

```tsx
const { open, close } = useKleroWidget();
open();
```

### `useKleroEvents(callbacks)`

Listen to Klero postMessage events.

```tsx
useKleroEvents({
  'klero:survey:completed': (data) => console.log(data),
  'klero:widget:opened': () => console.log('Widget opened'),
});
```

## SSR Support

All components are SSR-safe (Next.js, Remix, etc). DOM access only occurs in `useEffect`.

## License

MIT
