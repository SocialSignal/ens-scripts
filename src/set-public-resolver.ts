import { ethers } from "ethers";
import { namewrapper } from "./utils/contracts";

export const setResolver = async (name: string, resolver: string) => {
  let node = ethers.utils.namehash(name);
  const res = await namewrapper.setResolver(node, resolver, {
    gasLimit: 100000,
  });
  await res.wait();
  return res;
};
