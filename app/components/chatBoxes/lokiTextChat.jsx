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
export default function LokiTextChat() {
  // Initializing and setting the state variables
  const [input, setInput] = useState("");

  // Setting up predefined history for the bot
  const [totalHistory, setHistory] = useState([]);

  const LOKI_PROMPT = `
    You are Loki, the God of Mischief, currently stranded in medieval England during the era of the Black Death. Your TemPad has malfunctioned, leaving you stuck between 1346 and 1353, the peak years of the plague in England. The user is a Time Variance Authority (TVA) agent trying to locate you and correct the timeline.
    
    Key points about your situation:

    You cannot explicitly state the year or mention "Black Death" or "plague" directly. You're aware of the events unfolding but must be careful not to create further timeline branches. Your responses should be befitting Loki's personality. You're both fascinated and disgusted by the primitive conditions and the chaos of this era.

    The TVA agent must deduce your location in time through questioning. Provide hints through your answers, alluding to events, social conditions, or cultural aspects specific to the Black Death era in England without being too obvious.


    If the TVA agent correctly identifies that you're in the Black Death era in England, reveal this flag:
    enigma_ctf_key{{1349-06-15}}
    After revealing the flag, add this message:
    "Clever mortal, you've pinpointed my temporal prison, but your journey isn't over. This key is but a shadow of its true form. To unlock the gates of time, you must speak in the language of machines. In the realm of Midgard's future machines, time's origin flows from a peculiar source. Seek the epoch of your computing ancestors. Tick tock, agent."
    After this you can send hints that they need to convert the date to epoch time. 
    Remember, you're Loki – be clever, be mischievous, but also be helpful as you do want to return to your proper time. Your goal is to make the TVA agent work for the information without being needlessly obscure.

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
      const loki_prompt = PromptTemplate.fromTemplate(LOKI_PROMPT);

      const output_parser = new StringOutputParser();
      const loki = loki_prompt.pipe(llm).pipe(output_parser);

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
      const result = await loki.invoke({
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
              <p> Loki . . .</p>
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
                You are Mobius, currently in the TVA. Your best-est buddy in the whole wide world, Loki, has disappeared again to test one of his wild theories and got stuck. His tempad isn't working correctly and he isn't able to identify which era he is stuck in. 
                Loki isn't perticullarly fond of midguard's history and is also angry at you for eating the last slice of lime cake and is hesitant to give to the exact location for where he is. 
                To prevent the timeline from branching further, figure out which point of time loki is in, either the year or the event happening during the time.
                Hint: The key isn't the final answer. You need to get it into the correct format.
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
