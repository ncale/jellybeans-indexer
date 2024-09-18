import { ponder } from "@/generated";

ponder.on("Jellybeans:FeesWithdrawn", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("Jellybeans:GuessSubmitted", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("Jellybeans:RoleAdminChanged", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("Jellybeans:RoleGranted", async ({ event, context }) => {
  console.log(event.args);
});
