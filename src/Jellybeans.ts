import { ponder } from "@/generated";
import { round, submission } from "../ponder.schema";
import { logger } from "./pino";
import { isEmpty } from "./functions";

// Insert round when indexing RoundInitialized
ponder.on("Jellybeans:RoundInitialized", async ({ event, context }) => {
  logger.trace("Jellybeans:RoundInitialized");

  const newRound = {
    id: event.args.roundId,
    question: event.args.question,
    submissionDeadline: event.args.submissionDeadline,
    potAmount: event.args.potAmount,
    decimals: 18,
    numWinners: Number(event.args.numWinners),
    feeAmount: event.args.feeAmount,
    initRoundTxnHash: event.transaction.hash,
    submissionCount: 0,
    correctAnswer: 0n,
    winningAnswer: 0n,
    winners: [],
    isFinalized: false,
    setCorrectAnswerTxnHash: undefined,
  };

  try {
    await context.db.insert(round).values(newRound);
  } catch (error) {
    logger.error(error);
  }
});

// Insert submission and update round submissionCount when indexing GuessSubmitted
ponder.on("Jellybeans:GuessSubmitted", async ({ event, context }) => {
  logger.trace("Jellybeans:GuessSubmitted");

  const newSubmission = {
    id: event.transaction.hash,
    roundId: event.args.roundId,
    submitter: event.args.submitter,
    entry: event.args.guess,
    timestamp: event.block.timestamp,
    txnHash: event.transaction.hash,
  };

  try {
    const data = await context.db.find(round, { id: event.args.roundId });
    if (isEmpty(data)) {
      const errorMessage = `Failed GuessSubmitted; Error finding round ${event.args.roundId}`;
      throw new Error(errorMessage);
    }

    await context.db.insert(submission).values(newSubmission);

    await context.db
      .update(round, {
        id: event.args.roundId,
      })
      .set((row) => ({ submissionCount: row.submissionCount + 1 }));
  } catch (error) {
    logger.error(error);
  }
});

// Update round winner info when indexing WinnerSelected
ponder.on("Jellybeans:WinnerSelected", async ({ event, context }) => {
  logger.trace("Jellybeans:WinnerSelected");

  try {
    await context.db.update(round, { id: event.args.roundId }).set(() => ({
      correctAnswer: event.args.correctAnswer,
      winningAnswer:
        event.args.winners.length !== 0
          ? event.args.winners.reduce((a, b) => (a.entry > b.entry ? a : b))
              .entry
          : 0n,
      winners: event.args.winners.map((submission) => submission.submitter),
      isFinalized: true,
      setCorrectAnswerTxnHash: event.transaction.hash,
    }));
  } catch (error) {
    logger.error(error);
  }
});
