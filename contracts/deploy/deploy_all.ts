import { deployContract } from "./utils";

export default async function () {
  const employeeStorageContract = (await deployContract("EmployeeStorage"));
  const coinContract = (await deployContract("Coin", ["AcmeCoin", "ACOIN",employeeStorageContract.target]));
  const nft1Contract = (await deployContract("NFT", ["1 Year Anniversary", "1YR", employeeStorageContract.target]));
  const nft2Contract = (await deployContract("NFT", ["5 Year Anniversary", "5YR", employeeStorageContract.target]));
  const nft3Contract = (await deployContract("NFT", ["10 Year Anniversary", "10YR", employeeStorageContract.target]));
  const nft4Contract = (await deployContract("NFT", ["15 Year Anniversary", "15YR", employeeStorageContract.target]));
  const nft5Contract = (await deployContract("NFT", ["Good Job!", "GJBDG", employeeStorageContract.target]));
  const nft6Contract = (await deployContract("NFT", ["Awesome Work!", "AWBDG", employeeStorageContract.target]));
  const paymasterContract = (await deployContract("Paymaster", [employeeStorageContract.target]));

  console.log("employeeStorageContract: " + employeeStorageContract.target);
  console.log("coinContract: " + coinContract.target);
  console.log("nft1Contract: " + nft1Contract.target);
  console.log("nft2Contract: " + nft2Contract.target);
  console.log("nft3Contract: " + nft3Contract.target);
  console.log("nft4Contract: " + nft4Contract.target);
  console.log("nft5Contract: " + nft5Contract.target);
  console.log("nft6Contract: " + nft6Contract.target);
  console.log("paymasterContract: " + nft4Contract.target);

}
