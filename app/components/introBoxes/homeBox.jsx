/**
 * Renders the InfoBox component.
 *
 * @returns {JSX.Element} The rendered InfoBox component.
 */

import { useState, useEffect } from "react";

const InfoBox = () => {
  const [apiKey, setApiKey] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("googleGeminiProApiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("googleGeminiProApiKey", apiKey);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div id="infoBox" className="z-10 px-5 pb-4">
      <header>
        <h1>
          Ask*<em>Turing</em>
        </h1>
      </header>
      <p>
        Welcome little one! I am <strong>Turing</strong>, your personal guide to
        the world of knowledge. I have many secrets with me, obtaining the
        hidden codes will help to pass the challenge.
      </p>
      <p>
        But before we start, enter your{" "}
        <strong>Google Gemini Pro API key</strong> below to get started.
      </p>
      {apiKey && !isEditing ? (
        <div>
          <p>You have added the API key.</p>
          <div
            class="rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleEdit}
          >
            Edit Key
          </div>
        </div>
      ) : (
        <div>
          <div class="flex justify-center pb-7">
            <div class="relative">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
              <div
                class="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={handleSave}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
