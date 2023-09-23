import { ethers } from "ethers";

const registryAbi = ["function setResolver(bytes32,address) external"];

export const setResolver = async (signer: ethers.providers.JsonRpcSigner, name: string, resolver: string = "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41") => {
    let namehash = ethers.utils.namehash(name);
    const registry = new ethers.Contract("0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", registryAbi, signer)
    console.log(namehash)
    const res = await registry.setResolver(namehash, resolver)
    return res
}