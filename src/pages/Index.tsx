// Raj Kolala portfolio. Drop this file into src/pages/Index.tsx (or src/components/Portfolio.tsx and render it on "/").
// Self contained: no extra packages needed beyond React.
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";

// ===== Edit your links here =====
const LINKS = {
  email: "mailto:raj.kolala10@gmail.com",
  linkedin: "https://www.linkedin.com/in/rajkolala/", // e.g. https://www.linkedin.com/in/your-handle
  github: "https://github.com/RajKolala", // e.g. https://github.com/your-handle
  resume: "/Raj_Kolala_Resume.pdf", // e.g. /resume.pdf (put the PDF in the public folder)
};

const t = (arr: string[]) => arr.map((s) => ({ t: s }));
const kv = (o: Record<string, string>) => Object.keys(o).map((k) => ({ k, v: o[k] }));

const D: Record<string, any> = {
      core: { short: 'About', kicker: 'Core router · About', title: 'Raj Kolala', org: 'Computer Network Systems Management at San Jose State · Minor in Business Administration',
        overview: 'I am a network engineering student who likes building the whole path: the cabling and VLANs in an office, the cloud behind it, the AI that reads the data, and the app in someone’s hand. Right now I am building LLM and RAG copilots for manufacturing engineers at Jabil.',
        listTitle: 'What I bring',
        bullets: t(['Hands on network builds: a full office network for a 20+ person startup, from cabling to VLAN segmentation and guest isolation.', 'Applied AI: LangChain, RAG and data pipelines over legacy factory equipment data.', 'Security grounding: Cisco CyberOps Associate and Google Cybersecurity, with SOC workflows, SIEM and threat monitoring.', 'Shipping: Clarity is live on the App Store, built and released end to end by me.']),
        tags: t(['Networking', 'Cloud', 'AI / ML', 'Security', 'iOS']),
        specs: kv({ Based: 'Bay Area, CA', Graduating: 'May 2027', Now: 'AI & ML Intern, Jabil', Open: 'Network, infrastructure and AI roles' }),
        metrics: [{ v: '5', l: 'industry certifications' }, { v: '4', l: 'engineering roles' }],
        links: [{ label: 'Email me', href: 'mailto:raj.kolala10@gmail.com' }, { label: 'Download resume', href: '/Raj_Kolala_Resume.pdf' }],
        related: ['jabil', 'clarity', 'certs'] },
      jabil: { short: 'Jabil', via: 'SW-EXPERIENCE', kicker: 'Experience · Current', title: 'AI & Machine Learning Intern', org: 'Jabil · San Jose, CA',
        overview: 'Building AI engineering copilots that help manufacturing engineers and operators make faster, better decisions in a live smart factory, and the data plumbing those copilots depend on.',
        listTitle: 'What I do', role: 'LLM and RAG copilots for manufacturing', when: 'Aug 2026 to Present',
        bullets: t(['Build LLM and RAG powered engineering copilots with LangChain for process optimization, troubleshooting and predictive decision making.', 'Develop pipelines that ingest, clean and contextualize high volume data from legacy manufacturing equipment across proprietary and industrial protocols.', 'Normalize that data so downstream AI models can use it reliably.', 'Apply networking and security expertise to bridge OT and IT data securely between factory floor systems and cloud analytics.']),
        tags: t(['LangChain', 'RAG', 'LLMs', 'Python', 'Data Pipelines', 'OT/IT Security']),
        specs: kv({ Where: 'San Jose, CA', When: 'Aug 2026 to Present', Type: 'Internship', Team: 'AI & Machine Learning' }),
        metrics: [], links: [], related: ['elide', 'cardio', 'certs'] },
      elide: { short: 'Elide', via: 'SW-EXPERIENCE', kicker: 'Experience', title: 'Network Systems & Infrastructure Intern', org: 'Elide · San Jose, CA',
        overview: 'Designed and deployed a startup’s office network from an empty facility to a segmented, access controlled network with a separate guest and event network.',
        listTitle: 'What I did', role: 'Built a 20+ person office network', when: 'May to Aug 2026',
        bullets: t(['Deployed a brand new office network from the ground up, handling physical cabling, switch and router configuration and wireless access point setup across the facility.', 'Designed and implemented VLAN segmentation separating executive and leadership traffic from general staff, enforcing role based access control.', 'Configured a guest and event network with temporary access control for visiting engineers and company events, isolating external traffic from internal systems.']),
        tags: t(['Switching & Routing', 'VLAN', 'Wireless APs', 'Access Control']),
        specs: kv({ Where: 'San Jose, CA', When: 'May to Aug 2026', Type: 'Internship', Scope: 'Full office network' }),
        metrics: [{ v: '20+', l: 'people on the network' }], links: [], related: ['lanint', 'certs', 'cisco'] },
      cisco: { short: 'Cisco', via: 'SW-EXPERIENCE', kicker: 'Experience', title: 'Network Engineering Consultant', org: 'Cisco · Santa Clara, CA',
        overview: 'Worked with IT professionals and educators on data literacy, cybersecurity and generative AI, and supported security and data work on large scale infrastructure.',
        listTitle: 'What I did', role: 'Cybersecurity and generative AI workshops', when: 'Jul to Nov 2023',
        bullets: t(['Collaborated with 150+ IT professionals and educators on data literacy, cybersecurity and generative AI workshops.', 'Designed breakout sessions that improved understanding of AI tools, reaching a 92% satisfaction rate.', 'Supported security reviews and diagnosis of data anomalies across large scale infrastructure.', 'Networked with 20+ organizations, gaining perspective on data driven problem solving and cybersecurity.']),
        tags: t(['Cybersecurity', 'Generative AI', 'Data Literacy', 'Workshops']),
        specs: kv({ Where: 'Santa Clara, CA', When: 'Jul to Nov 2023', Type: 'Consulting' }),
        metrics: [{ v: '150+', l: 'professionals and educators' }, { v: '92%', l: 'session satisfaction' }], links: [], related: ['elide', 'certs', 'jabil'] },
      clarity: { short: 'Clarity', via: 'SW-SOFTWARE', kicker: 'Software · Live on the App Store', title: 'Clarity: See Yourself', org: 'Independent iOS Developer',
        overview: 'A real time camera mirroring app: one iPhone streams its camera live to another, so you can see yourself from any angle. I designed, built and shipped it myself.',
        listTitle: 'How it works', role: 'Peer to peer camera app, shipped', when: 'Mar 2026',
        bullets: t(['Architected real time peer to peer camera streaming between two iOS devices over WebSocket with sub second latency.', 'Designed session management with unique 6 character room codes to establish and maintain live device connections.', 'Built a Node.js server handling concurrent WebSocket connections for live video feed synchronization.', 'Managed the full release pipeline: EAS cloud builds, Apple Developer certificates, provisioning profiles and App Store submission.', 'Deployed a companion support website with a live privacy policy endpoint.', 'Shipped 12 updates since the 1.0 launch, now on version 1.3.2.']),
        tags: t(['React Native', 'Expo', 'WebSocket', 'Node.js', 'EAS Build']),
        specs: kv({ Platform: 'iOS', Released: 'Mar 2026', Status: 'Live, v1.3.2', Role: 'Solo developer' }),
        metrics: [{ v: 'v1.3.2', l: 'current App Store version' }, { v: '12', l: 'updates shipped since launch' }],
        links: [{ label: 'clarityseeyourself.net', href: 'https://clarityseeyourself.net' }, { label: 'View repo', href: 'https://github.com/RajKolala/Clarity---See-Yourself-IOS-App' }], related: ['cardio', 'lanint', 'jabil'] },
      cardio: { short: 'Cardio ML', via: 'SW-SOFTWARE', kicker: 'Software · Completed', title: 'Cardiovascular Disease Classifier', org: 'Group machine learning project',
        overview: 'A binary classifier that predicts cardiovascular disease from patient health records, tuned with cross validated hyperparameter search.',
        listTitle: 'What we built', role: 'Classifier on 70,000 patient records', when: 'Completed',
        bullets: t(['Built a binary ML classifier to predict cardiovascular disease across 70,000 patient records.', 'Achieved 73.7% accuracy with a Random Forest tuned through RandomizedSearchCV cross validation.', 'Cleaned and prepared the dataset with Pandas before modeling.']),
        tags: t(['Python', 'Pandas', 'scikit-learn', 'Random Forest']),
        specs: kv({ Type: 'Group project', Model: 'Random Forest', Status: 'Completed' }),
        metrics: [{ v: '70K', l: 'patient records' }, { v: '73.7%', l: 'accuracy' }],
        links: [{ label: 'View repo', href: 'https://github.com/RajKolala/Cardiovascular-Disease-Classifier-' }], related: ['jabil', 'clarity', 'sjsu'] },
      lanint: { short: 'LAN to Internet', via: 'SW-NETPROJECTS', kicker: 'Network project · Active', title: 'LAN to Internet End to End Prototype', org: 'Cisco Packet Tracer',
        overview: 'A realistic model of how traffic travels from a home or small business all the way to a data center, through every tier of ISP in between.',
        listTitle: 'What it models', role: 'Multi tier ISP model, home to data center', when: 'Active',
        bullets: t(['Connects home, SMB and cellular networks to a simulated data center.', 'Routes through Tier 3, Tier 2 and Tier 1 ISPs to mirror real internet hierarchy.']),
        tags: t(['ISP', 'Multi tier', 'Network Architecture']),
        specs: kv({ Tool: 'Cisco Packet Tracer', Status: 'Active', Type: 'Personal project' }),
        metrics: [], links: [{ label: 'View repo', href: 'https://github.com/RajKolala/Lan-to-Internet-END-to-END-Prototype' }], related: ['lanisp', 'ipv6', 'elide'] },
      lanisp: { short: 'LAN to ISP', via: 'SW-NETPROJECTS', kicker: 'Network project · Completed', title: 'LAN to ISP Prototype', org: 'Cisco Packet Tracer',
        overview: 'An advanced multi segment prototype of the last mile, showing how different access technologies bring home, business and mobile users onto an ISP.',
        listTitle: 'What it covers', role: 'DSL, cable and fiber last mile design', when: 'Completed',
        bullets: t(['Integrates home, SMB and mobile networks into one topology.', 'Models DSL, cable and fiber last mile systems.', 'Includes full logical and physical topology design.']),
        tags: t(['LAN', 'ISP', 'Last Mile', 'Topology']),
        specs: kv({ Tool: 'Cisco Packet Tracer', Status: 'Completed', Type: 'Personal project' }),
        metrics: [], links: [{ label: 'View repo', href: 'https://github.com/RajKolala/LAN-to-ISP-Prototype' }], related: ['lanint', 'ipv6', 'certs'] },
      ipv6: { short: 'IPv6 Services', via: 'SW-NETPROJECTS', kicker: 'Network project · Active', title: 'IPv6 Connectivity and Services Prototype', org: '[Tool or environment]',
        overview: '[One or two sentences on the goal of this project and what makes it interesting.]',
        listTitle: 'What I built', role: 'IPv6 connectivity and services', when: 'Active',
        bullets: t(['[Addressing plan and routing protocol used]', '[Services configured, such as DHCPv6 or DNS]', '[What you tested and the result]']),
        tags: t(['IPv6', 'Network Services', 'Protocol']),
        specs: kv({ Tool: '[Tool]', Status: 'Active', Type: 'Personal project' }),
        metrics: [], links: [{ label: 'View repo', href: 'https://github.com/RajKolala/IPv6-Connectivity-and-Services-Prototype' }], related: ['lanint', 'lanisp', 'certs'] },
      sjsu: { short: 'SJSU', via: 'SW-CREDENTIALS', kicker: 'Education', title: 'Computer Network Systems Management', org: 'San Jose State University · Minor in Business Administration',
        overview: 'Focused on network administration, IoT systems and enterprise network design, with a strong foundation in programming and business operations.',
        listTitle: 'Relevant coursework', role: 'Networking degree, business minor', when: 'Expected May 2027',
        bullets: t(['Network Administration and Network Security & Prevention Management', 'Machine Learning Technology and Applications, Python', 'IoT, Analog and Digital Circuits', 'Calculus, Linear Algebra, Business Statistics', 'Public Speaking']),
        tags: t(['Networking', 'IoT', 'Security', 'ML', 'Business']),
        specs: kv({ School: 'San Jose State', Grad: 'May 2027', Minor: 'Business Administration' }),
        metrics: [], links: [], related: ['certs', 'cardio', 'jabil'] },
      certs: { short: 'Certifications', via: 'SW-CREDENTIALS', kicker: 'Credentials', title: 'Certifications', org: 'Cisco · Google · Amazon Web Services',
        overview: 'Industry certifications across networking, security operations and cloud architecture, earned alongside school and internships.',
        listTitle: 'Earned', role: 'CCNA ×2, CyberOps, Google Cyber, AWS', when: '2024 to 2026',
        bullets: t(['Cisco CyberOps Associate, May 2026: SOC workflows, threat monitoring, incident response and network intrusion analysis.', 'Google Cybersecurity Professional Certificate, Nov 2025: SIEM tools, risk management and threat mitigation with Python, Linux and SQL.', 'AWS Academy Cloud Architecting, Nov 2025: EC2, Lambda, S3, VPC design, IAM governance and load balancing.', 'CCNA: Enterprise Networking, Security & Automation, Mar 2025: IPv4 and IPv6 enterprise design with Python automation.', 'CCNA: Switching, Routing & Wireless Essentials, Jun 2024: Layer 2 and Layer 3 switching, routing and wireless LANs.']),
        tags: t(['SOC', 'SIEM', 'EC2 / VPC', 'IAM', 'Automation']),
        specs: kv({ Cisco: '3 certifications', Google: 'Cybersecurity', AWS: 'Cloud Architecting' }),
        metrics: [{ v: '5', l: 'certifications' }, { v: '3', l: 'issuers' }], links: [], related: ['sjsu', 'elide', 'jabil'] }
    };

const COL: Record<string, string> = { exp: "#A78BFA", sw: "#F0ABFC", net: "#7DD3FC", cred: "#FCD34D" };
const HN: Record<string, string> = { exp: "Experience", sw: "Software", net: "Network Projects", cred: "Credentials" };
const HUBS = ["exp", "sw", "net", "cred"];
const SPOS: Record<string, [number, number]> = { exp: [533, 366], sw: [907, 366], net: [907, 614], cred: [533, 614] };
const POS: Record<string, [number, number]> = { jabil: [170, 445], elide: [255, 316], cisco: [468, 205], clarity: [972, 205], cardio: [1215, 345], lanint: [1267, 546], lanisp: [1157, 687], ipv6: [928, 787], sjsu: [459, 773], certs: [230, 640] };
const EPOS: Record<string, [number, number]> = { cisco: [190, 215], elide: [190, 380], jabil: [190, 545], clarity: [1010, 200], cardio: [1250, 355], lanint: [1250, 520], lanisp: [1200, 690], ipv6: [860, 800], certs: [190, 650], sjsu: [450, 805] };
const HUB_OF: Record<string, string> = { jabil: "exp", elide: "exp", cisco: "exp", clarity: "sw", cardio: "sw", lanint: "net", lanisp: "net", ipv6: "net", sjsu: "cred", certs: "cred" };
const SUB: Record<string, string> = { jabil: "AI & ML Intern · Now", elide: "Network Intern · 2026", cisco: "Network Consultant · 2023", clarity: "iOS app · v1.3.2 live", cardio: "Classifier · 73.7% accuracy", lanint: "Multi tier ISP model", lanisp: "Last mile design", ipv6: "IPv6 prototype", sjsu: "Network Systems Mgmt · 2027", certs: "CCNA ×2 · CyberOps · AWS" };
const BLURB: Record<string, string> = { jabil: "LLM and RAG copilots for factory engineers, plus pipelines for legacy machine data.", elide: "Built a startup office network from scratch: cabling, VLANs and guest isolation.", cisco: "Ran cybersecurity and generative AI workshops for 150+ professionals.", clarity: "Real time iPhone to iPhone camera mirroring over WebSocket. Live on the App Store.", cardio: "Random Forest classifier on 70,000 patient records at 73.7% accuracy.", lanint: "Home, SMB and cellular networks routed through Tier 3, 2 and 1 ISPs.", lanisp: "DSL, cable and fiber last mile systems with full topology design.", ipv6: "[Short summary of the IPv6 project]", sjsu: "Computer Network Systems Management with a Business Administration minor.", certs: "CyberOps, Google Cybersecurity, AWS Cloud Architecting and two CCNAs." };
const ORDER = ["core", "jabil", "elide", "cisco", "clarity", "cardio", "lanint", "lanisp", "ipv6", "sjsu", "certs"];
const HOSTS = [{k:'exp',name:'Experience',x:72,y:378,sx:132,sy:278,sw:'sw-1',net:'10.0.10'},{k:'sw',name:'Software',x:178,y:378,sx:132,sy:278,sw:'sw-1',net:'10.0.20'},{k:'net',name:'Net Projects',x:272,y:378,sx:318,sy:278,sw:'sw-2',net:'10.0.30'},{k:'cred',name:'Credentials',x:378,y:378,sx:318,sy:278,sw:'sw-2',net:'10.0.40'}];
const TR = { you: [225, 55], rt: [225, 172], s1: [132, 278], s2: [318, 278] };

const tint = (h: string, a: number) => `rgba(${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)},${a})`;
const colorOf = (id: string) => (id === "core" ? "#A78BFA" : COL[HUB_OF[id]]);

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
html{scroll-behavior:smooth}
.rk{--bg:#06040D;--ink:#EEEAF8;--muted:#A198BD;--line:#3F3463;--accent:#A78BFA;background:var(--bg);color:var(--ink);font-family:'IBM Plex Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.rk *{box-sizing:border-box}
.rk a{color:var(--accent)}
.rk button{font:inherit}
.rk-display{font-family:'Bricolage Grotesque',Georgia,serif}
.rk-mono{font-family:'IBM Plex Mono',ui-monospace,monospace}
.rk :focus-visible{outline:2px solid #C4B5FD;outline-offset:3px}
@keyframes rk-twinkle{0%,100%{opacity:.25}50%{opacity:1}}
@keyframes rk-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes rk-orbit{to{offset-distance:100%}}
@keyframes rk-flow{to{stroke-dashoffset:-24}}
@keyframes rk-pop{from{transform:scale(.4);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes rk-fade{from{opacity:0}to{opacity:1}}
@keyframes rk-blink{0%,100%{opacity:1}50%{opacity:.25}}
.rk-tw{animation:rk-twinkle 4s ease-in-out infinite}
.rk-bob{animation:rk-bob 6s ease-in-out infinite}
.rk-stage:hover .rk-bob{animation-play-state:paused}
.rk-flow{animation:rk-flow 1.2s linear infinite}
.rk-orbA{offset-path:path('M 165 490 A 555 320 0 1 1 1275 490 A 555 320 0 1 1 165 490');animation:rk-orbit 70s linear infinite}
.rk-orbB{offset-path:path('M 455 490 A 265 175 0 1 1 985 490 A 265 175 0 1 1 455 490');animation:rk-orbit 38s linear infinite reverse}
.rk-card{transition:transform .2s ease,box-shadow .2s ease,background .2s ease,border-color .2s ease;cursor:pointer}
.rk-card:hover{transform:scale(1.07);box-shadow:0 12px 30px rgba(0,0,0,.5)}
.rk-hub:hover{transform:scale(1.05)}
.rk-core:hover{transform:scale(1.08)}
.rk-open:hover{filter:brightness(1.12)}
.rk-node{transition:left .45s ease,top .45s ease,width .45s ease,height .45s ease,opacity .3s ease}
.rk-line{transition:opacity .3s ease}
.rk-veil{animation:rk-fade .3s ease both}
.rk-panel{animation:rk-pop .45s cubic-bezier(.2,.9,.25,1.1) both;transform-origin:center}
.rk-chip:hover{border-color:#A78BFA!important;color:#A78BFA!important}
.rk-row:hover{border-color:#A78BFA!important}
.rk-host{transition:background .2s ease,box-shadow .2s ease;cursor:pointer;background:transparent;border:0}
.rk-host:hover,.rk-host:focus-visible{background:rgba(167,139,250,.12);box-shadow:0 0 0 1px rgba(196,181,253,.5)}
.rk-led{animation:rk-blink 1.4s steps(2) infinite}
.rk-pkt{position:absolute;left:0;top:0;offset-rotate:0deg;opacity:0;animation-duration:16s;animation-timing-function:linear;animation-iteration-count:infinite}
.rk-tl{opacity:0;animation-duration:16s;animation-timing-function:linear;animation-iteration-count:infinite;white-space:nowrap}
.rk-hping{transform-box:fill-box;transform-origin:center;opacity:0;animation:rk-hping 16s ease-out infinite}
@keyframes rk-pk0{0%{offset-distance:0%;opacity:0}1.875%{offset-distance:0%;opacity:1}21.875%{offset-distance:100%;opacity:1}24.062%{offset-distance:100%;opacity:0}100%{offset-distance:100%;opacity:0}}
@keyframes rk-tl00{0%,0.312%{opacity:0}0.713%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-tl01{0%,8.121%{opacity:0}8.521%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-tl02{0%,15.649%{opacity:0}16.049%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-tl03{0%,21.875%{opacity:0}22.275%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-pk1{0%{offset-distance:0%;opacity:0}1.875%{offset-distance:0%;opacity:1}21.875%{offset-distance:100%;opacity:1}24.062%{offset-distance:100%;opacity:0}100%{offset-distance:100%;opacity:0}}
@keyframes rk-tl10{0%,0.312%{opacity:0}0.713%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-tl11{0%,8.232%{opacity:0}8.632%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-tl12{0%,15.894%{opacity:0}16.294%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-tl13{0%,21.875%{opacity:0}22.275%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-pk2{0%{offset-distance:0%;opacity:0}1.875%{offset-distance:0%;opacity:1}21.875%{offset-distance:100%;opacity:1}24.062%{offset-distance:100%;opacity:0}100%{offset-distance:100%;opacity:0}}
@keyframes rk-tl20{0%,0.312%{opacity:0}0.713%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-tl21{0%,8.232%{opacity:0}8.632%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-tl22{0%,15.894%{opacity:0}16.294%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-tl23{0%,21.875%{opacity:0}22.275%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-pk3{0%{offset-distance:0%;opacity:0}1.875%{offset-distance:0%;opacity:1}21.875%{offset-distance:100%;opacity:1}24.062%{offset-distance:100%;opacity:0}100%{offset-distance:100%;opacity:0}}
@keyframes rk-tl30{0%,0.312%{opacity:0}0.713%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-tl31{0%,8.121%{opacity:0}8.521%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-tl32{0%,15.649%{opacity:0}16.049%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-tl33{0%,21.875%{opacity:0}22.275%,24.200%{opacity:1}25.000%,100%{opacity:0}}
@keyframes rk-hping{0%,21.25%{transform:scale(.6);opacity:0}22.50%{transform:scale(1);opacity:1}26.25%,100%{transform:scale(1.9);opacity:0}}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  .rk-tw,.rk-bob,.rk-flow,.rk-orbA,.rk-orbB,.rk-pkt,.rk-hping,.rk-led{animation:none}
  .rk-tl{animation:none;opacity:1}
  .rk-tl.rk-later{display:none}
}
`;

function Stars({ seed, n, w, h }: { seed: number; n: number; w: number; h: number }) {
  const stars = useMemo(() => {
    let x = seed;
    const r = () => ((x = (x * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: n }, (_, i) => ({ cx: r() * w, cy: r() * h, r: [0.6, 0.8, 1, 1, 1.2, 1.6][Math.floor(r() * 6)], o: [0.35, 0.5, 0.7, 0.9][Math.floor(r() * 4)], tw: i % 7 === 0, c: i % 5 ? "#EEEAF8" : "#C4B5FD" }));
  }, [seed, n, w, h]);
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
      {stars.map((s, i) => <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.c} opacity={s.o} className={s.tw ? "rk-tw" : undefined} />)}
    </svg>
  );
}

/* ---------- Packet trace (local 460 x 580 box) ---------- */
function PacketTrace({ onHost }: { onHost: (k: string) => void }) {
  const lab = (x: number, y: number, text: string, color = "#A198BD", left = false): CSSProperties => ({ position: "absolute", left: left ? x : x - 60, top: y, width: 120, textAlign: left ? "left" : "center", fontSize: 11, color });
  return (
    <div style={{ position: "relative", width: 460, height: 580 }}>
      <svg width="460" height="580" viewBox="0 0 460 580" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        <line x1={225} y1={55} x2={225} y2={172} stroke="#4A3C78" strokeWidth={1.5} />
        {[TR.s1, TR.s2].map((q, i) => <line key={i} x1={225} y1={172} x2={q[0]} y2={q[1]} stroke="#4A3C78" strokeWidth={1.5} />)}
        {HOSTS.map((h) => <line key={h.k} x1={h.sx} y1={h.sy} x2={h.x} y2={h.y} stroke={COL[h.k]} strokeWidth={1.2} opacity={0.45} />)}
        <rect x={205} y={39} width={40} height={26} rx={3} fill="#150F28" stroke="#C9C1DE" strokeWidth={1.4} />
        <rect x={198} y={65} width={54} height={5} rx={2} fill="#C9C1DE" />
        <ellipse cx={225} cy={179} rx={30} ry={11} fill="#2A1D52" stroke="#A78BFA" strokeWidth={1.4} />
        <rect x={195} y={165} width={60} height={14} fill="#2A1D52" />
        <ellipse cx={225} cy={165} rx={30} ry={11} fill="#3B2A7A" stroke="#A78BFA" strokeWidth={1.4} />
        <line x1={195} y1={165} x2={195} y2={179} stroke="#A78BFA" strokeWidth={1.4} />
        <line x1={255} y1={165} x2={255} y2={179} stroke="#A78BFA" strokeWidth={1.4} />
        <path d="M213 161 l8 4 M237 169 l-8 -4 M221 169 l-8 4 M229 161 l8 4" stroke="#EEEAF8" strokeWidth={1.3} />
        {[TR.s1, TR.s2].map((q, i) => (
          <g key={i}>
            <rect x={q[0] - 30} y={q[1] - 12} width={60} height={24} rx={4} fill="#1D1533" stroke="#C4B5FD" strokeWidth={1.3} />
            <path d={`M${q[0] - 16} ${q[1] - 4} h24 l-4 -3 M${q[0] + 16} ${q[1] + 4} h-24 l4 3`} stroke="#EEEAF8" strokeWidth={1.3} fill="none" />
          </g>
        ))}
        {HOSTS.map((h, i) => (
          <g key={h.k}>
            <circle className="rk-hping" style={{ animationDelay: `${i * 4}s` }} cx={h.x} cy={h.y} r={18} fill="none" stroke={COL[h.k]} strokeWidth={1.5} />
            <rect x={h.x - 15} y={h.y - 12} width={30} height={20} rx={3} fill="#150F28" stroke={COL[h.k]} strokeWidth={1.4} />
            <rect x={h.x - 5} y={h.y + 8} width={10} height={4} fill={COL[h.k]} />
          </g>
        ))}
      </svg>
      <div className="rk-mono" style={lab(260, 47, "you", "#C9C1DE", true)}>you</div>
      <div className="rk-mono" style={lab(265, 164, "RK-CORE", "#A78BFA", true)}>RK-CORE</div>
      <div className="rk-mono" style={lab(TR.s1[0], TR.s1[1] + 18, "")}>SW-1</div>
      <div className="rk-mono" style={lab(TR.s2[0], TR.s2[1] + 18, "")}>SW-2</div>
      {HOSTS.map((h) => <div key={h.k} className="rk-mono" style={lab(h.x, h.y + 22, "", COL[h.k])}>{h.name}</div>)}
      <div className="rk-mono" style={{ position: "absolute", left: 32, top: 30, display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: ".08em", color: "#A198BD" }}>
        <span className="rk-led" style={{ width: 7, height: 7, borderRadius: "50%", background: "#7FE0B0" }} />SIMULATION · LIVE
      </div>
      {HOSTS.map((h, i) => (
        <div key={h.k} className="rk-pkt" aria-hidden="true" style={{ offsetPath: `path('M 225 55 L 225 172 L ${h.sx} ${h.sy} L ${h.x} ${h.y}')`, animationName: `rk-pk${i}`, animationDelay: `${i * 4}s` } as CSSProperties}>
          <svg width="22" height="16" viewBox="0 0 22 16" style={{ display: "block", transform: "translate(-50%,-50%)", filter: `drop-shadow(0 0 6px ${COL[h.k]})` }}>
            <rect x="1" y="1" width="20" height="14" rx="2.5" fill="#150F28" stroke={COL[h.k]} strokeWidth="1.6" />
            <path d="M2 2.5 11 9.5 20 2.5" fill="none" stroke={COL[h.k]} strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </div>
      ))}
      <div className="rk-mono" aria-hidden="true" style={{ position: "absolute", left: 32, top: 446, width: 386, height: 112, background: "#0B0816", border: "1px solid #2A2144", borderRadius: 12, fontSize: 11.5, lineHeight: 1.65, color: "#C9C1DE", overflow: "hidden" }}>
        {HOSTS.map((h, i) => {
          const slug = h.name.toLowerCase().replace(" ", "-");
          const lines: [ReactNode, string][] = [
            [<><span style={{ color: "#7A7098" }}>$</span> traceroute {slug}.rk</>, "#EEEAF8"],
            [<> 1  rk-core (10.0.0.1)  0.4{2 + i} ms</>, "#C9C1DE"],
            [<> 2  {h.sw} ({h.net}.1)  0.8{i + 1} ms</>, "#C9C1DE"],
            [<> 3  {slug} ({h.net}.11)  1.0{i + 3} ms  <span style={{ color: COL[h.k] }}>reached ✓</span></>, "#EEEAF8"],
          ];
          return (
            <div key={h.k} style={{ position: "absolute", left: 14, top: 12 }}>
              {lines.map(([txt, c], j) => <div key={j} className={`rk-tl${i > 0 ? " rk-later" : ""}`} style={{ color: c, animationName: `rk-tl${i}${j}`, animationDelay: `${i * 4}s`, whiteSpace: "pre" }}>{txt}</div>)}
            </div>
          );
        })}
      </div>
      {HOSTS.map((h) => (
        <button key={h.k} type="button" className="rk-host" onClick={() => onHost(h.k)} aria-label={`Open ${h.name} on the topology map`} style={{ position: "absolute", left: h.x - 48, top: h.y - 26, width: 96, height: 68, borderRadius: 12 }} />
      ))}
    </div>
  );
}

/* ---------- Detail panel ---------- */
function Panel({ id, go, close, mobile }: { id: string; go: (id: string) => void; close: () => void; mobile: boolean }) {
  const c = D[id];
  const col = colorOf(id);
  const idx = ORDER.indexOf(id);
  const prev = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
  const next = ORDER[(idx + 1) % ORDER.length];
  const iconBtn = (label: string, onClick: () => void, path: string, accent = false) => (
    <button type="button" aria-label={label} onClick={onClick} style={{ width: 44, height: 44, borderRadius: 22, border: `1px solid ${accent ? col : "#3F3463"}`, background: "#0F0B1C", color: accent ? col : "#EEEAF8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d={path} /></svg>
    </button>
  );
  return (
    <>
      <div className="rk-veil" onClick={close} style={{ position: "fixed", inset: 0, background: "rgba(6,4,13,.7)", backdropFilter: "blur(3px)", zIndex: 50 }} />
      <article role="dialog" aria-modal="true" aria-label={c.title} className="rk-panel" style={{ position: "fixed", zIndex: 51, left: "50%", top: "50%", translate: "-50% -50%", width: mobile ? "calc(100vw - 20px)" : "min(1080px, calc(100vw - 48px))", maxHeight: mobile ? "calc(100vh - 20px)" : "min(720px, calc(100vh - 48px))", overflow: "auto", background: "#140E26", border: `1.5px solid ${col}`, borderRadius: mobile ? 20 : 28, padding: mobile ? "22px 20px" : "44px 48px", display: "grid", gridTemplateColumns: mobile ? "1fr" : "minmax(0,1fr) 330px", gap: mobile ? 24 : 48, boxShadow: "0 30px 90px rgba(0,0,0,.55)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, order: mobile ? 2 : 1 }}>
          <div className="rk-mono" style={{ fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: col }}>{c.kicker}</div>
          <h2 className="rk-display" style={{ margin: 0, fontWeight: 700, fontSize: mobile ? 32 : 42, lineHeight: 1.05 }}>{c.title}</h2>
          <div style={{ fontSize: 17, color: "#C9C1DE" }}>{c.org}</div>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#E3DDF2" }}>{c.overview}</p>
          <div className="rk-mono" style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "#7A7098", marginTop: 8 }}>{c.listTitle}</div>
          <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12, fontSize: 15, lineHeight: 1.6, color: "#D9D2EA" }}>
            {c.bullets.map((b: { t: string }, i: number) => <li key={i}>{b.t}</li>)}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {c.tags.map((g: { t: string }, i: number) => <span key={i} className="rk-mono" style={{ fontSize: 12, color: "#C9C1DE", background: "#1D1533", border: "1px solid #33294F", padding: "6px 10px", borderRadius: 6 }}>{g.t}</span>)}
          </div>
        </div>
        <aside style={{ display: "flex", flexDirection: "column", gap: 22, borderLeft: mobile ? "none" : "1px solid #2A2144", paddingLeft: mobile ? 0 : 32, order: mobile ? 1 : 2 }}>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            {iconBtn("Previous", () => go(prev), "M10 3 5 8l5 5")}
            {iconBtn("Next", () => go(next), "m6 3 5 5-5 5")}
            {iconBtn("Close", close, "M4 4l8 8M12 4l-8 8", true)}
          </div>
          <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "90px minmax(0,1fr)", rowGap: 12, columnGap: 12, fontSize: 14 }}>
            {c.specs.map((s: { k: string; v: string }, i: number) => (
              <div key={i} style={{ display: "contents" }}>
                <dt className="rk-mono" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "#7A7098", paddingTop: 2 }}>{s.k}</dt>
                <dd style={{ margin: 0 }}>{s.v}</dd>
              </div>
            ))}
          </dl>
          {c.metrics.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 }}>
              {c.metrics.map((m: { v: string; l: string }, i: number) => (
                <div key={i} style={{ background: "#0F0B1C", border: "1px solid #2A2144", borderRadius: 14, padding: 14 }}>
                  <div className="rk-display" style={{ fontSize: 28, fontWeight: 700, color: col }}>{m.v}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.4, color: "#A198BD", marginTop: 4 }}>{m.l}</div>
                </div>
              ))}
            </div>
          )}
          {c.links.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {c.links.map((k: { label: string; href: string }, i: number) => (
                <a key={i} href={k.label === "Download resume" ? LINKS.resume : k.label === "Email me" ? LINKS.email : k.href} target={k.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 44, padding: "0 16px", borderRadius: 10, background: col, color: "#140B2E", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>{k.label}<span aria-hidden="true">↗</span></a>
              ))}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
            <div className="rk-mono" style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "#7A7098" }}>Connected nodes</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {c.related.map((rid: string) => <button key={rid} type="button" className="rk-chip" onClick={() => go(rid)} style={{ minHeight: 40, padding: "0 14px", borderRadius: 20, border: "1px solid #3F3463", background: "#0F0B1C", color: "#D9D2EA", fontSize: 13, cursor: "pointer" }}>{D[rid].short}</button>)}
            </div>
          </div>
        </aside>
      </article>
    </>
  );
}

function RoutingTable({ go, close, mobile }: { go: (id: string) => void; close: () => void; mobile: boolean }) {
  return (
    <>
      <div className="rk-veil" onClick={close} style={{ position: "fixed", inset: 0, background: "rgba(6,4,13,.7)", backdropFilter: "blur(3px)", zIndex: 50 }} />
      <section role="dialog" aria-modal="true" aria-label="Routing table" className="rk-panel" style={{ position: "fixed", zIndex: 51, left: "50%", top: "50%", translate: "-50% -50%", width: mobile ? "calc(100vw - 20px)" : "min(1080px, calc(100vw - 48px))", maxHeight: "calc(100vh - 40px)", overflow: "auto", background: "#140E26", border: "1.5px solid #A78BFA", borderRadius: mobile ? 20 : 28, padding: mobile ? "22px 16px" : "40px 48px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="rk-mono" style={{ fontSize: 12, color: "#A78BFA" }}>show ip route</div>
            <h2 className="rk-display" style={{ margin: "6px 0 0", fontWeight: 700, fontSize: 36 }}>Routing table</h2>
          </div>
          <button type="button" aria-label="Close" onClick={close} style={{ width: 44, height: 44, borderRadius: 22, border: "1px solid #A78BFA", background: "#0F0B1C", color: "#A78BFA", cursor: "pointer" }}>✕</button>
        </div>
        {ORDER.slice(1).map((id) => (
          <button key={id} type="button" className="rk-row" onClick={() => go(id)} style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "170px 140px minmax(0,1fr) 180px", gap: mobile ? 4 : 16, alignItems: "center", minHeight: 48, padding: mobile ? "10px 14px" : "0 18px", textAlign: "left", background: "#0F0B1C", border: "1px solid #221A3C", borderRadius: 10, color: "#EEEAF8", cursor: "pointer" }}>
            <span style={{ fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: colorOf(id) }} />{D[id].short}</span>
            <span className="rk-mono" style={{ fontSize: 12, color: "#A198BD" }}>{D[id].via}</span>
            <span style={{ fontSize: 14, color: "#C9C1DE" }}>{D[id].role}</span>
            <span className="rk-mono" style={{ fontSize: 12, color: "#A198BD" }}>{D[id].when}</span>
          </button>
        ))}
      </section>
    </>
  );
}

const Icon = ({ d, children }: { d?: string; children?: ReactNode }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{d ? <path d={d} /> : children}</svg>
);
const Social = ({ size = 64 }: { size?: number }) => {
  const s: CSSProperties = { width: size, height: size, borderRadius: size / 2, border: "1px solid #3F3463", display: "flex", alignItems: "center", justifyContent: "center", color: "#EEEAF8" };
  return (
    <div style={{ display: "flex", gap: 14 }}>
      <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" style={s}><Icon><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></Icon></a>
      <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub" style={s}><Icon d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></a>
      <a href={LINKS.email} aria-label="Email" style={s}><Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Icon></a>
    </div>
  );
};
const ResumeBtn = () => (
  <a href={LINKS.resume} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, width: 220, minHeight: 52, borderRadius: 12, background: "#A78BFA", color: "#140B2E", textDecoration: "none", fontSize: 16, fontWeight: 600 }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>Download resume
  </a>
);
const Label = ({ children }: { children: ReactNode }) => <div className="rk-mono" style={{ fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "#A78BFA" }}>{children}</div>;
const Legend = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 18, fontSize: 14, color: "#C9C1DE" }}>
    {HUBS.map((k) => <span key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: COL[k] }} />{HN[k]}</span>)}
  </div>
);

export default function Index() {
  const [sel, setSel] = useState<string | null>(null);
  const [hub, setHub] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(typeof window === "undefined" ? 1440 : window.innerWidth);
  useEffect(() => {
    const on = () => setWidth(window.innerWidth);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSel(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const mobile = width < 1000;
  const scale = Math.min(1, width / 1440);
  const go = (id: string) => setSel(id);
  const scrollToMap = () => document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });
  const openHub = (k: string) => { setSel(null); setHub(k); scrollToMap(); };
  const open = !!sel;

  const heroCopy = "Network Engineering student at San Jose State building AI copilots for the factory floor, secure office networks, and apps on the App Store.";

  const overlays = (
    <>
      {sel && sel !== "table" && <Panel id={sel} go={go} close={() => setSel(null)} mobile={mobile} />}
      {sel === "table" && <RoutingTable go={go} close={() => setSel(null)} mobile={mobile} />}
    </>
  );

  if (mobile) {
    const ptScale = Math.min(1, (width - 32) / 460);
    return (
      <div className="rk">
        <style>{CSS}</style>
        <section id="top" style={{ position: "relative", padding: "20px 20px 48px", background: "radial-gradient(ellipse 600px 500px at 50% 45%, #1B1036 0%, #0A0716 70%)", overflow: "hidden" }}>
          <Stars seed={7} n={70} w={400} h={1400} />
          <header style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="rk-mono" style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #A78BFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#A78BFA" }}>RK</div>
              <div className="rk-display" style={{ fontWeight: 700, fontSize: 18 }}>Raj Kolala</div>
            </div>
            <button type="button" onClick={() => setSel("table")} style={{ minHeight: 40, padding: "0 12px", borderRadius: 8, border: "1px solid #3F3463", background: "#110C21", color: "#EEEAF8", fontSize: 13 }}>Routing table</button>
          </header>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ width: 56, height: 4, background: "#A78BFA", borderRadius: 2 }} />
            <h1 className="rk-display" style={{ margin: 0, fontWeight: 700, fontSize: 56, lineHeight: 1, letterSpacing: "-.02em" }}>Hi, I'm Raj.</h1>
            <div className="rk-display" style={{ fontWeight: 500, fontSize: 26, color: "#A78BFA" }}>Computer Network Engineer</div>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#B8AFD0" }}>{heroCopy}</p>
          </div>
          <div style={{ position: "relative", width: 460 * ptScale, height: 580 * ptScale, margin: "28px auto 8px" }}>
            <div style={{ transform: `scale(${ptScale})`, transformOrigin: "top left" }}><PacketTrace onHost={openHub} /></div>
          </div>
          <button type="button" onClick={scrollToMap} style={{ position: "relative", display: "flex", alignItems: "center", gap: 14, background: "none", border: 0, color: "#EEEAF8", padding: 0, cursor: "pointer" }}>
            <span style={{ width: 60, height: 60, borderRadius: "50%", background: "#A78BFA", color: "#140B2E", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></span>
            <span style={{ fontWeight: 600, fontSize: 16 }}>Enter the network</span>
          </button>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 26, marginTop: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}><Label>About me</Label><p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#C9C1DE" }}>Computer Network Systems Management at SJSU with a Business Administration minor, graduating May 2027. Two CCNAs, CyberOps, Google Cybersecurity and AWS.</p></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}><Label>Follow me</Label><Social size={56} /><ResumeBtn /></div>
          </div>
        </section>
        <section id="map" style={{ position: "relative", padding: "40px 16px 56px", background: "#06040D" }}>
          <Label>02 · The network</Label>
          <h2 className="rk-display" style={{ margin: "8px 0 14px", fontWeight: 700, fontSize: 34 }}>Explore my topology</h2>
          <Legend />
          <button type="button" onClick={() => setSel("core")} style={{ marginTop: 22, width: "100%", display: "flex", alignItems: "center", gap: 14, padding: 14, borderRadius: 18, border: "1.5px solid #A78BFA", background: "#0E0A1C", color: "#EEEAF8", textAlign: "left", cursor: "pointer" }}>
            <span className="rk-display" style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid #A78BFA", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20, color: "#A78BFA", flexShrink: 0 }}>RK</span>
            <span><span className="rk-mono" style={{ display: "block", fontSize: 11, color: "#A198BD" }}>CORE ROUTER</span><span style={{ fontWeight: 600 }}>About me</span></span>
          </button>
          {HUBS.map((k) => {
            const ids = Object.keys(HUB_OF).filter((id) => HUB_OF[id] === k);
            const isOpen = hub === k;
            return (
              <div key={k} style={{ marginTop: 14, border: `1.5px solid ${COL[k]}`, borderRadius: 18, background: isOpen ? tint(COL[k], 0.08) : "#120C24", overflow: "hidden" }}>
                <button type="button" aria-expanded={isOpen} onClick={() => setHub(isOpen ? null : k)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: 14, background: "none", border: 0, color: "#EEEAF8", textAlign: "left", cursor: "pointer" }}>
                  <span style={{ width: 40, height: 40, borderRadius: 10, background: tint(COL[k], 0.16), display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COL[k]} strokeWidth="1.7" aria-hidden="true"><rect x="3" y="8" width="18" height="8" rx="2" /><path d="M7 12h.01M10 12h.01M13 12h.01" /></svg></span>
                  <span style={{ flexGrow: 1 }}><span className="rk-mono" style={{ display: "block", fontSize: 11, color: "#A198BD" }}>SWITCH · {ids.length} NODES</span><span style={{ fontWeight: 600, fontSize: 17 }}>{HN[k]}</span></span>
                  <span aria-hidden="true" style={{ color: COL[k], transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▾</span>
                </button>
                {isOpen && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 12px 14px" }}>
                    {ids.map((id) => (
                      <div key={id} style={{ background: "#150F28", border: `1px solid ${tint(COL[k], 0.6)}`, borderRadius: 14, padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}><span style={{ fontWeight: 600, fontSize: 16 }}>{D[id].short}</span><span style={{ fontSize: 12, color: "#A198BD" }}>{SUB[id]}</span></div>
                        <div style={{ fontSize: 14, lineHeight: 1.5, color: "#D9D2EA" }}>{BLURB[id]}</div>
                        <button type="button" onClick={() => go(id)} style={{ alignSelf: "flex-start", minHeight: 40, padding: "0 16px", borderRadius: 20, border: 0, background: COL[k], color: "#140B2E", fontWeight: 600, fontSize: 14, cursor: "pointer", marginTop: 4 }}>Open details ↗</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>
        {overlays}
      </div>
    );
  }

  /* ---------- Desktop: designed at 1440 wide, scales down to fit ---------- */
  const focus = hub;
  const nodes = Object.keys(POS).map((id, i) => {
    const col = COL[HUB_OF[id]];
    const ex = focus === HUB_OF[id];
    const p = ex ? EPOS[id] : POS[id];
    const w = ex ? 300 : 256, h = ex ? 150 : 68;
    return { id, col, ex, x: p[0] - w / 2, y: p[1] - h / 2, w, h, lx: p[0], ly: p[1], on: sel === id, dim: !!focus && !ex, delay: `${-(i * 0.6)}s` };
  });
  const hubOpacity = (k: string) => (focus === k || HUB_OF[sel || ""] === k || sel === "core" ? 1 : focus ? 0.2 : 0.6);
  const lineOpacity = (id: string) => (id === sel ? 1 : focus ? (HUB_OF[id] === focus ? 0.9 : 0.12) : 0.5);

  return (
    <div className="rk">
      <style>{CSS}</style>
      <div style={{ width: 1440 * scale, height: 1800 * scale, margin: "0 auto", overflow: "hidden" }}>
        <div style={{ position: "relative", width: 1440, height: 1800, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          {/* HERO */}
          <section id="top" style={{ position: "absolute", left: 0, top: 0, width: 1440, height: 900, overflow: "hidden", background: "radial-gradient(ellipse 900px 600px at 50% 62%, #1B1036 0%, #0A0716 70%)" }}>
            <Stars seed={7} n={110} w={1440} h={900} />
            <div style={{ position: "absolute", left: 540, top: 150 }}><PacketTrace onHost={openHub} /></div>
            <header style={{ position: "absolute", left: 80, right: 80, top: 0, height: 96, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="rk-mono" style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid #A78BFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#A78BFA" }}>RK</div>
                <div className="rk-display" style={{ fontWeight: 700, fontSize: 20 }}>Raj Kolala</div>
              </div>
              <nav style={{ display: "flex", alignItems: "center", gap: 30, fontSize: 15 }}>
                <a href="#top" style={{ color: "#EEEAF8", textDecoration: "none" }}>Home</a>
                <a href="#map" style={{ color: "#B8AFD0", textDecoration: "none" }}>Topology</a>
                <a href="#map" onClick={() => setSel("table")} style={{ color: "#B8AFD0", textDecoration: "none" }}>Routing table</a>
                <a href={LINKS.email} style={{ color: "#B8AFD0", textDecoration: "none" }}>Contact</a>
              </nav>
            </header>
            <div style={{ position: "absolute", left: 80, top: 250, width: 430, display: "flex", flexDirection: "column", gap: 26 }}>
              <div style={{ width: 64, height: 4, background: "#A78BFA", borderRadius: 2 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <h1 className="rk-display" style={{ margin: 0, fontWeight: 700, fontSize: 84, lineHeight: 1, letterSpacing: "-.02em" }}>Hi, I'm Raj.</h1>
                <div className="rk-display" style={{ fontWeight: 500, fontSize: 34, lineHeight: 1.15, color: "#A78BFA" }}>Computer Network Engineer</div>
              </div>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: "#B8AFD0" }}>{heroCopy}</p>
              <a href="#map" aria-label="Enter the network map" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none", color: "#EEEAF8", marginTop: 18 }}>
                <span style={{ width: 76, height: 76, borderRadius: "50%", background: "#A78BFA", color: "#140B2E", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 10px rgba(167,139,250,0.12)" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></span>
                <span style={{ display: "flex", flexDirection: "column", gap: 4 }}><span style={{ fontWeight: 600, fontSize: 16 }}>Enter the network</span><span className="rk-mono" style={{ fontSize: 12, color: "#A198BD" }}>scroll to explore the topology</span></span>
              </a>
            </div>
            <div style={{ position: "absolute", left: 1010, top: 230, width: 350, display: "flex", flexDirection: "column", gap: 30 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 28, borderBottom: "1px solid #2A2144" }}>
                <Label>About me</Label>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#C9C1DE" }}>Computer Network Systems Management at SJSU with a Business Administration minor, graduating May 2027. Two CCNAs, CyberOps, Google Cybersecurity and AWS.</p>
                <a href="#map" onClick={() => setSel("core")} style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", textDecoration: "none" }}>Open the core node →</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 28, borderBottom: "1px solid #2A2144" }}>
                <Label>My work</Label>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#C9C1DE" }}>AI copilots at Jabil, a full office network at Elide, an iOS app on the App Store, and ISP scale network prototypes.</p>
                <a href="#map" style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", textDecoration: "none" }}>Browse the topology →</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="rk-mono" style={{ fontSize: 16, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: "#A78BFA" }}>Follow me</div>
                <Social />
                <ResumeBtn />
              </div>
            </div>
            <div style={{ position: "absolute", left: 80, bottom: 56, display: "flex", gap: 44 }}>
              {[["5", "industry", "certifications"], ["4", "engineering", "roles"]].map(([n, a, b]) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 10 }}><span className="rk-display" style={{ fontSize: 40, fontWeight: 700 }}>{n}</span><span style={{ fontSize: 13, lineHeight: 1.3, color: "#A198BD" }}>{a}<br />{b}</span></div>
              ))}
            </div>
          </section>

          {/* TOPOLOGY */}
          <section id="map" style={{ position: "absolute", left: 0, top: 900, width: 1440, height: 900, overflow: "hidden", background: "radial-gradient(circle 520px at 50% 50%, #170D30 0%, #06040D 75%)", borderTop: "1px solid #221A3C" }}>
            <Stars seed={21} n={130} w={1440} h={900} />
            <div className="rk-stage" style={{ position: "absolute", inset: 0, transition: "transform .6s ease, filter .6s ease, opacity .6s ease", transform: open ? "scale(.82)" : "none", filter: open ? "blur(3px)" : "none", opacity: open ? 0.45 : 1 }}>
              <svg width="1440" height="900" viewBox="0 0 1440 900" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
                <ellipse cx="720" cy="490" rx="265" ry="175" fill="none" stroke="#2A2144" />
                <ellipse cx="720" cy="490" rx="555" ry="320" fill="none" stroke="#221A3C" strokeDasharray="2 7" />
                {HUBS.map((k) => <line key={k} className="rk-line" x1={720} y1={490} x2={SPOS[k][0]} y2={SPOS[k][1]} stroke={COL[k]} strokeWidth={2.5} opacity={hubOpacity(k)} />)}
                {nodes.map((n) => <line key={n.id} className="rk-line rk-flow" x1={SPOS[HUB_OF[n.id]][0]} y1={SPOS[HUB_OF[n.id]][1]} x2={n.lx} y2={n.ly} stroke={n.col} strokeWidth={1.8} strokeDasharray="6 6" opacity={lineOpacity(n.id)} />)}
              </svg>
              <div className="rk-orbA" style={{ position: "absolute", left: 0, top: 0, width: 8, height: 8, margin: "-4px 0 0 -4px", borderRadius: "50%", background: "#F0ABFC", boxShadow: "0 0 10px #F0ABFC" }} />
              <div className="rk-orbB" style={{ position: "absolute", left: 0, top: 0, width: 6, height: 6, margin: "-3px 0 0 -3px", borderRadius: "50%", background: "#7DD3FC", boxShadow: "0 0 8px #7DD3FC" }} />
              {HUBS.map((k, i) => {
                const count = Object.values(HUB_OF).filter((h) => h === k).length;
                return (
                  <div key={k} className="rk-bob" style={{ position: "absolute", left: SPOS[k][0] - 130, top: SPOS[k][1] - 40, width: 260, height: 80, opacity: focus && focus !== k ? 0.3 : 1, transition: "opacity .3s", animationDelay: `${-(i * 1.3)}s` }}>
                    <button type="button" className="rk-card rk-hub" aria-pressed={focus === k} onClick={() => setHub(focus === k ? null : k)} style={{ width: 260, height: 80, background: focus === k ? tint(COL[k], 0.18) : "#120C24", border: `1.5px solid ${COL[k]}`, borderRadius: 16, display: "flex", alignItems: "center", gap: 14, padding: "0 16px", color: "#EEEAF8", textAlign: "left" }}>
                      <span style={{ width: 44, height: 44, borderRadius: 10, background: tint(COL[k], 0.16), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COL[k]} strokeWidth="1.7" aria-hidden="true"><rect x="3" y="8" width="18" height="8" rx="2" /><path d="M7 12h.01M10 12h.01M13 12h.01" /></svg></span>
                      <span style={{ display: "flex", flexDirection: "column", gap: 3 }}><span className="rk-mono" style={{ fontSize: 11, letterSpacing: ".08em", color: "#A198BD" }}>SWITCH · {count} NODES</span><span style={{ fontSize: 18, fontWeight: 600, whiteSpace: "nowrap" }}>{HN[k]}</span></span>
                    </button>
                  </div>
                );
              })}
              {nodes.map((n) => (
                <div key={n.id} className="rk-bob rk-node" style={{ position: "absolute", left: n.x, top: n.y, width: n.w, height: n.h, opacity: n.dim ? 0.22 : 1, zIndex: n.ex ? 5 : 1, animationDelay: n.delay }}>
                  {n.ex ? (
                    <div style={{ width: "100%", height: "100%", background: "#150F28", border: `1.5px solid ${n.col}`, borderRadius: 18, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6, boxShadow: "0 14px 34px rgba(0,0,0,.45)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: n.col, flexShrink: 0 }} /><span style={{ fontSize: 16, fontWeight: 600, whiteSpace: "nowrap" }}>{D[n.id].short}</span><span style={{ fontSize: 12, color: "#A198BD", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{SUB[n.id]}</span></div>
                      <div style={{ fontSize: 13, lineHeight: 1.45, color: "#D9D2EA" }}>{BLURB[n.id]}</div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: "auto" }}>
                        <div style={{ display: "flex", gap: 6, minWidth: 0, overflow: "hidden" }}>{D[n.id].tags.slice(0, 2).map((g: { t: string }, i: number) => <span key={i} className="rk-mono" style={{ fontSize: 11, color: "#C9C1DE", background: "#1D1533", border: "1px solid #33294F", padding: "4px 7px", borderRadius: 5, whiteSpace: "nowrap" }}>{g.t}</span>)}</div>
                        <button type="button" className="rk-open" onClick={() => go(n.id)} style={{ flexShrink: 0, minHeight: 36, padding: "0 12px", borderRadius: 18, border: 0, background: n.col, color: "#140B2E", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Open ↗</button>
                      </div>
                    </div>
                  ) : (
                    <button type="button" className="rk-card" onClick={() => go(n.id)} style={{ width: 256, height: 68, background: n.on ? tint(n.col, 0.2) : "#150F28", border: `1.5px solid ${n.on ? n.col : "#3F3463"}`, borderRadius: 34, display: "flex", alignItems: "center", gap: 12, padding: "0 18px", color: "#EEEAF8", textAlign: "left" }}>
                      <span style={{ width: 12, height: 12, borderRadius: "50%", background: n.col, flexShrink: 0, boxShadow: `0 0 0 4px ${tint(n.col, 0.18)}` }} />
                      <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}><span style={{ fontSize: 16, fontWeight: 600, whiteSpace: "nowrap" }}>{D[n.id].short}</span><span style={{ fontSize: 12, color: "#A198BD", whiteSpace: "nowrap" }}>{SUB[n.id]}</span></span>
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="rk-card rk-core" onClick={() => { setHub(null); go("core"); }} aria-label="About Raj Kolala" style={{ position: "absolute", left: 648, top: 418, width: 144, height: 144, borderRadius: "50%", background: sel === "core" ? "#A78BFA" : "#0E0A1C", border: "2px solid #A78BFA", boxShadow: "0 0 0 14px rgba(167,139,250,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <span className="rk-display" style={{ fontSize: 44, fontWeight: 700, color: sel === "core" ? "#140B2E" : "#A78BFA", lineHeight: 1 }}>RK</span>
                <span className="rk-mono" style={{ fontSize: 11, letterSpacing: ".1em", color: sel === "core" ? "#140B2E" : "#A198BD" }}>CORE ROUTER</span>
              </button>
            </div>
            <div style={{ position: "absolute", left: 48, top: 40, display: "flex", flexDirection: "column", gap: 10 }}>
              <Label>02 · The network</Label>
              <h2 className="rk-display" style={{ margin: 0, fontWeight: 700, fontSize: 40, lineHeight: 1 }}>Explore my topology</h2>
            </div>
            <div style={{ position: "absolute", right: 48, top: 40, display: "flex", alignItems: "center", gap: 24 }}>
              <Legend />
              <button type="button" onClick={() => setSel("table")} style={{ minHeight: 44, padding: "0 16px", borderRadius: 8, border: "1px solid #3F3463", background: "#110C21", color: "#EEEAF8", fontSize: 14, cursor: "pointer" }}>Routing table</button>
            </div>
          </section>
        </div>
      </div>
      {overlays}
    </div>
  );
}
