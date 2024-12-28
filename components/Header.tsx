// "use client";
// import { useUser } from "@auth0/nextjs-auth0/client";
// import {
//   Bookmark,
//   Heart,
//   LayoutDashboard,
//   LogIn,
//   LogOut,
//   UserPlus,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// function Header() {
//   const { user, isLoading } = useUser();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "light";
//     setTheme(savedTheme);
//     document.documentElement.setAttribute("data-theme", savedTheme);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);
//   };

//   const menu = [
//     {
//       name: "Browse",
//       link: "/",
//       icon: <LayoutDashboard size={20} />,
//     },
//     {
//       name: "Favorites",
//       link: "/favourites",
//       icon: <Heart size={22} />,
//     },
//     {
//       name: "Saved",
//       link: "/bookmarks",
//       icon: <Bookmark size={22} />,
//     },
//   ];

//   if (isLoading) return null;

//   return (
//     <header
//       className="min-h-[10vh] px-6 md:px-16 py-6 w-full bg-gradient-to-r from-blue-500 to-blue-700 dark:from-gray-800 dark:to-gray-900 text-white flex justify-between items-center shadow-md transition-all duration-300 ease-in-out"
//     >
//       <Link href="/">
//         <Image
//           src={"/pokemon--logo.png"}
//           width={120}
//           height={90}
//           alt="logo"
//           className="hover:scale-105 transition-transform duration-300"
//         />
//       </Link>

//       <nav>
//         <ul className="hidden md:flex items-center gap-8 text-gray-200">
//           {menu.map((item, index) => (
//             <li key={index}>
//               <Link
//                 href={item.link}
//                 className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
//                         ${
//                           pathname === item.link
//                             ? "bg-white text-blue-700 dark:bg-yellow-500 dark:text-gray-800 shadow-md"
//                             : "hover:bg-blue-600 dark:hover:bg-gray-700"
//                         }
//                         transition-all duration-300 ease-in-out`}
//               >
//                 <span>{item.icon}</span>
//                 <span>{item.name}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <div className="flex items-center gap-4">
//         <button
//           onClick={toggleTheme}
//           className="py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
//           bg-yellow-500 dark:bg-yellow-400 text-gray-800 dark:text-gray-900 hover:bg-yellow-400 dark:hover:bg-yellow-300 transition-all duration-300 ease-in-out shadow-md"
//         >
//           Toggle {theme === "light" ? "Dark" : "Light"} Mode
//         </button>

//         {user?.sub && !isLoading && (
//           <DropdownMenu modal={false}>
//             <DropdownMenuTrigger className="outline-none border-none">
//               <div className="bg-white/10 dark:bg-gray-700/10 flex items-center justify-center gap-2 rounded-lg cursor-pointer p-2 hover:shadow-lg transition-all duration-300">
//                 <span className="pl-2 text-white dark:text-gray-300 text-sm font-bold">
//                   {user?.name || "User"}
//                 </span>
//                 <Image
//                   src={user?.picture || ""}
//                   width={40}
//                   height={40}
//                   alt="avatar"
//                   className="rounded-full shadow-md hover:scale-110 transition-transform duration-300"
//                 />
//               </div>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-[180px] bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />

//               <DropdownMenuItem
//                 className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-all duration-300"
//                 onClick={() => router.push("/api/auth/logout")}
//               >
//                 <LogOut />
//                 Logout
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         )}

//         {!user?.sub && !isLoading && (
//           <>
//             <Link
//               href="/api/auth/login"
//               className="py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
//               bg-white/10 dark:bg-gray-700/10 text-white dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out shadow-md"
//             >
//               <LogIn size={20} />
//               Login
//             </Link>
//             <Link
//               href="/api/auth/login"
//               className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
//                 bg-yellow-500 dark:bg-yellow-400 text-gray-800 dark:text-gray-900 hover:bg-yellow-400 dark:hover:bg-yellow-300 transition-all duration-300 ease-in-out shadow-md
//               `}
//             >
//               <UserPlus size={20} />
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Header;


"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Bookmark,
  Heart,
  LayoutDashboard,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const menu = [
    {
      name: "Browse",
      link: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Favorites",
      link: "/favourites",
      icon: <Heart size={22} />,
    },
    {
      name: "Saved",
      link: "/bookmarks",
      icon: <Bookmark size={22} />,
    },
  ];

  if (isLoading) return null;

  return (
    <header
      className="min-h-[10vh] px-6 md:px-16 py-6 w-full bg-gradient-to-r from-blue-500 to-blue-700 dark:from-gray-800 dark:to-gray-900 text-white flex justify-between items-center shadow-md transition-all duration-300 ease-in-out"
    >
      <Link href="/">
        <Image
          src={"/pokemon--logo.png"}
          width={120}
          height={90}
          alt="logo"
          className="hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <nav>
        <ul className="hidden md:flex items-center gap-8 text-gray-200">
          {menu.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
                        ${
                          pathname === item.link
                            ? "bg-white text-blue-700 dark:bg-yellow-500 dark:text-gray-800 shadow-md"
                            : "hover:bg-blue-600 dark:hover:bg-gray-700"
                        }
                        transition-all duration-300 ease-in-out`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        {/* Social Media Icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-pink-500 hover:bg-pink-600 transition-all duration-300"
          >
            <Image
              src="/icons8-instagram-logo-94.png"
              width={20}
              height={20}
              alt="Instagram"
              className="w-5 h-5"
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-all duration-300"
          >
            <Image
              src="/icons8-facebook-messenger-64.png"
              width={20}
              height={20}
              alt="Facebook"
              className="w-5 h-5"
            />
          </a>
          <a
            href="https://snapchat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-all duration-300"
          >
            <Image
              src="/R.png"
              width={20}
              height={20}
              alt="Snapchat"
              className="w-5 h-5"
            />
          </a>
        </div>

        <button
          onClick={toggleTheme}
          className="py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
          bg-yellow-500 dark:bg-yellow-400 text-gray-800 dark:text-gray-900 hover:bg-yellow-400 dark:hover:bg-yellow-300 transition-all duration-300 ease-in-out shadow-md"
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>

        {user?.sub && !isLoading && (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none border-none">
              <div className="bg-white/10 dark:bg-gray-700/10 flex items-center justify-center gap-2 rounded-lg cursor-pointer p-2 hover:shadow-lg transition-all duration-300">
                <span className="pl-2 text-white dark:text-gray-300 text-sm font-bold">
                  {user?.name || "User"}
                </span>
                <Image
                  src={user?.picture || ""}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="rounded-full shadow-md hover:scale-110 transition-transform duration-300"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px] bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-all duration-300"
                onClick={() => router.push("/api/auth/logout")}
              >
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {!user?.sub && !isLoading && (
          <>
            <Link
              href="/api/auth/login"
              className="py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
              bg-white/10 dark:bg-gray-700/10 text-white dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out shadow-md"
            >
              <LogIn size={20} />
              Login
            </Link>
            <Link
              href="/api/auth/login"
              className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
                bg-yellow-500 dark:bg-yellow-400 text-gray-800 dark:text-gray-900 hover:bg-yellow-400 dark:hover:bg-yellow-300 transition-all duration-300 ease-in-out shadow-md
              `}
            >
              <UserPlus size={20} />
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
