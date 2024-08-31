import { Button } from "@nextui-org/react";
import { Eye, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" ">
      <div className="relative w-full bg-white dark:bg-zinc-900 rounded-lg">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col justify-center px-4 py-10 lg:px-6">
            {/*  */}
            <div className="mt-10 flex max-w-max items-center space-x-2 rounded-full border p-2">
              <p className="text-xs font-medium md:text-sm">
                Stay organized and keep track of all your important contacts.
                <span className="ml-2 cursor-pointer font-bold">
                  Read More &rarr;
                </span>
              </p>
            </div>
            <h1 className="mt-8 max-w-4xl text-3xl font-bold tracking-tight text-black dark:text-white md:text-4xl lg:text-6xl">
              Manage Your Contacts Efficiently.
            </h1>
            <p className="mt-8 max-w-3xl text-lg text-gray-700 dark:text-gray-400">
              Our contact management application helps you store, organize, and
              access all your contacts in one place, making it easier to stay
              connected and manage relationships.
            </p>
            <div className="mt-8">
              <Button
                color={"primary"}
                type="button"
                className="rounded-lg   py-2.5 text-sm font-semibold  shadow-sm px-0"
              >
                <Link
                  href={"/dashboard"}
                  className=" flex gap-1 items-center justify-center p-2 px-3 "
                >
                  <span>
                    <PlusCircle />
                  </span>
                  <span className="">Add New Contact</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg bg-gray-200 dark:bg-gray-800 p-4">
            <img
              className="aspect-[3/2] w-full rounded-lg bg-gray-50 object-cover lg:aspect-auto lg:h-[400px]"
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc1fHx0ZWFtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              alt=""
            />
          </div>

          {/* SECOND HALF */}
          <div className="relative isolate z-0 bg-white dark:bg-zinc-900 px-6 pt-12 lg:px-8">
            <div className=" mx-auto max-w-2xl py-24">
              <div className="absolute inset-x-0 -top-[4rem] -z-10 transform-gpu overflow-hidden blur-3xl md:-top-[10rem]">
                <svg
                  className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
                  viewBox="0 0 1155 678"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                    fillOpacity=".3"
                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                    <linearGradient
                      id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                      x1="1155.49"
                      x2="-78.208"
                      y1=".177"
                      y2="474.645"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9089FC" />
                      <stop offset={1} stopColor="#FF80B5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                  Your Contacts, All in One Place.
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                  Easily manage, search, and organize your contacts. Never lose
                  touch with important people in your network again.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-2">
                  <Button
                    color="primary"
                    type="button"
                    className="rounded-lg  px-0 py-2 text-sm font-semibold "
                  >
                    <Link
                      href={"/dashboard"}
                      className=" flex gap-1 items-center justify-center  p-2 px-3"
                    >
                      <Eye />
                      <span className="">View Contacts</span>
                    </Link>
                  </Button>
                  <Button
                    variant="bordered"
                    className="rounded-lg  px-0 py-2 text-sm font-semibold text-black   dark:text-white "
                  >
                    <Link
                      href={"/dashboard"}
                      className=" flex gap-1 items-center justify-center  p-2 px-3"
                    >
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
