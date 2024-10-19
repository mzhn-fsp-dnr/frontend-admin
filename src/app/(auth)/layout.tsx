export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full flex-col">
      <div></div>
      <section className="flex grow flex-col items-center justify-center">
        {children}
      </section>
      <footer className="mt-auto w-full p-2 text-center text-sm opacity-30">
        © 2024 mzhn-team
      </footer>
      ;
    </div>
  );
}
