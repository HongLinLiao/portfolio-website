import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface Article {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
  summary: string;
  banner?: string;
}

const markdownFile = "article.md";
const articleFolderPath = path.join(process.cwd(), "public", "articles");

export async function getArticleData(id: string): Promise<Article> {
  const fullPath = path.join(articleFolderPath, id, markdownFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    summary: matterResult.data.summary,
    banner: matterResult.data.banner,
    contentHtml,
    ...matterResult.data,
  };
}

export function getSortedArticle(): Article[] {
  const folderList = fs.readdirSync(articleFolderPath);

  const articleList = folderList.map((id) => {
    const articlePath = path.join(articleFolderPath, id, markdownFile);
    const fileContent = fs.readFileSync(articlePath, "utf8");
    const matterResult = matter(fileContent);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      summary: matterResult.data.summary,
      banner: matterResult.data.banner,
    } as Article;
  });

  return articleList.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
