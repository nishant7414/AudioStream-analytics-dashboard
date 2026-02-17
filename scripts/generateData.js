import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SHOW_NAMES = [
  'Mahabharat Ki Kahani', 'Savdhaan India', 'Kaisi Yeh Yaariyan',
  'Crime Patrol', 'Yeh Rishta Kya Kehlata Hai', 'Naagin', 'Kumkum Bhagya',
  'Kasautii Zindagii Kay', 'Anupamaa', 'Taarak Mehta Ka Ooltah Chashmah',
  'Bigg Boss', 'Indian Idol', 'The Kapil Sharma Show', 'Kaun Banega Crorepati',
  'Sacred Games', 'Delhi Crime', 'Family Man', 'Aspirants', 'Panchayat',
  'Scam 1992', 'Criminal Justice', 'Breathe', 'Bose', 'Hostel Days',
  'Permanent Roommates', 'TVF Pitchers', 'Kota Factory', 'Gullak',
  'Tripling', 'Yeh Meri Family', 'Laakhon Mein Ek', 'Flames',
  'ImMature', 'Cheesecake', 'Tech Conversations', 'Stories by Rabia',
  'Better Life', 'Humorously Yours', 'The Test Case', 'Little Things',
];

const DEVICE_TYPES = ['mobile', 'tablet', 'desktop', 'smart_speaker'];
const USER_TYPES = ['new', 'returning'];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(d) {
  return d.toISOString().split('T')[0];
}

function generateSyntheticData(rowCount = 10000) {
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  const uniqueUsers = new Set();
  const numUsers = randomInt(800, 1200);
  for (let i = 0; i < numUsers; i++) {
    uniqueUsers.add(`user_${String(i).padStart(5, '0')}`);
  }
  const userIds = Array.from(uniqueUsers);
  const data = [];
  let sessionId = 0;
  for (let i = 0; i < rowCount; i++) {
    const user_id = randomChoice(userIds);
    sessionId += 1;
    const date = randomDate(startDate, endDate);
    const show_name = randomChoice(SHOW_NAMES);
    const episode_id = `ep_${randomInt(1, 500)}`;
    const listening_time_minutes = randomInt(1, 120);
    const completed_episode = Math.random() < 0.35;
    const device_type = randomChoice(DEVICE_TYPES);
    const user_type = randomChoice(USER_TYPES);
    data.push({
      user_id,
      session_id: `session_${sessionId}`,
      date: formatDate(date),
      show_name,
      episode_id,
      listening_time_minutes,
      completed_episode,
      device_type,
      user_type,
    });
  }
  return data;
}

const data = generateSyntheticData(10000);
const outPath = path.join(__dirname, '..', 'public', 'data.json');
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(data), 'utf8');
console.log(`Generated ${data.length} rows at ${outPath}`);
