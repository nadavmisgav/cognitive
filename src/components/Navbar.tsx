import Link from 'next/link';
import React from "react";

const Navbar: React.FC<{}> = () => {
    return (
        <nav className="text-gray-300 m-6 xl:text-xl xl:ml-[12%] ">
            <ul className="p-0 flex list-none justify-end">
                <li className="m-3 hover:text-gray-100 hover:underline hover:cursor-pointer"><Link href="/">ראשי</Link></li>
                <li className="m-3 hover:text-gray-100 hover:underline hover:cursor-pointer">רשימת פוסטים</li>
                <li className="m-3 hover:text-gray-100 hover:underline hover:cursor-pointer">קטגוריות</li>
            </ul>
        </nav>
    )
}

export default Navbar;