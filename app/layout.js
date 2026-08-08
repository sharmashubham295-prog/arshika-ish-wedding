import './globals.css';
import './countdown.css';
import './event-dates.css';
import './editorial-events.css';
import './event-photo-panel.css';
import './event-venues.css';
import './event-no-index.css';


export const metadata = {
  title: 'Dr. Arshika & Ish | 21 September 2026',
  description: 'A celebration of love, family and new beginnings.'
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
