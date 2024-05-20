# zkSync Hardhat project template

This project was scaffolded with [zksync-cli](https://github.com/matter-labs/zksync-cli).

## Project Layout

- `/contracts`: Contains solidity smart contracts.
- `/deploy`: Scripts for contract deployment and interaction.
- `hardhat.config.ts`: Configuration settings.

### Environment Settings

To keep private keys safe, this project pulls in environment variables from `.env` files. Primarily, it fetches the wallet's private key.

Adjust the wallet-private-key in the .env file:

```
WALLET_PRIVATE_KEY=your_private_key_here...
```

## License

This project is under the [MIT](./LICENSE) license.