import NavSide from "@/components/navigation/navside";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <NavSide className="fixed inset-y-0 left-0 hidden sm:flex" />
      <div className="flex grow sm:pl-14">{children}</div>
    </div>
  );
}
