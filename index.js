#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const { exec } = require('child_process');

const blacklist = [
    'node_modules',
    'package-lock.json'
]

let inputDir, globalDir;

if (process.env.npm_execpath) {
    if (process.env.npm_execpath.includes('yarn')) {
        globalDir = require('child_process').execSync('yarn global dir').toString().trim();
        inputDir = `${globalDir}/node_modules/create-jeff-backend/dist`;
    } else if (process.env.npm_execpath.includes('npm')) {
        globalDir = require('child_process').execSync('npm root -g').toString().trim();
        inputDir = `${globalDir}/create-jeff-backend/dist`;      
    }
} else {
    inputDir = './dist';
}

// Recursively copy all files and directories from dist to output
function copyRecursive(src, dest) {
    const files = fs.readdirSync(src);

    for (const file of files) {
        if (blacklist.includes(file)) {
            continue;
        }

        const srcPath = `${src}/${file}`;
        const destPath = `${dest}/${file}`;
        const fileStat = fs.statSync(srcPath);

        if (fileStat.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    // Replace {{appName}} with provided app name in package.json
    const appName = await askQuestion('Enter app name: ');
    const outputDir = appName || 'app-name';


    // Check if output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    copyRecursive(inputDir, outputDir);

    // rename .env.example to .env
    fs.renameSync(`${outputDir}/.env.example`, `${outputDir}/.env`);

    // Rewrite package name
    let packageJson = fs.readFileSync(`${outputDir}/package.json`, 'utf8');
    packageJson = packageJson.replace('{{appName}}', appName);
    fs.writeFileSync(`${outputDir}/package.json`, packageJson);

    // Replace {{PORT}} with provided app name in package.json
    let PORT = await askQuestion('REST Server port (default:3000): ')
        PORT = PORT || 3000;
        
    envFile = fs.readFileSync(`${outputDir}/.env`, 'utf8');
    envFile = envFile.replace('{{PORT}}', PORT);
    fs.writeFileSync(`${outputDir}/.env`, envFile);

    // Replace {{SOCKET_PORT}} with provided app name in package.json
    let SOCKET_PORT = await askQuestion('Socket port (default:3000): ')
        SOCKET_PORT = SOCKET_PORT || 3000;

    envFile = fs.readFileSync(`${outputDir}/.env`, 'utf8');
    envFile = envFile.replace('{{SOCKET_PORT}}', SOCKET_PORT);
    fs.writeFileSync(`${outputDir}/.env`, envFile);

    if (process.env.npm_execpath) {
        if (process.env.npm_execpath.includes('yarn')) {
            console.log('Installing dependencies, this may take a minute')
            exec(`cd ${outputDir} && yarn install`)
        } else if (process.env.npm_execpath.includes('npm')) {
            console.log('Installing dependencies, this may take a minute')
            exec(`cd ${outputDir} && npm install`)
        }
    } 
    rl.close()
}

main()