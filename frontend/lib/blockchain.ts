import { ethers } from "ethers";

/*
Connect to the local Hardhat blockchain
*/
export function getProvider() {
  return new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
}

/*
ChildVitaGrant contract address
(Update this if you redeploy)
*/
export const CONTRACT_ADDRESS =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

/*
Correct ABI matching the updated smart contract
*/
export const CONTRACT_ABI = [
  "function getGrant(uint256) view returns (tuple(uint256 id,address caregiver,string childId,uint256 amount,bool attendanceVerified,bool paid,string zkProofHash,uint256 timestamp))",
];