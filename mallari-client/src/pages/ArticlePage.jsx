import Button from "../components/Button";
import NUBDE from "../assets/images/nu_bde.png";
import NUSTUDENT from "../assets/images/nu_student.png";
import CCITCONNECT from "../assets/images/ccit_connect.png";
import GRADECHECKER from "../assets/images/grade_checker.png";

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Portfolio
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          A collection of my featured projects and designs
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Explore my recent works showcasing web design, user interface layouts,
          and responsive digital experiences.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Projects
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Project showcase
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="aspect-4/3 overflow-hidden rounded-[1.25rem]">
              <img
                src={CCITCONNECT}
                alt="Project"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Project 01
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              CCIT Connect App
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A Facebook-inspired platform designed for CCIT students to
              connect, socialize, and engage online.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="aspect-4/3 overflow-hidden rounded-[1.25rem]">
              <img
                src={NUBDE}
                alt="Project"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Project 02
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              NU Bulldogs Exchange
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A marketplace app where students can browse products, add items to
              cart, and track their orders.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="aspect-4/3 overflow-hidden rounded-[1.25rem]">
              <img
                src={NUSTUDENT}
                alt="Project"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Project 03
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              NU Student Profile App
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A clean and simple app displaying student information in a
              structured and user-friendly interface.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="aspect-4/3 overflow-hidden rounded-[1.25rem]">
              <img
                src={GRADECHECKER}
                alt="Project"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Project 04
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              NU Grade Checker App
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A user-friendly app that allows students to easily view and track
              their academic grades in one place.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;