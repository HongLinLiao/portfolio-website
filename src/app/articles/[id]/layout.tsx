import MainLayout from "@/components/layout/MainLayout";
import { getArticleData } from "@/utils/article";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  const { title } = await getArticleData(id);
  return {
    title,
  };
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <main>
      <MainLayout isMobileFullScreen={false}>{children}</MainLayout>
    </main>
  );
}
