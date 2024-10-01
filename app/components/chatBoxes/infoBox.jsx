/**
 * Renders the InfoBox component.
 * 
 * @returns {JSX.Element} The rendered InfoBox component.
 */
export default function InfoBox(){
    return (<div id="infoBox" className="z-10 px-5">
    <header>
        <h1>
            Ask*<em>Atlas</em>
        </h1>
    </header>
    <p>
        Welcome little one! I am <strong>Atlas</strong>, your personal
        guide to the world of knowledge. I am here to help you explore the
        vast universe of information. Ask me anything you want, whether
        it's a question about the world or a query about your homework.
        From the stars in the sky to the never-ending dilemmas in life, I
        am here to help. Start asking, and let the conversation unfold!
    </p>
    <p>
        Powered by <strong>Google Gemini Pro</strong>, the Q&amp;A Chatbot
        is designed to make information accessible and interaction
        seamless.
    </p>
    <p>
        This project is my submission for the
        <br />
        <a href="#" target="_blank">
            WinterHacks Hackthon
        </a>
        .
    </p>

</div>);
}