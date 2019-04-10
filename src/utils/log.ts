export function log(data: string, id: string): void {
  const date = new Date().toISOString();
  process.stdout.write(`[${date}] - [${id.toUpperCase()}] ${data}\n`);
}
