'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';
import NetworkSwitcher from './NetworkSwitcher';
import CustomConnectButton from './CustomConnectButton';

export default function Header() {
  return (
    <header className="fixed h-16 top-0 left-0 w-full flex justify-between items-center bg-[#e0e5ec] text-black dark:bg-[#1a202c] dark:text-white z-50">
      <div className="flex-1 flex items-center relative w-20 h-full">
        <a href="/">
          <Image src="/logo.png" alt="logo" width={60} height={20} className="max-h-full" />
        </a>
      </div>

      <nav className="flex items-center space-x-4 md:mb-0">
        {/*Button Swap*/}
        <Link href="/swap">
          <button className="py-2 px-4 rounded-full bg-[#e0e5ec] text-black font-bold
                             shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]
                             dark:bg-[#1a202c] dark:text-white dark:shadow-[4px_4px_8px_#11161d,-4px_-4px_8px_#2b3341]">
            Swap
          </button>
        </Link>

        {/*Button Transaction*/}
        <Link href="/transaction">
          <button className="py-2 px-4 rounded-full bg-[#e0e5ec] text-black font-bold
                             shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]
                             dark:bg-[#1a202c] dark:text-white dark:shadow-[4px_4px_8px_#11161d,-4px_-4px_8px_#2b3341]">
            Transaction
          </button>
        </Link>

        {/*Button More*/}
        <Link href="/more">
          <button className="py-2 px-4 rounded-full bg-[#e0e5ec] text-black font-bold
                             shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]
                             dark:bg-[#1a202c] dark:text-white dark:shadow-[4px_4px_8px_#11161d,-4px_-4px_8px_#2b3341]">
            More
          </button>
        </Link>
      </nav>

      <div className="flex-1 flex justify-center md:justify-end space-x-4">
        <NetworkSwitcher />
        <ThemeSwitcher />
        <CustomConnectButton />
      </div>
    </header>
  );
}