import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent } from "react";
import "./NetworkPortfolio.css";

/* Raj Kolala: network topology portfolio */

const RESUME_URL = "/Raj_Kolala_Resume.pdf";
const EMAIL = "rajkolala10@gmail.com";
const W = 1440;
const H = 1016;

type Dev = {
  id: string; host: string; name: string; type: string; ip: string;
  x: number; y: number; parent: string | null; via: number[][]; lp: string; group?: boolean;
};
type Line = { text: string; kind: string };
type Pt = { x: number; y: number; node: string | null };
type Packet = { x: number; y: number; d: number; show: boolean; rep: boolean };

const devs: Dev[] = [
  { id: 'pc0', host: 'PC0', name: 'You are here', type: 'pc', ip: '192.168.1.10', x: 330, y: 500, parent: 'edge', via: [[330, 410]], lp: 'below' },
  { id: 'edge', host: 'EDGE-R1', name: 'Gateway', type: 'router', ip: '192.168.1.1', x: 470, y: 410, parent: 'core', via: [], lp: 'below' },
  { id: 'contact', host: 'INTERNET', name: 'Contact', type: 'cloud', ip: '203.0.113.10', x: 610, y: 500, parent: 'edge', via: [[610, 410]], lp: 'below' },
  { id: 'core', host: 'RAJ-CORE', name: 'About Raj', type: 'router', ip: '10.0.0.1', x: 470, y: 300, parent: null, via: [], lp: 'ne' },
  { id: 'swexp', host: 'SW-EXP', name: 'Experience', type: 'switch', ip: '10.1.0.2', x: 260, y: 300, parent: 'core', via: [], lp: 'below', group: true },
  { id: 'jabil', host: 'JABIL', name: 'AI & ML Intern', type: 'server', ip: '10.1.0.11', x: 75, y: 150, parent: 'swexp', via: [[170, 300], [170, 150]], lp: 'below' },
  { id: 'elide', host: 'ELIDE', name: 'Network Infra Intern', type: 'server', ip: '10.1.0.12', x: 75, y: 300, parent: 'swexp', via: [], lp: 'below' },
  { id: 'cisco', host: 'CISCO', name: 'Network Consultant', type: 'server', ip: '10.1.0.13', x: 75, y: 450, parent: 'swexp', via: [[170, 300], [170, 450]], lp: 'below' },
  { id: 'swproj', host: 'SW-PROJ', name: 'Projects', type: 'switch', ip: '10.2.0.2', x: 680, y: 300, parent: 'core', via: [], lp: 'below', group: true },
  { id: 'clarity', host: 'CLARITY', name: 'iOS App', type: 'phone', ip: '10.2.0.11', x: 865, y: 150, parent: 'swproj', via: [[770, 300], [770, 150]], lp: 'below' },
  { id: 'cardio', host: 'CVD-ML', name: 'ML Classifier', type: 'laptop', ip: '10.2.0.12', x: 865, y: 300, parent: 'swproj', via: [], lp: 'below' },
  { id: 'proto', host: 'ISP-SIM', name: 'Network Prototype', type: 'router', ip: '10.2.0.13', x: 865, y: 450, parent: 'swproj', via: [[770, 300], [770, 450]], lp: 'below' },
  { id: 'swcred', host: 'SW-CRED', name: 'Credentials', type: 'switch', ip: '10.3.0.2', x: 470, y: 200, parent: 'core', via: [], lp: 'e', group: true },
  { id: 'edu', host: 'SJSU', name: 'Education', type: 'ap', ip: '10.3.0.11', x: 310, y: 78, parent: 'swcred', via: [[470, 140], [310, 140]], lp: 'above' },
  { id: 'certs', host: 'CERTS', name: 'Certifications', type: 'firewall', ip: '10.3.0.12', x: 470, y: 78, parent: 'swcred', via: [], lp: 'above' },
  { id: 'skills', host: 'SKILLS', name: 'Tech Skills', type: 'server', ip: '10.3.0.13', x: 630, y: 78, parent: 'swcred', via: [[470, 140], [630, 140]], lp: 'above' }
];
const byId: Record<string, Dev> = {};
devs.forEach((d) => { byId[d.id] = d; });

const alias: Record<string, string> = {
  experience: 'swexp', exp: 'swexp', work: 'swexp', jobs: 'swexp', 'sw-exp': 'swexp',
  jabil: 'jabil', elide: 'elide', cisco: 'cisco',
  projects: 'swproj', project: 'swproj', proj: 'swproj', 'sw-proj': 'swproj',
  clarity: 'clarity', cardio: 'cardio', cvd: 'cardio', 'cvd-ml': 'cardio', ml: 'cardio', classifier: 'cardio',
  prototype: 'proto', proto: 'proto', isp: 'proto', 'isp-sim': 'proto', network: 'proto',
  credentials: 'swcred', creds: 'swcred', 'sw-cred': 'swcred',
  education: 'edu', edu: 'edu', sjsu: 'edu', school: 'edu',
  certifications: 'certs', certification: 'certs', certs: 'certs', cert: 'certs',
  skills: 'skills', skill: 'skills',
  contact: 'contact', email: 'contact', linkedin: 'contact', github: 'contact', internet: 'contact',
  about: 'core', raj: 'core', core: 'core', 'raj-core': 'core', router: 'core',
  gateway: 'edge', edge: 'edge', 'edge-r1': 'edge',
  you: 'pc0', me: 'pc0', pc0: 'pc0', localhost: 'pc0', '127.0.0.1': 'pc0'
};
devs.forEach((d) => { alias[d.ip] = d.id; });

const words: string[] = ['experience', 'jabil', 'elide', 'cisco', 'projects', 'clarity', 'cardio', 'prototype', 'credentials', 'education', 'certifications', 'skills', 'contact', 'about'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const info: Record<string, any> = {
  core: {
    title: 'Raj Kolala', sub: 'Computer Network Engineer', meta: 'San Jose, CA',
    text: 'Computer Network Systems Management student at San Jose State University with a minor in Business Administration, graduating May 2027. Currently an AI & Machine Learning Intern at Jabil, previously a Network Systems & Infrastructure Intern at Elide and a Network Engineering Consultant at Cisco. Certified in CCNA, Cisco CyberOps, Google Cybersecurity and AWS Cloud Architecting.',
    rows: [
      { title: 'Experience', sub: 'Jabil, Elide, Cisco', date: '3 roles', to: 'swexp', cmd: 'ping experience' },
      { title: 'Projects', sub: 'Clarity, CVD classifier, ISP prototype', date: '3 builds', to: 'swproj', cmd: 'ping projects' },
      { title: 'Credentials', sub: 'Education, certifications, skills', date: '3 nodes', to: 'swcred', cmd: 'ping credentials' },
      { title: 'Contact', sub: 'Email, LinkedIn, GitHub', date: '', to: 'contact', cmd: 'ping contact' }
    ]
  },
  edge: {
    title: 'Default gateway', sub: 'Every packet from your PC leaves through here.',
    rows: [
      { title: 'About Raj', sub: 'Start at the core', date: '', to: 'core', cmd: 'ping about' },
      { title: 'Contact', sub: 'Email, LinkedIn, GitHub', date: '', to: 'contact', cmd: 'ping contact' }
    ]
  },
  swexp: {
    title: 'Experience', sub: 'Three roles across AI, infrastructure and network consulting.',
    rows: [
      { title: 'Jabil', sub: 'AI & Machine Learning Intern', date: 'Aug 2026 to Present', to: 'jabil', cmd: 'ping jabil' },
      { title: 'Elide', sub: 'Network Systems & Infrastructure Intern', date: 'May to Aug 2026', to: 'elide', cmd: 'ping elide' },
      { title: 'Cisco', sub: 'Network Engineering Consultant', date: 'Jul to Nov 2023', to: 'cisco', cmd: 'ping cisco' }
    ]
  },
  jabil: {
    title: 'Jabil', sub: 'AI & Machine Learning Intern', meta: 'Aug 2026 to Present · San Jose, CA',
    bullets: [
      'Building LLM and RAG-powered engineering copilots using LangChain to help manufacturing engineers and operators with process optimization, troubleshooting, and predictive decision making in a live smart manufacturing environment.',
      'Developing data pipelines that ingest, clean, and contextualize high-volume data from legacy manufacturing equipment across proprietary and industrial protocols, normalizing it for use by downstream AI models.',
      'Applying networking and security expertise to enable secure OT/IT data bridging between factory floor systems and cloud analytics infrastructure.'
    ],
    tags: ['LangChain', 'LLM', 'RAG', 'Python', 'Data pipelines', 'OT/IT']
  },
  elide: {
    title: 'Elide', sub: 'Network Systems & Infrastructure Intern', meta: 'May 2026 to Aug 2026 · San Jose, CA',
    bullets: [
      'Deployed a brand new office network for a 20+ person startup from the ground up, handling end-to-end physical cabling, switch and router configuration, and wireless access point setup across the entire facility.',
      'Designed and implemented VLAN segmentation to separate executive and leadership traffic from general staff, enforcing role-based network access control across the organization.',
      'Configured a guest and event network with temporary access control to support visiting engineers and company-hosted events, isolating external traffic from internal systems.',
      'Maintained and optimized CI/CD pipelines using GitHub Actions to automate build, test, and validation workflows across Kotlin, Java, JavaScript, and TypeScript targets.',
      'Managed and updated Docker images for cross-platform distribution, ensuring consistent runtime behavior across Linux, macOS, and Windows environments.',
      'Monitored cloud infrastructure health and resource utilization on AWS and GCP, setting up alerts and dashboards to proactively identify and address issues before impacting users.'
    ],
    tags: ['VLAN', 'Routing & Switching', 'Wireless', 'GitHub Actions', 'Docker', 'AWS', 'GCP']
  },
  cisco: {
    title: 'Cisco', sub: 'Network Engineering Consultant', meta: 'Jul 2023 to Nov 2023 · Santa Clara, CA',
    bullets: [
      'Collaborated with 150+ IT professionals and educators to deliver workshops on data literacy, cybersecurity, and generative AI integration, configuring practical solutions for real-world business use cases.',
      'Designed and facilitated breakout sessions improving understanding of AI-driven productivity tools and ethical implications; feedback surveys showed a 92% satisfaction rate across 20+ organizations.',
      'Supported consulting sessions diagnosing data anomalies and security vulnerabilities in large-scale enterprise systems, applying network defense principles to assess risk exposure across distributed web infrastructures.'
    ],
    tags: ['Cybersecurity', 'Network defense', 'Generative AI', 'Workshops']
  },
  swproj: {
    title: 'Projects', sub: 'Things built, shipped and simulated.',
    rows: [
      { title: 'Clarity: See Yourself', sub: 'Real-time peer-to-peer iOS app', date: 'Mar 2026 to Present', to: 'clarity', cmd: 'ping clarity' },
      { title: 'Cardiovascular Disease Classification', sub: 'Binary ML classifier', date: 'Mar to Apr 2026', to: 'cardio', cmd: 'ping cardio' },
      { title: 'End-to-End Network Prototype', sub: 'Multi-tier ISP topology in Packet Tracer', date: 'Oct to Dec 2025', to: 'proto', cmd: 'ping prototype' }
    ]
  },
  clarity: {
    title: 'Clarity: See Yourself', sub: 'Real-time dual-device camera mirroring for iOS, live on the App Store', meta: 'Mar 2026 to Present',
    bullets: [
      'Architected a real-time peer-to-peer video mirroring system for iOS using WebSocket protocol over a Node.js relay server, enabling sub-second latency camera feed synchronization between two devices via a 6-character room code session handshake.',
      'Developed and shipped a full-stack iOS application to the App Store integrating a client-server WebSocket architecture, live camera stream processing with 14 real-time editing parameters, and local on-device storage with zero data transmission to external servers.'
    ],
    tags: ['React Native', 'Expo', 'WebSocket', 'Node.js', 'EAS Build'],
    repo: 'https://github.com/RajKolala/Clarity---See-Yourself-IOS-App',
    links: [{ label: 'COMPANION SITE', text: 'clarityseeyourself.net', href: 'https://clarityseeyourself.net' }]
  },
  cardio: {
    title: 'Cardiovascular Disease Classification & Prediction', sub: 'Binary machine learning classifier', meta: 'Mar 2026 to Apr 2026',
    bullets: [
      'Built a binary ML classifier to predict cardiovascular disease across 70,000 patient records; performed end-to-end data preparation including outlier removal, age conversion from days to years, StandardScaler normalization, and correlation analysis using Pandas.',
      'Trained and compared 5 classification models; applied RandomizedSearchCV with cross-validation, achieving 73.7% accuracy (Random Forest); evaluated on precision, recall, and F1 with zero overfitting confirmed via train/test gap analysis.'
    ],
    tags: ['Python', 'Pandas', 'scikit-learn'],
    repo: 'https://github.com/RajKolala/Cardiovascular-Disease-Classifier-'
  },
  proto: {
    title: 'End-to-End Network Prototype', sub: 'Internet-scale ISP topology in Cisco Packet Tracer', meta: 'Oct 2025 to Dec 2025',
    bullets: [
      'Architected and simulated an internet-scale, multi-tier ISP topology connecting home, SMB, and cellular access networks to a centralized data center through hierarchical upstream transit.',
      'Engineered Tier-3, Tier-2, and Tier-1 ISP interconnections, implementing end-to-end IP addressing, routing, and DNS to validate packet traversal and scalability across 15+ routed networks.'
    ],
    tags: ['Cisco Packet Tracer', 'TCP/IP', 'Routing', 'DNS'],
    repo: 'https://github.com/RajKolala/Lan-to-Internet-END-to-END-Prototype'
  },
  swcred: {
    title: 'Credentials', sub: 'Education, certifications and the toolkit.',
    rows: [
      { title: 'San Jose State University', sub: 'Computer Networking System Management', date: 'May 2027', to: 'edu', cmd: 'ping education' },
      { title: 'Certifications', sub: 'CCNA, CyberOps, Google, AWS', date: '6 certs', to: 'certs', cmd: 'ping certifications' },
      { title: 'Technical Skills', sub: 'Cloud, networking, security, ML, DevOps', date: '', to: 'skills', cmd: 'ping skills' }
    ]
  },
  edu: {
    title: 'San Jose State University', sub: 'Bachelor of Engineering, Computer Networking System Management', meta: 'Expected May 2027 · San Jose, CA',
    text: 'Minor in Business Administration.',
    groups: [{ label: 'RELEVANT COURSEWORK', chips: ['Network Administration', 'Network Security & Prevention Management', 'Machine Learning Technology and Applications', 'Python', 'IoT', 'Analog and Digital Circuits', 'Calculus', 'Linear Algebra', 'Business Statistics', 'Public Speaking'] }]
  },
  certs: {
    title: 'Certifications', sub: 'Six credentials across networking, security, cloud and data.',
    rows: [
      { title: 'Google Cloud Data Analytics Certificate', sub: 'Google · BigQuery, SQL, Looker, LookML, Cloud Storage, Dataplex, Dataproc', date: 'Sep 2026', desc: '5-course program covering the full cloud data lifecycle: structuring, storing, and governing data in Google Cloud, transforming it with SQL and data pipelines in BigQuery, and building dashboards that tell a clear data story in Looker.' },
      { title: 'CyberOps Associate', sub: 'Cisco · Linux, Wireshark, Security Onion, SIEM, TCP/IP', date: 'May 2026', desc: 'Security operations center workflows including threat monitoring, incident response, and network intrusion analysis, applied across endpoint security, cryptography, and security policies.' },
      { title: 'Cybersecurity Professional Certificate', sub: 'Google · SQL, Linux, SIEM', date: 'Nov 2025', desc: '9-course program on enterprise threat detection, incident response, and network defense, applying NIST, MITRE ATT&CK, and OWASP frameworks for vulnerability assessments, log analysis, and incident remediation.' },
      { title: 'Cloud Architecting', sub: 'AWS Academy · EC2, S3, RDS, DynamoDB, Lambda, VPC', date: 'Nov 2025', desc: 'VPC design, compute and storage services (EC2, Lambda, S3), and IAM governance across distributed cloud systems.' },
      { title: 'CCNA: Enterprise Networking, Security, and Automation', sub: 'Cisco · Cisco IOS, Packet Tracer, OSPF, ACLs, NAT, IPsec VPN, QoS, SNMP, REST APIs', date: 'Mar 2025', desc: 'Designed and secured enterprise networks with single-area OSPFv2, access control lists, NAT/PAT, and site-to-site VPNs; covered QoS, network management with SNMP, Syslog, and NTP, and network automation through SDN, REST APIs, and configuration management tools.' },
      { title: 'CCNA: Switching, Routing, and Wireless Essentials', sub: 'Cisco · Cisco IOS, Packet Tracer, VLANs, STP, EtherChannel, DHCP, HSRP, WLAN', date: 'Jun 2024', desc: 'Configured and troubleshot switched and routed networks, including VLANs and inter-VLAN routing, Spanning Tree, EtherChannel, DHCPv4 and SLAAC, first hop redundancy with HSRP, switch port security, wireless LANs, and static routing.' }
    ]
  },
  skills: {
    title: 'Technical Skills', sub: 'The toolkit behind the work.',
    groups: [
      { label: 'NETWORKING & PROTOCOLS', chips: ['Cisco Equipment', 'TCP/IP', 'DNS', 'DHCP', 'HTTP/HTTPS', 'SSH', 'FTP', 'VPN', 'VLAN', 'Wireshark', 'PuTTY'] },
      { label: 'CLOUD & DEVOPS', chips: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions', 'Postman', 'Linux', 'VMware'] },
      { label: 'AI & DATA', chips: ['Python', 'Pandas', 'scikit-learn', 'LangChain', 'Matplotlib'] },
      { label: 'SCRIPTING & APPS', chips: ['PowerShell', 'Bash', 'React Native', 'Node.js', 'WebSocket'] },
      { label: 'SECURITY & COMPLIANCE', chips: ['ISO 27001'] }
    ]
  },
  contact: {
    title: 'Get in touch', sub: 'Open to network engineering, infrastructure and AI roles.', meta: 'San Jose, CA',
    links: [
      { label: 'EMAIL', text: 'rajkolala10@gmail.com', copy: true },
      { label: 'LINKEDIN', text: 'linkedin.com/in/rajkolala', href: 'https://linkedin.com/in/rajkolala' },
      { label: 'GITHUB', text: 'github.com/RajKolala', href: 'https://github.com/RajKolala' }
    ]
  },
  pc0: {
    title: 'This is you', sub: 'PC0, the workstation every ping starts from.',
    text: 'Type a command in the console below, or click any device on the topology. Each ping sends a packet across the network and opens the resume item it reaches.'
  }
};
const typeName: Record<string, string> = { router: 'ROUTER', switch: 'SWITCH', pc: 'PC', server: 'SERVER', phone: 'SMARTPHONE', laptop: 'LAPTOP', cloud: 'CLOUD', firewall: 'FIREWALL', ap: 'ACCESS POINT' };

const QUICK = ["ping experience", "ping projects", "ping certifications", "tracert clarity", "help"];

function chain(id: string): string[] {
  const out: string[] = [];
  let n: string | null = id;
  while (n) { out.push(n); n = byId[n].parent; }
  return out;
}

function linkPts(childId: string): number[][] {
  const c = byId[childId];
  const p = byId[c.parent as string];
  return [[p.x, p.y], ...c.via, [c.x, c.y]];
}

function route(to: string): { pts: Pt[]; links: string[] } {
  const a = chain("pc0");
  const b = chain(to);
  const lca = a.find((n) => b.includes(n)) as string;
  const pts: Pt[] = [{ x: byId.pc0.x, y: byId.pc0.y, node: "pc0" }];
  const links: string[] = [];
  a.slice(0, a.indexOf(lca)).forEach((n) => {
    const lp = linkPts(n).reverse().slice(1);
    lp.forEach((q, i) => pts.push({ x: q[0], y: q[1], node: i === lp.length - 1 ? byId[n].parent : null }));
    links.push(n);
  });
  b.slice(0, b.indexOf(lca)).reverse().forEach((n) => {
    const lp = linkPts(n).slice(1);
    lp.forEach((q, i) => pts.push({ x: q[0], y: q[1], node: i === lp.length - 1 ? n : null }));
    links.push(n);
  });
  return { pts, links };
}

function lev(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const d: number[][] = [];
  for (let i = 0; i <= m; i++) d[i] = [i];
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[m][n];
}

const STOP = ["ping", "tracert", "traceroute", "trace", "show", "open", "go", "goto", "to", "cd", "me", "my", "your", "his", "the", "an", "of", "at", "in", "on", "ssh", "telnet", "please", "pls", "see", "view", "what", "whats", "is", "are", "and", "for"];

function closest(text: string): { d: number; key: string; id: string } | null {
  const toks = text.toLowerCase().split(/[^a-z0-9-]+/).filter((t) => t.length >= 2 && !STOP.includes(t));
  if (!toks.length) return null;
  const keys = Object.keys(alias).filter((k) => !/^[0-9]/.test(k));
  let best: { d: number; key: string; id: string } | null = null;
  toks.forEach((t) => {
    keys.forEach((k) => {
      let d = lev(t, k) / Math.max(t.length, k.length);
      if (k.indexOf(t) === 0) d = Math.min(d, 0.05 + 0.3 * (1 - t.length / k.length));
      if (k.length >= 3 && t.indexOf(k) === 0) d = Math.min(d, 0.1);
      if (!best || d < best.d || (d === best.d && k.length > best.key.length)) best = { d, key: k, id: alias[k] };
    });
  });
  return best;
}

function complete(v: string): string | null {
  const cmds = ["ping", "tracert", "show devices", "ipconfig", "whoami", "clear", "help"];
  const parts = v.split(" ");
  if (parts.length === 1) {
    const m = cmds.concat(words).filter((w) => w.indexOf(parts[0].toLowerCase()) === 0);
    if (m.length === 1) return m[0] + (m[0] === "ping" || m[0] === "tracert" ? " " : "");
    return null;
  }
  const last = parts[parts.length - 1].toLowerCase();
  const m = words.filter((w) => w.indexOf(last) === 0);
  if (m.length === 1) { parts[parts.length - 1] = m[0]; return parts.join(" "); }
  return null;
}

function Icon({ type }: { type: string }) {
  switch (type) {
    case "router":
      return <svg className="ico" viewBox="0 0 48 48"><ellipse cx="24" cy="17" rx="17" ry="6" /><path d="M7 17v13c0 3.3 7.6 6 17 6s17-2.7 17-6V17" /><path d="M13 17h8M18.5 15l2.5 2-2.5 2M35 17h-8M29.5 15L27 17l2.5 2" /></svg>;
    case "switch":
      return <svg className="ico" viewBox="0 0 48 48"><rect x="5" y="16" width="38" height="16" rx="2" /><path d="M12 22h13M22 19.5l3 2.5-3 2.5M36 27H23M26 24.5L23 27l3 2.5" /></svg>;
    case "pc":
      return <svg className="ico" viewBox="0 0 48 48"><rect x="7" y="9" width="34" height="23" rx="1.5" /><path d="M24 32v7M17 39h14" /></svg>;
    case "server":
      return <svg className="ico" viewBox="0 0 48 48"><rect x="13" y="6" width="22" height="36" rx="1.5" /><path d="M18 13h12M18 19h12M18 25h12" /><circle cx="24" cy="35" r="1.4" /></svg>;
    case "phone":
      return <svg className="ico" viewBox="0 0 48 48"><rect x="14" y="5" width="20" height="38" rx="3.5" /><path d="M21 37h6" /></svg>;
    case "laptop":
      return <svg className="ico" viewBox="0 0 48 48"><rect x="10" y="11" width="28" height="19" rx="1.5" /><path d="M5 37h38l-3-7H8z" /></svg>;
    case "cloud":
      return <svg className="ico" viewBox="0 0 48 48"><path d="M14 36h21a8 8 0 0 0 1.5-15.9A11 11 0 0 0 15.2 18 9 9 0 0 0 14 36z" /></svg>;
    case "firewall":
      return <svg className="ico" viewBox="0 0 48 48"><rect x="7" y="10" width="34" height="28" rx="1.5" /><path d="M7 19.3h34M7 28.6h34M19 10v9.3M31 10v9.3M13 19.3v9.3M25 19.3v9.3M36 19.3v9.3M19 28.6V38M31 28.6V38" /></svg>;
    default:
      return <svg className="ico" viewBox="0 0 48 48"><rect x="9" y="29" width="30" height="9" rx="1.5" /><path d="M24 29v-6M18 18a8.5 8.5 0 0 1 12 0M13.5 13a15 15 0 0 1 21 0" /><circle cx="15" cy="33.5" r="1" /></svg>;
  }
}

const Arrow = ({ size = 14, sw = 2 }: { size?: number; sw?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function NetworkPortfolio() {
  const [lines, setLines] = useState<Line[]>([
    { text: "Raj Kolala Portfolio [Version 2026.9]", kind: "head" },
    { text: "Type help for commands, or try: ping experience", kind: "out" },
    { text: "", kind: "out" },
  ]);
  const [sel, setSel] = useState<string | null>(null);
  const [pn, setPn] = useState(0);
  const [reply, setReply] = useState("");
  const [lit, setLit] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [pk, setPk] = useState<Packet>({ x: 330, y: 500, d: 0, show: false, rep: false });
  const [mailOpen, setMailOpen] = useState(false);
  const [mailOk, setMailOk] = useState(true);
  const [mailKey, setMailKey] = useState(0);
  const [scale, setScale] = useState(1);
  const [ph, setPh] = useState("");

  const timers = useRef<number[]>([]);
  const mailTimer = useRef<number | undefined>(undefined);
  const hist = useRef<string[]>([]);
  const hIdx = useRef(-1);

  // Fonts
  useEffect(() => {
    const id = "np-fonts";
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id;
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(l);
  }, []);

  // Scale the fixed 1440 x 1016 layout to fit the window
  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const s = w < 900 ? w / W : Math.min(w / W, h / H);
      setScale(Math.min(s, 1.4));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Type out and cycle the console placeholder through the available commands
  useEffect(() => {
    let i = 0;
    let c = 0;
    let mode: "typing" | "holding" | "deleting" = "typing";
    let t = 0;
    const tick = () => {
      const full = QUICK[i];
      if (mode === "typing") {
        c++;
        setPh(full.slice(0, c));
        if (c === full.length) { mode = "holding"; t = window.setTimeout(tick, 1700); return; }
        t = window.setTimeout(tick, 55);
      } else if (mode === "holding") {
        mode = "deleting";
        t = window.setTimeout(tick, 300);
      } else {
        c--;
        setPh(full.slice(0, c));
        if (c === 0) { i = (i + 1) % QUICK.length; mode = "typing"; t = window.setTimeout(tick, 200); return; }
        t = window.setTimeout(tick, 28);
      }
    };
    t = window.setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => () => {
    timers.current.forEach((t) => clearTimeout(t));
    clearTimeout(mailTimer.current);
  }, []);

  const clearT = () => { timers.current.forEach((t) => clearTimeout(t)); timers.current = []; };
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };
  const print = useCallback((items: Line | Line[]) => {
    const add = Array.isArray(items) ? items : [items];
    setLines((s) => s.concat(add).slice(-240));
  }, []);

  const send = (to: string, trace: boolean) => {
    const d = byId[to];
    clearT();
    const { pts, links } = route(to);
    const hopsL3 = pts.filter((p, i) => i > 0 && p.node && (byId[p.node].type === "router" || p.node === to)).map((p) => p.node as string);
    const between = hopsL3.filter((n) => n !== to).length;
    const ttl = 128 - between;
    const base = 1 + between * 2;

    if (trace) print([{ text: "Tracing route to " + d.host + " [" + d.ip + "]", kind: "out" }, { text: "over a maximum of 30 hops:", kind: "out" }, { text: "", kind: "out" }]);
    else print({ text: "Pinging " + d.host + " [" + d.ip + "] with 32 bytes of data:", kind: "out" });

    if (pts.length < 2) {
      print([{ text: "Reply from " + d.ip + ": bytes=32 time<1ms TTL=128", kind: "ok" }, { text: "", kind: "out" }]);
      setSel(to); setPn((n) => n + 1); setReply("Reply from " + d.ip + " · <1 ms · TTL 128");
      setLit([]); setBusy(false); setPk((p) => ({ ...p, show: false, d: 0 }));
      return;
    }

    setBusy(true);
    setLit(links);
    setPk({ x: pts[0].x, y: pts[0].y, d: 0, show: true, rep: false });
    const speed = 0.42;
    let t = 60;
    let hop = 0;
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i];
      const dur = Math.max(60, Math.round(Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y) / speed));
      later(() => setPk({ x: p.x, y: p.y, d: dur, show: true, rep: false }), t);
      t += dur;
      if (trace && p.node && hopsL3.includes(p.node)) {
        hop += 1;
        const h = hop;
        const hd = byId[p.node];
        const ms = h * 2 - 1;
        const isDest = p.node === to;
        later(() => print({ text: "  " + h + "    " + ms + " ms    " + ms + " ms    " + (ms + 1) + " ms    " + hd.host + " [" + hd.ip + "]", kind: isDest ? "ok" : "out" }), t);
      }
    }

    const ms = base + Math.floor(Math.random() * 3);
    later(() => {
      setSel(to); setPn((n) => n + 1);
      setReply("Reply from " + d.ip + " · " + ms + " ms · TTL " + ttl);
      if (trace) print([{ text: "", kind: "out" }, { text: "Trace complete.", kind: "out" }, { text: "", kind: "out" }]);
    }, t);

    if (!trace) {
      for (let k = 0; k < 4; k++) {
        const jitter = base + ((k * 7 + ms) % 3);
        later(() => print({ text: "Reply from " + d.ip + ": bytes=32 time=" + jitter + "ms TTL=" + ttl, kind: "ok" }), t + 40 + k * 110);
      }
      later(() => print([{ text: "", kind: "out" }, { text: "Ping statistics for " + d.ip + ":", kind: "out" }, { text: "    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)", kind: "out" }, { text: "", kind: "out" }]), t + 40 + 4 * 110);
    }

    const end = pts[pts.length - 1];
    later(() => setPk({ x: end.x, y: end.y, d: 0, show: true, rep: true }), t + 60);
    let r = t + 120;
    for (let i = pts.length - 2; i >= 0; i--) {
      const p = pts[i];
      const q = pts[i + 1];
      const dur = Math.max(40, Math.round(Math.hypot(p.x - q.x, p.y - q.y) / 0.9));
      later(() => setPk({ x: p.x, y: p.y, d: dur, show: true, rep: true }), r);
      r += dur;
    }
    later(() => { setBusy(false); setPk((p) => ({ ...p, show: false, d: 0 })); }, r + 40);
  };

  const run = (raw: string) => {
    const line = (raw || "").trim();
    print({ text: "C:\\>" + line, kind: "in" });
    if (!line) return;
    hist.current = hist.current.concat([line]).slice(-50);
    hIdx.current = -1;
    const tok = line.toLowerCase().split(/\s+/);
    let c = tok[0];
    const arg = tok.slice(1).filter((x) => x.charAt(0) !== "-").join(" ");
    const CMDS = ["ping", "tracert", "traceroute", "trace", "help", "clear", "cls", "whoami", "ipconfig", "show", "ls", "dir", "open", "goto", "cd", "ssh", "telnet", "exit", "logout"];
    if (!CMDS.includes(c) && c !== "?" && !alias[c] && !alias[line.toLowerCase()] && c.length >= 3) {
      let best: string | null = null;
      let bd = 99;
      CMDS.forEach((k) => { const dd = lev(c, k); if (dd < bd) { bd = dd; best = k; } });
      if (best && bd <= (c.length >= 5 ? 2 : 1)) c = best;
    }

    if (c === "help" || c === "?") {
      print([
        { text: "Commands", kind: "head" },
        { text: "  ping <device>       send an echo request and open the device", kind: "out" },
        { text: "  tracert <device>    same trip, printing every routed hop", kind: "out" },
        { text: "  show devices        list every device and its address", kind: "out" },
        { text: "  ipconfig            show this PC\u2019s address", kind: "out" },
        { text: "  whoami              one line about Raj", kind: "out" },
        { text: "  clear               clear the console", kind: "out" },
        { text: "Devices", kind: "head" },
        { text: "  " + words.join("  "), kind: "out" },
        { text: "Tab completes a name. Up and down arrows walk your history.", kind: "out" },
        { text: "", kind: "out" },
      ]);
      return;
    }
    if (c === "clear" || c === "cls") { setLines([]); return; }
    if (c === "whoami") { print([{ text: "raj.kolala  Computer Network Engineer · SJSU, May 2027 · San Jose, CA", kind: "out" }, { text: "", kind: "out" }]); return; }
    if (c === "ipconfig") {
      print([
        { text: "Ethernet adapter FastEthernet0:", kind: "out" },
        { text: "   IPv4 Address. . . . . . . . . . . : 192.168.1.10", kind: "out" },
        { text: "   Subnet Mask . . . . . . . . . . . : 255.255.255.0", kind: "out" },
        { text: "   Default Gateway . . . . . . . . . : 192.168.1.1", kind: "out" },
        { text: "", kind: "out" },
      ]);
      return;
    }
    if (c === "ls" || c === "dir" || (c === "show" && /^(devices|dev|cdp|topology|ip)/.test(arg))) {
      const rows = devs.map((d) => ({ text: "  " + (d.host + "          ").slice(0, 10) + (d.ip + "               ").slice(0, 15) + d.name, kind: "out" }));
      print([{ text: "  Device    Address        Role", kind: "head" }, ...rows, { text: "", kind: "out" }]);
      return;
    }
    if (c === "exit" || c === "logout") { print([{ text: "Nice try. The console stays open.", kind: "out" }, { text: "", kind: "out" }]); return; }

    let target: string;
    let trace = false;
    if (["ping", "open", "cd", "goto", "show", "ssh", "telnet"].includes(c)) {
      if (!arg) { print([{ text: "Usage: " + c + " <device>   e.g. " + c + " experience", kind: "err" }, { text: "", kind: "out" }]); return; }
      target = arg;
    } else if (c === "tracert" || c === "traceroute" || c === "trace") {
      if (!arg) { print([{ text: "Usage: tracert <device>   e.g. tracert clarity", kind: "err" }, { text: "", kind: "out" }]); return; }
      target = arg; trace = true;
    } else {
      target = line.toLowerCase();
    }

    const key = target.replace(/^raj@|^user@/, "").replace(/\s+/g, "");
    let id = alias[key] || alias[target];
    if (!id || !byId[id]) {
      const m = closest(target);
      if (!m) { print([{ text: 'Could not find a device matching "' + target + '". Type help for a list.', kind: "err" }, { text: "", kind: "out" }]); return; }
      if (m.d > 0.6) {
        id = "core";
        print({ text: 'No close match for "' + target + '". Heading to about instead.', kind: "head" });
      } else {
        id = m.id;
        print({ text: "Closest match: " + byId[id].name + " (" + byId[id].host + ")", kind: "head" });
      }
    }
    send(id, trace);
  };

  const copyEmail = () => {
    const fallback = () => {
      try {
        const t = document.createElement("textarea");
        t.value = EMAIL;
        t.setAttribute("readonly", "");
        t.style.position = "fixed";
        t.style.opacity = "0";
        document.body.appendChild(t);
        t.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(t);
        return ok;
      } catch { return false; }
    };
    const show = (ok: boolean) => {
      clearTimeout(mailTimer.current);
      setMailOk(ok);
      setMailKey((k) => k + 1);
      setMailOpen(true);
      mailTimer.current = window.setTimeout(() => setMailOpen(false), 4200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(() => show(true), () => show(fallback()));
    } else {
      show(fallback());
    }
  };
  const closeMail = () => { clearTimeout(mailTimer.current); setMailOpen(false); };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const el = e.currentTarget.querySelector("input");
    if (!el) return;
    const v = el.value; el.value = ""; run(v);
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    const h = hist.current;
    if (e.key === "ArrowUp") {
      if (!h.length) return;
      e.preventDefault();
      const i = hIdx.current === -1 ? h.length - 1 : Math.max(0, hIdx.current - 1);
      el.value = h[i]; hIdx.current = i;
    } else if (e.key === "ArrowDown") {
      if (hIdx.current === -1) return;
      e.preventDefault();
      const i = hIdx.current + 1;
      if (i >= h.length) { el.value = ""; hIdx.current = -1; } else { el.value = h[i]; hIdx.current = i; }
    } else if (e.key === "Tab") {
      const c = complete(el.value);
      if (c) { e.preventDefault(); el.value = c; }
    }
  };

  // Links and ports
  const segs: { l: number; t: number; w: number; h: number; on: boolean }[] = [];
  const dots: { x: number; y: number; on: boolean }[] = [];
  devs.forEach((d) => {
    if (!d.parent) return;
    const on = lit.includes(d.id);
    const P = linkPts(d.id);
    for (let i = 1; i < P.length; i++) {
      const a = P[i - 1];
      const b = P[i];
      if (a[1] === b[1]) segs.push({ l: Math.min(a[0], b[0]), t: a[1] - 0.5, w: Math.abs(a[0] - b[0]) + 1, h: 1, on });
      else segs.push({ l: a[0] - 0.5, t: Math.min(a[1], b[1]), w: 1, h: Math.abs(a[1] - b[1]) + 1, on });
    }
    const u = (p: number[], q: number[]) => { const L = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1; return [p[0] + ((q[0] - p[0]) / L) * 36, p[1] + ((q[1] - p[1]) / L) * 36]; };
    const d1 = u(P[0], P[1]);
    const d2 = u(P[P.length - 1], P[P.length - 2]);
    dots.push({ x: d1[0], y: d1[1], on }, { x: d2[0], y: d2[1], on });
  });
  segs.sort((a, b) => (a.on === b.on ? 0 : a.on ? 1 : -1));

  // Detail panel
  const x = sel ? info[sel] || {} : null;
  const dv = sel ? byId[sel] : null;
  const pv = sel && dv && x
    ? {
        kicker: typeName[dv.type] + " · " + dv.host, addr: dv.ip, title: x.title || dv.name, sub: x.sub || "", meta: x.meta || "",
        text: x.text || "", reply, repo: x.repo || "", resume: sel === "core",
        bullets: (x.bullets || []) as string[], tags: (x.tags || []) as string[], groups: (x.groups || []) as { label: string; chips: string[] }[],
        links: (x.links || []) as { label: string; text: string; href?: string; copy?: boolean }[],
        rows: (x.rows || []) as { title: string; sub: string; date: string; desc?: string; to?: string; cmd?: string }[],
      }
    : {
        kicker: "PC0", addr: "192.168.1.10", title: "Hi, I\u2019m Raj.", sub: "Computer Network Engineer based in San Jose, CA.", meta: "",
        text: "This portfolio is a live network. Every section of my resume is a device on the topology. Ping one from the console below and a packet will travel across the links to open it.",
        reply: "", repo: "", resume: false, bullets: [], tags: [], groups: [], links: [], rows: [],
      };
  const showQuick = !sel || sel === "pc0";

  return (
    <div className="np" style={{ width: "100%", minHeight: "100vh", overflowX: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: W * scale, height: H * scale, flexShrink: 0 }}>
        <div style={{ position: "relative", width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left", boxSizing: "border-box", padding: "36px 48px 36px", display: "flex", flexDirection: "column", background: "#f6f6f3" }}>

          <header style={{ height: 72, flexShrink: 0, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, borderBottom: "1px solid #111111" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.1, fontWeight: 500, letterSpacing: "-0.02em", color: "#111111" }}>Raj Kolala</h1>
              <p style={{ margin: 0, fontSize: 15, color: "#6b6b66" }}>Computer Network Engineer, San Jose</p>
            </div>
            <nav style={{ display: "flex", alignItems: "center", gap: 28 }} aria-label="Links">
              <a className="hdl" href="https://linkedin.com/in/rajkolala" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="hdl" href="https://github.com/RajKolala" target="_blank" rel="noopener noreferrer">GitHub</a>
              <button className="hdl hbtn" onClick={copyEmail}>Email</button>
              <a className="hdl" href={RESUME_URL} target="_blank" rel="noopener noreferrer">Resume</a>
              <div className="cap" style={{ display: "flex", alignItems: "center", gap: 8, width: 96 }}>
                <span className={"live" + (busy ? " sim" : "")} />
                <span>{busy ? "Simulation" : "Realtime"}</span>
              </div>
            </nav>
          </header>

          <div style={{ height: 596, flexShrink: 0, display: "flex", borderBottom: "1px solid #e2e1dc" }}>
            <section aria-label="Network topology" style={{ position: "relative", width: 940, height: 596, flexShrink: 0, marginLeft: -8 }}>
              <div className="cap" style={{ position: "absolute", left: 8, top: 20 }}>Topology</div>
              <div style={{ position: "absolute", left: 8, bottom: 16, fontSize: 12, color: "#6b6b66" }}>Click a device, or ping it from the console.</div>
              <div style={{ position: "absolute", left: 0, top: 8, width: 940, height: 580 }}>
                {segs.map((s, i) => (
                  <div key={"s" + i} className={"seg" + (s.on ? " lit" : "")} style={{ left: s.l, top: s.t, width: s.w, height: s.h }} />
                ))}
                {dots.map((p, i) => (
                  <div key={"d" + i} className={"dot" + (p.on ? " lit" : "")} style={{ left: p.x, top: p.y }} />
                ))}
                {devs.map((d) => (
                  <button
                    key={d.id}
                    className={"node lp-" + d.lp + (sel === d.id ? " on p" + (pn % 2) : "")}
                    style={{ left: d.x, top: d.y }}
                    onClick={() => run("ping " + (d.id === "core" ? "about" : d.host.toLowerCase()))}
                    aria-label={"Ping " + d.name}
                  >
                    <div className="tile"><Icon type={d.type} /></div>
                    <div className="lbl">
                      <span className="host">{d.host}</span>
                      <span className="nm">{d.name}</span>
                    </div>
                  </button>
                ))}
                <div
                  className={"pkt" + (pk.rep ? " rep" : "") + (pk.show ? "" : " hide")}
                  style={{ left: pk.x, top: pk.y, transition: `left ${pk.d}ms linear, top ${pk.d}ms linear, opacity 0.2s` }}
                >
                  <svg viewBox="0 0 18 12"><rect x="0" y="0" width="18" height="12" rx="1" /><path d="M1.5 1.5l7.5 5.5 7.5-5.5" /></svg>
                </div>
              </div>
            </section>

            <aside className="panel" aria-live="polite" style={{ flexGrow: 1, height: 596, boxSizing: "border-box", overflowY: "auto", borderLeft: "1px solid #e2e1dc" }}>
              <div key={pn} className={"pin" + (pn % 2)} style={{ padding: "20px 0 40px 40px", display: "flex", flexDirection: "column", gap: 28 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="cap" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                    <span style={{ color: "#111111" }}>{pv.kicker}</span>
                    <span>{pv.addr}</span>
                  </div>
                  <h2 style={{ margin: "12px 0 0", fontSize: 32, lineHeight: 1.12, fontWeight: 500, letterSpacing: "-0.02em", color: "#111111", textWrap: "balance" } as CSSProperties}>{pv.title}</h2>
                  {pv.sub && <p style={{ margin: 0, fontSize: 16, lineHeight: 1.45, color: "#3d3d3a" }}>{pv.sub}</p>}
                  {pv.meta && <p className="mono" style={{ margin: 0, fontSize: 12, color: "#6b6b66" }}>{pv.meta}</p>}
                  {pv.reply && <p className="mono" style={{ margin: 0, fontSize: 12, color: "#23794a" }}>{pv.reply}</p>}
                </div>

                {pv.repo && (
                  <a className="repo" href={pv.repo} target="_blank" rel="noopener noreferrer">
                    <span>View on GitHub</span>
                    <Arrow />
                  </a>
                )}

                {pv.text && <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "#2a2a28" }}>{pv.text}</p>}

                {pv.bullets.length > 0 && (
                  <ul className="bl">{pv.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}

                {pv.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", columnGap: 18, rowGap: 6 }}>
                    {pv.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                )}

                {pv.resume && (
                  <a className="resbox" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span className="cap" style={{ color: "#ff4f00" }}>Resume</span>
                      <span style={{ fontSize: 16, fontWeight: 500, color: "#111111" }}>Raj Kolala, Resume</span>
                      <span className="mono" style={{ fontSize: 11, color: "#6b6b66" }}>PDF · opens in a new tab</span>
                    </div>
                    <Arrow size={18} sw={1.8} />
                  </a>
                )}

                {pv.rows.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #e2e1dc" }}>
                    {pv.rows.map((r) =>
                      r.to ? (
                        <button key={r.title} className="row" onClick={() => run(r.cmd as string)}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, width: "100%" }}>
                            <span className="rt" style={{ fontSize: 16, fontWeight: 500 }}>{r.title}</span>
                            <span className="mono" style={{ fontSize: 11, color: "#6b6b66", whiteSpace: "nowrap" }}>{r.date}</span>
                          </div>
                          <span style={{ fontSize: 13, color: "#6b6b66" }}>{r.sub}</span>
                        </button>
                      ) : (
                        <div key={r.title} className="row">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, width: "100%" }}>
                            <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4 }}>{r.title}</span>
                            <span className="mono" style={{ fontSize: 11, color: "#6b6b66", whiteSpace: "nowrap" }}>{r.date}</span>
                          </div>
                          <span style={{ fontSize: 13, color: "#6b6b66" }}>{r.sub}</span>
                          {r.desc && <span style={{ fontSize: 13, lineHeight: 1.6, color: "#2a2a28", marginTop: 4 }}>{r.desc}</span>}
                        </div>
                      )
                    )}
                  </div>
                )}

                {pv.groups.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {pv.groups.map((g) => (
                      <div key={g.label} style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 14, borderTop: "1px solid #e2e1dc" }}>
                        <span className="cap">{g.label}</span>
                        <div style={{ display: "flex", flexWrap: "wrap", columnGap: 18, rowGap: 6 }}>
                          {g.chips.map((c) => <span key={c} className="chip">{c}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {pv.links.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #e2e1dc" }}>
                    {pv.links.map((k) =>
                      k.copy ? (
                        <button key={k.label} className="row" onClick={copyEmail}>
                          <span className="cap">{k.label}</span>
                          <span className="rt" style={{ fontSize: 16 }}>{k.text}</span>
                        </button>
                      ) : (
                        <a key={k.label} className="row" href={k.href} target="_blank" rel="noopener noreferrer">
                          <span className="cap">{k.label}</span>
                          <span className="rt" style={{ fontSize: 16 }}>{k.text}</span>
                        </a>
                      )
                    )}
                  </div>
                )}

                {showQuick && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span className="cap">Try</span>
                    <div style={{ display: "flex", flexWrap: "wrap", columnGap: 20 }}>
                      {QUICK.map((q) => <button key={q} className="qbtn dark" onClick={() => run(q)}>{q}</button>)}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          <section aria-label="Command prompt" style={{ flexGrow: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <div style={{ height: 44, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <span className="cap">Console</span>
              <div style={{ display: "flex", gap: 20 }}>
                {QUICK.map((q) => <button key={q} className="qbtn" onClick={() => run(q)}>{q}</button>)}
              </div>
            </div>
            <label htmlFor="np-cmd" className="term" style={{ flexGrow: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column-reverse", cursor: "text" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {lines.map((l, i) => <div key={i} className={"ln " + l.kind}>{l.text}</div>)}
              </div>
            </label>
            <form onSubmit={onSubmit} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 10, paddingTop: 12, marginTop: 8, borderTop: "1px solid #e2e1dc" }}>
              <label htmlFor="np-cmd" className="mono" style={{ fontSize: 13, color: "#111111" }}>C:\&gt;</label>
              <input id="np-cmd" name="cmd" className="cmdin" type="text" onKeyDown={onKey} placeholder={ph} autoComplete="off" spellCheck={false} aria-label="Command" />
            </form>
          </section>

          {mailOpen && (
            <div key={mailKey} className="mwrap" role="dialog" aria-modal="true" aria-label="Email copied">
              <button className="mback" aria-label="Close" onClick={closeMail} />
              <div className="mcard">
                <div className="stage" aria-hidden="true">
                  <div className="speed"><span /><span /><span /></div>
                  <div className="envfly">
                    <div className="flapup" />
                    <div className="envback" />
                    <div className="letter"><i /><i /><i /><i style={{ width: "40%" }} /></div>
                    <svg className="pocket" viewBox="0 0 120 76"><path d="M0.75 0.75 L60 44 L119.25 0.75 V75.25 H0.75 Z" /></svg>
                    <svg className="flapdown" viewBox="0 0 120 46"><path d="M0.75 0.75 L60 45 L119.25 0.75 Z" /></svg>
                    <div className="stamp" />
                  </div>
                  <svg className="sent" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" /><path d="M15 24.5l6 6 12-13" /></svg>
                </div>
                <div className="blocks" aria-hidden="true">
                  {Array.from({ length: 14 }, (_, i) => <span key={i} style={{ animationDelay: (0.15 + i * 0.09).toFixed(2) + "s" }} />)}
                </div>
                <div className="stat mono" aria-hidden="true"><span className="s1">Sending message 1 of 1…</span><span className="s2">Message sent</span></div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em", color: "#111111" }}>{mailOk ? "Email copied to clipboard" : "Copy this email"}</p>
                  <p className="mono" style={{ margin: 0, fontSize: 13, color: "#6b6b66" }}>{EMAIL}</p>
                </div>
                <button className="qbtn dark" onClick={closeMail}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
