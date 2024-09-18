import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Round: p.createTable({
    id: p.bigint(),
    question: p.string().optional(),
    submissionDeadline: p.bigint(),
    potAmount: p.bigint(),
    feeAmount: p.bigint(),
    correctAnswer: p.bigint(),
    winningAnswer: p.bigint(),
    winners: p.hex().list(),
    isFinalized: p.boolean(),
  }),
  Submission: p.createTable({
    id: p.hex(),
    round: p.bigint(),
    submitter: p.hex(),
    entry: p.bigint(),
  }),
}));
