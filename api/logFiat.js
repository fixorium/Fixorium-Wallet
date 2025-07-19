 import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { type, wallet, input, output, timestamp } = req.body;
  if (!type || !wallet || input == null || output == null || !timestamp) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const log = {
    type,
    wallet,
    input,
    output,
    timestamp: new Date(timestamp).toISOString()
  };

  try {
    const logsPath = path.join(process.cwd(), 'logs.json');
    const logs = fs.existsSync(logsPath)
      ? JSON.parse(fs.readFileSync(logsPath, 'utf8'))
      : [];

    logs.push(log);
    fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2));
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Log error:', err);
    return res.status(500).json({ error: 'Failed to log transaction' });
  }
}
