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
} from "../../services/types";
import chatIcon from "../../assets/chat.svg";
import favIcon from "../../assets/favorite.svg";
import shareIcon from "../../assets/share.svg";
import chainIcon from "../../assets/chain.svg";
import { MessageType } from "./types";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getTxContents, isStable } from "../../utils";

const FeedItem = (props: {
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
  timestamp: number;
}) => {
  const { tag, feedData, tokens, timestamp } = props;

  const formatElapsed = (elapsed: number) => {
    if (elapsed < 60) {
      return `${elapsed}s`;
    } else if (elapsed < 3600) {
      return `${Math.floor(elapsed / 60)}m`;
    } else if (elapsed < 86400) {
      return `${Math.floor(elapsed / 3600)}h`;
    } else {
      return `${Math.floor(elapsed / 86400)}d`;
    }
  };

  const getTxMessage = (tag: Tag) => {
    const NoMessage = { type: MessageType.None, msg: "" };
    let fd;
    switch (tag) {
      case Tag.erc20Swaps:
        fd = feedData as Erc20Swaps;
        const isBigSwap = fd.usd_value > 1_000;
        const isStableSwap =
          isStable(tokens, fd.from_token_address) &&
          isStable(tokens, fd.to_token_address);

        if (isStableSwap) {
          let depeg = Math.abs(
            1 - Number(fd.from_amount) / Number(fd.to_amount)
          );
          if (depeg > 0.01) {
            return { type: MessageType.Red, msg: "Stable swap depeg 1%" };
          } else if (depeg > 0.005) {
            return { type: MessageType.Yellow, msg: "Stable swap depeg 0.5%" };
          }
          return { type: MessageType.Blue, msg: "Stable swap" };
        }

        if (isBigSwap) {
          return {
            type: MessageType.Red,
            msg: "Large scale token swap has occured on Uniswap- watch out for short term price impact!",
          };
        }
        return NoMessage;
      case Tag.liquidations:
        return {
          type: MessageType.Blue,
          msg: "A new swap pair has been listed on Uniswap- potentially a trading opportunity, but beware of vollatility.",
        };
      case Tag.swapPoolCreations:
        return {
          type: MessageType.Blue,
          msg: "A new swap pair has been listed on Uniswap- potentially a trading opportunity, but beware of vollatility.",
        };
      case Tag.lpDepositWithdraws:
        fd = feedData as LpDepositWithdraws;
        if (fd.usd_value > 0) {
          return {
            type: MessageType.Yellow,
            msg: "Liquidity of the pool has been strengthened, meaning swaps could have smaller price impact on the pool.",
          };
        } else {
          return {
            type: MessageType.Yellow,
            msg: "Liquidity of the pool has been weakened, meaning swaps could have a larger price impact on the pool.",
          };
        }
      case Tag.mevTransactions:
      case Tag.nftLiquidations:
      case Tag.nftPriceMove:
        return NoMessage;
      case Tag.nftTrades:
        return {
          type: MessageType.Blue,
          msg: "A Bluechip NFT has just traded hands on Opensea.",
        };
      case Tag.transfers:
        return {
          type: MessageType.Yellow,
          msg: "A large scale token transfer has occured on-chain.",
        };
      default:
        return NoMessage;
    }
  };

  const contents = getTxContents(tag as Tag, feedData, tokens);
  const message = getTxMessage(tag as Tag);

  const navigate = useNavigate();

  return (
    <div
      className="w-120 py-0 pl-36 pr-12 font-georgia"
      onClick={() => navigate(`/${tag}/${feedData.id}`)}
    >
      <div className="py-3 flex flex-row justify-start items-center text-center">
        <div className="py-1.5 px-3 mr-1.5 font-bold text-sm text-white bg-black">
          {tag}
        </div>
        <div className="py-1.5 px-3 mr-0.5 font-bold text-sm text-slate-600">
          {`#${feedData.block_number}`}
        </div>
        <div className="py-1.5 px-3 mr-0.5 font-bold text-sm text-slate-600">
          ·
        </div>
        <div className="py-1.5 px-3 mr-0.5 font-bold text-sm text-slate-600">
          {formatElapsed(timestamp - dayjs(feedData.inserted_at).unix())}
        </div>
      </div>
      <div className="py-3 flex items-center">
        <div className="py-1.5 font-bold text-base text-black">{contents}</div>
      </div>
      <div className="pt-3 pb-4 flex items-center">
        <a
          className="px-2 py-1 border border-slate-500 font-bold text-xs text-black no-underline hover:text-black"
          href={`https://etherscan.io/tx/${feedData.transaction_hash}`}
          target="_blank"
          onClick={(event) => event.stopPropagation()}
        >
          {feedData.transaction_hash} →
        </a>
      </div>
      {message.type != MessageType.None && (
        <div className="pb-4 flex items-center">
          <div
            className={classNames(
              "h-8 py-1.5 px-2 border-b border-black text-sm text-white bg-red-500",
              {
                "bg-red-500": message.type == MessageType.Red,
                "bg-yellow-500": message.type == MessageType.Yellow,
                "bg-blue-500": message.type == MessageType.Blue,
              }
            )}
          >
            {message.msg}
          </div>
        </div>
      )}
      <div className="border-b border-black" />
      <div
        className="h-10 border-b border-black flex items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-row justify-start">
          <div className="flex flex-col justify-center hover:cursor-pointer">
            <img className="w-4.5 h-4.5 mr-2.5" src={chatIcon} alt="" />
          </div>
          <div className="flex flex-col justify-center hover:cursor-pointer">
            <div className="w-32 mr-5 font-sm text-slate-500">0</div>
          </div>
          <div className="flex flex-col justify-center hover:cursor-pointer">
            <img className="w-4.5 h-4.5 mr-2.5" src={favIcon} alt="" />
          </div>
          <div className="flex flex-col justify-center hover:cursor-pointer">
            <div className="w-32 mr-5 font-sm text-slate-500">0</div>
          </div>
          <div className="flex flex-col justify-center hover:cursor-pointer">
            <img className="w-4.5 h-4.5 mr-2.5" src={shareIcon} alt="" />
          </div>
          <div className="flex flex-col justify-center hover:cursor-pointer">
            <div className="w-32 mr-5 font-sm text-slate-500">0</div>
          </div>
          <div className="relative flex flex-col justify-center">
            <img
              className="w-1.75 h-12.75 mr-2.5 relative top-5"
              src={chainIcon}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
