import { CONTRACT_NAMES } from "../contract-names";
import find_largest_prime from "./find-largest-prime-factor";
import generate_ip from "./generate-ip";
import shortest_path_in_grid from "./shortest-path-in-grid";
import total_ways_sum from "./total-ways-sum";
import total_ways_sum_2 from "./total-ways-sum-ii";

type SolversType = {
	[K in (typeof CONTRACT_NAMES)[number]]?: (i: any) => Promise<any>;
} & {
	[K: string]: undefined;
};

export default {
	"Algorithmic Stock Trader I": undefined,
	"Algorithmic Stock Trader II": undefined,
	"Algorithmic Stock Trader III": undefined,
	"Algorithmic Stock Trader IV": undefined,
	"Array Jumping Game": undefined,
	"Array Jumping Game II": undefined,
	"Compression I: RLE Compression": undefined,
	"Compression II: LZ Decompression": undefined,
	"Compression III: LZ Compression": undefined,
	"Encryption I: Caesar Cipher": undefined,
	"Encryption II: Vigenère Cipher": undefined,
	"Find All Valid Math Expressions": undefined,
	"Find Largest Prime Factor": find_largest_prime,
	"Generate IP Addresses": generate_ip,
	"HammingCodes: Encoded Binary to Integer": undefined,
	"HammingCodes: Integer to Encoded Binary": undefined,
	"Merge Overlapping Intervals": undefined,
	"Minimum Path Sum in a Triangle": undefined,
	"Proper 2-Coloring of a Graph": undefined,
	"Sanitize Parentheses in Expression": undefined,
	"Shortest Path in a Grid": shortest_path_in_grid,
	"Spiralize Matrix": undefined,
	"Subarray with Maximum Sum": undefined,
	"Total Ways to Sum II": total_ways_sum_2,
	"Total Ways to Sum": total_ways_sum,
	"Unique Paths in a Grid I": undefined,
	"Unique Paths in a Grid II": undefined,
} as const as SolversType;
