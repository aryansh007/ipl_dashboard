'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white dark:bg-gray-900 shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image
                src="https://www.shutterstock.com/shutterstock/photos/2308551109/display_1500/stock-vector-indian-premier-league-ipl-official-logo-editorial-use-only-bangalore-india-march-2308551109.jpg"
                alt="IPL Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-primary hidden md:inline-block">
              IPL Dashboard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" label="Matches" />
            <NavLink href="/points-table" label="Points Table" />
            <NavLink href="/schedule" label="Schedule" />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="/" label="Matches" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/points-table" label="Points Table" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/schedule" label="Schedule" onClick={() => setIsOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors"
    >
      {label}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ href, label, onClick }: MobileNavLinkProps) => {
  return (
    <Link
      href={href}
      className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium py-2 transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Header;