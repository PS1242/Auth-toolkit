export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-sky-100">
      <h1 className="font text-3xl text-gray-800 mb-8">Auth Toolkit</h1>
      {children}
    </div>
  );
}
