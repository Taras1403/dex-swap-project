'use client';

import Image from 'next/image';
import { ConnectKitButton } from 'connectkit';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-4 py-4 bg-gray-900 text-white z-50">
      {/* Логотип зліва */}
      <div className="flex items-center">
        <a href="/">
          <Image src="/ваш-шлях-до-лого.svg" alt="Логотип" width={100} height={50} />
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