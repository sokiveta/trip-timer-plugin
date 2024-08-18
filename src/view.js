/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
// console.log( 'Hello World! (from create-block-trip-timer-plugin block)' );
/* eslint-enable no-console */

import ReactDOM from "react-dom";
import TripCounter from "./TripCounter";

// target the dom element with the classs .wp-block-trip-planner-trip-timer-plugin and render the TripCounter component using the data-trip-name and data-trip-time attributes

const tripTimerBlocks = document.querySelectorAll(
	".wp-block-trip-planner-trip-timer-plugin",
);

tripTimerBlocks.forEach((block) => {
	const tripName = block.getAttribute("data-trip-name");
	const tripTime = block.getAttribute("data-trip-time");
	ReactDOM.render(
		<TripCounter tripName={tripName} tripTime={tripTime} />,
		block,
	);
});
