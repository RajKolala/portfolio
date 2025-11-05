import { GraduationCap, Briefcase, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section className="border-b border-border">
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
          <Card className="p-6 border-border bg-card">
            <div className="p-3 bg-primary/10 rounded w-fit mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Education</h3>
            <p className="text-base mb-1">B.S. Network Engineering</p>
            <p className="text-sm font-mono text-code">Major: Network Engineering</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="p-3 bg-primary/10 rounded w-fit mb-4">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Experience</h3>
            <p className="text-base mb-1">5+ Years in Field</p>
            <p className="text-sm font-mono text-code">Enterprise & Cloud</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="p-3 bg-primary/10 rounded w-fit mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Certifications</h3>
            <p className="text-base mb-1">AWS, CCNA, CompTIA</p>
            <p className="text-sm font-mono text-code">Multiple Specializations</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
