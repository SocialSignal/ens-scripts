import "dotenv/config";
import { ethers } from "ethers";
import "./src/check-resolver";
import { getResolver } from "./src/check-resolver";
import { setResolver } from "./src/set-public-resolver";
import { resolver } from "./src/utils/contracts";
import { setMemberRecords } from "./src/set-member-records";

const main = async () => {
  const memberName = "iloveicecream.eth";
  // 1. check resolver

  const currentResolver = await getResolver(memberName);
  console.log("Current resolver: ", currentResolver);

  // 2. set resolver if the result was 0x0

  if (currentResolver == ethers.constants.AddressZero) {
    const res = await setResolver(memberName, resolver.address);
    console.log(res);
  }

  // 3. Setting tribe records

  const res = await setMemberRecords(memberName, {
    primaryTribe: "tribes.eth",
    values: ["cold", "strawberry"],
  });
  console.log(res);
};

main();
