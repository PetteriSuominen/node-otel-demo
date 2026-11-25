import { NodeSDK } from "@opentelemetry/sdk-node";

import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";

const sdk = new NodeSDK({
  // spanProcessors: [
  //   sqlServerCompatibilityProcessor,
  //   new tracing.BatchSpanProcessor(
  //     new AzureMonitorTraceExporter({
  //       connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
  //     }),
  //   ),
  // ],
  traceExporter: new AzureMonitorTraceExporter({
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

console.log("OpenTelemetry initialized");
