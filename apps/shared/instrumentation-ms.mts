import "@microsoft/opentelemetry/loader";

import { useMicrosoftOpenTelemetry } from "@microsoft/opentelemetry";

useMicrosoftOpenTelemetry({
  azureMonitor: {
    azureMonitorExporterOptions: {
      connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    },
  },
  enableConsoleExporters: true,
});

console.log("Microsoft OpenTelemetry loader initialized");
