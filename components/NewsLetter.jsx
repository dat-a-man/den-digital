"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLayout } from "@/lib/LayoutContext";
import { urlFor } from "@/lib/sanity";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

const NewsLetter = () => {
  const { layoutData: data } = useLayout();
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  // const [loading, setLoading] = useState(false);
  // const handleSubmit = () => {
  //   setLoading(true);
  //   axios
  //     .post("/api/email", { email })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         toast({
  //           variant: "success",
  //           description: res.data.message || "Subscribed successfully",
  //         });
  //       } else {
  //         toast({
  //           variant: "destructive",
  //           description: "Something went wrong",
  //         });
  //       }
  //       setEmail("");
  //     })
  //     .finally(() => setLoading(false));
  // };
  return (
    <div className="flex flex-col items-center justify-center text-center mt-5">
      <Avatar>
        {data?.logoImage && (
          <AvatarImage src={urlFor(data?.logoImage)?.url()} />
        )}
      </Avatar>
      <div className="mt-3 w-full">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Data Engineering News
        </h3>
      </div>
      <div className="text-center mx-auto text-sm text-balance">
        <iframe
          src="https://embeds.beehiiv.com/0aa0e2b4-af04-4d2c-837f-c34e7e2440ed?slim=true"
          data-test-id="beehiiv-embed"
          // height="42"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "0px !important",
            backgroundColor: "transparent",
            padding: "0px",
            textAlign: "center",
          }}
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
};

export default NewsLetter;
