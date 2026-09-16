import { Github, Linkedin } from 'lucide-react';

function GmailIcon({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

// Fonte única dos contatos usados no Hero e no Footer
const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rafael-menezes-de-santana-344802234/',
    Icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/rafelms',
    Icon: Github,
  },
  {
    name: 'Gmail',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=menezesrafaelsantana@gmail.com&su=Contato%20via%20Portf%C3%B3lio&body=Ol%C3%A1%20Rafael,%0A%0AGostaria%20de%20conversar%20sobre...',
    Icon: GmailIcon,
  },
];

export function SocialLinks({ className, linkClassName }) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={name}
          title={name}
          className={linkClassName}
        >
          <Icon size={24} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
