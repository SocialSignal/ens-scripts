import "dotenv/config";
import { ethers } from "ethers";
import "./src/check-resolver";
import { setTribeRecords } from "./src/set-tribe-records";
import { getResolver } from "./src/check-resolver";
import { setResolver } from "./src/set-public-resolver";
import { resolver } from "./src/utils/contracts";

const main = async () => {
  const tribeName = "tribes.eth";
  // 1. check resolver

  const currentResolver = await getResolver(tribeName);
  console.log("Current resolver: ", currentResolver);

  // 2. set resolver if the result was 0x0

  if (currentResolver == ethers.constants.AddressZero) {
    const res = await setResolver(tribeName, resolver.address);
    console.log(res);
  }

  // 3. Setting tribe records

  const res = await setTribeRecords(tribeName, {
    name: "Ice cream gang",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwrQN5DxipBXcGFoj8cZeYc-4oVf7c_U7w99w4oSAA3g&s",
    badge:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwrQN5DxipBXcGFoj8cZeYc-4oVf7c_U7w99w4oSAA3g&s",
    contractChainId: 1,
    contractAddress: "0x2a4FC9c5EC629D872f82D29faE5DFa71B39b7E28",
    description: "We like ice cream",
    values: ["cold", "mango"],
  });
  console.log(res);
};

main();
