import { fetchAbout, fetchLayout } from "@/lib";
import { urlFor } from "@/lib/sanity";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const metadata = {
  title: "About",
};
const AboutPage = async () => {
  const data = await fetchAbout();
  return (
    <div className="min-h-[60vh] md:min-h-[55vh] w-full mt-10">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 text-center md:text-left">
        <div className="w-60">
          {data?.profileImage && (
            <Image
              src={urlFor(data.profileImage)?.url()}
              width={600}
              height={600}
              alt="about"
              className="rounded-full object-cover"
            />
          )}
        </div>
        <div className="w-full h-full flex flex-col gap-3">
          <h3 className="text-3xl font-semibold">{data?.name}</h3>
          <p>{data?.bio}</p>
          <p>{data?.description}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
            <Link
              href="https://www.linkedin.com/in/aman-gupta-7b255622b/"
              target="_blank"
            >
              <Linkedin size={20} />
            </Link>
            <Link href="https://github.com/dat-a-man" target="_blank">
              <Github size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
