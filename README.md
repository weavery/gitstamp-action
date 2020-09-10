# Gitstamp GitHub Action

[![Project license](https://img.shields.io/badge/license-Public%20Domain-blue.svg)](https://unlicense.org)

This is a [GitHub Action] for timestamping your Git commits using the
[Arweave] permaweb.

## Usage

### `.github/workflows/gitstamp.yml`

Paste the following into a `.github/workflows/gitstamp.yml` file in your
GitHub repository:

```yaml
---
name: Gitstamp
on: [push]
jobs:
  gitstamp:
    runs-on: ubuntu-latest
    name: Record commit on Gitstamp
    steps:
      - name: Clone repository
        uses: actions/checkout@v2
      - name: Submit Arweave transaction
        uses: artob/gitstamp-action
        with:
          wallet-key: ${{ secrets.ARWEAVE_KEYFILE }}
```

### Repository secrets

Add the contents of an Arweave wallet key file to a GitHub repository
secret. It can be named anything you like, but we suggest `ARWEAVE_KEYFILE`
to match the workflow file above.

## Dependencies

- [Arweave JS](https://github.com/ArweaveTeam/arweave-js)

## Inputs

### `wallet-key`

The Arweave wallet key to use for signing transactions.

## Outputs

### `transaction-id`

The Arweave transaction ID.

For example, `V0rmZV1hL-GMJSbCe3cJycPECE1_P8hNbyPVeJO7BJY`.

### `transaction-link`

The Arweave transaction on [ViewBlock.io](https://viewblock.io).

For example, <https://viewblock.io/arweave/tx/V0rmZV1hL-GMJSbCe3cJycPECE1_P8hNbyPVeJO7BJY>.

### `response-code`

The Arweave HTTP API response status code.

### `response-text`

The Arweave HTTP API response status text.

[GitHub Action]: https://github.com/features/actions
[Arweave]:       https://www.arweave.org
