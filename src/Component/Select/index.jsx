import { useState } from "react";
import { BiDownArrow } from "react-icons/bi";

export default function SelectCase({
  index,
  cases = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"],
  title = "Choose",
  label,
  chosenCase,
  setChosenCase,
  className,
}) {
  const [openCase, setOpenCase] = useState(false);
  return (
    <section className={`${className} relative`}>
      <p className="text-gray-600 capitalize">{label}</p>
      <div
        className="mt-1 p-2 w-full border-2 rounded flex justify-between items-center"
        onClick={() => setOpenCase(!openCase)}
      >
        <p>{chosenCase[index] || title}</p>
        <div className="h-0 sm:h-6 sm:w-6 rounded-full bg-gray-200 ml-1 flex justify-center items-center">
          <BiDownArrow className="" />
        </div>
      </div>
      {openCase && (
        <div className="z-40 p-1 border-t-0 border-2 bg-white w-full rounded border-gray-400 absolute">
          {cases.map((c, itr) => (
            <div
              className={`p-2 ${
                itr + 1 < cases.length ? "border-b" : ""
              } text-center`}
              onClick={() => {
                chosenCase[index] = c;
                setChosenCase(chosenCase);
                setOpenCase(!openCase);
              }}
            >
              {c}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
