import { TOP_BAR_COLOR } from "../Utils/Constants";
import Logo from "../assets/Icons/Logo";

const TopBar = ({
  onSaveFlow,
  modal,
}: {
  onSaveFlow: () => void;
  modal: {
    type: number;
    show: boolean;
    message: string;
  };
}) => {
  return (
    <div
      className={`w-full h-[6vh] relative  bg-[${TOP_BAR_COLOR}] flex items-center justify-between px-24`}
    >
      {modal?.show && (
        <div className="absolute top-0 transition duration-1000 ease-in-out  left-0 w-full h-full bg-black/30 flex justify-center items-center">
          <div
            className={` !px-[10px]  py-[3px] rounded-md  cursor-pointer ${
              modal?.type === 1
                ? "bg-red-800/20 text-red-800 border-[1px] border-red-800"
                : "bg-green-800/20 text-green-800 border-[1px] border-green-800"
            }`}
          >
            {modal?.message}
          </div>
        </div>
      )}
      <Logo></Logo>
      <div
        onClick={onSaveFlow}
        className="bg-white text-blue-800 border-[1px] border-blue-800 !px-[10px]  py-[3px] rounded-md  cursor-pointer"
      >
        save changes
      </div>
    </div>
  );
};

export default TopBar;
