/* This is free and unencumbered software released into the public domain. */

const core = require('@actions/core');
const github = require('@actions/github');

const Arweave = require('arweave');

async function run() {
  try {
    const walletKey = JSON.parse(core.getInput('wallet-key'));
    const commitLink = core.getInput('commit-link');
    console.log("Include a commit link:", commitLink); // TODO: remove

    const commit = github.context.payload.head_commit;
    console.log("The HEAD commit:", commit);

    const arweave = Arweave.init({host: 'arweave.net', port: 443, protocol: 'https'});

    const transaction = await arweave.createTransaction({data: commit.message}, walletKey);
    transaction.addTag("Content-Type", "text/plain");
    transaction.addTag("App-Name", "Gitstamp");
    transaction.addTag("Git-Commit", commit.id);
    if (commitLink) {
      transaction.addTag("Git-Commit-Link", commit.url);
    }
    transaction.addTag("Git-Author", "https://github.com/" + commit.author.username);
    transaction.addTag("Git-Committer", "https://github.com/" + commit.committer.username);
    transaction.addTag("Git-Committer-Date", commit.timestamp);

    await arweave.transactions.sign(transaction, walletKey);
    console.log("The Arweave transaction:", transaction);
    core.setOutput("transaction-id", transaction.id);
    core.setOutput("transaction-link", "https://viewblock.io/arweave/tx/" + transaction.id);

    const response = await arweave.transactions.post(transaction);
    console.log("The Arweave response:", response);
    core.setOutput("response-code", response.status);
    core.setOutput("response-text", response.statusText);
  }
  catch (error) {
    core.setFailed(error);
    console.trace();
  }
}

run();
