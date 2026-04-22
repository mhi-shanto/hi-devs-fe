import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="min-h-[calc(100vh-3.5rem)] min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
