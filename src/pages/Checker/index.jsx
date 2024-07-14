import { IoArrowBackCircleOutline } from "react-icons/io5";
import Textfield, { MultiLineTextField } from "../../Component/Textfield";
import Button from "../../Component/Button";
import SelectCase from "../../Component/Select";
import { useState } from "react";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(updates);
  return null;
};

function BestCourse({ status, courses }) {
  return (
    <>
      {status === "okay" ? (
        <>
          <p>Courses with best chances of admission include the following:</p>
          <div className="mt-3">
            <div className="flex justify-between font-bold">
              <div>Course</div>
              <div>Chance of admission</div>
            </div>
            <div className="flex flex-col">
              {courses.map((course) => (
                <div className="flex justify-between">
                  <div>{course.name}</div>
                  <div className="mr-12">{course.chance}%</div>
                </div>
              ))}
            </div>
          </div>
          <p className="my-7 text-center">
            Consult your school of choice for more information!
          </p>
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
    </>
  );
}
export default function Checker({ modal, setModal, course, category }) {
  console.log(modal, course, category);
  const [chosenGrade, setChosenGrade] = useState(Array(10).fill(null));
  const [status, setStatus] = useState(null);
  const [inputCount, setInputCount] = useState(5);

  const bestCourseTemplate = [
    { name: "Agricultural Enginering", chance: 99 },
    { name: "Chemical Enginering", chance: 75 },
    { name: "Computer Engineering", chance: 60 },
    { name: "Mechanical Enginering", chance: 50 },
    { name: "Electrical Enginering", chance: 45 },
  ];

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
                  <BestCourse courses={bestCourseTemplate} status={status} />
                </div>
              </aside>
              <form
                className="sm:w-[55%]"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.scrollY = 0;
                  setStatus("okay");
                }}
              >
                {Array(inputCount)
                  .fill("")
                  .map((a, c) => (
                    <div className="flex justify-between w-full">
                      <Textfield label={"Subject"} className="w-3/4 mx-2" />
                      <SelectCase
                        index={c}
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
                    "Expeciting informations like passion for a course, hobbies e.t.c, Leave empty if you dont want to share.\nNot more than 200 words"
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
