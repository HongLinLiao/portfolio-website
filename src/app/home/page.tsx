import ArticleBoard from "@/components/article/ArticleBoard";
import My from "@/components/my";

export default function Home() {
  return (
    <>
      <My className="mt-20" />
      <ArticleBoard className="mt-5 md:mt-10" />
    </>
  );
}
