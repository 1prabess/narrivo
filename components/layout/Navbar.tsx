"use client";

import Link from "next/link";
import Container from "./Container";
import Notifications from "./Notifications";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";
import UserButton from "./UserButton";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  const path = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      const updateSession = async () => {
        await session.update();
      };

      updateSession();
    }
  }, [path]);

  return (
    <nav className="sticky top-0 border-b z-50 bg-white dark:bg-neutral-950 ">
      <Container>
        <div className="flex justify-between items-center gap-8">
          <div className="flex items-center gap-1 cursor-pointer">
            <h1 className="font-bold text-4xl">narrivo.</h1>
          </div>
          <SearchInput />
          <div className="flex gap-5 sm:gap-8 items-center">
            <ThemeToggle />
            {isLoggedIn && <Notifications />}
            {isLoggedIn && <UserButton />}
            {!isLoggedIn && (
              <>
                <Link href={"/login"}>Login</Link>
                <Link href={"/register"}>Register</Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
