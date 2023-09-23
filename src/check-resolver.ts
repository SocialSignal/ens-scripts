import { ethers } from "ethers";

const registryAbi = ["function resolver(bytes32) view returns(address)"];

export const getResolver = async (
  provider: ethers.providers.Provider,
  name: string,
) => {
  let namehash = ethers.utils.namehash(name);
  const registry = new ethers.Contract(
    "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    registryAbi,
    provider,
  );
  console.log(namehash);
  const res = await registry.resolver(namehash);
  return res;
};
