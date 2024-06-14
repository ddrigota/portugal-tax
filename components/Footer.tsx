import { Github, Linkedin, Send } from "lucide-react";

import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className="container flex h-12 w-full items-center justify-between text-sm">
      <p>Created by Dmitry Drigota</p>
      <div className="flex gap-1">
        <a href="https://github.com/ddrigota" target="_blank">
          <Button variant="ghost" size="icon">
            <Github className="h-[1.2rem] w-[1.2rem] transition-all" />
            <span className="sr-only">Github link</span>
          </Button>
        </a>
        <a href="https://www.linkedin.com/in/ddrigota/" target="_blank">
          <Button variant="ghost" size="icon">
            <Linkedin className="h-[1.2rem] w-[1.2rem] transition-all" />
            <span className="sr-only">Linkedin profile</span>
          </Button>
        </a>
        <a href="https://t.me/trkota" target="_blank">
          <Button variant="ghost" size="icon">
            <Send className="h-[1.2rem] w-[1.2rem] transition-all" />
            <span className="sr-only">Contact via Telegram</span>
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Footer;
