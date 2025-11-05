import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Contact = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="border-t border-border pt-6 mb-8">
          <h2 className="text-sm text-muted-foreground mb-1">Connection Settings</h2>
        </div>

        <h2 className="text-2xl font-bold mb-8">Get In Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-code mb-1">Email</p>
                <p className="text-base font-semibold">raj.kolala10@gmail.com</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-code mb-1">Location</p>
                <p className="text-base font-semibold">San Francisco, CA</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button size="lg" className="flex-1 md:flex-initial" asChild>
            <a href="mailto:raj.kolala10@gmail.com">
              <Mail className="w-4 h-4 mr-2" />
              Send Message
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_nav-header-signin" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
        </div>

        <Card className="p-6 border-border bg-muted">
          <p className="text-xs text-muted-foreground mb-2">Connection String:</p>
          <p className="font-mono text-sm text-code">
            ssh engineer@portfolio.network -i ~/.ssh/id_rsa
          </p>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
