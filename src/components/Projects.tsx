import { Code, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const projects = [{
  id: "i-001",
  status: "Active",
  title: "IPv6 Connectivity and Services Prototype",
  description: "Implementation of IPv6 network connectivity and services in a prototype environment",
  tags: ["IPv6", "Network Services", "Protocol"]
}, {
  id: "i-002",
  status: "Active",
  title: "LAN-to-Internet End-to-End Prototype",
  description: "Models a realistic multi-tiered ISP infrastructure connecting home, SMB, and cellular networks to a simulated data center through Tier 3, Tier 2, and Tier 1 ISPs",
  tags: ["ISP", "Multi-tier", "Network Architecture"]
}, {
  id: "i-003",
  status: "Completed",
  title: "LAN-to-ISP Prototype",
  description: "Advanced multi-segment LAN-to-ISP prototype integrating home, SMB, and mobile networks through DSL, cable, and fiber last-mile systems with full logical and physical topology design",
  tags: ["LAN", "ISP", "Last-Mile", "Topology"]
}];
const Projects = () => {
  return <section id="projects" className="border-b border-border">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">Featured Projects</h2>
            <p className="text-sm font-mono text-muted-foreground">
              Running Instances (4)
              <span className="ml-4 text-code">Region: us-east-1</span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {projects.map(project => <Card key={project.id} className="p-6 border-border bg-card">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-mono text-muted-foreground">
                      {project.id}
                    </span>
                    <Badge variant="outline" className={project.status === "Active" ? "bg-success/10 text-success border-success/30" : "bg-muted/10 text-muted-foreground border-muted/30"}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${project.status === "Active" ? "bg-success" : "bg-muted-foreground"}`}></span>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground font-mono text-xs">
                        {tag}
                      </Badge>)}
                  </div>
                </div>

                <div className="flex gap-2 lg:flex-col">
                  <Button size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Repo
                  </Button>
                </div>
              </div>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Projects;