import { Network, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Hero = () => {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="border border-border rounded bg-card p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded">
              <Network className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Raj Kolala</h1>
              <p className="text-xl text-muted-foreground mb-3">
                Networking Engineer & Minor in Business Administration
              </p>
              <p className="text-sm font-mono text-primary">
                Instance ID: portfolio-prod-001
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4 border-border bg-card">
              <p className="text-xs text-muted-foreground mb-2">Status</p>
              <p className="text-lg font-semibold text-success">Active</p>
            </Card>
            <Card className="p-4 border-border bg-card">
              <p className="text-xs text-muted-foreground mb-2">Instance Type</p>
              <p className="text-lg font-semibold font-mono">t3.micro (x86)</p>
            </Card>
            <Card className="p-4 border-border bg-card">
              <p className="text-xs text-muted-foreground mb-2">Availability Zone</p>
              <p className="text-lg font-semibold">Bay Area, CA</p>
            </Card>
          </div>

          <p className="text-base text-foreground mb-6 leading-relaxed">
            Specialized in network architecture, cloud infrastructure, and systems optimization. 
            Building scalable, secure, and high-performance network solutions.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button 
              size="lg"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              View Projects
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="outline" size="lg">
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
