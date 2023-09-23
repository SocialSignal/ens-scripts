import "dotenv/config";
import { ethers } from "ethers";

const { PK, RPC_URL } = process.env;
export const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

export const wallet = new ethers.Wallet(PK!, provider);
