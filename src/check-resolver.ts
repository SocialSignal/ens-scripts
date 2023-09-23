import { ethers } from "ethers";
import { registry } from "./utils/contracts";

export const getResolver = async (name: string) => {
  let node = ethers.utils.namehash(name);
  console.log("Node: ", node);
  const resolverAddress = await registry.resolver(node);
  return resolverAddress;
};
