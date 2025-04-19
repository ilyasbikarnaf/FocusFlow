import Navigation from "@/Components/Navigation";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen ">
      <Navigation />
      <main className="min-h-screen pl-16 pt-0 md:pl-64">
        <div className="mx-auto max-w-6xl p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
