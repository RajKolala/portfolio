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
                    <p className="text-sm text-muted-foreground">• Intro to Networks</p>
                    <p className="text-sm text-muted-foreground">• Intro to IoT</p>
                    <p className="text-sm text-muted-foreground">• Analog and Digital Circuits</p>
                    <p className="text-sm text-muted-foreground">• Intro to Python</p>
                    <p className="text-sm text-muted-foreground">• Business Statistics</p>
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
                <p className="text-base mb-1">Network Engineering Consultant</p>
                <p className="text-sm font-mono text-code">Cisco | 2023</p>
              </> : <div className="animate-fade-in space-y-4">
                <div>
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
                <div className="border-t border-border pt-4">
                  <h5 className="text-sm font-semibold mb-2">IoT Project (Nov 2024 - Present)</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    Engineered smart home ecosystem with 15+ Zigbee & Z-Wave devices through Home Assistant on Raspberry Pi 5, achieving 95% uptime
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Python</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Docker</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Zigbee</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Ubuntu</span>
                  </div>
                </div>
              </div>}
          </Card>

          <Card className={`p-6 border-border bg-card cursor-pointer transition-all duration-300 hover:scale-105 ${expanded === 'certifications' ? 'md:col-span-3 md:scale-100' : expanded ? 'md:hidden' : ''}`} onClick={() => handleCardClick('certifications')}>
            <div className="p-3 bg-primary/10 rounded w-fit mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Certifications</h3>
            {expanded !== 'certifications' ? <>
                <p className="text-base mb-1">CCNA & Google Certifications</p>
                <p className="text-sm font-mono text-code">Cisco & SQL</p>
              </> : <div className="animate-fade-in space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-base font-semibold mb-2">Google Cybersecurity Professional Certificate</h4>
                    <p className="text-sm text-muted-foreground mb-1">Google Career Certificates</p>
                    <p className="text-sm font-mono text-code mb-3">November 2025</p>
                    <p className="text-sm text-muted-foreground">
                      9-course series covering cybersecurity fundamentals, SIEM tools, risk management, and threat mitigation. Gained hands-on experience with Python, Linux, and SQL for security operations.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-2">AWS Academy: Cloud Architecting</h4>
                    <p className="text-sm text-muted-foreground mb-1">AWS Academy</p>
                    <p className="text-sm font-mono text-code mb-3">November 2025</p>
                    <p className="text-sm text-muted-foreground">
                      Completed AWS Academy's Cloud Architecting coursework covering core AWS services, cloud solution design, and best practices for reliability, scalability, and cost optimization. Gained hands-on experience with VPC design, compute and storage services (EC2, Lambda, S3), IAM governance, load balancing, and cloud security fundamentals.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-2">CCNA: Enterprise Networking, Security, and Automation</h4>
                    <p className="text-sm text-muted-foreground mb-1">Cisco Networking Academy</p>
                    <p className="text-sm font-mono text-code mb-3">March 2025</p>
                    <p className="text-sm text-muted-foreground">
                      Designed enterprise-grade networks with IPv4/IPv6 routing. Built Python automation scripts improving deployment speed by 40%
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-2">CCNA: Switching, Routing, and Wireless Essentials</h4>
                    <p className="text-sm text-muted-foreground mb-1">Cisco Networking Academy</p>
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