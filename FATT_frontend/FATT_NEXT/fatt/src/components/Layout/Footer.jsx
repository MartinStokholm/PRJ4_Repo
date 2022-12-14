import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="top-[100vh] p-2 bg-white rounded-lg shadow mt-auto">
      <div className="flex items-center justify-center">
        <ul className="flex flex-wrap m-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          <li>
            <Link href="/about" className="mr-4 hover:underline md:mr-6 ">
              About
            </Link>
          </li>
          <li>
            <Link href="/profile" className="mr-4 hover:underline md:mr-6">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/settings" className="mr-4 hover:underline md:mr-6">
              Settings
            </Link>
          </li>
          <li>
            <Link href="/login" className="mr-4 hover:underline md:mr-6 ">
              Log-in
            </Link>
          </li>
        </ul>
      </div>
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022 All Rights Reserved.
      </span>
    </div>
  );
};

export default Footer;
