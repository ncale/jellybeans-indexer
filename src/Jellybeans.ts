import { ponder } from "@/generated";

ponder.on("Jellybeans:RoundInitialized", async ({ event, context }) => {
  console.log("Jellybeans:RoundInitialized");

  const { Round } = context.db;

  await Round.create({
    id: event.args.roundId,
    data: {
      question: event.args.question,
      submissionDeadline: event.args.submissionDeadline,
      potAmount: event.args.potAmount,
      decimals: 18,
      feeAmount: event.args.feeAmount,
      initRoundTxnHash: event.transaction.hash,
      submissionCount: 0,
      correctAnswer: 0n,
      winningAnswer: 0n,
      winners: [],
      isFinalized: false,
      setCorrectAnswerTxnHash: undefined,
    },
  });
});

ponder.on("Jellybeans:GuessSubmitted", async ({ event, context }) => {
  console.log("Jellybeans:GuessSubmitted");

  const { Submission, Round } = context.db;

  await Submission.create({
    id: event.transaction.hash,
    data: {
      roundId: event.args.roundId,
      submitter: event.args.submitter,
      entry: event.args.guess,
      timestamp: event.block.timestamp,
      txnHash: event.transaction.hash,
    },
  });

  const data = await Round.findUnique({ id: event.args.roundId });
  if (!data) {
    throw new Error(
      `Failed GuessSubmitted; Error finding round ${event.args.roundId}`
    );
  }

  await Round.update({
    id: event.args.roundId,
    data: {
      submissionCount: data.submissionCount + 1,
    },
  });
});

ponder.on("Jellybeans:WinnerSelected", async ({ event, context }) => {
  console.log("Jellybeans:WinnerSelected");

  const { Round } = context.db;

  Round.update({
    id: event.args.roundId,
    data: {
      correctAnswer: event.args.correctAnswer,
      winningAnswer:
        event.args.winners.length !== 0
          ? event.args.winners.reduce((a, b) => (a.entry > b.entry ? a : b))
              .entry
          : 0n,
      winners: event.args.winners.map((submission) => submission.submitter),
      isFinalized: true,
      setCorrectAnswerTxnHash: event.transaction.hash,
    },
  });
});
