"use client";
import "../../index.css";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";

const navegation = [
  {
    title: "Home",
    url: "/#",
    items: [],
    ssr: true,
  },
  {
    title: "Categories",
    url: "/categories",
    ssr: true,
    items: [],
  },
  {
    title: "Services",
    url: "/services",
    items: [],
    ssr: true,
  },
  {
    title: "Marketplaces",
    url: "/marketplaces",
    items: [],
    ssr: true,
  },
  {
    title: "Blogs",
    url: "/blog",
    items: [],
    ssr: true,
  },
];

export default function ToolBar() {
  const pathname = usePathname();
  let pname = pathname === "/" ? "/#" : pathname;
  return (
    <div className="bg-white w-full max-w-lg md:w-fit flex flex-row">
      {navegation.map((e, i) => (
        <div key={i} className="text-gray-600 text-sm xxs:text-base sm:mx-4 h-full w-full md:hover:ring-2 p-1 ring-white rounded-full cursor-default md:cursor-pointer">
          {e.items.length === 0 && (
            <Link
              title={e.title}
              href={e.url}
            >
              <div
                className={
                  pname!.startsWith(e.url)
                    ? "text-orange-400 border-b-2 border-orange-500"
                    : "transition-all hover:text-orange-400 hover:border-b-2 hover:border-orange-500"
                }
              >
                {e.title}
              </div>
            </Link>
          )}
          {e.items.length > 0 && (
            <Menu>
              {({ open, close }) => (
                <>
                  <Menu.Button
                    className="focus:outline-none"
                    onMouseEnter={({ target }: any) =>
                      open ? "" : target.click?.()
                    }
                  >
                    <div className="cursor-pointer m-1 sm:mx-4 text-gray-600 text-sm xxs:text-base hover:text-orange-400">
                      {e.title}
                    </div>
                  </Menu.Button>
                  <Transition
                    className="z-50"
                    enter="transition duration-50 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-50 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Menu.Items
                      onMouseLeave={({ target }: any) => close()}
                      className="absolute top-10 right-7 mt-0 w-96 px-3 py-3  origin-top-right rounded bg-white shadow-lg ring-1 ring-gray-400 ring-opacity-25  focus:outline-none text-center text-gray-600 font-semibold"
                    >
                      {e.items.map((submenu: any, index) => (
                        <Menu.Item>
                          {({ active }) => (
                            <div key={index}>{submenu.title}</div>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          )}
        </div>
      ))}
    </div>
  );
}
