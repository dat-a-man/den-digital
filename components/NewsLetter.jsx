"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLayout } from "@/lib/LayoutContext";
import { urlFor } from "@/lib/sanity";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

const NewsLetter = () => {
  const data = useLayout();
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      return toast({
        variant: "destructive",
        description: "Please enter a valid email address",
      });
    }
    setLoading(true);
    axios
      .post("/api/email", { email })
      .then((res) => {
        if (res.status === 200) {
          toast({
            variant: "success",
            description: res.data.message || "Subscribed successfully",
          });
        } else {
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        }
        setEmail("");
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="flex flex-col items-center justify-center text-center my-5">
      <Avatar>
        {data?.logoImage && <AvatarImage src={urlFor(data?.logoImage)?.url()} />}
      </Avatar>
      <div className="mt-7 w-full">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Data Engineering News
        </h3>
        <div className="flex items-center mt-2 relative max-w-[300px] mx-auto rounded-md">
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-2 text-sm border border-gray-200 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="w-fit p-2 text-sm bg-black text-white rounded-r-md flex items-center gap-2 absolute right-0"
            onClick={handleSubmit}
          >
            Subscribe
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
