/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

import logo from "../../logo.svg";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
];

const Header = () => {
  const { openSignIn } = useClerk();

  return (
    <Popover>
      {({ open }) => (
        <>
          <div className="fixed top-0 left-0 w-full z-50">
            {true && (
              <SignedOut>
                <div className="bg-blue-500 text-xs md:text-sm px-4 flex items-center text-center justify-center py-4 text-white font-bold">
                  There was a minor change in authentication system. So if you
                  find that your account is invalid/missing during signin,
                  please signup again with the same email address. The old data
                  would still be present. <br /> (P.S. Incase it starts acting
                  weird please clear the cookies by click the lock icon in
                  address bar. Sorry for the inconvenience)
                </div>
              </SignedOut>
            )}
            <nav
              className="pt-6 px-4 sm:px-6 lg:px-8 relative flex items-center justify-between sm:h-10"
              aria-label="Global"
            >
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link to="/">
                    <span className="sr-only">Aura</span>
                    <img className="h-8 w-auto sm:h-10" src={logo} alt="Aura" />
                  </Link>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <SignedIn>
                <div className="hidden md:flex items-center md:ml-10 md:pr-4 md:space-x-8">
                  <Link
                    to="/"
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    Home
                  </Link>
                  <Link
                    to="/aura"
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    Aura
                  </Link>
                  <a
                    href="https://www.producthunt.com/posts/aura-b260f046-6bf7-439f-8cd7-8521db48ae46?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-aura-b260f046-6bf7-439f-8cd7-8521db48ae46"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=306462&theme=dark"
                      alt="Aura - See your mood in a whole new light | Product Hunt"
                    />
                  </a>
                  <div className="hidden md:block">
                    <UserButton />
                  </div>
                </div>
              </SignedIn>
              <SignedOut>
                <div className="hidden md:flex items-center md:ml-10 md:pr-4 md:space-x-8">
                  <a
                    href="https://www.producthunt.com/posts/aura-b260f046-6bf7-439f-8cd7-8521db48ae46?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-aura-b260f046-6bf7-439f-8cd7-8521db48ae46"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=306462&theme=dark"
                      alt="Aura - See your mood in a whole new light | Product Hunt"
                    />
                  </a>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="font-medium text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                  <span
                    onClick={() => openSignIn()}
                    className="font-medium text-blue-600 hover:text-blue-500 px-6 py-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50"
                  >
                    Log in
                  </span>
                </div>
              </SignedOut>
            </nav>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img className="h-8 w-auto" src={logo} alt="Aura" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <SignedOut>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <a
                    href="https://www.producthunt.com/posts/aura-b260f046-6bf7-439f-8cd7-8521db48ae46?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-aura-b260f046-6bf7-439f-8cd7-8521db48ae46"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=306462&theme=dark"
                      alt="Aura - See your mood in a whole new light | Product Hunt"
                      className="ml-4 mb-4"
                    />
                  </a>
                  <span
                    onClick={() => openSignIn()}
                    className="block w-full px-5 py-3 text-center font-medium text-blue-500 bg-gray-50 hover:bg-gray-100"
                  >
                    Log in
                  </span>
                </SignedOut>
                <SignedIn>
                  <div className="flex flex-col md:ml-10 md:pr-4 md:space-x-8 p-4">
                    <Link
                      to="/"
                      className="font-medium text-gray-500 hover:text-gray-900 mb-4"
                    >
                      Home
                    </Link>
                    <Link
                      to="/aura"
                      className="font-medium text-gray-500 hover:text-gray-900 mb-4"
                    >
                      Aura
                    </Link>
                    <UserButton />
                    <a
                      href="https://www.producthunt.com/posts/aura-b260f046-6bf7-439f-8cd7-8521db48ae46?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-aura-b260f046-6bf7-439f-8cd7-8521db48ae46"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=306462&theme=dark"
                        alt="Aura - See your mood in a whole new light | Product Hunt"
                        className="my-4"
                      />
                    </a>
                  </div>
                </SignedIn>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Header;
