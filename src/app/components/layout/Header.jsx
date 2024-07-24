"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Navbar,
  Button,
  Input,
} from "../../../material-tailwind/page";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/notes/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="sticky top-0 mx-auto max-w-screen-3xl from-blue-gray-900 to-blue-gray-800 px-4 py-3 rounded-none z-50"
    >
      <div className="mx-auto max-w-screen-2xl flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Link
          href="/"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5"
        >
          Note App
        </Link>
        <div className="relative flex w-full gap-2 md:w-max">
          <form onSubmit={handleSearch} className="flex w-full gap-2">
            <Input
              type="search"
              color="white"
              label="Search here by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              type="submit"
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded"
            >
              Search
            </Button>
          </form>
        </div>
      </div>
    </Navbar>
  );
}
