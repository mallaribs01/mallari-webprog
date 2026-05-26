import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { fetchArticles } from "../../services/articleService";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const { data } = await fetchArticles();

      const publishedArticles = data.filter(
        (article) => article.status === "published",
      );

      setArticles(publishedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* HERO */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Portfolios
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Collection of Published Portfolios
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Explore my recent works showcasing web design, user interface layouts,
          and responsive digital experiences.
        </p>

        <div className="mt-6">
          <Button to="/">← Back Home</Button>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {loading ? (
          <p className="text-zinc-500">Loading articles...</p>
        ) : articles.length === 0 ? (
          <p className="text-zinc-500">No published articles found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {articles.map((article) => (
              <article
                key={article._id}
                className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
              >
                <div className="aspect-4/3 overflow-hidden rounded-[1.25rem]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  {article.category}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                  {article.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600 line-clamp-3">
                  {article.content}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">
                    By {article.author}
                  </span>

                  <Button to={`/articles/${article._id}`}>Read More</Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ArticleListPage;