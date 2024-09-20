import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Round: p.createTable({
    id: p.bigint(),
    question: p.string().optional(),
    submissionDeadline: p.bigint(),
    potAmount: p.bigint(),
    decimals: p.int(),
    feeAmount: p.bigint(),
    initRoundTxnHash: p.hex(),
    correctAnswer: p.bigint(),
    winningAnswer: p.bigint(),
    winners: p.hex().list(),
    isFinalized: p.boolean(),
    setCorrectAnswerTxnHash: p.hex().optional(),
  }),
  Submission: p.createTable({
    id: p.hex(),
    round: p.bigint(),
    submitter: p.hex(),
    entry: p.bigint(),
    timestamp: p.bigint(),
    txnHash: p.hex(),
  }),
}));
