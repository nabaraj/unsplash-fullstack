"use client";

// import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { LinkItems } from "./components/link-items/LinkItems";

const vietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`${vietnam.className} antialiased pt-[74px]`}>
        <nav className='bg-white border-gray-200 dark:bg-gray-900 fixed top-0 w-full border-b-2 z-10'>
          <div className='container flex items-center justify-between mx-auto p-4'>
            <Link
              href='/'
              className='flex items-center space-x-3 rtl:space-x-reverse'
            >
              <Image
                src='/images/Logo.svg'
                className='h-8'
                alt='Unsplash Logo'
                width={118}
                height={24}
              />
            </Link>

            <div className='' id='navbar-default'>
              <ul className='font-medium flex flex-row rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                <li>
                  <LinkItems target='/' content='Home' />
                </li>
                <li>
                  <LinkItems target='/collections' content='Collections' />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
