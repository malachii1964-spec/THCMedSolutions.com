import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";

const PORT = 5522;

function portOpen(): Promise<boolean> {
  return new Promise((resolve) => {
    const sock = net.connect({ port: PORT, host: "127.0.0.1" });
    sock.once("connect", () => {
      sock.destroy();
      resolve(true);
    });
    sock.once("error", () => resolve(false));
  });
}

/** Start the embedded dev-database sidecar if nothing is on its port yet. */
export async function startDevDb(): Promise<void> {
  if (await portOpen()) return;

  const script = path.join(process.cwd(), "scripts", "dev-db.mjs");
  const child = spawn(process.execPath, [script], {
    stdio: "inherit",
    env: process.env,
  });
  child.unref();

  // Wait (up to ~15s) for the sidecar to accept connections.
  for (let i = 0; i < 150; i++) {
    if (await portOpen()) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  console.warn(
    "[dev-db] sidecar did not come up in time; database queries may fail",
  );
}
