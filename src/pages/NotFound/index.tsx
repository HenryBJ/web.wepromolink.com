import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle, faHome} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <div
            className="relative h-screen md:h-auto container max-w-3xl mx-auto flex gap-8 items-center flex-col justify-start text-orange-500 md:text-orange-500 pt-12 md:pt-0 md:mt-5 px-4 md:px-0">
            <FontAwesomeIcon icon={faExclamationTriangle} size="3x" className="mb-4"/>
            <h1 className="font-bold text-3xl text-center text-orange-500 md:text-orange-500 mb-4">404 - Not Found</h1>

            <div className="text-lg border-2 border-orange-500 p-4 rounded-lg flex flex-col gap-2">
                <span className="font-bold text-2xl">Oops!</span>
                <div className="flex flex-col gap-1 text-base">
                    <span>The page you're looking for does not exist.</span>
                    <span>There might be a mistake in the URL you entered, or the page may have been moved or deleted.</span>
                </div>
                <Link to="/"> <FontAwesomeIcon icon={faHome} className={"mr-1"}/> Return to home</Link>
            </div>
        </div>
    );
}
