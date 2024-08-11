"use client";
import { useLayout } from "@/lib/LayoutContext";
import { urlFor } from "@/lib/sanity";
import { Heart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const MobileNavbar = () => {
  const pathname = usePathname();
  const data = useLayout();
  const isActive = (href) => pathname === href;
  const [menuOpen, setMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-[#383d42] flex items-center justify-center text-white text-center h-14">
      <nav className="flex justify-between items-center w-[92%] mx-auto text-center">
        <div>
          <Link href="/" className="font-bold text-xl flex items-center gap-3">
            {/* {data?.logoImage && (
              <Image
                src={urlFor(data.logoImage).url()}
                width={40}
                height={40}
                alt="logo"
              />
            )} */}
            <span className="">{data?.logoText}</span>
          </Link>
        </div>
        <div
          className={`nav-links ease-out md:static absolute bg-[#383d42] md:min-h-fit min-h-[100vh] z-20 left-0 right-0 md:w-auto w-full flex items-center px-5`}
          style={{
            top: menuOpen ? "0%" : "-120%",
          }}
        >
          <div className="absolute top-4 right-4">
            <X
              size={24}
              onClick={onToggleMenu}
              name={menuOpen ? "close" : "menu"}
              className="text-3xl cursor-pointer md:hidden"
            />
          </div>
          <ul className="flex flex-col text-white w-full h-full gap-10 items-center space-x-4 uppercase text-center font-bold justify-center text-xl">
            <li className={`${isActive("/") ? "text-2xl" : "text-center"}`}>
              <Link href="/" onClick={onToggleMenu}>
                Home
              </Link>
            </li>
            <li className={`${isActive("/blog") ? "text-2xl" : "text-center"}`}>
              <Link href="/blog" onClick={onToggleMenu}>
                Blogs
              </Link>
            </li>
            <li
              className={`${isActive("/data-news") ? "text-2xl" : "text-center"}`}
            >
              <Link href="/data-news" onClick={onToggleMenu}>
                Data News
              </Link>
            </li>
            <li
              className={`${isActive("/about") ? "text-2xl" : "text-center"}`}
            >
              <Link href="/about" onClick={onToggleMenu}>
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <Menu
              size={24}
              onClick={onToggleMenu}
              name={menuOpen ? "close" : "menu"}
              className="text-3xl cursor-pointer md:hidden"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MobileNavbar;
