import {
  Erc20Swaps,
  Liquidations,
  LpDepositWithdraws,
  MevTransactions,
  NftLiquidations,
  NftPriceMove,
  NftTrades,
  SwapPoolCreations,
  Tag,
  Token,
  Transfers,
} from "./services/types";

export const getShortAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getTokenSymbol = (tokens: Token[], address: string) => {
  return (
    tokens.find((t) => t.contract_address == address)?.symbol ??
    getShortAddress(address)
  );
};

export const getTokenDecimals = (tokens: Token[], address: string) => {
  return tokens.find((t) => t.contract_address == address)?.decimals ?? 0;
};

export const isStable = (tokens: Token[], address: string) => {
  const symbol = getTokenSymbol(tokens, address);
  const stables = ["DAI", "USDT", "USDC", "FRAX"];
  return stables.includes(symbol);
};

export const getTxContents = (
  tag: Tag,
  feedData:
    | Erc20Swaps
    | Liquidations
    | LpDepositWithdraws
    | MevTransactions
    | NftLiquidations
    | NftPriceMove
    | NftTrades
    | SwapPoolCreations
    | Transfers,
  tokens: Token[]
) => {
  let fd;
  switch (tag) {
    case Tag.erc20Swaps:
      fd = feedData as Erc20Swaps;
      return `Swap: ${
        Number(fd.from_amount) /
        Number(Math.pow(10, getTokenDecimals(tokens, fd.from_token_address)))
      } ${getTokenSymbol(tokens, fd.from_token_address)} to ${
        Number(fd.to_amount) /
        Number(Math.pow(10, getTokenDecimals(tokens, fd.to_token_address)))
      } ${getTokenSymbol(tokens, fd.to_token_address)} ($${fd.usd_value / 2})`;
    case Tag.liquidations:
      fd = feedData as Liquidations;
      return `Liquidation: ${getTokenSymbol(
        tokens,
        fd.collateral_token_address
      )} from Pool ${getShortAddress(fd.pool_address)} ($${fd.usd_value})`;
    case Tag.lpDepositWithdraws:
      fd = feedData as LpDepositWithdraws;
      if (fd.usd_value > 0) {
        return `LP Deposit: $${fd.usd_value}`;
      } else {
        return `LP Withdraw: $${-fd.usd_value}`;
      }
    case Tag.mevTransactions:
    case Tag.nftLiquidations:
    case Tag.nftPriceMove:
      return "";
    case Tag.nftTrades:
      fd = feedData as NftTrades;
      return `Nft Trade: NFT ${fd.nft_symbol} from ${getShortAddress(
        fd.from_address
      )} to ${getShortAddress(fd.to_address)} (${fd.price_eth} ETH)`;
    case Tag.swapPoolCreations:
      fd = feedData as SwapPoolCreations;
      return `Swap Pool: ${getTokenSymbol(
        tokens,
        fd.token_address1
      )} and ${getTokenSymbol(tokens, fd.token_address2)} created`;
    case Tag.transfers:
      fd = feedData as Transfers;
      return `ERC20 Transfer: ${
        Number(fd.amount) /
        Number(Math.pow(10, getTokenDecimals(tokens, fd.token_address)))
      } ${getTokenSymbol(tokens, fd.token_address)} from ${getShortAddress(
        fd.from_address
      )} to ${getShortAddress(fd.to_address)}`;
    default:
      return "";
  }
};
