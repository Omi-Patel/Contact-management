import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image } from "@nextui-org/react";
import { Send } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Map */}
        <div className="flex flex-col space-y-8  pt-12">
          <div className="mx-auto max-w-max rounded-full border bg-gray-50 dark:bg-zinc-700 p-1 px-3">
            <p className="text-center text-xs font-semibold leading-normal md:text-sm">
              Share your thoughts
            </p>
          </div>
          <p className="text-center text-3xl font-bold text-gray-900 dark:text-gray-200 md:text-5xl md:leading-10">
            Love to hear from you 👋
          </p>
          <p className="mx-auto max-w-3xl text-center text-base text-gray-600 dark:text-gray-400 md:text-xl">
            We love hearing from our customers! Whether you have feedback,
            special requests, or simply want to say hello, don't hesitate to
            reach out to us. Your input helps us continually improve and
            innovate our services.
          </p>
        </div>
        <div className="mx-auto max-w-7xl py-12 md:py-24">
          <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
            {/* contact from */}
            <div className="flex items-center justify-center">
              <div className="px-2 md:px-12">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-200 md:text-4xl">
                  Get in touch
                </p>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Our friendly team would love to hear from you.
                </p>
                <form action="" className="mt-8 space-y-4">
                  <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-1">
                    <div className="grid w-full  items-center gap-1.5">
                      <Input type="text" id="name" placeholder="Name" />
                    </div>
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <Input type="text" id="email" placeholder="Email" />
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <Input
                      type="tel"
                      id="phone_number"
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <textarea
                      className="flex  w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-900"
                      id="message"
                      placeholder="Leave us a message"
                      cols={3}
                      rows={7}
                    />
                  </div>
                  <Button className="flex gap-1 justify-center items-center">
                    <Send size={16} />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
            <Image
              isZoomed
              alt="Contact us"
              className="hidden max-h-[80%] w-[80%] rounded-lg object-cover lg:block"
              src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=800&q=80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
