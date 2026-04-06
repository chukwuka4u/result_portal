"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps {
  href: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  children?: React.ReactNode;
  prefetch?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ href, className, activeClassName, pendingClassName, children, prefetch = true, ...props }, ref) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = pathname === href;
    
    // Next.js does not expose pending state like React Router,
    // but you can simulate a lightweight pending indicator if needed.
    const isPending = false;

    return (
      <Link
        ref={ref}
        href={href}
        prefetch={prefetch}
        className={cn(
          className,
          isActive && activeClassName,
          isPending && pendingClassName
        )}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
