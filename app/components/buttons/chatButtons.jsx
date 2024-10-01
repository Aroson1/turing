/**
 * Renders the text-based and image-based chat buttons. *
 * @returns {JSX.Element} The rendered chat buttons.
 */
export default function ChatButtons() {
    return (
        <ul className="links">
            <li className='flex justify-center items-center'>
                <a className="i " href="#" id="chatbutton">
                    Begin a new <br />adventure
                </a>
            </li>
            {/* <li>
                <a className="i" href="#" id="imagebtn">
                    Sketch your <br />adventure
                </a>
            </li> */}
        </ul>
    );
}