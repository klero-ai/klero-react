import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  KleroProvider,
  KleroFeedback,
  KleroRoadmap,
  KleroChangelog,
  KleroWidget,
  KleroSurvey,
  useKleroEvents,
} from '../src';

// Config matching iOS, Android, and React Native examples
const PROJECT_SLUG = 'feedback';
const BASE_URL = 'https://feedback.klero.ai';
const SURVEY_ULID = '01KHRJEJDBP6T3PZZ7XFS5935Y';

type Tab = 'feedback' | 'roadmap' | 'changelog' | 'widget' | 'survey';

const TABS: { id: Tab; label: string }[] = [
  { id: 'feedback', label: 'Feedback' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'changelog', label: 'Changelog' },
  { id: 'widget', label: 'Widget' },
  { id: 'survey', label: 'Survey' },
];

function App() {
  return (
    <KleroProvider projectSlug={PROJECT_SLUG} baseUrl={BASE_URL}>
      <ExampleApp />
    </KleroProvider>
  );
}

function ExampleApp() {
  const [activeTab, setActiveTab] = useState<Tab>('feedback');
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (event: string) => {
    setEvents((prev) => [`${new Date().toLocaleTimeString()}: ${event}`, ...prev]);
  };

  useKleroEvents({
    'klero:survey:completed': (data) => addEvent(`Survey completed: ${data.responseUlid}`),
    'klero:survey:closed': (data) => addEvent(`Survey closed (completed: ${data.completed})`),
    'klero:survey:error': (data) => addEvent(`Survey error: ${data.error}`),
    'klero:widget:opened': () => addEvent('Widget opened'),
    'klero:widget:closed': () => addEvent('Widget closed'),
  });

  return (
    <div style={styles.container}>
      <nav style={styles.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.tabActive : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main style={styles.content}>
        {activeTab === 'feedback' && <FeedbackTab />}
        {activeTab === 'roadmap' && <RoadmapTab />}
        {activeTab === 'changelog' && <ChangelogTab />}
        {activeTab === 'widget' && <WidgetTab />}
        {activeTab === 'survey' && <SurveyTab />}
      </main>

      {events.length > 0 && (
        <div style={styles.eventLog}>
          <div style={styles.eventHeader}>
            <strong>Event Log</strong>
            <button onClick={() => setEvents([])} style={styles.clearBtn}>Clear</button>
          </div>
          {events.map((event, i) => (
            <div key={i} style={styles.eventText}>{event}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function FeedbackTab() {
  return (
    <div>
      <h2>Feedback Board</h2>
      <p style={styles.description}>Collect and manage user feedback with voting and comments.</p>
      <KleroFeedback style={{ minHeight: 600 }} />
    </div>
  );
}

function RoadmapTab() {
  return (
    <div>
      <h2>Product Roadmap</h2>
      <p style={styles.description}>See what's planned, in progress, and completed.</p>
      <KleroRoadmap style={{ minHeight: 600 }} />
    </div>
  );
}

function ChangelogTab() {
  return (
    <div>
      <h2>Changelog</h2>
      <p style={styles.description}>Stay up to date with the latest product updates.</p>
      <KleroChangelog style={{ minHeight: 600 }} />
    </div>
  );
}

function WidgetTab() {
  const [showWidget, setShowWidget] = useState(false);

  return (
    <div>
      <h2>In-App Widget</h2>
      <p style={styles.description}>
        All-in-one floating widget with feedback, changelog, and roadmap tabs.
      </p>

      <button
        onClick={() => setShowWidget(!showWidget)}
        style={{ ...styles.button, ...(showWidget ? styles.dangerButton : {}) }}
      >
        {showWidget ? 'Remove Widget' : 'Show Widget'}
      </button>

      {showWidget && (
        <KleroWidget position="bottom-right" tabs={['feedback', 'roadmap', 'changelog']} />
      )}
    </div>
  );
}

function SurveyTab() {
  const [showSurvey, setShowSurvey] = useState(false);

  return (
    <div>
      <h2>Surveys</h2>
      <p style={styles.description}>
        Collect structured responses from users with customizable surveys.
      </p>

      <button onClick={() => setShowSurvey(!showSurvey)} style={styles.button}>
        {showSurvey ? 'Close Survey' : 'Open Survey'}
      </button>

      {showSurvey && (
        <KleroSurvey
          surveyUlid={SURVEY_ULID}
          onComplete={(data) => console.log('Survey completed:', data)}
          onClose={(data) => {
            console.log('Survey closed:', data);
            setShowSurvey(false);
          }}
          onError={(data) => console.error('Survey error:', data)}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: 960,
    margin: '0 auto',
    padding: 16,
  },
  tabBar: {
    display: 'flex',
    gap: 4,
    borderBottom: '2px solid #e5e7eb',
    marginBottom: 24,
  },
  tab: {
    padding: '10px 20px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    color: '#6b7280',
    borderBottom: '2px solid transparent',
    marginBottom: -2,
  },
  tabActive: {
    color: '#3b82f6',
    borderBottomColor: '#3b82f6',
  },
  content: {
    minHeight: 400,
  },
  description: {
    color: '#6b7280',
    marginBottom: 16,
  },
  buttonGroup: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap' as const,
    marginBottom: 16,
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
  },
  dangerButton: {
    backgroundColor: '#ef4444',
  },
  outlineButton: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
  },
  eventLog: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1f2937',
    color: '#d1d5db',
    padding: 12,
    maxHeight: 160,
    overflow: 'auto',
    fontFamily: 'monospace',
    fontSize: 12,
  },
  eventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
    color: '#fff',
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: 12,
  },
  eventText: {
    padding: '2px 0',
  },
};

createRoot(document.getElementById('root')!).render(<App />);
