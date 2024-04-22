// thanks to this [guy](https://github.com/Tanimodori/viteburner/issues/18#issuecomment-1902753427)

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
export default eval("window")["React"];
// @ts-ignore
export type * from "react";
// @ts-ignore
export const {
	Children,
	Fragment,
	Component,
	Profiler,
	PureComponent,
	cloneElement,
	createContext,
	createElement,
	createFactory,
	createRef,
	forwardRef,
	isValidElement,
	lazy,
	memo,
	useCallback,
	useContext,
	useDebugValue,
	useEffect,
	useImperativeHandle,
	useLayoutEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
	version,
	Suspense,
	StrictMode,
	// @ts-ignore
} = React;
