import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function PageHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const internalClassName = "p-4 border-b";
  return <header className={cn(internalClassName, className)} {...props} />;
}

export function PageTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  const internalClassName =
    "scroll-m-20 text-xl font-bold tracking-tight lg:text-xl";
  return <h1 className={cn(internalClassName, className)} {...props} />;
}
