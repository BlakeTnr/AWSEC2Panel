import Image from "next/image";
import ServersPanel from "./components/ServersPanel"
import Button from "./components/Button";

export default function Home() {
  return (
    <main>
      <p className="mt-5 text-center text-white text-5xl">EC2 Panel</p>
      <div className="flex">
        <div className="flex-auto w-1/8"></div>
        <div className="inline-block mt-2 flex-auto">
          <ServersPanel />
        </div>
        <div className="flex-auto w-1/8"></div>
      </div>
    </main>
  );
}
