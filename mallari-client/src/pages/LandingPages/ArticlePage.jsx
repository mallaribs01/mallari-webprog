import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import { fetchArticles } from "../../services/ArticleService";

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    try {
      const { data } = await fetchArticles();
      const selectedArticle = data.find(
        (item) => item._id === id && item.status === "published",
      );

      setArticle(selectedArticle);
    } catch (error) {
      console.error("Error loading article:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading article...</div>;
  }

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-900">
              Article not found
            </h1>

            <Button to="/articles" className="mt-6">
              ← Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {/* HERO */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4">
            <Button to="/articles">← Back to Articles</Button>
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            {article.category}
          </p>

          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-5xl">
            {article.title}
          </h1>

          <p className="mt-3 text-sm text-zinc-500">By {article.author}</p>
        </div>
      </section>

      {/* IMAGE + CONTENT */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* IMAGE */}
          {article.image && (
            <div className="mb-8 overflow-hidden rounded-[1.5rem] border-2 border-zinc-900">
              <img
                src={article.image}
                alt={article.title}
                className="h-[260px] w-full object-cover sm:h-[500px]"
              />
            </div>
          )}

          {/* CONTENT */}
          <div className="rounded-[1.5rem] border-2 border-zinc-900 bg-white p-6 sm:p-8">
            <p className="whitespace-pre-wrap text-base leading-8 text-zinc-700">
              {article.content}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
