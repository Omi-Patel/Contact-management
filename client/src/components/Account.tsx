"use client";
import { LogOut, Moon, SunDim, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { currentUser, eraseCookie, getCookie } from "@/services/apiService";
import { useEffect, useState } from "react";

const Account = () => {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<{ username: string } | null>(null);

  const current = async () => {
    try {
      const res = await currentUser();
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    current();
  }, []);

  return (
    <>
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="border-2 border-blue-600">
              <AvatarImage />
              <AvatarFallback>
                {user?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                {theme == "light" ? (
                  <div
                    className="flex items-center w-full"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark Mode</span>
                  </div>
                ) : (
                  <div
                    className="flex items-center w-full"
                    onClick={() => setTheme("light")}
                  >
                    <SunDim className="mr-2 h-4 w-4" />
                    <span>Light Mode</span>
                  </div>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                eraseCookie("authToken"), window.location.reload();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Account;
