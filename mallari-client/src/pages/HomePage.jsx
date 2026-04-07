import Button from "../components/Button";
import Picture from "../assets/images/formal_pic.png";
import NUBDE from "../assets/images/nu_bde.png";
import CCITCONNECT from "../assets/images/ccit_connect.png";
import NUSTUDENT from "../assets/images/nu_student.png";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-800 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-3 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Hello, I'm Bherliane Mhae!
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-900 sm:text-base">
              A web designer turning ideas into visually engaging digital
              experiences.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Know Me More
              </Button>
            </div>
          </div>

          <div className="flex min-h-[260px] items-center justify-center ">
            <img src={Picture} alt="Picture" className="h-80 w-auto" />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            What are my works lately
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick overview works
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Projects
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">08</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Achievements
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">24</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Screens
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">04</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Layouts
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Feature Works
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            My Recent Creations
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem]">
              <img
                src={CCITCONNECT}
                alt="CCIT Connect"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              CCIT Connect
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A Facebook-inspired platform built exclusively for CCIT students
              to socialize, connect, and engage in a shared digital community.
            </p>
            <Button to={`/articles/ccit-connect-app`} className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem]">
              <img
                src={NUBDE}
                alt="NU Bulldogs Exchange App"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              NU Bulldogs Exchange App
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A convenient marketplace app for NU students to browse, purchase,
              and track orders in one place.
            </p>
            <Button to={`/articles/nu-bulldogs-exchange`} className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem]">
              <img
                src={NUSTUDENT}
                alt="NU Student App"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              NU Student Information
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A simple student profile app showcasing personal information for
              National University Philippines students.
            </p>
            <Button to={`/articles/nu-student-profile-app`} className="mt-4" variant="primary">
              View More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;