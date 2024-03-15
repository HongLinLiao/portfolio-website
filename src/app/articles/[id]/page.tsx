import MonthDate from "@/components/general/date/MonthDate";
import ShadowDom from "@/components/general/shadowDom";
import Avatar from "@/components/me/Avatar";
import My from "@/components/my";
import { getArticleData } from "@/utils/article";
import clsx from "clsx";
import Link from "next/link";

const Article = async ({ params: { id } }: { params: { id: string } }) => {
  const article = await getArticleData(id);

  return (
    <article>
      <h1
        className={clsx(
          "pt-8 pb-5 sm:py-8",
          "text-3xl sm:text-5xl  font-bold "
        )}
      >
        {article.title}
      </h1>
      <div className="pb-6 flex justify-between items-center sm:items-end">
        <div className={clsx("flex items-center gap-4 sm:gap-5")}>
          <div
            className={clsx(
              "w-10 h-10 sm:w-12 sm:h-12",
              "rounded-[50%] overflow-hidden"
            )}
          >
            <Avatar />
          </div>
          <div className={clsx("flex flex-col justify-around items-start")}>
            <Link href={"/home"} className={clsx("text-base sm:text-lg")}>
              Leo Liao | 廖鴻林
            </Link>
            <MonthDate
              className={clsx("text-sm text-gray-600 dark:text-gray-300/90")}
              date={article.date}
            />
          </div>
        </div>
        <My showTitle={false} />
      </div>

      <hr className="pb-6" />

      <ShadowDom innerHTML={article.contentHtml} />
    </article>
  );
};

export default Article;
