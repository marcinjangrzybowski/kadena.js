
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const directory = './src/pages/pact/reference/functions'; // Replace with your directory path
const definitionsDir = directory + '/definitions';

// If definitions directory exists, delete it and its contents. Then create a new one.
if (fs.existsSync(definitionsDir)) {
  fs.rmdirSync(definitionsDir, { recursive: true });
}
fs.mkdirSync(definitionsDir);

const files = fs.readdirSync(directory);

files.forEach((file) => {
  // Ensure the file is a markdown file
  if (path.extname(file) === ".md") {
    let filename = "";
    let data = "";
    let isFunctionDefinition = false;

    const readInterface = readline.createInterface({
      input: fs.createReadStream(`${directory}/${file}`),
      output: process.stdout,
      console: false,
    });

    readInterface.on('line', (line) => {
      if(line.startsWith('##')) {
        if (isFunctionDefinition) {
          // Write previous data to file
          fs.writeFile(`${definitionsDir}/${filename}.md`, data, (err) => {
            if (err) throw err;
          });
        }
        // Start capturing new function definition
          filename = line.slice(3).trim();
        data = `---
title: ${filename}
description:
  This document is a reference for the Pact smart-contract language, designed
  for correct, transactional execution on a high-performance blockchain.
menu: Capabilities
label: Capabilities
order: 6
layout: definition
tags: ['pact', 'language reference', 'capabilities']
---

# ${filename}`;
        isFunctionDefinition = true;
      } else if (isFunctionDefinition) {
        data = `${data}\n${line}`;
      }
    });

    readInterface.on('close', () => {
      // Write last function definition to file
      fs.writeFile(`${definitionsDir}/${filename}.md`, data, (err) => {
        if (err) throw err;
      });
    });
  }
});
