"use client";
import Background from "../../components/desginElements/background";
import Tilt from "../../components/desginElements/tilt";
import Toggle from "../../components/buttons/toggle";
import ChallengeContentBox from "../../components/challengeContentBox";
import { useParams, useRouter } from "next/navigation";

export default function Home() {
  const router = useParams();
  const id = router.id;
  const endpoints = ["alex", "tony", "walter", "mathkid", "joker", "example", "shake", "matrix"];

  //TODO: CHANGE THE CONDITION TO CHECK IF THE ID IS VALID
  if (!id || endpoints.indexOf(id) === -1) {
    return useRouter().push("/404");
  }

  return (
    <div id="container" className="wrapper">
      <Background />
      <ChallengeContentBox challenege={id} />
      <Toggle />

      <footer></footer>
    </div>
  );
}
