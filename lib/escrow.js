/**
 * SponsorSync Escrow & Milestone Calculations
 */

export const DEFAULT_PLATFORM_FEE_PCT = 0.05; // 5% platform fee

export function calculateEscrowBreakdown(grossAmount, feePct = DEFAULT_PLATFORM_FEE_PCT) {
  const amount = Math.max(0, Number(grossAmount) || 0);
  const fee = Math.round(amount * feePct);
  const netPayout = amount - fee;

  return {
    grossAmount: amount,
    platformFeePct: feePct,
    platformFeeAmount: fee,
    netPayout,
  };
}

export const MILESTONE_STAGES = [
  { id: "FUNDED", label: "Milestone Funded", order: 1 },
  { id: "CONCEPT_APPROVED", label: "Concept Approved", order: 2 },
  { id: "DRAFT_UPLOADED", label: "Draft Uploaded", order: 3 },
  { id: "PROOF_VERIFIED", label: "Proof Verified", order: 4 },
  { id: "RELEASED", label: "Funds Released", order: 5 },
];

export function isMilestoneProgressionValid(currentStage, nextStage) {
  const currentIdx = MILESTONE_STAGES.findIndex((s) => s.id === currentStage);
  const nextIdx = MILESTONE_STAGES.findIndex((s) => s.id === nextStage);
  if (currentIdx === -1 || nextIdx === -1) return false;
  return nextIdx >= currentIdx;
}
