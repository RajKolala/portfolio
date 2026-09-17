import { GraduationCap, Briefcase, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
const About = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const handleCardClick = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };
  return <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="border-t border-border pt-6 mb-8">
          <h2 className="text-sm text-muted-foreground mb-1">Instance Details</h2>
        </div>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 rounded">
            <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">About This Instance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={`p-6 border-border bg-card cursor-pointer transition-all duration-300 hover:scale-105 ${expanded === 'education' ? 'md:col-span-3 md:scale-100' : expanded ? 'md:hidden' : ''}`} onClick={() => handleCardClick('education')}>
            <div className="p-3 bg-primary/10 rounded w-fit mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Education</h3>
            {expanded !== 'education' ? <>
                <p className="text-base mb-1">B.E. Computer Networking</p>
                <p className="text-sm font-mono text-code">Minor: Business Administration</p>
              </> : <div className="animate-fade-in space-y-4">
                <div>
                  <h4 className="text-base font-semibold mb-2">Bachelor of Engineering, Computer Networking System Management</h4>
                  <p className="text-sm text-muted-foreground mb-1">San Jose State University</p>
                  <p className="text-sm font-mono text-code mb-3">Expected May 2027 | Minor: Business Administration</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Focused on network administration, IoT systems, and enterprise network design with a strong foundation in programming and business operations.
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <h5 className="text-sm font-semibold mb-2">Relevant Coursework</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-sm text-muted-foreground">• Network Administration</p>
                    <p className="text-sm text-muted-foreground">• Python</p>
                    <p className="text-sm text-muted-foreground">• Analog and Digital Circuits</p>
                    <p className="text-sm text-muted-foreground">• IoT</p>
                    <p className="text-sm text-muted-foreground">• Calculus</p>
                    <p className="text-sm text-muted-foreground">• Linear Algebra</p>
                    <p className="text-sm text-muted-foreground">• Public Speaking</p>
                    <p className="text-sm text-muted-foreground">• Business Statistics</p>
                    <p className="text-sm text-muted-foreground">• Machine Learning Technology and Applications</p>
                    <p className="text-sm text-muted-foreground">• Network Security & Prevention Management</p>
                  </div>
                </div>
              </div>}
          </Card>

          <Card className={`p-6 border-border bg-card cursor-pointer transition-all duration-300 hover:scale-105 ${expanded === 'experience' ? 'md:col-span-3 md:scale-100' : expanded ? 'md:hidden' : ''}`} onClick={() => handleCardClick('experience')}>
            <div className="p-3 bg-primary/10 rounded w-fit mb-4">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Experience</h3>
            {expanded !== 'experience' ? <>
                <p className="text-base mb-1">AI & Machine Learning Intern</p>
                <p className="text-base mb-1">Network Systems & Infrastructure Intern</p>
                <p className="text-base mb-1">Independent iOS Developer</p>
                <p className="text-base mb-1">Network Engineering Consultant</p>
                <p className="text-sm font-mono text-code">Jabil · Elide · Clarity · Cisco</p>
              </> : <div className="animate-fade-in space-y-4">
                <div>
                  <h4 className="text-base font-semibold mb-1">AI & Machine Learning Intern</h4>
                  <p className="text-sm text-muted-foreground mb-1">Jabil | San Jose, CA</p>
                  <p className="text-sm font-mono text-code mb-3">Aug 2026 - Present</p>
                  <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 mb-3">
                    <li>• Building LLM and RAG-powered engineering copilots using LangChain to help manufacturing engineers and operators with process optimization, troubleshooting, and predictive decision making in a live smart manufacturing environment</li>
                    <li>• Developing data pipelines that ingest, clean, and contextualize high-volume data from legacy manufacturing equipment across proprietary and industrial protocols, normalizing it for use by downstream AI models</li>
                    <li>• Applying networking and security expertise to enable secure OT/IT data bridging between factory floor systems and cloud analytics infrastructure</li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">LangChain</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">RAG</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">LLMs</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Python</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Data Pipelines</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">OT/IT Security</span>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <h4 className="text-base font-semibold mb-1">Network Systems & Infrastructure Intern</h4>
                  <p className="text-sm text-muted-foreground mb-1">Elide | San Jose, CA</p>
                  <p className="text-sm font-mono text-code mb-3">May 2026 - Aug 2026</p>
                  <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 mb-3">
                    <li>• Deployed a brand new office network for a 20+ person startup from the ground up, handling end-to-end physical cabling, switch and router configuration, and wireless access point setup across the entire facility</li>
                    <li>• Designed and implemented VLAN segmentation to separate executive and leadership traffic from general staff, enforcing role-based network access control across the organization</li>
                    <li>• Configured a guest and event network with temporary access control to support visiting engineers and company-hosted events, isolating external traffic from internal systems</li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Switching & Routing</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">VLAN</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Wireless APs</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Access Control</span>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <h4 className="text-base font-semibold mb-1">Clarity – See Yourself | Independent iOS Developer</h4>
                  <p className="text-sm font-mono text-code mb-3">Mar 2026</p>
                  <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 mb-3">
                    <li>• Architected real-time peer-to-peer camera streaming between two iOS devices using WebSocket protocol with sub-second latency</li>
                    <li>• Designed session management system using unique 6-character room codes to establish and maintain live device connections</li>
                    <li>• Built Node.js server handling concurrent WebSocket connections for live video feed synchronization between devices</li>
                    <li>• Independently managed full deployment pipeline: EAS cloud builds, Apple Developer certificates, provisioning profiles, and App Store submission</li>
                    <li>• Published to Apple App Store — 1.0 release (App ID: 6761284470)</li>
                    <li>• Designed and deployed a companion support website with a live privacy policy endpoint at <a href="https://clarityseeyourself.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">clarityseeyourself.net</a></li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">React Native</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Expo</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">WebSocket</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Node.js</span>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <h4 className="text-base font-semibold mb-1">Network Engineering Consultant</h4>
                  <p className="text-sm text-muted-foreground mb-1">Cisco | Santa Clara, CA</p>
                  <p className="text-sm font-mono text-code mb-3">July 2023 - Nov 2023</p>
                  <ul className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <li>• Collaborated with 150+ IT professionals and educators on data literacy, cybersecurity, and generative AI workshops</li>
                    <li>• Designed breakout sessions improving AI tool understanding—achieved 92% satisfaction rate</li>
                    <li>• Contributed to securing large-scale systems and diagnosing data anomalies across multi-zetabyte infrastructures</li>
                    <li>• Networked with 20+ organizations, gaining perspectives on data-driven problem solving and cybersecurity</li>
                  </ul>
                </div>
              </div>}
          </Card>

          <Card className={`p-6 border-border bg-card cursor-pointer transition-all duration-300 hover:scale-105 ${expanded === 'certifications' ? 'md:col-span-3 md:scale-100' : expanded ? 'md:hidden' : ''}`} onClick={() => handleCardClick('certifications')}>
            <div className="p-3 bg-primary/10 rounded w-fit mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Certifications</h3>
            {expanded !== 'certifications' ? <>
                <p className="text-base mb-1">• CCNA</p>
                <p className="text-base mb-1">• Google</p>
                <p className="text-base mb-1">• AWS</p>
                <p className="text-sm font-mono text-code">• EC2, IAM governance</p>
                <p className="text-sm font-mono text-code">• SIEM, Python, Linux</p>
                <p className="text-sm font-mono text-code">• SQL, Docker, VPC design</p>
                <p className="text-sm font-mono text-code">• Threat monitoring</p>
              </> : <div className="animate-fade-in space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-base font-semibold mb-2">Cisco: CyberOps Associate</h4>
                    <p className="text-sm text-muted-foreground mb-1"><em>Cisco Networking Academy</em></p>
                    <p className="text-sm font-mono text-code mb-3">May 2026</p>
                    <p className="text-sm text-muted-foreground">
                      Demonstrated proficiency in security operations center (SOC) workflows, including threat monitoring, incident response, and network intrusion analysis; applied cybersecurity fundamentals across endpoint security, cryptography, and security policies.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-2">Google Cybersecurity Professional Certificate</h4>
                    <p className="text-sm text-muted-foreground mb-1"><em>Google Career Certificates</em></p>
                    <p className="text-sm font-mono text-code mb-3">November 2025</p>
                    <p className="text-sm text-muted-foreground">
                      9-course series covering cybersecurity fundamentals, SIEM tools, risk management, and threat mitigation. Gained hands-on experience with Python, Linux, and SQL for security operations.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-2">AWS Academy: Cloud Architecting Certification</h4>
                    <p className="text-sm text-muted-foreground mb-1"><em>Amazon Web Services Academy</em></p>
                    <p className="text-sm font-mono text-code mb-3">November 2025</p>
                    <p className="text-sm text-muted-foreground">
                      AWS cloud architecture fundamentals with hands-on experience in EC2, Lambda, S3, VPC design, IAM governance, load balancing, and security best practices.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-2">CCNA: Enterprise Networking, Security, and Automation</h4>
                    <p className="text-sm text-muted-foreground mb-1"><em>Cisco Networking Academy</em></p>
                    <p className="text-sm font-mono text-code mb-3">March 2025</p>
                    <p className="text-sm text-muted-foreground">
                      Designed enterprise-grade networks with IPv4/IPv6 routing. Built Python automation scripts improving deployment speed by 40%
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-2">CCNA: Switching, Routing, and Wireless Essentials</h4>
                    <p className="text-sm text-muted-foreground mb-1"><em>Cisco Networking Academy</em></p>
                    <p className="text-sm font-mono text-code mb-3">June 2024</p>
                    <p className="text-sm text-muted-foreground">
                      Configured Layer 2/Layer 3 switches, routers, and wireless LANs with zero packet loss under test loads
                    </p>
                  </div>
                </div>
              </div>}
          </Card>
        </div>
      </div>
    </section>;
};
export default About;