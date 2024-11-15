const hre = require("hardhat");

async function main() {
  const ShipmentTracking = await hre.ethers.getContractFactory("ShipmentTracking");
  const shipmentTracking = await ShipmentTracking.deploy();

  await shipmentTracking.deployed();

  console.log("ShipmentTracking deployed to:", shipmentTracking.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
