'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Table, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <nav className="flex justify-around">
        <NavItem 
          href="/" 
          icon={<Home size={20} />} 
          label="Matches" 
          isActive={pathname === '/'}
        />
        <NavItem 
          href="/points-table" 
          icon={<Table size={20} />} 
          label="Points" 
          isActive={pathname === '/points-table'}
        />
        <NavItem 
          href="/schedule" 
          icon={<Calendar size={20} />} 
          label="Schedule" 
          isActive={pathname === '/schedule'}
        />
      </nav>
    </div>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ href, icon, label, isActive }: NavItemProps) => {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex flex-col items-center py-3 px-4 transition-colors",
        isActive 
          ? "text-primary" 
          : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
      )}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default MobileNav;