import { useLayout } from "@/lib/LayoutContext";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { layoutData: data } = useLayout();
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-[#383d42] text-white border-gray-200 dark:bg-gray-900 border-b">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4 max-w-5xl md:px-20 lg:px-32">
        {!data ? (
          <div>
            <Skeleton height={50} width={50} circle />
            <Skeleton height={50} width={50} circle />
          </div>
        ) : (
          <Link
            href="/"
            className="font-semibold text-xl flex items-center gap-3"
          >
            {data?.logoImage && (
              <Image
                src={urlFor(data?.logoImage)?.url()}
                width={40}
                height={40}
                alt="logo"
                loading="lazy"
              />
            )}
            <span className="flex">{data?.logoText}</span>
          </Link>
        )}

        <div>
          <ul className="flex items-center space-x-4 uppercase">
            <li className={`${isActive("/") ? "text-lg" : ""}`}>
              <Link href="/" className={`dark:text-white font-semibold `}>
                Home
              </Link>
            </li>
            <li className={`${isActive("/blog") ? "text-lg" : ""}`}>
              <Link href="/blog" className={`dark:text-white font-semibold `}>
                Blogs
              </Link>
            </li>
            <li className={`${isActive("/data-news") ? "text-lg" : ""}`}>
              <Link
                href="/data-news"
                className={`dark:text-white font-semibold `}
              >
                Data News
              </Link>
            </li>
            <li className={`${isActive("/about") ? "text-lg" : ""}`}>
              <Link href="/about" className={`dark:text-white font-semibold `}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
