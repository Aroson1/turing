/**
 * Renders the ContentBox component. *
 * @returns {JSX.Element} The rendered ContentBox component.
 */
"use client";
import React, { useEffect, useState } from "react";

import AlexTextChat from "./chatBoxes/alexTextChat";
import WalterTextChat from "./chatBoxes/walterTextChat";
import TonyTextChat from "./chatBoxes/tonyTextChat";
import MathkidTextChat from "./chatBoxes/mathkidTextChat";
import JokerTextChat from "./chatBoxes/jokerTextChat";
import InfoBox from "./introBoxes/challengeBox";
import Example from "./chatBoxes/example";
import ShakeTextChat from "./chatBoxes/shakeTextChat";
import MatrixTextChat from "./chatBoxes/matrixTextChat";
import LokiTextChat from "./chatBoxes/lokiTextChat";
import PuppetTextChat from "./chatBoxes/puppetTextChat";
import MoriartyTextChat from "./chatBoxes/moriartyTextChat";

import ChatButtons from "./buttons/chatButtons";

export default function ChallengeContentBox(props) {
  // console.log(props.challenege == "1");
  const [apiKey, setApiKey] = useState("");
  useEffect(() => {
    const storedApiKey = localStorage.getItem("googleGeminiProApiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);
  return (
    <section id="about" className="wrapper about accelerate hide">
      <div className="cell accelerate">
        <div className="cables center accelerate">
          <div className="panel accelerate">
            <InfoBox />
            {props.challenege == "alex" && <AlexTextChat />}
            {props.challenege == "walter" && <WalterTextChat />}
            {props.challenege == "tony" && <TonyTextChat />}
            {props.challenege == "mathkid" && <MathkidTextChat />}
            {props.challenege == "joker" && <JokerTextChat />}
            {props.challenege == "example" && <Example />}
            {props.challenege == "shake" && <ShakeTextChat />}
            {props.challenege == "matrix" && <MatrixTextChat />}
            {props.challenege == "loki" && <LokiTextChat />}
            {props.challenege == "puppet" && <PuppetTextChat />}
            {props.challenege == "moriarty" && <MoriartyTextChat />}

            {/* {apiKey !== null && apiKey !== "" ?<ChatButtons />:<></>} */}
            <ChatButtons />
          </div>
        </div>
      </div>
    </section>
  );
}
