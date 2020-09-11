# Gitstamp for GitHub Actions

[![Project license](https://img.shields.io/badge/license-Public%20Domain-blue.svg)](https://unlicense.org)
[![Gitstamp](https://github.com/artob/gitstamp-action/workflows/Gitstamp/badge.svg)](https://github.com/artob/gitstamp-action/actions?query=workflow%3AGitstamp)

This is a [GitHub Action] for timestamping your Git commits using the
[Arweave] permaweb.

By adding this action to your GitHub repository, the SHA-1 commit hash and
commit metadata of your latest commit will get permanently and uncensorably
timestamped on Arweave every time you push to the repository. This makes it
easy to prove to any third party that a particular commit was created no
later than the time when it was timestamped on Arweave.

## Sample

The Git commit metadata is recorded on the blockweave as follows:

<img alt="Screenshot of Gitstamp metadata" src="https://raw.githubusercontent.com/artob/gitstamp-action/master/sample.png" width="480"/>

## Usage

Once you are set up with an [Arweave wallet], using this action in your
GitHub project is straightforward:

### `.github/workflows/gitstamp.yaml`

Paste the following into a `.github/workflows/gitstamp.yaml` file in your
GitHub repository:

```yaml
---
name: Gitstamp
on: [push]
jobs:
  gitstamp:
    runs-on: ubuntu-latest
    name: Timestamp commit with Gitstamp
    steps:
      - name: Clone repository
        uses: actions/checkout@v2
      - name: Submit Gitstamp transaction
        uses: artob/gitstamp-action@v1
        with:
          wallet-key: ${{ secrets.GITSTAMP_KEYFILE }}
          commit-link: true
```

### Repository secrets

Add the contents of an Arweave wallet key file to a GitHub repository
secret. The secret can be named anything you like, but we suggest
`GITSTAMP_KEYFILE` to match the workflow file above.

## Costs

Each Arweave transaction requires an enclosed transaction fee to pay for
transaction processing and permanent storage on the Arweave network.
In practice, this works out to less than USD$0.00001 per timestamped commit.
This fee is deducted from the wallet configured in the repository secrets.

## Dependencies

- [Arweave JS](https://github.com/ArweaveTeam/arweave-js)

## Inputs

### `wallet-key`

The Arweave wallet key to use for signing transactions and paying
transaction fees.

## `commit-link`

A boolean indicating whether to include a GitHub commit link.
Defaults to `false` for privacy reasons.

## Outputs

### `transaction-id`

The Arweave transaction ID.

For example, `guSFLDoc3dvdeZg-fBCp6uLeLHb_gGLCW__eefqtHM0`.

### `transaction-link`

The Arweave transaction explorer link on [ViewBlock.io](https://viewblock.io).

For example, <https://viewblock.io/arweave/tx/guSFLDoc3dvdeZg-fBCp6uLeLHb_gGLCW__eefqtHM0>.

### `response-code`

The Arweave HTTP API response status code.

### `response-text`

The Arweave HTTP API response status text.

[GitHub Action]:  https://github.com/features/actions
[Arweave]:        https://www.arweave.org
[Arweave wallet]: https://www.arweave.org/wallet
