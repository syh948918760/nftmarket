import { ethers, Wallet } from "ethers"

import type { VerificationResultResponse } from "../../types"

export const verificationResult = async (
  subjectAddress: string,
  contractAddress: string,
  signerPrivateKey: string,
  chainId: number
): Promise<VerificationResultResponse> => {
  // A production verifier would integrate with its own persistent wallet, but
  // this example merely regenerates a new signer trusted signer when needed.
  // We use the same account here that the deploy script used in order to get
  // a signer that is already registered as a verifier in the contract.
  const signer: Wallet = new ethers.Wallet(signerPrivateKey)

  // This would be best done from current block.timestamp. Expirations allow verifiers
  // to control how long a particular result is considered valid. Block timestanps
  // are denoted in seconds since the epoch.
  const expiration = Math.floor(Date.now() / 1000) + 300 // 5 mins

  // VerificationInfo objects are encoded, hashed, and signed following EIP-712
  // See https://eips.ethereum.org/EIPS/eip-712

  const domain = {
    name: "VerificationRegistry",
    version: "1.0",
    chainId,
    verifyingContract: contractAddress
  }

  const types = {
    VerificationResult: [
      { name: "schema", type: "string" },
      { name: "subject", type: "address" },
      { name: "expiration", type: "uint256" }
    ]
  }

  // The dapp sends its own calling address to the verifier, and though the
  // verifier does not need to confirm ownership of the address, it includes
  // the address in the signed digest so that the contract can confirm it
  // and no other subject can use this signed VerificationInfo
  const verificationResult = {
    schema: "centre.io/credentials/kyc",
    subject: subjectAddress,
    expiration: expiration
  }

  // sign the structured result
  const signature = await signer._signTypedData(
    domain,
    types,
    verificationResult
  )

  const verificationInfoSet: VerificationResultResponse = {
    verificationResult: verificationResult,
    signature: signature
  }

  return verificationInfoSet
}
