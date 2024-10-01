/**
 * Renders a toggle button to open the main chat panel.
 * @returns {JSX.Element} The rendered toggle button.
 */
export default function Toggle() {
    return (<button id="toggle" className="toggle i">
    <div className="cross">
      <div className="x"/>
      <div className="y"/>
    </div>
  </button>);
}