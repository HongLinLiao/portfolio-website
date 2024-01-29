import MonthDate from "@/components/general/date/MonthDate";
import { getArticleData } from "@/utils/article";
import Head from "next/head";

const Article = async ({ params: { id } }: { params: { id: string } }) => {
  const article = await getArticleData(id);

  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <article>
        <h1>{article.title}</h1>
        <span>{article.summary}</span>
        <MonthDate dateString={article.date} />
        <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
      </article>
    </>
  );
};

export default Article;
