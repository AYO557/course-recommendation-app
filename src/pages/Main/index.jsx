import { useState } from "react";
import DashBoardLayout from "../../Template";
import { courses as initialCoursesData } from "../../fileStorage/data";
import Checker from "../Checker";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

function getAllCourses() {
  let all = initialCoursesData.map((c) => {
    for (const category in c) {
      const courses = [];
      for (const course in c[category]) {
        courses.push({ name: course, isFavorited: false });
      }
      return { category: category, courses: courses };
    }
  });
  return all;
}

export default function Main({ children }) {
  const [allCourses, setAllCourses] = useState(getAllCourses());
  const [openCheckerModal, setOpenCheckerModal] = useState(false);
  const [course, setCourse] = useState(null);
  const [category, setCategory] = useState(null);

  function handleSelected(pick, from) {
    console.log(`pick ${pick} from ${from}`);
    setCourse(pick);
    setCategory(from);
    setOpenCheckerModal(true);
    console.log(openCheckerModal);
  }

  const toggleFavorite = (category, courseName) => {
    const updatedCourses = allCourses.map((c) => {
      if (c.category === category) {
        const updatedCourseList = c.courses.map((course) =>
          course.name === courseName
            ? { ...course, isFavorited: !course.isFavorited }
            : course
        );
        return { ...c, courses: updatedCourseList };
      }
      return c;
    });
    // Update the state with the new list
    setAllCourses(updatedCourses);
  };

  return (
    <>
      <DashBoardLayout>
        <article>
          <p className="p-2">
            Courses are categorized in relations, select the course you want or
            click on check best for us to choose from the category
          </p>
          <section className="">
            {allCourses.map((c) => (
              <div className="my-7" key={c.category}>
                <header className="my-3 font-bold text-lg md:text-xl p-3 bg-gray-100">
                  {c.category.replaceAll("_", " ")}
                </header>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-sm md:text-base">
                  {c.courses.map((course) => (
                    <div
                      className="course-container flex justify-between items-center hover:bg-green-100 p-2"
                      key={course.name}
                    >
                      <p
                        className="h-full w-full rounded cursor-pointer flex items-center"
                        onClick={() => handleSelected(course.name, c.category)}
                      >
                        {course.name.replaceAll("_", " ")}
                      </p>
                      <div
                        className="favorite-icon cursor-pointer"
                        onClick={() => toggleFavorite(c.category, course.name)}
                      >
                        {course.isFavorited ? (
                          <MdFavorite size={20} color="pink" />
                        ) : (
                          <MdFavoriteBorder />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center sm:justify-end">
                  <button
                    className="block l mt-5 mr-7 p-2 bg-green-500 rounded text-white"
                    onClick={() => handleSelected(c.category)}
                  >
                    Check best
                  </button>
                </div>
              </div>
            ))}
          </section>
        </article>
      </DashBoardLayout>
      <Checker
        modal={openCheckerModal}
        setModal={() => setOpenCheckerModal(!openCheckerModal)}
        course={course}
        category={category}
      />
      <style jsx>{`
        .favorite-icon {
          visibility: hidden;
        }
        .course-container:hover .favorite-icon {
          visibility: visible;
        }
      `}</style>
    </>
  );
}
