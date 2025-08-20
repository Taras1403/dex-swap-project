// src/app/components/Footer.tsx

import React from 'react';
import { FaTwitter, FaTelegram, FaDiscord, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full text-white py-6 mt-auto bg-[#e0e5ec] text-black dark:bg-[#1a202c] dark:text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 text-sm dark:text-white text-black text-center md:text-left mb-4 md:mb-0">
          © 2025. All rights reserved.
        </div>

        <div className="flex justify-center items-center space-x-6 mb-4 md:mb-0">
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
            <FaTwitter size={24} />
          </a>
          <a href="#" aria-label="Telegram" className="text-gray-400 hover:text-white transition-colors">
            <FaTelegram size={24} />
          </a>
          <a href="#" aria-label="Discord" className="text-gray-400 hover:text-white transition-colors">
            <FaDiscord size={24} />
          </a>
        </div>

        <div className="flex-1 flex justify-center md:justify-end">
          <a href="#" aria-label="Технічна підтримка" className="text-gray-400 hover:text-white transition-colors">
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}