import { ethers } from "ethers";

const resolverAbi = [
  "function setText(bytes32 node, string calldata key, string calldata value) external",
  "function text(bytes32 node, string calldata key) external returns (string memory)",
  "function multicall(bytes[] calldata data) external returns(bytes[] memory results)",
];

interface TribeRecordsInputs {
  name: string;
  description: string;
  avatar: string;
  smallAvatar: string;
  contractChainId: number;
  contractAddress: string; // chainId/address
  values?: string[];
}

export const setRecords = async (
  signer: ethers.providers.JsonRpcSigner,
  name: string,
  records: TribeRecordsInputs,
  resolverAddress: string = "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
) => {
  let node = ethers.utils.namehash(name);
  const resolver = new ethers.Contract(resolverAddress, resolverAbi, signer);
  await resolver.multicall(buildMulticallData(node, records));
};

const buildMulticallData = (node: string, tribeRecords: TribeRecordsInputs) => {
  const resolverInterface = new ethers.utils.Interface(resolverAbi);

  var multicallStack = [
    resolverInterface.encodeFunctionData("setText", [
      node,
      "name",
      tribeRecords.name,
    ]),
    resolverInterface.encodeFunctionData("setText", [
      node,
      "description",
      tribeRecords.description,
    ]),
    resolverInterface.encodeFunctionData("setText", [
      node,
      "smallAvatar",
      tribeRecords.smallAvatar,
    ]),
    resolverInterface.encodeFunctionData("setText", [
      node,
      "avatar",
      tribeRecords.avatar,
    ]),
    resolverInterface.encodeFunctionData("setText", [
      node,
      "tribeContract",
      `${tribeRecords.contractChainId}/${tribeRecords.contractAddress}`,
    ]),
  ];

  if (tribeRecords.values !== undefined && tribeRecords.values.length > 0) {
    multicallStack.push(
      resolverInterface.encodeFunctionData("setText", [
        node,
        "values",
        tribeRecords.values.toString(),
      ]),
    );
  }
};
