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
      feeAmount: event.args.feeAmount,
      correctAnswer: 0n,
      winningAnswer: 0n,
      winners: [],
      isFinalized: false,
    },
  });
});

ponder.on("Jellybeans:GuessSubmitted", async ({ event, context }) => {
  console.log("Jellybeans:GuessSubmitted");

  const { Submission } = context.db;

  await Submission.create({
    id: event.transaction.hash,
    data: {
      round: event.args.roundId,
      submitter: event.args.submitter,
      entry: event.args.guess,
      txnHash: event.transaction.hash,
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
      winningAnswer: event.args.winners.reduce((a, b) =>
        a.entry > b.entry ? a : b
      ).entry,
      winners: event.args.winners.map((submission) => submission.submitter),
      isFinalized: true,
    },
  });
});
