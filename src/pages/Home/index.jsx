import DashBoardLayout from "../../Template";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <DashBoardLayout>
      <article>
        <p className="my-5 font-bold">Ease-access : </p>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
          <a
            href="https://www.coursera.org/campus?utm_content=corp-to-landing-for-campus&utm_campaign=website&utm_medium=coursera&utm_source=header&utm_term=b-in"
            target="_blank"
            rel="noreferrer"
          >
            <div className="bg-emerald-200 border rounded p-5 text-center">
              New introduced courses
            </div>
          </a>
          <a href="https://www.jamb.gov.ng/" target="_blank" rel="noreferrer">
            <div className="bg-pink-200 border rounded p-5 text-center">
              Jamb Updates
            </div>
          </a>
          <a
            href="https://www.waecnigeria.org/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="bg-yellow-100 border rounded p-5 text-center">
              Waec News
            </div>
          </a>
          <a href="https://www.nuc.edu.ng/" target="_blank" rel="noreferrer">
            <div className="bg-slate-300 border rounded p-5 text-center">
              View schools in Nigeria
            </div>
          </a>
          <a
            href="https://www.topuniversities.com/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="bg-cyan-300 border rounded p-5 text-center">
              View Shools abroad
            </div>
          </a>
          <Link to="/main">
            <div className="bg-red-300 border rounded p-5 text-center">
              App update
            </div>
          </Link>
        </section>
        <p className="text-center my-11 text-lg">
          Let's decide the best course for you...
        </p>
        <Link to="/main">
          <button className=" text-lg font-mono border block rounded px-16 py-7 mx-auto w-fit bg-green-400">
            GET STARTED!
          </button>
        </Link>
      </article>
    </DashBoardLayout>
  );
}
