import {
  CreatePresentationOptions,
  VerifyPresentationOptions
} from "did-jwt-vc/src/types"
import { v4 as uuidv4 } from "uuid"

import {
  buildIssuer,
  decodeVerifiablePresentation,
  encodeVerifiablePresentation
} from "../utils"

import type {
  CredentialManifest,
  DecodedCredentialApplication,
  DescriptorMap,
  DidKey,
  EncodedCredentialApplication
} from "../../types"

/**
 * Generates a Credential Application as response to a Credential Manifest
 *
 * @returns an encoded & signed application that can be submitted to the issuer
 */
export async function buildCredentialApplication(
  didKey: DidKey,
  manifest: CredentialManifest,
  options?: CreatePresentationOptions
): Promise<EncodedCredentialApplication> {
  const client = buildIssuer(didKey.subject, didKey.privateKey)

  const credentialApplication = {
    id: uuidv4(),
    manifest_id: manifest.id,
    format: {
      jwt_vp: manifest.presentation_definition?.format?.jwt_vp
    }
  }

  let presentationSubmission
  if (manifest.presentation_definition) {
    presentationSubmission = {
      id: uuidv4(),
      definition_id: manifest.presentation_definition?.id,
      descriptor_map:
        manifest.presentation_definition?.input_descriptors?.map<DescriptorMap>(
          (d) => {
            return {
              id: d.id,
              format: "jwt_vp",
              path: `$.presentation`
            }
          }
        )
    }
  }

  const vp = await encodeVerifiablePresentation(
    client.did,
    undefined,
    client,
    options,
    ["VerifiablePresentation", "CredentialApplication"],
    {
      credential_application: credentialApplication,
      presentation_submission: presentationSubmission
    }
  )

  return vp
}

/**
 * Decode an encoded Credential Application.
 *
 * A Credential Application contains an encoded Verifiable Presentation in it's
 * `presentation` field. This method decodes the Verifiable Presentation and
 * returns the decoded application.
 */
export async function decodeCredentialApplication(
  credentialApplication: EncodedCredentialApplication,
  options?: VerifyPresentationOptions
): Promise<DecodedCredentialApplication> {
  const decodedPresentation = await decodeVerifiablePresentation(
    credentialApplication,
    options
  )

  return decodedPresentation as DecodedCredentialApplication
}

/**
 * Fetches the manifest id from a credential application
 */
export function getManifestIdFromCredentialApplication(
  application: DecodedCredentialApplication
): string {
  return application.credential_application.manifest_id
}
