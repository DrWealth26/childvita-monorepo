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
    value: ethers.utils.parseEther("5.0"),
  });

  console.log("📈 Contract funded with 5 ETH for school-fee micro-grants");

  console.log("\n📊 Generating 20 ChildVita grant transactions...\n");

  const caregivers = [
    caregiver1,
    caregiver2,
    caregiver3,
    caregiver4,
    caregiver5,
  ];

  // Realistic micro-grant amounts
  const grantAmounts = [
    "0.02",
    "0.025",
    "0.03",
    "0.022",
    "0.028",
    "0.024",
    "0.035",
    "0.026",
    "0.031",
    "0.029",
    "0.027",
    "0.034",
    "0.023",
    "0.032",
    "0.036",
    "0.021",
    "0.037",
    "0.033",
    "0.038",
    "0.04",
  ];

  for (let i = 1; i <= 20; i++) {
    const caregiver = caregivers[(i - 1) % caregivers.length];

    // Child registry ID (does not look like a year)
    const childId = `CHV-${10000 + i}`;

    const amount = ethers.utils.parseEther(grantAmounts[i - 1]);

    // Step 1: Create grant
    await childVitaGrant
      .connect(deployer)
      .createGrant(caregiver.address, childId, amount);

    // Step 2: Verify attendance
    const fakeZkHash = `ipfs://childvita/attendance-proof-${childId}.json`;

    await childVitaGrant
      .connect(deployer)
      .verifyAttendance(i, fakeZkHash);

    // Step 3: Release grant
    await childVitaGrant
      .connect(caregiver)
      .releaseGrant(i);

    const grant = await childVitaGrant.getGrant(i);

    console.log(
      `Grant #${i} | Child: ${childId} | Caregiver: ${caregiver.address.slice(
        0,
        10
      )}... | Amount: ${ethers.utils.formatEther(
        amount
      )} ETH | Verified: ${grant.attendanceVerified} | Paid: ${
        grant.paid
      } | ZK Proof: ${fakeZkHash}`
    );
  }

  console.log("\n🎉 All 20 ChildVita grant disbursements completed.");
  console.log(
    "These transactions simulate verified school attendance micro-grants for vulnerable children."
  );

  console.log(`\n📍 Smart contract deployed at: ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });