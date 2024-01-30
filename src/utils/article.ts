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
}

const articlePath = path.join(process.cwd(), "public", "articles");

export async function getArticleData(id: string): Promise<Article> {
  const fullPath = path.join(articlePath, `${id}.md`);
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
    contentHtml,
    ...matterResult.data,
  };
}

export function getSortedArticle(): Article[] {
  const fileNames = fs.readdirSync(articlePath);
  const allArticleData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(articlePath, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      summary: matterResult.data.summary,
    } as Article;
  });
  return allArticleData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
