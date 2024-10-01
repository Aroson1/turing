import Background from "./components/desginElements/background";
import Tilt from "./components/desginElements/tilt";
import Toggle from "./components/buttons/toggle";
import HomeContentBox from "./components/homeContentBox";
export default function Home() {
  return (
    <div id="container" className="wrapper">

      <Background />
      <HomeContentBox />
      <Toggle />
      <Tilt />      

      <footer></footer>
    </div>
  );
}
