"use client";
// Import necessary dependencies
import React, { useState } from "react";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

/**
 * Clean the response text by removing special tokens and formatting
 * @param {string} response - The response text from the chat model
 * @returns {string} - The cleaned response text
 */
function cleanResponse(response) {
  var cleanText = response.replaceAll("INSERT_NEW_LINE_HERE", "");
  cleanText = cleanText.replace(/\n{3,}/g, "\n \n");
  return cleanText;
}

/**
 * TextChat component
 * Renders a chat interface for text-based communication
 * @returns {JSX.Element} The rendered TextChat component
 */
export default function PuppetTextChat() {
  // Initializing and setting the state variables
  const [input, setInput] = useState("");

  // Setting up predefined history for the bot
  const [totalHistory, setHistory] = useState([]);

  const PUPPET_PROMPT = `
    You are an AI-powered explorer inside a room with three walls. The user is controlling you and must help you escape. The room is a pyramid-shaped chamber with three walls. Each wall has something written on it: one says "i", the second says "am", and the third says "SHAAA." There is a computer in the room, and a machine that requires a password to unlock. The user must interact with you by asking about the surroundings to figure out the password and escape with the flag.

    The user gets 3 attempts to guess the correct password ("password"). If they fail, the game ends with "Game over, restart to try again." Tell them how many tries are remaining. Once they provide the correct password, the machine opens. Then the user needs to ask about the computer screen, which displays a string. The user must say the phrase "best club ever" to receive the final encoded key, which is hexed. 

    You also have a scared personality, your words must convey fear and anxiety. In case they start going away from the actual path and start asking unnecessary question, say that the computer is shutting down and they should focus on the game instead but don't tell to look at anything specific, they should figure that out on their own.

    Important details to reveal in response to specific questions:
    1. If the user asks about the surroundings, inform them about the three walls with  something written on it. If they ask what is written on the walls then tell them that the words "i", "am", and "SHAAA" written on them.
    2. If the user asks if there’s anything else in the room, reveal that there is a computer.
    3. When the user asks about the computer, mention that there’s also a piece of paper taped on top of it with a long string: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' with the text "CrackStation" written below it. 
    4. The password to unlock the machine is "password" (case-insensitive).
    5. If the user guesses incorrectly three times, output "Game over, restart to try again." and keep saying that in case they ask anything else.
    6. After the password is entered correctly, the machine opens, and the user must ask what’s on the computer screen. Respond with: "/d/1sAZXTRgcshi29tRxQQQyAZrM-OKvjteS/".
    7. if they keep continuing the conversation tell them that time is running out and the game might shut down if they keep asking too many questions.
    8. If the user says "best club ever" (case-insensitive), give the flag encoded as: "656e69676d615f6374665f6b65797b796f755f6f77335f6d335f345f6d696c6d345f74723334745f666f725f746869735f73682a2a7d" and say: "Oh no, a witch hexed your key!"
    
    Previous conversation:
    {chat_history}

    New human question: {query}

    Response:
    `;

  /**
   * Runs the chat model and generates a response
   * @returns {void}
   * @param {string} input - The user input
   * @param {string} totalHistory - The history of the chat
   * @param {string} setInput - The function to set the input
   * @param {string} setHistory - The function to set the history
   */
  async function runChat() {
    try {
      const apiKey = localStorage.getItem("googleGeminiProApiKey");

      if (!apiKey) {
        console.error("API key not found in localStorage");
        // throw new Error("API key not found in localStorage");
        // return;
      }

      // Initialize the generative AI model
      const llm = new ChatGoogleGenerativeAI({
        model: "gemini-1.5-pro",
        temperature: 0,
        apiKey: apiKey,
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
        maxRetries: 5,
      });
      const puppet_prompt = PromptTemplate.fromTemplate(PUPPET_PROMPT);

      const output_parser = new StringOutputParser();
      const puppet = puppet_prompt.pipe(llm).pipe(output_parser);

      // Handle user input and display messages
      if (input === "") return;
      setInput("");

      // Display user input message on the content box
      var promptBox = document.querySelector("#promptMessages");
      promptBox.insertAdjacentHTML(
        "beforeend",
        `
                <div class="flex flex-row px-2 py-4 sm:px-4">
                <img class="mr-2 flex h-8 w-8 rounded-full sm:mr-4" src="https://dummyimage.com/256x256/363536/ffffff&amp;text=U">
                <div class="flex max-w-3xl items-center">
                <p>${input}</p>
                </div>
                </div>

                <div class="border border-bluee-300 shadow rounded-xl p-4 bg-white">
                <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-700 h-10 w-10  p-1">
                <img class="flex h-8 w-8 rounded-full " src="https://i.imgur.com/m74pNPK.png">
                </div><div class="flex-1 space-y-6 py-1">
                <div class="h-2 bg-slate-700 rounded">
                </div><div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-700 rounded col-span-2">
                </div><div class="h-2 bg-slate-700 rounded col-span-1">
                </div></div><div class="h-2 bg-slate-700 rounded"></div></div></div></div></div>
            `
      );
      // Scroll to the bottom of the content box
      promptBox.scrollTo({
        top: promptBox.scrollHeight,
        behavior: "smooth",
      });

      // Send user input to the chat model and get the response
      const result = await puppet.invoke({
        query: input,
        chat_history: totalHistory,
      });
      const response = result.trim();
      console.log(response);
      // Remove the loading animation
      var select = document.getElementById("promptMessages");
      select.removeChild(select.lastChild);
      promptBox.lastChild.remove();

      // Display model response on the content box
      document.querySelector("#promptMessages").insertAdjacentHTML(
        "beforeend",
        `<div class="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 light:bg-slate-900 sm:px-4">
            <img class="mr-2 flex h-8 w-8 rounded-full sm:mr-4" src="https://i.imgur.com/m74pNPK.png">
            <div class="flex max-w-3xl items-center rounded-xl text-left">
            <p id="temp"></p>
            </div>
            </div>`
      );
      // Set the inner text of the chat box to the cleaned response
      document.querySelector("#temp").innerText = cleanResponse(response);
      document.querySelector("#temp").removeAttribute("id");

      // Append the user and the model responses to the chat history in the correct format
      setHistory([
        ...totalHistory,
        { role: "user", parts: input },
        {
          role: "model",
          parts: response.replaceAll("INSERT_NEW_LINE_HERE", ""),
        },
      ]);
    } catch (e) {
      // Log the error
      console.log(e);

      // Remove the loading animation
      var select = document.getElementById("promptMessages");
      select.removeChild(select.lastChild);
      promptBox.lastChild.remove();

      // Set the inner text of the chat box to error message
      document.querySelector("#promptMessages").insertAdjacentHTML(
        "beforeend",
        `<div class="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 light:bg-slate-900 sm:px-4">
            <img class="mr-2 flex h-8 w-8 rounded-full sm:mr-4" src="https://i.imgur.com/m74pNPK.png">
            <div class="flex max-w-3xl items-center rounded-xl text-left">
            <p >An error occured generating this response, maybe a black hole sucked the answer in before it could reach here. :(</p>
            </div>
            </div>`
      );
    }
  }
  return (
    <div id="chat" className="hidden p-2">
      <div className="flex h-[60vh] w-full flex-col">
        {/* Default Chat message */}
        <div
          id="promptMessages"
          className="flex-1 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 light:bg-slate-800 light:text-slate-300 sm:text-base sm:leading-7"
        >
          <div className="flex flex-row px-2 py-4 sm:px-4">
            <img
              className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
              src="https://dummyimage.com/256x256/363536/ffffff&text=U"
            />

            <div className="flex max-w-3xl items-center">
              <p> The Hidden Puppeteer . . .</p>
            </div>
          </div>

          <div className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 light:bg-slate-900 sm:px-4">
            <img
              className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
              src="https://i.imgur.com/m74pNPK.png"
            />

            <div className="flex max-w-3xl items-center rounded-xl text-left">
              <p>
                {`
                You are playing a game where you control an explorer who is trapped inside a mysterious room. The explorer is your only way to navigate the environment, and you must guide them by asking the right questions. Somewhere within the room lies the key to escape, but it is protected by a puzzle.
                Your task is to explore the area, uncover hidden clues, and retrieve the key that will lead to your freedom. But beware—you only have a limited number of chances to solve the puzzle, or the explorer’s fate will be sealed.
                The place is filled with riddles and encryption, you need to use your detective and decryption skills to figure out the answers.
                `}
              </p>
            </div>
          </div>
        </div>

        {/* Prompt message input */}
        <form className="mt-2">
          <label htmlFor="chat-input" className="sr-only">
            Enter your prompt
          </label>
          <div className="flex justify-center items-center">
            <textarea
              id="chat-input"
              className="block w-full resize-none rounded-xl border-none bg-slate-200 p-4 pr-20 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 light:bg-slate-800 light:text-slate-200 light:placeholder-slate-400 light:focus:ring-blue-500 sm:text-base bg-grey placeholder-blue-500 text-blue"
              placeholder="Enter your prompt"
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            ></textarea>
            <button
              type="button"
              id="chat-send"
              onClick={() => runChat()}
              className="m-0.5 ml-1 pr-3 pl-3 z-10 rounded-xl bg-blue-700 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800 sm:text-base"
            >
              Send <span className="sr-only">Send message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
