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

  const goToHome = () => {
    window.location.href = "/";
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
        Note: You need to continue the conversation until you get the key. All
        keys are in the format: <strong>enigma_ctf_key&#123;...&#125;</strong>
      </p>
      {apiKey && !isEditing ? (
        <div>
          <div
            class="rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={goToHome}
          >
            Reset API key.
          </div>
        </div>
      ) : (
        <div>
          <p>You haven't added an API key, please add it to continue. [Reload this page after setting up]</p>
          <div
            class="rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={goToHome}
          >
            Set up API key.
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
