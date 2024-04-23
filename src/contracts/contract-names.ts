import { NS } from "@ns";

export const CONTRACT_NAMES = [
	"Find Largest Prime Factor",
	"Subarray with Maximum Sum",
	"Total Ways to Sum",
	"Total Ways to Sum II",
	"Spiralize Matrix",
	"Array Jumping Game",
	"Array Jumping Game II",
	"Merge Overlapping Intervals",
	"Generate IP Addresses",
	"Algorithmic Stock Trader I",
	"Algorithmic Stock Trader II",
	"Algorithmic Stock Trader III",
	"Algorithmic Stock Trader IV",
	"Minimum Path Sum in a Triangle",
	"Unique Paths in a Grid I",
	"Unique Paths in a Grid II",
	"Shortest Path in a Grid",
	"Sanitize Parentheses in Expression",
	"Find All Valid Math Expressions",
	"HammingCodes: Integer to Encoded Binary",
	"HammingCodes: Encoded Binary to Integer",
	"Proper 2-Coloring of a Graph",
	"Compression I: RLE Compression",
	"Compression II: LZ Decompression",
	"Compression III: LZ Compression",
	"Encryption I: Caesar Cipher",
	"Encryption II: Vigenère Cipher",
] as const;

export type ContractTypes = (typeof CONTRACT_NAMES)[number];

export async function main(ns: NS) {
	console.log(
		ns.codingcontract
			.getContractTypes()
			.map((s) => `"${s}",`)
			.join("\n")
	);
}
