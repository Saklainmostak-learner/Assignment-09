import { Link } from "react-router";
import {  Mail, MapPin } from "lucide-react";
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto grid w-[calc(100%-2rem)] max-w-300 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2.5 text-white no-underline"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-sm font-extrabold">
              PG
            </span>
            <span className="text-xl font-extrabold tracking-[-0.7px]">
              PlayGrid
            </span>
          </Link>
          <p className="mx-w-xs text-sm leading-6 text-white/65">
            Discover and reserve quality sports facilities for your next game,
            practice or fitness session.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
            Explore
          </h2>
          <nav className="flex flex-col items-start gap-3">
            <Link
              to="/"
              className="text-sm text-white/65 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/facilities"
              className="text-sm text-white/65 transition hover:text-white"
            >
              All Facilities
            </Link>
            <Link
              to="/login"
              className="text-sm text-white/65 transition hover:text-white"
            >
              Login
            </Link>
          </nav>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
            Contact
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm text-white/65">
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
              <span>Dhaka, Bangladesh</span>
            </div>
            <a
              href="mailto:support@playgrid.app"
              className="flex items-center gap-3 text-sm text-white/65 transition hover:text-white"
            >
              <Mail size={18} className="shrink-0 text-accent" />
              <span>support@playgrid.app</span>
            </a>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
            Follow
          </h2>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit GitHub profile"
              className="grid size-10 place-items-center rounded-lg border border-white/15 text-white/70 transition hover:translate-y-1 hover:border-primary hover:text-white"
            >
              <FaGithub size={19} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Twitter profile"
              className="grid size-10 place-items-center rounded-lg border border-white/15 text-white/70 transition hover:translate-y-1 hover:border-primary hover:text-white"
            >
              <FaXTwitter size={19} />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Linkedin profile"
              className="grid size-10 place-items-center rounded-lg border border-white/15 text-white/70 transition hover:translate-y-1 hover:border-primary hover:text-white"
            >
              <FaLinkedinIn size={19} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
      <div className="mx-auto flex w-[calc(100%-2rem)] max-w-300 flex-col gap-2 py-5 text-white/50 sm:flex-row sm:items-center sm:justify-between sm:text-left">
      <p>© {year} PlayGrid. All rights reserved. </p>
      <p>Built for better games and active communities.</p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
