/**
 * Renders all the background elements - waves, lighthouse, rope and birds with the parallax effect.
 * Each element is rendered as a separate layer having a certain depth away from the screen.
 * Implemented using the parralax library.
 * @returns {JSX.Element} The rendered background.
 */
import LightHouseDarkMode from "./lightHouseDarkMode";
export default function Background() {
    return (
        <ul
            id="scene"
            className="scene unselectable"
            data-friction-x="0.1"
            data-friction-y="0.1"
            data-scalar-x={25}
            data-scalar-y={15}
            style={{
                width: 100,
                height: 100,
                transform: "translate3d(0px, 0px, 0px)",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
            }}
        >
            <li
                className="layer"
                data-depth={0.0}
                style={{
                    position: "relative",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(0px, 0px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            ></li>
            <li
                className="layer"
                data-depth="0.10"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 20,
                    transform: "translate3d(-3.08245px, 5.79964px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <div className="background" />
            </li>
            
            <li
                className="layer"
                data-depth="0.10"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-3.08245px, 5.79964px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <div className="light orange b phase-4" />
            </li>
            <li
                className="layer"
                data-depth="0.10"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-3.08245px, 5.79964px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <div className="light purple c phase-5" />
            </li>
            <li
                className="layer"
                data-depth="0.10"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-3.08245px, 5.79964px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <div className="light orange d phase-3" />
            </li>
            <li
                className="layer"
                data-depth="0.15"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-4.62367px, 8.69945px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <ul className="rope depth-10">
                    <li>
                        <img src="/assets/images/rope.png" alt="Rope" />
                    </li>
                    <li className="hanger position-2">
                        <div className="board cloud-2 swing-1" />
                    </li>
                    <li className="hanger position-4">
                        <div className="board cloud-1 swing-3" />
                    </li>
                    <li className="hanger position-8">
                        <div className="board birds swing-5" />
                    </li>
                </ul>
            </li>
            <li
                className="layer"
                data-depth="0.30"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-9.24734px, 17.3989px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <ul className="rope depth-30">
                    <li>
                        <img src="/assets/images/rope.png" alt="Rope" />
                    </li>
                    <li className="hanger position-1">
                        <div className="board cloud-1 swing-3" />
                    </li>
                    <li className="hanger position-5">
                        <div className="board cloud-4 swing-1" />
                    </li>
                </ul>
            </li>
            <li
                className="layer"
                data-depth="0.30"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-9.24734px, 17.3989px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <div className="wave paint depth-30" />
            </li>
            <li
                className="layer"
                data-depth="0.40"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-12.3298px, 23.1985px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <div className="wave plain depth-40" />
            </li>
            <li
                className="layer"
                data-depth="0.50"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-15.4122px, 28.9982px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <div className="wave paint depth-50" />
            </li>
            <li
                className="layer"
                data-depth="0.60"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-18.4947px, 34.7978px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <LightHouseDarkMode />
            </li>
            <li
                className="layer"
                data-depth="0.50"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-6.16489px, 11.5993px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <h1 className="title">
                    Ask<em>*Turing</em>
                </h1>
            </li>
            <li
                className="layer"
                data-depth="0.60"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-18.4947px, 34.7978px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <ul className="rope depth-60">
                    <li>
                        <img src="/assets/images/rope.png" alt="Rope" />
                    </li>
                    <li className="hanger position-3">
                        <div className="board birds swing-5" />
                    </li>
                    <li className="hanger position-6">
                        <div className="board cloud-2 swing-2" />
                    </li>
                    <li className="hanger position-8">
                        <div className="board cloud-3 swing-4" />
                    </li>
                </ul>
            </li>
            <li
                className="layer"
                data-depth="0.60"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-18.4947px, 34.7978px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <div className="wave plain depth-60" />
            </li>
            <li
                className="layer"
                data-depth="0.80"
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-24.6596px, 46.3971px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <div className="wave plain depth-80" />
            </li>
            <li
                className="layer"
                data-depth={1.0}
                style={{
                    position: "absolute",
                    display: "block",
                    left: 0,
                    top: 0,
                    transform: "translate3d(-30.8245px, 57.9964px, 0px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                <div className="wave paint depth-100" />
            </li>
        </ul>
    );
}