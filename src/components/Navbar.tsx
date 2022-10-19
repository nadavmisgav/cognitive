import Link from 'next/link';
import React from "react";

import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { useRouter } from 'next/router';

const Navbar: React.FC<{}> = () => {
    const { asPath } = useRouter()
    const isHomePage = asPath === "/"
    
    return (
        <nav className="text-gray-300 my-6 mx-auto text-2xl xl:text-3xl xl:w-[70%] ">
            <ul className="p-0 flex list-none justify-end">
                {!isHomePage && <li className="m-3 hover:text-gray-100 hover:underline hover:cursor-pointer ml-auto"><Link href="/">קוגניטיבי</Link></li>}
                <li className="m-3 hover:text-gray-100 hover:underline hover:cursor-pointer text-2xl xl:text-3xl">
                    <a target="_blank" href="https://github.com/nadavmisgav"><FaGithub /></a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;
