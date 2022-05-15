import { randomBytes } from "crypto"

import {
  buildCreditScoreManifest,
  buildKycAmlManifest
} from "../../lib/issuer/credential-manifest"
import { buildIssuer, randomDidKey } from "../../lib/utils/did-fns"
import { CredentialManifest } from "../../types/CredentialManifest"
import { Issuer } from "../../types/DidJwt"

type GenerateManifestAndIssuer = {
  manifest: CredentialManifest
  issuer: Issuer
}

export async function generateManifestAndIssuer(
  manifestType = "kyc"
): Promise<GenerateManifestAndIssuer> {
  const issuerDidKey = await randomDidKey(randomBytes)
  const issuer = buildIssuer(issuerDidKey.subject, issuerDidKey.privateKey)
  const credentialIssuer = { id: issuer.did, name: "Verite" }
  const manifest =
    manifestType === "kyc"
      ? buildKycAmlManifest(credentialIssuer)
      : buildCreditScoreManifest(credentialIssuer)

  return { manifest, issuer }
}
