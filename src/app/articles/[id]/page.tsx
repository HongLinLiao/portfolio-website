import MonthDate from "@/components/general/date/MonthDate";
import ShadowDom from "@/components/general/shadowDom";
import { getArticleData } from "@/utils/article";

const Article = async ({ params: { id } }: { params: { id: string } }) => {
  const article = await getArticleData(id);

  return (
    <article>
      <h1>{article.title}</h1>
      <span>{article.summary}</span>
      <MonthDate dateString={article.date} />
      <ShadowDom innerHTML={article.contentHtml} />
    </article>
  );
};

export default Article;
