'use client';

import Image from 'next/image';
import { ConnectKitButton } from 'connectkit';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  return (
    <header className="fixed h-16 top-0 left-0 w-full flex justify-between items-center px-4 py-4 bg-[#e0e5ec] text-black dark:bg-[#1a202c] dark:text-white z-50">
      <div className="flex-1 flex items-center relative w-20 h-full">
        <a href="/">
          <Image src="/logo.png" alt="logo" width={60} height={20} className="max-h-full" />
        </a>
      </div>

      <nav className="flex items-center space-x-4 md:mb-0">
        <button className="dark:text-white text-black hover:text-white">Swap</button>
        <button className="dark:text-white text-black hover:text-white">Transaction</button>
        <button className="dark:text-white text-black hover:text-white">More</button>
      </nav>

      <div className="flex-1 flex justify-center md:justify-end space-x-4">
        <ThemeSwitcher />
        <ConnectKitButton />
      </div>
    </header>
  );
}