"use client";

import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

const Notifications = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
          <div className="absolute bg-rose-500 h-5 w-5 rounded-full text-white text-xs flex items-center justify-center top-0 right-0 tranneutral-x-1/2 -tranneutral-y-1/2">
            5
          </div>
          <Bell size={20} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 bg-white dark:bg-neutral-950 shadow-md rounded-md p-2">
        {/* <div className="flex justify-between items-center mb-2">
          <button className="text-sm text-blue-500 hover:underline">
            Mark all as read
          </button>
        </div> */}

        <DropdownMenuItem>
          <div className="flex items-center gap-2 w-full text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2">
            New comment on your post
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <div className="flex items-center gap-2 w-full text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2">
            New follower
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <div className="flex items-center gap-2 w-full text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2">
            Your subscription is ending soon
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
