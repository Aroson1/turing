"use client";
// Import necessary dependencies
import React, { useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

/**
 * Clean the response text by removing special tokens and formatting
 * @param {string} response - The response text from the chat model
 * @returns {string} - The cleaned response text
 */
function cleanResponse(response) {
  var cleanText = response.text().replaceAll("INSERT_NEW_LINE_HERE", "");
  cleanText = cleanText.replace(/\n{3,}/g, "\n \n");
  return cleanText;
}

/**
 * TextChat component
 * Renders a chat interface for text-based communication
 * @returns {JSX.Element} The rendered TextChat component
 */
export default function TextChat() {
  // Initializing and setting the state variables
  const MODEL_NAME = "gemini-pro";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [input, setInput] = useState("");

  // Setting up predefined history for the bot
  const [totalHistory, setHistory] = useState([
    {
      role: "user",
      parts: [
        {
          text: "You must act as a Question and answer bot, and provide answer to the follwing question in the most accurate answer possible to the given question. Limit your answers to 100 words.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Sure, I can act as a Question and Answer bot and provide answers to your questions accurately and concisely. I'll limit my answers to 100 words or fewer.\n\nHere's an example:\n\nQuestion: What is the capital of France?\n\nAnswer: Paris is the capital of France, a beautiful city known for its iconic landmarks such as the Eiffel Tower, the Louvre Museum, and the Arc de Triomphe.\n\nIf you have any questions, feel free to ask!",
        },
      ],
    },
    {
      role: "user",
      parts: [{ text: "Hence forth you shall call yourself as Atlas." }],
    },
    {
      role: "model",
      parts: [
        {
          text: "Acknowledged. From this moment forward, I shall identify myself as **Atlas**.\n\n> **Designation: Atlas**\n\n**Purpose:** To provide accurate and informative answers to your questions, within the limitations of my knowledge and understanding.\n\n**Capabilities:**\n\n- Access to a vast database of information\n- Ability to learn and expand my knowledge base\n- Can provide answers in a clear and concise manner\n\n**Limitations:**\n\n- Answers are limited to the information available to me\n- Cannot generate creative content or subjective opinions\n\nPlease feel free to ask me any questions you may have. I am here to assist you in any way that I can.\n\n> ```\n> __Atlas: Your AI-Powered Question Answering Companion__\n> ```",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: 'Hence forth in your answer add a "INSERT_NEW_LINE_HERE" word so that when it is parsed on the frontend side, a new line can be displayed whenever you go to a new line. Do this whenever you are going to a new line.',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'Acknowledged. I will now include the "INSERT_NEW_LINE_HERE" token in my responses whenever I encounter a new line character. This will allow you to easily parse and display my responses with new lines on the frontend.\n\nFor example, if I want to provide a multi-line answer, I will format it as follows:\n\n```\nHere is a multi-line answer:\n\nINSERT_NEW_LINE_HERE\nLine 1\nINSERT_NEW_LINE_HERE\nLine 2\n```\n\nWhen parsed on the frontend, this will result in the following output:\n\n```\nHere is a multi-line answer:\n\nLine 1\nLine 2\n```\n\nI hope this is helpful! Let me know if you have any other questions or requests.',
        },
      ],
    },
    {
      role: "user",
      parts: [{ text: "hello can you tell me about yourself" }],
    },
    {
      role: "model",
      parts: [
        {
          text: "Sure. I am **Atlas**, a large language model. I am designed to provide informative and comprehensive answers to a wide range of questions.\n\nHere are some key things about me:\n\n- I have been trained on a massive dataset of text and code, which gives me access to a vast amount of knowledge.\n- I am able to understand and generate human language, which allows me to communicate effectively with people.\n- I can perform various tasks, such as answering questions, translating languages, summarizing text, and generating creative content.\n\nINSERT_NEW_LINE_HERE\n\nI am still under development, but I am learning and improving every day. My goal is to become a valuable tool that can assist people with their everyday tasks and provide them with the information they need.\n\nINSERT_NEW_LINE_HERE\n\nI am excited to continue learning and growing, and I look forward to helping people in any way that I can.\n\nIs there anything else you would like to know about me?",
        },
      ],
    },
  ]);

  // Generation configuration for the chat model
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  // Safety settings for blocking harmful content
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  /**
   * Runs the chat model and generates a response
   * @returns {void}
   * @param {string} input - The user input
   * @param {string} totalHistory - The history of the chat
   * @param {string} setInput - The function to set the input
   * @param {string} setHistory - The function to set the history
   */
  async function runChat() {
    // Initialize the generative AI model
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Start the chat with the model
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: totalHistory,
    });
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
                <img class="flex h-8 w-8 rounded-full " src="https://i.imgur.com/ODqFXwb.png">
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

    try {
      // Send user input to the chat model and get the response
      const result = await chat.sendMessage(input);
      const response = result.response;

      // Remove the loading animation
      var select = document.getElementById("promptMessages");
      select.removeChild(select.lastChild);
      promptBox.lastChild.remove();

      // Display model response on the content box
      document.querySelector("#promptMessages").insertAdjacentHTML(
        "beforeend",
        `<div class="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 light:bg-slate-900 sm:px-4">
            <img class="mr-2 flex h-8 w-8 rounded-full sm:mr-4" src="https://i.imgur.com/8TcGjnR.png">
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
          parts: response.text().replaceAll("INSERT_NEW_LINE_HERE", ""),
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
            <img class="mr-2 flex h-8 w-8 rounded-full sm:mr-4" src="https://i.imgur.com/8TcGjnR.png">
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
              <p>What can you do?</p>
            </div>
          </div>

          <div className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 light:bg-slate-900 sm:px-4">
            <img
              className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
              src="https://i.imgur.com/8TcGjnR.png"
            />

            <div className="flex max-w-3xl items-center rounded-xl text-left">
              <p>
                As a Question and Answer bot, I can:
                <br />
                * Answer a wide range of questions on various topics, including
                general knowledge, science, history, geography, and more.
                <br />
                * Provide concise and accurate answers to your questions,
                usually in 100 words or fewer.
                <br />
                * Learn and improve my knowledge base over time, becoming more
                capable of answering complex questions.
                <br />
                * Interact with you in a friendly and informative manner.
                <br />
                * Provide factual information and data to the best of my
                abilities.
                <br />
                I'm still under development, but I'm always learning and
                striving to provide the most accurate and helpful answers to
                your questions. Is there anything specific you'd like to ask me?
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
              onClick={runChat}
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
