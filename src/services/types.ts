export enum Tag {
  erc20Swaps = "erc20_swaps",
  liquidations = "liquidations",
  lpDepositWithdraws = "lp_deposit_withdraws",
  mevTransactions = "mev_transactions",
  nftLiquidations = "nft_liquidations",
  nftPriceMove = "nft_price_move",
  nftTrades = "nft_trades",
  swapPoolCreations = "swap_pool_creations",
  transfers = "transfers",
}

export const allTags = Object.entries(Tag).map((tag) => tag[1]);

export interface Erc20Swaps {
  block_number: number;
  from_amount: string;
  from_token_address: string;
  id: number;
  inserted_at: string;
  to_amount: string;
  to_token_address: string;
  transaction_hash: string;
  updated_at: string;
  usd_value: number;
}

export interface Liquidations {
  block_number: number;
  collateral_amount: string;
  collateral_token_address: string;
  id: number;
  inserted_at: string;
  pool_address: string;
  transaction_hash: string;
  updated_at: string;
  usd_value: number;
}

export interface LpDepositWithdraws {
  block_number: number;
  id: number;
  inserted_at: string;
  transaction_hash: string;
  updated_at: string;
  usd_value: number;
}

export interface MevTransactions {
  block_number: number;
  id: number;
  inserted_at: string;
  transaction_hash: string;
  updated_at: string;
}

export interface NftLiquidations {
  block_number: number;
  floor_usd_value: number;
  id: number;
  inserted_at: string;
  nft_contract_address: string;
  nft_name: string;
  nft_revision: number;
  pool_contract_address: string;
  transaction_hash: string;
  updated_at: string;
}

export interface NftPriceMove {
  after_floor_usd_value: number;
  before_floor_usd_value: number;
  block_number: number;
  contract_address: string;
  id: number;
  inserted_at: string;
  nft_name: string;
  nft_revision: number;
  transaction_hash: string;
  updated_at: string;
}

export interface NftTrades {
  block_number: number;
  contract_address: string;
  from_address: string;
  id: number;
  inserted_at: string;
  nft_name: string;
  nft_token_id: number;
  nft_symbol: string;
  price_eth: number;
  to_address: string;
  transaction_hash: string;
  updated_at: string;
}

export interface SwapPoolCreations {
  block_number: number;
  id: number;
  initial_amount1: string;
  initial_amount2: string;
  inserted_at: string;
  token_address1: string;
  token_address2: string;
  transaction_hash: string;
  updated_at: string;
}

export interface Token {
  contract_address: string;
  decimals: number;
  inserted_at: string;
  name: string;
  symbol: string;
  updated_at: string;
}

export interface Transfers {
  amount: string;
  block_number: number;
  from_address: string;
  id: number;
  inserted_at: string;
  to_address: string;
  token_address: string;
  transaction_hash: string;
  updated_at: string;
}

export interface FeedData {
  [Tag.erc20Swaps]: Erc20Swaps[];
  [Tag.liquidations]: Liquidations[];
  [Tag.lpDepositWithdraws]: LpDepositWithdraws[];
  [Tag.mevTransactions]: MevTransactions[];
  [Tag.nftLiquidations]: NftLiquidations[];
  [Tag.nftPriceMove]: NftPriceMove[];
  [Tag.nftTrades]: NftTrades[];
  [Tag.swapPoolCreations]: SwapPoolCreations[];
  [Tag.transfers]: Transfers[];
}
