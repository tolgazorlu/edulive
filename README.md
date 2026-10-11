# EduLive

A web3-enabled educational live streaming platform where educators stream classes and students support them with crypto donations.

## About

EduLive lets educators create and run live educational streams while students watch, chat, and send on-chain donations to support creators. Built 2024-12 to 2025-01 for the EduChain hackathon, where it won a prize for its use of blockchain donations in education.

## Features

- Live streaming for classes via Stream.io video infrastructure
- Live chat alongside each stream
- Wallet-based authentication through OpenCampus ID Connect
- On-chain donations to streamers through a custom Solidity contract
- Stream creation flow that issues RTMP URL and stream key

## Tech stack

**Client**: React 18, TypeScript, Vite, TailwindCSS, shadcn/ui, React Query, React Router, Stream.io video/chat SDKs, Ethers.js

**Server**: Node.js, Express, TypeScript, MongoDB (Mongoose)

**Contracts**: Solidity, Foundry

## Architecture

```
client/     React SPA (Vite) - pages, stream UI, donation form, OCID auth
server/     Express API - stream, auth and donation routes, MongoDB models
contracts/  Foundry project - Edulive.sol donation contract and deploy script
```

## Getting started

### Client
```
cd client
yarn install
yarn dev
```
Required env vars (`client/.env.example`): `VITE_API_KEY` (Stream.io API key).

### Server
```
cd server
npm install
npm run dev
```
Required env vars (`server/.env.example`): `PORT`, `MONGO_URI`, `API_KEY`, `SECRET_KEY`.

### Contracts
```
cd contracts
forge build
forge script script/DeployEdulive.s.sol --broadcast
```
Required env var (`contracts/.env.example`): `ACCOUNT_PRIVATE_KEY`.

## Status

Archived. Built for a hackathon, not actively maintained.

## Related projects

- [dacospace-legacy](https://github.com/tolgazorlu/dacospace-legacy)
