import { buildCreditScoreManifest } from "verite"

import { fullURL } from "../utils"
import { manifestIssuer } from "./issuer"

import type { CredentialManifest } from "verite"

export const creditScoreManifest: CredentialManifest = buildCreditScoreManifest(
  manifestIssuer,
  {
    thumbnail: {
      uri: fullURL("/img/credit-score-thumbnail.png"),
      alt: "Verite Logo"
    },
    hero: {
      uri: fullURL("/img/credit-score-hero.png"),
      alt: "Credit Score Visual"
    },
    background: {
      color: "#8B5CF6"
    },
    text: {
      color: "#FFFFFF"
    }
  }
)
