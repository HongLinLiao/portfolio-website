import { getSortedArticle } from "@/utils/article";
import ArticleBoardItem from "../ArticleBoardItem";
import clsx from "clsx";

interface Props {
  className?: string;
}

const ArticleBoard = ({ className }: Props) => {
  const articles = getSortedArticle();

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {articles.map((article) => (
        <a
          key={article.id}
          href={`/articles/${article.id}`}
          target="_blank"
          className="h-[400px] cursor-pointer transition-all hover:scale-110"
        >
          <ArticleBoardItem className="" {...article} />
        </a>
      ))}
    </div>
  );
};

export default ArticleBoard;
