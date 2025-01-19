import { onchainTable } from "@ponder/core";

export const round = onchainTable("Round", (p) => ({
  id: p.bigint().primaryKey(),
  question: p.text(), // optional
  submissionDeadline: p.bigint().notNull(),
  potAmount: p.bigint().notNull(),
  decimals: p.integer().notNull(),
  numWinners: p.integer().notNull(),
  feeAmount: p.bigint().notNull(),
  initRoundTxnHash: p.hex().notNull(),
  submissionCount: p.integer().notNull(),
  correctAnswer: p.bigint(),
  winningAnswer: p.bigint(),
  winners: p.hex().array(),
  isFinalized: p.boolean().notNull().default(false),
  setCorrectAnswerTxnHash: p.hex(), // optional
}));

export const submission = onchainTable("Submission", (p) => ({
  id: p.hex().notNull().primaryKey(),
  roundId: p.bigint().notNull(), // foreign key to rounds.id
  submitter: p.hex().notNull(),
  entry: p.bigint().notNull(),
  timestamp: p.bigint().notNull(),
  txnHash: p.hex().notNull(),
}));
