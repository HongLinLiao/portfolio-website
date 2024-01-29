import MainLayout from "@/components/layout/MainLayout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <MainLayout isMobileFullScreen={false}>{children}</MainLayout>
    </main>
  );
}
