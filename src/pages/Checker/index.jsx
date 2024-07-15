import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from "axios";
import Textfield, { MultiLineTextField } from "../../Component/Textfield";
import Button from "../../Component/Button";
import SelectCase from "../../Component/Select";

// # This (Checker) component renders the popup field that recommends courses to students.

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(updates);
  return null;
};

// # Recommended courses component.
function BestCourse({ status, courses, message }) {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 20;

  // Logic for displaying current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(courses.length / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className=" max-h-screen relative ">
      {status === "okay" ? (
        <>
          {message === null ? (
            <p>Courses with best chances of admission include the following:</p>
          ) : (
            <p>{message}</p>
          )}
          <ul className="list-disc ">
            {currentCourses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>

          <p className="my-7 text-center">
            Consult your school of choice for more information!
          </p>
          <div className="flex justify-center mt-4 absolute -bottom-9 md:-bottom-12 ">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 bg-gray-300 rounded"
            >
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-3 py-1 mx-1 ${
                  currentPage === number
                    ? "bg-pink-500 text-white"
                    : "bg-gray-300"
                } rounded`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
              className="px-3 py-1 mx-1 bg-gray-300 rounded"
            >
              Next
            </button>
          </div>
        </>
      ) : status === "bad" ? (
        <p>
          {" "}
          Sorry We couldn't find a course for you, Choose another course and try
          again
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

// # Checker component
export default function Checker({ modal, setModal, course, category }) {
  const [chosenGrade, setChosenGrade] = useState(Array(10).fill(null));
  const [subjects, setSubjects] = useState(Array(10).fill(""));
  const [status, setStatus] = useState(null);
  const [inputCount, setInputCount] = useState(5);
  const [bestCourses, setBestCourses] = useState([]);
  const [message, setMessage] = useState(null);

  // const bestCourseTemplate = [
  //   // { name: "Agricultural Enginering"},
  //   // { name: "Chemical Enginering"},
  //   // { name: "Computer Engineering"},
  //   // { name: "Mechanical Enginering"},
  //   // { name: "Electrical Enginering"},
  // ];

  const handleInputChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = value;
    setSubjects(updatedSubjects);
  };

  // On submit of the subjects inputted.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const grades = subjects.reduce((acc, subject, index) => {
      if (subject && chosenGrade[index]) {
        acc[subject] = chosenGrade[index];
      }
      return acc;
    }, {});

    const payload = {
      grades,
      preferred_course: course,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/submit-grades/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const gotCourse = response.data;
        setMessage(gotCourse.Message);
        setBestCourses(gotCourse["Suggested Courses"]);
        setStatus("okay");
        // Handle successful response
      } else {
        setStatus("bad");
        // Handle error response
      }
    } catch (error) {
      console.error("Error submitting grades:", error);
      setStatus("bad");
    }
  };

  return (
    <>
      {modal && (
        <div className="text-sm sm:text-base w-full min-h-screen relative bg-white z-50">
          <div className="container mt-0 sm:mt-11 mx-auto border rounded-t-3xl h-full p-7">
            <IoArrowBackCircleOutline
              className="text-4xl font-thin cursor-pointer"
              onClick={setModal}
            />
            <main className="p-2 mt-1 flex sm:justify-between sm:flex-row flex-col">
              <aside className="sm:w-[45%] py-3 px-5">
                <p>
                  {" "}
                  You selected {course} from the category {category}
                </p>
                <div className="mt-7">
                  <BestCourse
                    courses={bestCourses}
                    status={status}
                    message={message}
                  />
                </div>
              </aside>
              <form className="sm:w-[55%]" onSubmit={handleSubmit}>
                {Array(inputCount)
                  .fill("")
                  .map((_, index) => (
                    <div key={index} className="flex justify-between w-full">
                      <Textfield
                        label={"Subject"}
                        className="w-3/4 mx-2"
                        value={subjects[index] || ""}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                      <SelectCase
                        index={index}
                        className="w-1/4 mx-2"
                        chosenCase={chosenGrade}
                        setChosenCase={setChosenGrade}
                        label={"Grade:"}
                      />
                    </div>
                  ))}
                <MultiLineTextField
                  styles={"outline-none"}
                  label={"Additional Comment - Help our algorithm."}
                  desc={
                    "Expecting informations like passion for a course, hobbies e.t.c, Leave empty if you dont want to share.\nNot more than 200 words"
                  }
                />
                <div className="flex my-2">
                  <button
                    type="button"
                    onClick={() => {
                      setInputCount(inputCount + 1);
                    }}
                    className={`p-2 rounded bg-green-500 text-white ${
                      inputCount === 10 ? "hidden" : ""
                    }`}
                  >
                    Add more
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputCount(inputCount - 1);
                    }}
                    className={`p-2 rounded bg-red-400 text-white ml-auto  ${
                      inputCount === 5 ? "hidden" : ""
                    }`}
                  >
                    Minus one
                  </button>
                </div>
                <Button btnType="submit">Submit</Button>
              </form>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

const addMore = Array(5).fill("");
