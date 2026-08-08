'use client';

import { useEffect, useRef, useState } from 'react';

const targetDate = new Date('2026-09-21T20:00:00+05:30');
const petals = [
  [7, 10, 0], [19, 24, 3], [32, 7, 6], [48, 17, 2], [63, 5, 8], [78, 22, 4], [89, 9, 7], [12, 68, 5], [91, 72, 1]
];
const events = [
  ['Sunday · 13 September 2026', 'Sunderkand Path & Lunch', 'A cherished gathering', '10:00 AM · Lunch at 1:30 PM', 'Ram Niwas, Ram Nagar Chowk, Saingarh, Pathankot', 'https://maps.app.goo.gl/PWiDcDZSMjbAxX2a9', 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85'],
  ['Friday · 18 September 2026', 'Sangeet & Bangle Ceremony', 'The Music Night', '06:00 PM', 'Ram Niwas, Ram Nagar Chowk, Saingarh, Pathankot', 'https://maps.app.goo.gl/PWiDcDZSMjbAxX2a9', 'https://images.unsplash.com/photo-1519580930435-fbfc9e7ecf26?auto=format&fit=crop&w=1200&q=85'],
  ['Saturday · 19 September 2026', 'Mehendi', 'Threads of Henna', '06:00 PM', 'Ram Niwas, Ram Nagar Chowk, Saingarh, Pathankot', 'https://maps.app.goo.gl/PWiDcDZSMjbAxX2a9', 'https://images.unsplash.com/photo-1525135850648-b42365991054?auto=format&fit=crop&w=1200&q=85'],
  ['Sunday · 20 September 2026', 'Haldi', 'Turmeric Blessings', '11:00 AM', 'Ram Niwas, Ram Nagar Chowk, Saingarh, Pathankot', 'https://maps.app.goo.gl/PWiDcDZSMjbAxX2a9', 'https://images.unsplash.com/photo-1670774837214-21b88943a6bb?auto=format&fit=crop&w=1200&q=85'],
  ['Sunday · 20 September 2026', 'Shagun', 'A cherished gathering', '08:00 PM', 'Utsav Resort, Defence Road, Pathankot', 'https://maps.app.goo.gl/iCtyrSCdD1NTBxyi6', 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?auto=format&fit=crop&w=1200&q=85'],
  ['Monday · 21 September 2026', 'Reception of Baraat', 'A cherished gathering', '08:00 PM', 'Badhani Countryside Resort, Badhani, Pathankot', 'https://maps.app.goo.gl/e1NJc2uKFoH1U3caA', 'https://images.pexels.com/photos/32315685/pexels-photo-32315685.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'],
  ['Tuesday · 22 September 2026', 'Doli · Taron Ki Chhaon Mein', 'Taron Ki Chhaon Mein', 'A beautiful new beginning', 'Badhani Countryside Resort, Badhani, Pathankot', 'https://maps.app.goo.gl/e1NJc2uKFoH1U3caA', 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=85']
];
const venues = [
  ['Ram Niwas', 'Ram Nagar Chowk, Saingarh, Pathankot', 'https://maps.app.goo.gl/PWiDcDZSMjbAxX2a9'],
  ['Utsav Resort', 'Defence Road, Pathankot', 'https://maps.app.goo.gl/iCtyrSCdD1NTBxyi6'],
  ['Badhani Countryside Resort', 'Badhani, Pathankot', 'https://maps.app.goo.gl/e1NJc2uKFoH1U3caA']
];
function Petals() { return <div className="petals" aria-hidden="true">{petals.map(([left, top, delay], i) => <i key={i} style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }} />)}</div>; }
function Countdown() {
  const [time, setTime] = useState({ days: '--', hours: '--', minutes: '--', seconds: '--' });
  useEffect(() => { const update = () => { const left = Math.max(0, targetDate.getTime() - Date.now()); setTime({ days: String(Math.floor(left / 86400000)).padStart(2, '0'), hours: String(Math.floor(left / 3600000) % 24).padStart(2, '0'), minutes: String(Math.floor(left / 60000) % 60).padStart(2, '0'), seconds: String(Math.floor(left / 1000) % 60).padStart(2, '0') }); }; update(); const id = setInterval(update, 1000); return () => clearInterval(id); }, []);
  return <div className="countdown" aria-label="Countdown to wedding">{Object.entries(time).map(([key, value]) => <div className="clock" key={key}><strong>{value}</strong><span>{key}</span></div>)}</div>;
}
export default function Home() {
  const [opened, setOpened] = useState(false); const [musicOn, setMusicOn] = useState(false); const [menu, setMenu] = useState(false); const [activeEvent, setActiveEvent] = useState(0); const audio = useRef(null);
  const openInvitation = async () => { setOpened(true); try { await audio.current?.play(); setMusicOn(true); } catch { setMusicOn(false); } };
  const toggleMusic = async () => { if (!audio.current) return; if (musicOn) { audio.current.pause(); setMusicOn(false); } else { try { await audio.current.play(); setMusicOn(true); } catch { setMusicOn(false); } } };
  return <main>
    <audio ref={audio} loop preload="none"><source src="https://cdn.pixabay.com/audio/2022/10/25/audio_9462e78d2d.mp3" type="audio/mpeg" /></audio>
    {!opened && <section className="intro"><Petals /><div className="prayer"><div className="om">ॐ</div><p>॥ श्री गणेशाय नमः ॥</p><span>वक्रतुण्ड महाकाय सूर्य कोटि समप्रभः।<br />निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥</span></div><button className="envelope" onClick={openInvitation} aria-label="Open the wedding invitation"><span className="flap" /><span className="seal">A <b>&amp;</b> I</span><span className="envelope-names">Arshika <em>&amp;</em> Ish</span></button><p className="open-prompt">Click to open <span>↓</span></p></section>}
    <div className={opened ? 'site revealed' : 'site'}>
      <nav><a href="#home" className="brand" aria-label="Dr. Arshika and Ish home">A<span>&amp;</span>I</a><button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle navigation" aria-expanded={menu}>Menu</button><div className={menu ? 'links show' : 'links'}><a href="#events">Events</a><a href="#gallery">Gallery</a><a href="#countdown">Countdown</a><a href="#venue">Venue</a><a href="#rsvp">RSVP</a></div><button className="music" onClick={toggleMusic} aria-label={musicOn ? 'Turn music off' : 'Turn music on'}>♫ {musicOn ? 'On' : 'Off'}</button></nav>
      <section id="home" className="hero"><Petals /><p className="eyebrow">With the blessings of our families</p><div className="hero-om">ॐ</div><h1>Dr. Arshika <i>&amp;</i> Ish</h1><span className="hero-divider" /><p className="forever">are beginning their forever</p><div className="date">21 <span>·</span> September <span>·</span> 2026</div><div id="countdown" className="hero-countdown"><Countdown /></div></section>
      <section className="family"><p className="eyebrow">A union of hearts</p><h2>Two families, one<br /><i>beautiful story</i></h2><p>Dr. Arshika, beloved daughter of Mrs. Jyoti &amp; Mr. Sanjeev Sharma, with Ish, beloved son of Mrs. Renu &amp; Late Shri Ashwani Mahajan, invite you to share in their joy.</p></section>
      <section id="events" className="events editorial-events"><header><p className="eyebrow">The celebrations</p><h2>Seven chapters of <i>celebration</i></h2><p>Every ritual, a memory<br />every moment, a blessing</p></header><div className="editorial-grid"><div className="event-list">{events.map((event, i) => <article className={activeEvent === i ? 'event active' : 'event'} key={event[1]} onMouseEnter={() => setActiveEvent(i)} onFocus={() => setActiveEvent(i)} tabIndex="0"><div className="event-copy"><h3>{event[1]}</h3><i>{event[2]}</i></div><div className="event-details"><p className="event-date">{event[0]}</p><p className="event-time">{event[3]}</p></div><p className="event-venue">{event[4]}</p><a className="event-map" href={event[5]} target="_blank" rel="noreferrer" aria-label={`View ${event[1]} venue in Google Maps`}>View <span>→</span></a></article>)}</div><aside className="event-showcase"><img src={events[activeEvent][6]} alt={`${events[activeEvent][1]} celebration`} /></aside></div></section>
      <section id="gallery" className="gallery"><p className="eyebrow">A glimpse of the magic</p><h2>Made of <i>moments</i></h2><div>{events.slice(0, 4).map((e) => <img src={e[6]} alt={`Wedding inspiration for ${e[1]}`} key={e[1]} />)}</div></section>
      <section id="venue" className="venues"><p className="eyebrow">Find your way</p><h2>Our <i>venues</i></h2><p>Three beautiful places where our story unfolds.</p><div className="venue-grid">{venues.map((venue, i) => <article key={venue[0]}><span>0{i + 1}</span><h3>{venue[0]}</h3><p>{venue[1]}</p><a href={venue[2]} target="_blank" rel="noreferrer" aria-label={`Open ${venue[0]} in Google Maps`}>Open in Maps <b>→</b></a></article>)}</div></section>
      <footer id="rsvp"><div className="footer-ring ring-a" /><div className="footer-ring ring-b" /><p className="eyebrow">With love and warm wishes</p><h2>Your presence is<br /><i>our present</i></h2><p className="special">Special invitation from our cuties Tanaisha and Saavya</p><div className="compliments"><p>Compliments from:</p><span>Bhumika &amp; Sahil Gupta  <br />Shubham Sharma</span></div><div className="contacts"><a href="tel:+919646162284">+91 96461 62284</a><a href="tel:+919646990228">+91 96469 90228</a></div><small>Music: The Long Way Home · Scott Buckley</small></footer>
    </div>
  </main>;
}
