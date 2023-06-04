import {
  Erc20Swaps,
  Liquidations,
  LpDepositWithdraws,
  MevTransactions,
  NftLiquidations,
  NftPriceMove,
  NftTrades,
  SwapPoolCreations,
  Transfers,
  Token,
  Tag,
} from "../../services/types";
import { getTxContents } from "../../utils";

const TrendItem = (props: {
  tag: string;
  feedData:
    | Erc20Swaps
    | Liquidations
    | LpDepositWithdraws
    | MevTransactions
    | NftLiquidations
    | NftPriceMove
    | NftTrades
    | SwapPoolCreations
    | Transfers;
  tokens: Token[];
}) => {
  const { tag, feedData, tokens } = props;

  const contents = getTxContents(tag as Tag, feedData, tokens);

  return (
    <div className="p-4 mb-3 border-y border-l border-black font-georgia font-bold text-sm">
      <div className="flex flex-row justify-start items-center text-center">
        <div className="h-8 py-1.5 px-3 mb-4 text-white bg-black">{tag}</div>
      </div>
      <div className="...">{contents}</div>
    </div>
  );
};

export default TrendItem;
