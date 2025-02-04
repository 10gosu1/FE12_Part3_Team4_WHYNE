import CharieSample from "./components/CharieSample";
import GosuSample from "./components/GosuSample";
import GyeonSample from "./components/GyeonSample";
import LlliiSample from "./components/LlliiSample";
import LoinSample from "./components/LoinSample";

export default function page() {
  return (
    <div className="flex flex-col ">
      <div className="border-b-2 p-10">
        <CharieSample />
      </div>
      <div className="border-b-2 p-10">
        <GosuSample />
      </div>
      <div className="border-b-2 p-10">
        <GyeonSample />
      </div>
      <div className="border-b-2 p-10">
        <LlliiSample />
      </div>
      <div className="border-b-2 p-10">
        <LoinSample />
      </div>
    </div>
  );
}
