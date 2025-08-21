"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Pencil, Bookmark, User, Settings, LogOut } from "lucide-react";

const UserButton = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex focus:outline-none">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/path/to/avatar.jpg" alt="User avatar" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 bg-white dark:bg-neutral-950 shadow-md rounded-md p-2">
        <DropdownMenuItem>
          <button className="flex items-center gap-2 w-full text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2">
            <User size={18} /> Profile
          </button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <button className="flex items-center gap-2 w-full text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2">
            <Pencil size={18} /> Create Post
          </button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <button className="flex items-center gap-2 w-full text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2">
            <Bookmark size={18} /> Bookmark
          </button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <button className="flex items-center gap-2 w-full text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2">
            <Settings size={18} /> Admin
          </button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <button className="flex items-center gap-2 w-full text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2">
            <LogOut size={18} /> Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
