# Prototyp for an Incentive-IT-System

## Requirements / Necessary Software

- Maven
- Java
- NPM
    - @angular/cli
    - @matterlabs/hardhat-zksync-deploy
    - ethers
    - zksync-ethers
- Docker
- Installed Metamask-Extension in Browser

## Installation Guide

- Blockchain (zkSync)
    - adjust the wallet-private-key in the contracts/.env file
    - run `npm install` in the contracts directory
    - run `npx hardhat compile` in the contracts directory
    - run `npx hardhat deploy-zksync --script deploy_all.ts` in the contracts directory
    - adjust the contract addresses in the frontend/src/environments/ environment-files accordingly to the deploy_all.ts output
    - provide enough ethereum funds for the paymaster-contract (send some eth to the paymaster address)
    - add a new admin user to the employee-storage-contract
        - create a new account in metamask
        - call the addEmployee function as contract owner in order to save the new account to the blockchain
- Frontend & Backend
    - run `mvn clean install` in the project root directory
    - run `docker compose build` in the project root directory
    - run `docker-compose up` in the project root directory
    - open http://localhost:80

## Main-Pages

- http://localhost:4200/user
- http://localhost:4200/login
- http://localhost:4200/admin