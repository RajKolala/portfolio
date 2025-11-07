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
          <Card 
            className={`p-6 border-border bg-card cursor-pointer transition-all duration-300 hover:scale-105 ${
              expanded === 'education' ? 'md:col-span-3 md:scale-100' : expanded ? 'md:hidden' : ''
            }`}
            onClick={() => handleCardClick('education')}
          >
            <div className="p-3 bg-primary/10 rounded w-fit mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Education</h3>
            {expanded !== 'education' ? (
              <>
                <p className="text-base mb-1">B.S. Network Engineering</p>
                <p className="text-sm font-mono text-code">Minor: Business Administration</p>
              </>
            ) : (
              <div className="animate-fade-in space-y-4">
                <div>
                  <h4 className="text-base font-semibold mb-2">B.S. Network Engineering</h4>
                  <p className="text-sm text-muted-foreground mb-1">Minor: Business Administration</p>
                  <p className="text-sm font-mono text-code mb-3">2020 - 2024 | GPA: 3.8/4.0</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Focused on advanced networking protocols, cloud infrastructure, and enterprise network design. 
                    Completed capstone project on IPv6 implementation and multi-tier ISP infrastructure modeling.
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <h5 className="text-sm font-semibold mb-2">Key Coursework</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-sm text-muted-foreground">• Advanced Network Design</p>
                    <p className="text-sm text-muted-foreground">• Cloud Computing Architecture</p>
                    <p className="text-sm text-muted-foreground">• Network Security</p>
                    <p className="text-sm text-muted-foreground">• Data Communications</p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card 
            className={`p-6 border-border bg-card cursor-pointer transition-all duration-300 hover:scale-105 ${
              expanded === 'experience' ? 'md:col-span-3 md:scale-100' : expanded ? 'md:hidden' : ''
            }`}
            onClick={() => handleCardClick('experience')}
          >
            <div className="p-3 bg-primary/10 rounded w-fit mb-4">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Experience</h3>
            {expanded !== 'experience' ? (
              <>
                <p className="text-base mb-1">1+ Years in Field</p>
                <p className="text-sm font-mono text-code">Enterprise & Cloud</p>
              </>
            ) : (
              <div className="animate-fade-in space-y-4">
                <div>
                  <h4 className="text-base font-semibold mb-1">Network Engineer</h4>
                  <p className="text-sm text-muted-foreground mb-1">Tech Company | San Francisco, CA</p>
                  <p className="text-sm font-mono text-code mb-3">2023 - Present</p>
                  <ul className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <li>• Designed and implemented IPv6 connectivity solutions for enterprise clients</li>
                    <li>• Developed multi-tier ISP infrastructure prototypes and network architectures</li>
                    <li>• Optimized cloud network performance and reduced latency by 30%</li>
                    <li>• Collaborated with cross-functional teams on network security implementations</li>
                  </ul>
                </div>
                <div className="border-t border-border pt-4">
                  <h5 className="text-sm font-semibold mb-2">Technologies Used</h5>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">AWS</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Cisco</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">Python</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono">BGP</span>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card 
            className={`p-6 border-border bg-card cursor-pointer transition-all duration-300 hover:scale-105 ${
              expanded === 'certifications' ? 'md:col-span-3 md:scale-100' : expanded ? 'md:hidden' : ''
            }`}
            onClick={() => handleCardClick('certifications')}
          >
            <div className="p-3 bg-primary/10 rounded w-fit mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Certifications</h3>
            {expanded !== 'certifications' ? (
              <>
                <p className="text-base mb-1">AWS, CCNA, CompTIA</p>
                <p className="text-sm font-mono text-code">Multiple Specializations</p>
              </>
            ) : (
              <div className="animate-fade-in space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-base font-semibold mb-2">AWS Certified Solutions Architect</h4>
                    <p className="text-sm text-muted-foreground mb-1">Amazon Web Services</p>
                    <p className="text-sm font-mono text-code mb-3">Issued: 2023 | Valid until: 2026</p>
                    <p className="text-sm text-muted-foreground">
                      Demonstrates expertise in designing distributed systems on AWS
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-2">CCNA (Cisco Certified Network Associate)</h4>
                    <p className="text-sm text-muted-foreground mb-1">Cisco</p>
                    <p className="text-sm font-mono text-code mb-3">Issued: 2023 | Valid until: 2026</p>
                    <p className="text-sm text-muted-foreground">
                      Foundation in network fundamentals and Cisco technologies
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-2">CompTIA Network+</h4>
                    <p className="text-sm text-muted-foreground mb-1">CompTIA</p>
                    <p className="text-sm font-mono text-code mb-3">Issued: 2022 | Valid until: 2025</p>
                    <p className="text-sm text-muted-foreground">
                      Core networking concepts and troubleshooting skills
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-2">CompTIA Security+</h4>
                    <p className="text-sm text-muted-foreground mb-1">CompTIA</p>
                    <p className="text-sm font-mono text-code mb-3">Issued: 2022 | Valid until: 2025</p>
                    <p className="text-sm text-muted-foreground">
                      Network security and risk management fundamentals
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>;
};
export default About;