import DashBoardLayout from "../../Template";
import { Link } from "react-router-dom";

export default function Home() {
  // const user = { firstname: "John", lastname: "Doe" };
  return (
    <DashBoardLayout>
      <article>
        {/* <h1 className="text-2xl font-bold font-sans">
          Welcome {user.firstname} {user.lastname}
        </h1> */}
        <p className="my-5 font-bold">Ease-access : </p>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
          <Link>
            <div className="bg-emerald-200 border rounded p-5 text-center">
              New introduced courses
            </div>
          </Link>
          <Link>
            <div className="bg-pink-200 border rounded p-5 text-center">
              Jamb Updates
            </div>
          </Link>
          <Link>
            <div className="bg-yellow-100 border rounded p-5 text-center">
              Waec News
            </div>
          </Link>
          <Link>
            <div className="bg-slate-300 border rounded p-5 text-center">
              View schools in Nigeria
            </div>
          </Link>
          <Link>
            <div className="bg-cyan-300 border rounded p-5 text-center">
              View Shools abroad
            </div>
          </Link>
          <Link>
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
