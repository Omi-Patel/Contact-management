import { Button } from "@/components/ui/button";
import { Image } from "@nextui-org/react";
import {
  GithubIcon,
  Instagram,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const users = [
  {
    name: "Dhruv Patel",
    image: "https://avatars.githubusercontent.com/u/66352973?v=4",
    position: "System Engineer At TCS",
    instagram: "https://www.instagram.com/dhruv.p_t_l",
    linkedin: "https://linkedin.com/in/ompatel7113",
    github: "https://github.com/Patel47",
    twitter: "https://x.com/om_patel07",
  },
  {
    name: "Om Patel",
    image: "https://avatars.githubusercontent.com/u/122214228?v=4",
    position: "Full Stack Developer",
    instagram: "https://www.instagram.com/oh.me_07/",
    linkedin: "https://linkedin.com/in/ompatel7113",
    github: "https://github.com/Omi-Patel",
    twitter: "https://x.com/om_patel07",
  },
];

const page = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Map */}
        <div className="flex flex-col space-y-8 pb-10 pt-12 ">
          <div className="max-w-max rounded-full border bg-gray-50 dark:bg-zinc-700 p-1 px-3">
            <p className="text-xs font-semibold leading-normal md:text-sm">
              About Our Application
            </p>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-200 md:text-5xl md:leading-10">
            Made with love, right here in India
          </p>
          <p className="max-w-4xl text-base text-gray-600 dark:text-gray-400 md:text-xl">
            Our contact management application is designed to simplify how you
            store, manage, and access your contacts, ensuring you stay connected
            with everyone who matters to your business.
          </p>
        </div>
        <div className="w-full space-y-4">
          <Image
            isZoomed
            className="h-[200px] w-full rounded-xl object-cover md:h-full"
            src="https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/google-map.jpg"
            alt=""
          />
        </div>
        {/* locations */}

        <hr className="mt-20" />
        {/* greetings */}
        <div className="mt-16 flex items-center">
          <div className="space-y-6 md:w-3/4">
            <div className="max-w-max rounded-full border bg-gray-50 dark:bg-zinc-700 p-1 px-3">
              <p className="text-xs font-semibold leading-normal md:text-sm">
                Join Us &rarr;
              </p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-200 md:text-4xl">
              Meet our team
            </p>
            <p className="max-w-4xl text-base text-gray-700 dark:text-gray-400 md:text-xl">
              We believe in the power of collaboration and innovation. Our team
              is committed to delivering the best contact management experience.
            </p>
            <div></div>
          </div>
        </div>
        {/* TEAM */}
        <div className="grid grid-cols-1 gap-4 gap-y-6  py-12 pb-20 md:grid-cols-2 lg:grid-cols-4">
          {users.map((user) => (
            <div
              className="rounded-3xl bg-gray-200 dark:bg-zinc-800 w-[70%] sm:w-full flex flex-col "
              key={user.name}
            >
              <Image
                isZoomed
                src={user.image}
                alt={user.name}
                className="h-[280px]  w-full rounded-3xl object-cover p-2"
              />
              <p className="mt-2 w-full px-4 text-xl  font-semibold text-gray-900 dark:text-gray-300">
                {user.name}
              </p>
              <p className="w-full px-4 pb-4 text-sm font-semibold text-gray-500">
                {user.position}
              </p>
              <div className="w-full px-4 pb-4 text-sm flex gap-4   text-gray-500 dark:text-gray-400">
                <div className="hover:text-red-400">
                  <Link href={user.instagram}>
                    <Instagram />
                  </Link>
                </div>
                <div className="hover:text-blue-700">
                  <Link href={user.linkedin}>
                    <LinkedinIcon />
                  </Link>
                </div>
                <div className="hover:text-gray-500">
                  <Link href={user.github}>
                    <GithubIcon />
                  </Link>
                </div>
                <div className="hover:text-blue-400">
                  <Link href={user.twitter}>
                    <TwitterIcon />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr />
        {/* Hiring Banner */}
        <div className="flex flex-col items-center gap-x-4 gap-y-4 py-16 md:flex-row">
          <div className="space-y-6">
            <p className="text-sm font-semibold md:text-base">
              Join our team &rarr;
            </p>
            <p className="text-3xl font-bold md:text-4xl">
              Be Part of Our Journey
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 md:text-lg">
              We&apos;re constantly evolving and looking for talented
              individuals to help us grow. Join us and make an impact!
            </p>
            <Button type="button">Join Now</Button>
          </div>
          <div className="md:mt-o mt-10 w-full">
            <Image
              isZoomed
              src="https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              alt="Getting Started"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
