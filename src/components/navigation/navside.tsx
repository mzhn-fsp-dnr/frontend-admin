"use client";

import { cn } from "@/lib/utils";
import { Fish, Home, LogOut, LucideIcon } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export interface NavSideProps extends HTMLAttributes<HTMLDivElement> {}

interface NavSideItemProps extends LinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

export default function NavSide({ className, ...props }: NavSideProps) {
  const pathname = usePathname();
  const internalClassName = "z-10 flex w-14 flex-col border-r bg-background";

  return (
    <aside className={cn(internalClassName, className)} {...props}>
      <nav className="flex h-full flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Fish className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Dolphin</span>
        </Link>

        <NavSideItem
          href="/"
          label="Главная"
          icon={Home}
          active={pathname == "/"}
        />

        <div className="mt-auto">
          <NavSideItem
            href="/signout"
            prefetch={false}
            label="Выход"
            icon={LogOut}
          />
        </div>
      </nav>
    </aside>
  );
}

function NavSideItem({
  href,
  label,
  active,
  icon: Icon,
  ...props
}: NavSideItemProps) {
  const baseClassName =
    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";
  const activeClassName = "bg-accent text-accent-foreground";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(baseClassName, active ? activeClassName : null)}
          {...props}
        >
          <Icon className="h-5 w-5" />
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
