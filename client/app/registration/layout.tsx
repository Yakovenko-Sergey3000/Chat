export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"h-[100vh] bg-cover bg-[url('/assets/bg-auth-page.png')]"}>
      {children}
    </div>
  );
}
