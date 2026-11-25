// import type { tracing } from "@opentelemetry/sdk-node";

// export const sqlServerCompatibilityProcessor: tracing.SpanProcessor = {
//   onStart(span) {
//     if (span.attributes["db.system.name"] !== "microsoft.sql_server") {
//       return;
//     }

//     if (span.attributes["db.system"] === undefined) {
//       console.log("Setting db.system attribute to mssql for span");
//       span.setAttribute("db.system", "mssql");
//     }

//     const database = span.attributes["db.namespace"];
//     if (
//       span.attributes["db.name"] === undefined &&
//       typeof database === "string"
//     ) {
//       console.log(`Setting db.name attribute to ${database} for span`);
//       span.setAttribute("db.name", database);
//     }
//   },
//   onEnd(_span) {
//     // No action needed on span end
//   },
//   async forceFlush(): Promise<void> {
//     // No action needed for force flush
//   },
//   async shutdown(): Promise<void> {
//     // No action needed for shutdown
//   },
// };

export {};
