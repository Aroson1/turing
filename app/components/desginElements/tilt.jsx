/**
 * Renders the Tilt component.
 *
 * @returns {JSX.Element} The rendered Tilt component.
 */
export default function Tilt() {
  return (
    <div id="prompt" className="wrapper prompt hide accelerate">
      <div className="cell accelerate">
        <div className="panel center unselectable accelerate">
          <button id="dismiss" className="dismiss">
            <div className="cross">
              <div className="x" />
              <div className="y" />
            </div>
          </button>
          <div className="tilt-scene">
            <img className="tilt" src="./assets/images/tilt.png" />
          </div>
          <h2>Tilting is fun!</h2>
          <p>
            For the best experience, check out this site on a mobile or tablet
            equipped with a gyroscope
          </p>
        </div>
      </div>
    </div>
  );
}
