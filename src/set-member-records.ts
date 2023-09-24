import { ethers } from "ethers";
import { resolver } from "./utils/contracts";

interface MemberRecordsInputs {
  primaryTribe?: string;
  values: string[];
}

export const setMemberRecords = async (
  name: string,
  records: MemberRecordsInputs,
) => {
  let node = ethers.utils.namehash(name);
  const calldata = buildMulticallData(node, records);
  const res = await resolver.multicall(calldata);
  await res.wait();
  return res;
};

const buildMulticallData = (
  node: string,
  tribmemberRecords: MemberRecordsInputs,
) => {
  var multicallStack = [
    resolver.interface.encodeFunctionData("setText", [
      node,
      "primaryTribe",
      tribmemberRecords.primaryTribe,
    ]),
    resolver.interface.encodeFunctionData("setText", [
      node,
      "values",
      tribmemberRecords.values.toString(),
    ]),
  ];

  return multicallStack;
};
