import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import fetch from "node-fetch";

const PROTO_PATH = "/proto/processor.proto";
const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObj = grpc.loadPackageDefinition(packageDef).distributed;

// HTTP function for PHP service
async function callHTTPService(serviceName, address, text) {
  try {
    const response = await fetch(`http://${address}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    });
    const data = await response.json();
    return `[SUCCESS] ${serviceName}: ${data.result}`;
  } catch (error) {
    return `[FAIL] ${serviceName}: Failed - ${error.message}`;
  }
}

// gRPC function for other services
function callGRPCService(serviceName, address, text) {
  return new Promise((resolve, reject) => {
    const client = new grpcObj.Processor(
      address,
      grpc.credentials.createInsecure()
    );

    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 10);

    client.Process({ text }, { deadline: deadline.getTime() }, (err, resp) => {
      if (err) {
        reject(`[FAIL] ${serviceName} error: ${err.message}`);
      } else {
        resolve(`[SUCCESS] ${serviceName}: ${resp.result}`);
      }
    });
  });
}

// Main distributed system function
async function runDistributedSystem() {
  const text =
    "Hello world! This text will be processed by all 5 distributed services running on different laptops. In this parallel computing assignment, we are using 5 devices. Right now it is sucessfully compilied";

  const services = {
    python: { address: "10.212.95.147:50051", type: "grpc" },
    php: { address: "10.212.94.105:50052", type: "http" },
    cpp: { address: "10.212.93.250:50053", type: "grpc" },
    javascript: { address: "10.212.92.254:50054", type: "grpc" }, // Changed from "node"
    java: { address: "10.212.94.229:50055", type: "grpc" },
  };

  console.log("=".repeat(60));
  console.log("STARTING DISTRIBUTED SERVICE CALLS");
  console.log("Targeting 5 services across different machines");
  console.log("=".repeat(60));
  console.log("");

  const promises = Object.entries(services).map(([serviceName, config]) => {
    console.log(
      `Calling ${serviceName.toUpperCase()} service at ${config.address}`
    );
    if (config.type === "http") {
      return callHTTPService(serviceName, config.address, text);
    } else {
      return callGRPCService(serviceName, config.address, text);
    }
  });

  const results = await Promise.allSettled(promises);

  console.log("\n" + "=".repeat(60));
  console.log("FINAL RESULTS");
  console.log("=".repeat(60));

  results.forEach((result, index) => {
    const serviceName = Object.keys(services)[index];
    if (result.status === "fulfilled") {
      console.log(result.value);
    } else {
      console.log(`[FAIL] ${serviceName}: Failed - ${result.reason}`);
    }
  });
}

// Performance testing functions
async function runPerformanceTest() {
  const testText =
    "Hello world! This is a performance test text for distributed systems analysis. We are testing the parallel processing capabilities across multiple machines and services running in different programming languages and environments.";

  console.log("\n" + "=".repeat(60));
  console.log("PERFORMANCE COMPARISON TEST");
  console.log("=".repeat(60));

  // HTTP function with timing
  async function callHTTPServiceTimed(serviceName, address, text) {
    const startTime = performance.now();
    try {
      const response = await fetch(`http://${address}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text }),
      });
      const data = await response.json();
      const endTime = performance.now();
      return {
        success: true,
        latency: endTime - startTime,
      };
    } catch (error) {
      const endTime = performance.now();
      return {
        success: false,
        latency: endTime - startTime,
      };
    }
  }

  // gRPC function with timing
  function callGRPCServiceTimed(serviceName, address, text) {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const client = new grpcObj.Processor(
        address,
        grpc.credentials.createInsecure()
      );

      const deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + 10);

      client.Process(
        { text },
        { deadline: deadline.getTime() },
        (err, resp) => {
          const endTime = performance.now();
          if (err) {
            resolve({
              success: false,
              latency: endTime - startTime,
            });
          } else {
            resolve({
              success: true,
              latency: endTime - startTime,
            });
          }
        }
      );
    });
  }

  // Simulate single machine (sequential processing)
  async function simulateSingleMachine(text, iterations = 5) {
    console.log("\nSINGLE MACHINE TEST (Sequential Processing)");
    console.log("-".repeat(50));

    const singleMachineTimes = [];

    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();

      const services = [
        {
          name: "python",
          process: () =>
            callGRPCServiceTimed("python", "10.212.95.147:50051", text),
        },
        {
          name: "php",
          process: () =>
            callHTTPServiceTimed("php", "10.212.94.105:50052", text),
        },
        {
          name: "cpp",
          process: () =>
            callGRPCServiceTimed("cpp", "10.212.93.250:50053", text),
        },
        {
          name: "javascript",
          process: () =>
            callGRPCServiceTimed("javascript", "10.212.92.254:50054", text),
        },
        {
          name: "java",
          process: () =>
            callGRPCServiceTimed("java", "10.212.94.229:50055", text),
        },
      ];

      // Run sequentially
      for (const service of services) {
        await service.process();
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      singleMachineTimes.push(totalTime);

      console.log(`  Iteration ${i + 1}: ${totalTime.toFixed(2)}ms`);
    }

    return singleMachineTimes;
  }

  // Test distributed system (parallel processing)
  async function testDistributedSystem(text, iterations = 5) {
    console.log("\nDISTRIBUTED SYSTEM TEST (Parallel Processing)");
    console.log("-".repeat(50));

    const distributedTimes = [];
    const serviceBreakdown = {
      python: [],
      php: [],
      cpp: [],
      javascript: [],
      java: [],
    };

    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();

      const services = {
        python: { address: "10.212.95.147:50051", type: "grpc" },
        php: { address: "10.212.94.105:50052", type: "http" },
        cpp: { address: "10.212.93.250:50053", type: "grpc" },
        javascript: { address: "10.212.92.254:50054", type: "grpc" },
        java: { address: "10.212.94.229:50055", type: "grpc" },
      };

      const promises = Object.entries(services).map(
        async ([serviceName, config]) => {
          const serviceStart = performance.now();
          let result;

          if (config.type === "http") {
            result = await callHTTPServiceTimed(
              serviceName,
              config.address,
              text
            );
          } else {
            result = await callGRPCServiceTimed(
              serviceName,
              config.address,
              text
            );
          }

          const serviceEnd = performance.now();
          const serviceLatency = serviceEnd - serviceStart;

          serviceBreakdown[serviceName].push({
            latency: serviceLatency,
            success: result.success,
            iteration: i + 1,
          });

          return result;
        }
      );

      await Promise.all(promises);
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      distributedTimes.push(totalTime);

      console.log(`  Iteration ${i + 1}: ${totalTime.toFixed(2)}ms`);
    }

    return { distributedTimes, serviceBreakdown };
  }

  // Calculate statistics
  function calculateStats(times) {
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    const variance =
      times.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / times.length;
    const stdDev = Math.sqrt(variance);
    return { avg, min, max, stdDev };
  }

  // Run both tests
  const singleMachineTimes = await simulateSingleMachine(testText, 5);
  const distributedResults = await testDistributedSystem(testText, 5);

  // Generate performance report
  const singleStats = calculateStats(singleMachineTimes);
  const distributedStats = calculateStats(distributedResults.distributedTimes);

  console.log("\n" + "=".repeat(60));
  console.log("PERFORMANCE COMPARISON REPORT");
  console.log("=".repeat(60));

  console.log("\nSINGLE MACHINE (Sequential Processing):");
  console.log("  Average Time:".padEnd(25) + `${singleStats.avg.toFixed(2)}ms`);
  console.log("  Minimum Time:".padEnd(25) + `${singleStats.min.toFixed(2)}ms`);
  console.log("  Maximum Time:".padEnd(25) + `${singleStats.max.toFixed(2)}ms`);
  console.log(
    "  Standard Deviation:".padEnd(25) + `${singleStats.stdDev.toFixed(2)}ms`
  );

  console.log("\nDISTRIBUTED SYSTEM (Parallel Processing):");
  console.log(
    "  Average Time:".padEnd(25) + `${distributedStats.avg.toFixed(2)}ms`
  );
  console.log(
    "  Minimum Time:".padEnd(25) + `${distributedStats.min.toFixed(2)}ms`
  );
  console.log(
    "  Maximum Time:".padEnd(25) + `${distributedStats.max.toFixed(2)}ms`
  );
  console.log(
    "  Standard Deviation:".padEnd(25) +
      `${distributedStats.stdDev.toFixed(2)}ms`
  );

  console.log("\nPERFORMANCE IMPROVEMENT:");
  const improvement = (
    ((singleStats.avg - distributedStats.avg) / singleStats.avg) *
    100
  ).toFixed(2);
  console.log("  Speedup:".padEnd(25) + `${improvement}% faster`);
  console.log(
    "  Parallelism Efficiency:".padEnd(25) +
      `${((distributedStats.avg / singleStats.avg) * 100).toFixed(2)}%`
  );

  console.log("\nINDIVIDUAL SERVICE PERFORMANCE:");
  Object.entries(distributedResults.serviceBreakdown).forEach(
    ([service, data]) => {
      const latencies = data.map((d) => d.latency);
      const stats = calculateStats(latencies);
      const successRate = (
        (data.filter((d) => d.success).length / data.length) *
        100
      ).toFixed(1);
      console.log(
        `  ${service.toUpperCase().padEnd(10)} ${stats.avg.toFixed(
          2
        )}ms avg (${successRate}% success)`
      );
    }
  );

  // Calculate theoretical vs actual speedup
  const theoreticalSpeedup = 5; // Ideal for 5 parallel services
  const actualSpeedup = singleStats.avg / distributedStats.avg;
  console.log("\nPARALLELISM ANALYSIS:");
  console.log(
    "  Theoretical Speedup (ideal):".padEnd(35) +
      `${theoreticalSpeedup.toFixed(2)}x`
  );
  console.log("  Actual Speedup:".padEnd(35) + `${actualSpeedup.toFixed(2)}x`);
  console.log(
    "  Parallel Efficiency:".padEnd(35) +
      `${((actualSpeedup / theoreticalSpeedup) * 100).toFixed(1)}%`
  );
}

// Main function that runs everything
async function main() {
  try {
    // Run the distributed system
    await runDistributedSystem();

    // Run performance test
    await runPerformanceTest();

    console.log("\n" + "=".repeat(60));
    console.log("ALL TESTS COMPLETED SUCCESSFULLY");
    console.log("=".repeat(60));
  } catch (error) {
    console.error("Error:", error);
  }
}

// Start everything
main();
