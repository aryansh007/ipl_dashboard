import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">IPL Dashboard</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get real-time IPL match information, points table, and full schedule in one place.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="#" icon={<Facebook size={18} />} label="Facebook" />
              <SocialLink href="#" icon={<Instagram size={18} />} label="Instagram" />
              <SocialLink href="#" icon={<Youtube size={18} />} label="YouTube" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/points-table" label="Points Table" />
              <FooterLink href="/schedule" label="Schedule" />
              <FooterLink href="#" label="Teams" />
              <FooterLink href="#" label="Players" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink href="#" label="Terms of Service" />
              <FooterLink href="#" label="Privacy Policy" />
              <FooterLink href="#" label="Cookie Policy" />
              <FooterLink href="#" label="Disclaimer" />
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} IPL Dashboard. All rights reserved.</p>
          <p className="mt-2">This is a demo project and is not affiliated with the official IPL or BCCI.</p>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
  return (
    <a 
      href={href} 
      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink = ({ href, label }: FooterLinkProps) => {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
      >
        {label}
      </Link>
    </li>
  );
};

export default Footer;