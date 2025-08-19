'use client';

import Image from 'next/image';
import { ConnectKitButton } from 'connectkit';

export default function Header() {
  return (
    <header className="fixed h-16 top-0 left-0 w-full flex justify-between items-center px-4 py-4 bg-gray-900 text-white z-50">
      {/* logo*/}
      <div className="flex items-center relative w-20 h-full">
        <a href="/">
          <Image src="/logo.png" alt="logo" width={60} height={20} className="max-h-full" />
        </a>
      </div>

      <nav className="flex items-center space-x-4">
        <button className="text-gray-300 hover:text-white">Button 1</button>
        <button className="text-gray-300 hover:text-white">Button 2</button>
        <button className="text-gray-300 hover:text-white">Button 3</button>
      </nav>

      <div>
        <ConnectKitButton />
      </div>
    </header>
  );
}