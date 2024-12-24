import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface LinkItemsProps {
  // Add your props here
  target: string;
  content: string;
}

export const LinkItems: React.FC<LinkItemsProps> = ({ target, content }) => {
  // Add your component logic here
  const pathname = usePathname();
  return (
    <Link
      href={target}
      className={`block py-2 px-5 rounded-md ${
        pathname === target ? "bg-gray-100 text-[#121826]" : "text-[#6C727F]"
      }`}
      aria-current={pathname === target ? "page" : undefined}
    >
      {content}
    </Link>
  );
};
