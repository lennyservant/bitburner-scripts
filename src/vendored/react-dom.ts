// thanks to this [guy](https://github.com/Tanimodori/viteburner/issues/18#issuecomment-1902753427)

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
export default eval("window")["ReactDOM"];
// @ts-ignore
export type * from "react-dom";
// @ts-ignore
export const {
	createPortal,
	findDOMNode,
	flushSync,
	hydrate,
	render,
	unmountComponentAtNode,
	unstable_batchedUpdates,
	unstable_renderSubtreeIntoContainer,
	version,
	// @ts-ignore
} = ReactDOM;
