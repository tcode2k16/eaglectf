const execSync = require('child_process').execSync;
const fs = require('fs-extra');

const config = require('./config.json');

const dirs = fs.readdirSync('./challenges');
const dirName = './dist'


if (fs.existsSync(dirName)) fs.removeSync(dirName);

fs.mkdirpSync(dirName);

function genToken() {
  return Math.random().toString(16).substr(2);
}

let game = {
  maxLevel: dirs.length,
  hints: [],
  urls: [],
  flags: [],
  points: [],
};

for (let i = 0; i < dirs.length; i++) {

  const levelPath = `./challenges/level${i}`;
  const levelConfig = require(`${levelPath}/config.json`);
  game.hints.push(levelConfig.hints);
  game.flags.push(levelConfig.flag);
  game.points.push(levelConfig.point);
  const token = genToken();
  game.urls.push(`${config.isHttps ? 'https' : 'http' }://${config.domain}/${token}`);
  fs.mkdirSync(`${dirName}/${token}`);
  
  for (let file of fs.readdirSync(levelPath)) {
    if (file === 'config.json') continue;
    fs.copyFileSync(`${levelPath}/${file}`, `${dirName}/${token}/${file}`);
  }
  
}


fs.writeJSONSync('./game.json', game);

execSync(`cd ${dirName} && yes '' | surge --domain ${config.domain}`)

console.log('job done!');

// game = {
//   "maxLevel": dir.length,
//   "hints": [
//     ["hint 1 for level0", "hint 2 for level0"],
//     ["hint 1 for level1", "hint 2 for level1"],
//     ["hint 1 for level2"]
//   ],
//   "urls": ["http://test.cf/level0", "http://test.cf/level1", "http://test.cf/level2", "http://test.cf/level3", "http://test.cf/level4", "http://test.cf/level5", "http://test.cf/level6", "http://test.cf/level7", "http://test.cf/level8", "http://test.cf/level9"],
//   "flags": ["flag0", "flag1", "flag2", "flag3", "flag4", "flag5", "flag6", "flag7", "flag8", "flag9"],
//   "points": [ 3, 3, 3, 3, 3, 1, 2, 3, 1, 2 ]

// }
