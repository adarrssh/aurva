import close from "../../assets/close.png";
import { SidebarProps } from "../../interface";

const SideBar: React.FC<SidebarProps> = ({
  mealDetails,
  showDetailsPopup,
  setShowDetailsPopup,
}) => {
  const {
    strArea,
    strCategory,
    strInstructions,
    strMealThumb,
    strSource,
    strYoutube,
    strMeal,
  } = mealDetails;
  console.log(mealDetails);

  return (
    <div className="absolute right-0 top-0 bg-white w-[500px] z-[1] h-screen shadow-[0_0_0_1px_black] overflow-y-scroll pb-[20px]">
      <div className="w-[500px] h-[60px] flex flex-row justify-between items-center pt-[5px] pb-[5px]">
        <div style={{ paddingLeft: "20px", fontSize: "18px" }}>{strMeal}</div>
        <div
        className="cursor-pointer	 pr-[20px]"
          style={{ paddingRight: "20px" }}
          onClick={() => setShowDetailsPopup(false)}
        >
          <img src={close} alt="img" width={"15px"} />
        </div>
      </div>

      <div className="flex justify-center h-[350px] pt-[10px] pl-[20px] pr-[20px]">
        <img src={strMealThumb} width={"460px"} height={"350px"} alt="img" />
      </div>

      <div className="flex flex-col justify-center  pt-[10px] pl-[20px] pr-[20px] text-xs">
        <div
          className="flex pt-[10px]"
          style={{
            display: "flex",
            paddingTop: "10px",
          }}
        >
          <div className="font-extralight flex-1	">Category</div>

          <div className="flex-1 break-words">{strCategory}</div>
        </div>

        <div className="flex pt-[10px]">
          <div className="font-extralight flex-1	">Area</div>

          <div className="flex-1 break-words">{strArea}</div>
        </div>

        <div className="flex pt-[10px]">
          <div className="font-extralight flex-1">image</div>
          <div className="flex-1 break-words overflow-hidden overflow-ellipsis">
            {strMealThumb}
          </div>
        </div>

        <div className="flex pt-[10px]">
          <div className="font-extralight flex-1	">Youtube</div>

          <div className="flex-1 break-words">{strYoutube}</div>
        </div>

        <div className="border border-black px-5 mt-2.5 pt-2.5 pb-2.5">
          <div className="font-bold text-sm">Instruction</div>
          <div className="text-xs pt-1.5">{strInstructions}</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
