import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying ChildVitaGrant to local Hardhat network...");

  // Get local signers
  const [
    deployer,
    caregiver1,
    caregiver2,
    caregiver3,
    caregiver4,
    caregiver5,
  ] = await ethers.getSigners();

  // Deploy contract
  const ChildVitaGrant = await ethers.getContractFactory("ChildVitaGrant");
  const childVitaGrant = await ChildVitaGrant.deploy();

  await childVitaGrant.deployed();

  const contractAddress = childVitaGrant.address;

  console.log("✅ Contract deployed to:", contractAddress);

  // Fund contract
  await deployer.sendTransaction({
    to: contractAddress,
    value: ethers.utils.parseEther("1.0"),
  });

  console.log("📈 Contract funded with 1 ETH for mock payouts");

  console.log("\n📊 Generating 20 mock transactions...");

  const caregivers = [
    caregiver1,
    caregiver2,
    caregiver3,
    caregiver4,
    caregiver5,
  ];

  for (let i = 1; i <= 20; i++) {
    const caregiver = caregivers[(i - 1) % 5];
    const childId = 1000 + i;
    const amount = ethers.utils.parseEther("0.0001");

    // Step 1: Create grant
    await childVitaGrant
      .connect(deployer)
      .createGrant(caregiver.address, childId, amount);

    // Step 2: Verify attendance
    const fakeZkHash = `ipfs://fakezkproof${i}.json`;

    await childVitaGrant
      .connect(deployer)
      .verifyAttendance(i, fakeZkHash);

    // Step 3: Release grant
    await childVitaGrant
      .connect(caregiver)
      .releaseGrant(i);

    const grant = await childVitaGrant.getGrant(i);

    console.log(
      `Grant #${i}: Child ID ${childId}, Caregiver ${caregiver.address.slice(
        0,
        10
      )}..., Amount ${ethers.utils.formatEther(
        amount
      )} ETH, Verified: ${grant.attendanceVerified}, Paid: ${
        grant.paid
      }, ZK Hash: ${fakeZkHash}, Timestamp: ${grant.timestamp}`
    );
  }

  console.log("\n🎉 All 20 mock disbursements complete!");
  console.log(
    "Copy this console output into your UNICEF application as initial test data."
  );
  console.log(`Core smart contracts deployed at ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });