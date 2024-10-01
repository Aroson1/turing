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

            {/* {apiKey !== null && apiKey !== "" ?<ChatButtons />:<></>} */}
            <ChatButtons />
          </div>
        </div>
      </div>
    </section>
  );
}
