"use client";
import Link from "next/link";
import {
  LuHome,
  LuTrendingUp,
  LuBookmark,
  LuTag,
  LuUsers,
  LuSettings,
  LuLogOut,
  LuPlus,
  LuMessageCircle,
  
  LuInfo
} from "react-icons/lu";
import { Avatar, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavLink from "./NavLink";

const sideLinks = [
  { name: "Home", icon: <LuHome />, href: "/" },
  { name: "Trending", icon: <LuTrendingUp />, href: "/trending" },
  { name: "Bookmarks", icon: <LuBookmark />, href: "/bookmarks" },
  { name: "Topics", icon: <LuTag />, href: "/topics" },
  { name: "Communities", icon: <LuUsers />, href: "/communities" },
  { name: "About", icon: <LuInfo />, href: "/about" },
];

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Simulating user fetch from a generic auth service
    const fetchUser = async () => {
      // Replace this with actual user fetching logic
      const mockUser = {
        name: "John Doe",
        email: "john@example.com",
        avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
      };
      setUser(mockUser);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      // Replace this with actual logout logic
      console.log("User logged out");
      router.push('/signin');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <aside className="pb-8 text-foreground h-screen fixed top-6 left-6 w-20 lg:w-80 flex flex-col transition-all duration-300">
      <div className="flex-1 flex flex-col overflow-y-auto space-y-4">
        <div className="bg-secondary shadow-lg rounded-2xl p-4 lg:p-6 flex flex-col items-center gap-6">
          <Link href="/profile" className="w-full">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <Avatar
                src={user?.avatarUrl || "https://i.pravatar.cc/150?u=a042581f4e29026024d"}
                size="lg"
                radius="full"
                isBordered
                color="warning"
              />
              <div className="hidden lg:block overflow-hidden">
                <div className="font-semibold text-lg text-warning truncate">{user?.name}</div>
                <div className="text-sm text-neutral-400 truncate">{user?.email}</div>
              </div>
            </div>
          </Link>
          <div className="flex gap-2 w-full">
            <Link href="/post/add" className="hidden grow p-3 rounded-xl bg-warning text-secondary lg:flex items-center justify-center gap-3">
              <LuPlus className="text-xl" />
              New Post
            </Link>
            <Link href="/chats" className="p-3 rounded-xl bg-warning text-secondary flex items-center justify-center gap-3 flex-grow lg:flex-grow-0">
              <LuMessageCircle className="text-xl" />
            </Link>
          </div>
        </div>

        <nav className="bg-secondary shadow-lg rounded-2xl flex-1 flex flex-col justify-start items-center gap-2 p-4">
          {sideLinks.map((item) => (
            <NavLink
              key={item.name}
              href={item.href}
              className="w-full p-3 flex items-center justify-center lg:justify-start gap-3 hover:bg-warning hover:text-primary rounded-xl transition-colors">
              <span className="text-xl">{item.icon}</span>
              <span className="hidden lg:inline">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="bg-secondary shadow-lg flex flex-col justify-center items-center rounded-2xl p-4">
          <Link
            href="/settings"
            className="w-full p-3 flex items-center justify-center lg:justify-start gap-3 hover:bg-warning hover:text-primary rounded-xl transition-colors">
            <LuSettings className="text-xl" />
            <span className="hidden lg:inline">Settings</span>
          </Link>
          <Button
            color="danger"
            variant="light"
            startContent={<LuLogOut className="text-xl" />}
            className="w-full p-3 justify-center lg:justify-start mt-2"
            onClick={handleLogout}
          >
            <span className="hidden lg:inline">Log Out</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;