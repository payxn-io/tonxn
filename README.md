# Tonxn CDP Stablecoin Lending & Borrowing Platform

Tonxn is a decentralized lending and borrowing platform built on the TON blockchain, where users can deposit collateral and borrow pUSD (a stablecoin) based on their collateral's value. This README outlines the functionality and smart contract operations involved in the Tonxn platform.


```
-Deposit Collateral and Borrow pUSD: Users can deposit TON, DOGS, and bridged majors (BTC, ETH, SOL) as collateral.
-They then can mint pUSD, a stablecoin pegged to the USD, against these deposits.
-pUSD can be used for various purposes like trading, saving, or making payments, removing the need for users to sell their crypto holdings.
-Earn Yield with Tonxn Vaults: Users can earn yield on pUSD by depositing into Tonxn Vaults.
-Each vault corresponds to a specific collateral asset, with deposits receiving 75% of the interest generated by debt backed by it in exchange for participating in automated liquidations.
-Vault deposits thus receive pUSD yield and collateral-denominated liquidation profits, with further automation of compounding liquidation proceeds possible.
-On-Chain Savings: pUSD can be redeemed for $1-worth of protocol collateral and has zero off-chain dependencies.
-This allows it to serve as a stable store of value for as long as the TON network remains operational. 
```
Mainnet is deployed here: https://tonscan.org/address/EQCw5CzDt767ZLwm4_sdW7mc2xsele2Vf8cU77S9XaySLZvQ#source

### To do list
- [ ] Create a fresh new blueprint project: https://github.com/ton-org/blueprint
- [ ] Create a new blueprint directory 
- [ ] Run: npm create ton@latest
- [ ] Install dependencies: yarn install
- [ ] Creating contracts: yarn blueprint create
- [ ] Write the cdp smart contract

## Overview

The Tonxn platform allows users to:
- **Deposit collateral**: Users can deposit various assets (TON, DOGS, BTC, ETH, SOL) as collateral to mint pUSD.
- **Borrow pUSD**: Users can borrow pUSD against their deposited collateral.
- **Collateral management**: The system ensures that users maintain a minimum collateral ratio when borrowing pUSD.

## Constants

- **MIN_COLLATERAL_RATIO**: The minimum collateral ratio required to borrow pUSD (150%).
- **ERROR_INVALID_AMOUNT**: Error code for invalid amounts (101).
- **ERROR_BELOW_MIN_COLLATERAL**: Error code when the collateral ratio falls below the minimum (102).
- **ERROR_UNAUTHORIZED**: Error code for unauthorized actions (103).

## Asset Types

- **TON**: 1
- **DOGS**: 2
- **BTC**: 3
- **ETH**: 4
- **SOL**: 5

## Storage

- `users`: A dictionary mapping user addresses to their positions, containing their collateral value, pUSD borrowed, and collateral assets.
- `price_feeds`: A dictionary containing the price feeds for various assets.
- `total_pusd_supply`: The total supply of pUSD on the platform.

### User Position Structure
Each user’s position consists of:
- `collateral_value`: Total value of collateral held.
- `pusd_borrowed`: Total amount of pUSD borrowed.
- `collaterals`: A dictionary of assets deposited as collateral.

## Functions

### `load_data()`
- Loads data from the platform's storage, including users, price feeds, and the total pUSD supply.

### `save_data()`
- Saves the current data (users, price feeds, total pUSD supply) back to storage.

### `deposit_collateral(sender_address, asset_type, amount)`
- Allows users to deposit assets as collateral, updating their position.
- Ensures that the deposit amount is valid and updates the user's collateral value.

### `borrow_pusd(sender_address, amount)`
- Allows users to borrow pUSD against their collateral.
- Ensures that the user’s collateral is sufficient to support the borrowed amount with the required collateral ratio.
- Mints pUSD and sends it to the user.

### `recv_internal(msg_value, in_msg_full, in_msg_body)`
- Handles incoming messages to either deposit collateral or borrow pUSD.
- Verifies the operation and triggers the appropriate function (`deposit_collateral` or `borrow_pusd`).

## Helper Functions

### `unpack_position(slice cs)`
- Unpacks a user's position from a given slice. Returns the collateral value, pUSD borrowed, and collaterals.

### `pack_position(collateral_value, pusd_borrowed, collaterals)`
- Packs a user's position data into a cell to be stored in the blockchain.

### `unpack_collateral(slice cs)`
- Unpacks a collateral entry from a given slice, returning the asset type, amount, and price.

### `pack_collateral(asset_type, amount, price)`
- Packs a collateral entry (asset type, amount, price) into a cell.

## Smart Contract Operations

1. **Deposit Collateral**:
   - Users send an amount of a specified asset type as collateral.
   - The platform checks the asset's price and updates the user's position accordingly.

2. **Borrow pUSD**:
   - Users borrow pUSD against their deposited collateral.
   - The platform checks that the user has sufficient collateral to meet the required collateral ratio before allowing the loan.

3. **Mint and Send pUSD**:
   - Upon successful borrowing, the platform mints pUSD and sends it to the user.
   - A transaction message is created and the pUSD is transferred to the user's address.

## How It Works

### Deposit Process
1. Users send their collateral to the platform.
2. The platform calculates the collateral's value based on the asset's price.
3. The user's position is updated to reflect the new collateral.
4. The updated position is saved back to the platform's storage.

### Borrow Process
1. Users request to borrow pUSD against their collateral.
2. The platform checks the collateral ratio to ensure it meets the required threshold.
3. If valid, the platform mints pUSD and sends it to the user.

## Requirements

- **TON Blockchain**: This platform operates on the TON blockchain.
- **Smart Contract Language**: FunC (TON's smart contract language).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to fork and submit issues or pull requests. Please follow the existing code style and provide adequate documentation for any changes made.

For questions, open an issue or contact the maintainers.

## GitHub Repository

You can view or contribute to the project on GitHub: [Tonxn Contract Repository](https://github.com/payxn-io/tonxn-contract)
