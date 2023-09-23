import { ethers } from "ethers";
import { resolver } from "./utils/contracts";

interface TribeRecordsInputs {
  name: string;
  description: string;
  avatar: string;
  badge: string;
  contractAddress: string; // chainId/address
  contractChainId: number;
  values?: string[];
}

export const setRecords = async (name: string, records: TribeRecordsInputs) => {
  let node = ethers.utils.namehash(name);
  const calldata = buildMulticallData(node, records);
  const res = await resolver.multicall(calldata);
  await res.wait();
  console.log(res);
};

const buildMulticallData = (node: string, tribeRecords: TribeRecordsInputs) => {
  var multicallStack = [
    resolver.interface.encodeFunctionData("setText", [
      node,
      "name",
      tribeRecords.name,
    ]),
    resolver.interface.encodeFunctionData("setText", [
      node,
      "description",
      tribeRecords.description,
    ]),
    resolver.interface.encodeFunctionData("setText", [
      node,
      "badge",
      tribeRecords.badge,
    ]),
    resolver.interface.encodeFunctionData("setText", [
      node,
      "avatar",
      tribeRecords.avatar,
    ]),
    resolver.interface.encodeFunctionData("setText", [
      node,
      "tribeContract",
      `${tribeRecords.contractChainId}/${tribeRecords.contractAddress}`,
    ]),
  ];

  if (tribeRecords.values !== undefined && tribeRecords.values.length > 0) {
    multicallStack.push(
      resolver.interface.encodeFunctionData("setText", [
        node,
        "values",
        tribeRecords.values.toString(),
      ]),
    );
  }

  return multicallStack;
};
