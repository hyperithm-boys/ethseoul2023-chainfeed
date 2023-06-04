import { useRef, UIEvent, useState, useEffect, useCallback } from "react";
import { Position } from "./types";
import TagItem from "../TagItem/TagItem";
import FeedItem from "../FeedItem/FeedItem";
import TrendItem from "../TrendItem/TrendItem";
import { FeedData, Tag, Token, allTags } from "../../services/types";
import { supabase } from "../../services/supabseClient";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);

const fetchAmount = 10;

const Home = () => {
  const feedRef = useRef<HTMLDivElement>(null);
  const trendRef = useRef<HTMLDivElement>(null);

  const handleScrollFeed = (scroll: UIEvent<HTMLDivElement>) => {
    trendRef.current!.scrollTop = scroll.currentTarget.scrollTop;
  };

  const handleScrollTrend = (scroll: UIEvent<HTMLDivElement>) => {
    feedRef.current!.scrollTop = scroll.currentTarget.scrollTop;
  };

  const [position, setPosition] = useState<Position>({
    latitude: 37.5137,
    longitude: 127.1052,
  });

  const fetchGeoLocation = useCallback(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setPosition(position.coords);
      });
    }
  }, []);

  useEffect(fetchGeoLocation, []);

  const [address, setAddress] = useState<string>("");

  const controlWallet = () => {
    if (address) {
      setAddress("");
    } else {
      setAddress("0x0000000000000000000000000000000000000000");
    }
  };

  const [lastTime, setLastTime] = useState<{
    [Tag.erc20Swaps]: string;
    [Tag.liquidations]: string;
    [Tag.lpDepositWithdraws]: string;
    [Tag.mevTransactions]: string;
    [Tag.nftLiquidations]: string;
    [Tag.nftPriceMove]: string;
    [Tag.nftTrades]: string;
    [Tag.swapPoolCreations]: string;
    [Tag.transfers]: string;
  }>({
    [Tag.erc20Swaps]: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS00Z"),
    [Tag.liquidations]: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS00Z"),
    [Tag.lpDepositWithdraws]: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS00Z"),
    [Tag.mevTransactions]: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS00Z"),
    [Tag.nftLiquidations]: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS00Z"),
    [Tag.nftPriceMove]: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS00Z"),
    [Tag.nftTrades]: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS00Z"),
    [Tag.swapPoolCreations]: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS00Z"),
    [Tag.transfers]: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS00Z"),
  });

  const [isSelected, setIsSelected] = useState<{
    [Tag.erc20Swaps]: boolean;
    [Tag.liquidations]: boolean;
    [Tag.lpDepositWithdraws]: boolean;
    [Tag.mevTransactions]: boolean;
    [Tag.nftLiquidations]: boolean;
    [Tag.nftPriceMove]: boolean;
    [Tag.nftTrades]: boolean;
    [Tag.swapPoolCreations]: boolean;
    [Tag.transfers]: boolean;
  }>({
    [Tag.erc20Swaps]: true,
    [Tag.liquidations]: true,
    [Tag.lpDepositWithdraws]: true,
    [Tag.mevTransactions]: true,
    [Tag.nftLiquidations]: true,
    [Tag.nftPriceMove]: true,
    [Tag.nftTrades]: true,
    [Tag.swapPoolCreations]: true,
    [Tag.transfers]: true,
  });

  const isSelectedAll = allTags
    .map((tag) => isSelected[tag])
    .reduce((prev, curr) => prev && curr, true);

  const selectedTag = allTags.find((tag) => isSelected[tag]) as Tag;

  const [tokens, setTokens] = useState<Token[]>([]);

  const fetchTokens = useCallback(async () => {
    const { data } = await supabase.from("tokens").select();
    setTokens(data as Token[]);
  }, []);

  useEffect(() => {
    fetchTokens();
  }, []);

  const [feedData, setFeedData] = useState<FeedData>({
    [Tag.erc20Swaps]: [],
    [Tag.liquidations]: [],
    [Tag.lpDepositWithdraws]: [],
    [Tag.mevTransactions]: [],
    [Tag.nftLiquidations]: [],
    [Tag.nftPriceMove]: [],
    [Tag.nftTrades]: [],
    [Tag.swapPoolCreations]: [],
    [Tag.transfers]: [],
  });

  const fetchFeedData = useCallback(async () => {
    const addFeedData: FeedData = {
      [Tag.erc20Swaps]: [],
      [Tag.liquidations]: [],
      [Tag.lpDepositWithdraws]: [],
      [Tag.mevTransactions]: [],
      [Tag.nftLiquidations]: [],
      [Tag.nftPriceMove]: [],
      [Tag.nftTrades]: [],
      [Tag.swapPoolCreations]: [],
      [Tag.transfers]: [],
    };
    await Promise.all(
      allTags.map(async (tag) => {
        if (isSelected[tag] && lastTime[tag]) {
          const { data } = await supabase
            .from(tag)
            .select()
            .filter("inserted_at", "lt", lastTime[tag])
            .order("inserted_at", { ascending: false })
            .limit(fetchAmount);
          addFeedData[tag] = data as any[];
        }
      })
    );
    const newFeedData: FeedData = {
      [Tag.erc20Swaps]: [
        ...feedData[Tag.erc20Swaps],
        ...addFeedData[Tag.erc20Swaps],
      ],
      [Tag.liquidations]: [
        ...feedData[Tag.liquidations],
        ...addFeedData[Tag.liquidations],
      ],
      [Tag.lpDepositWithdraws]: [
        ...feedData[Tag.lpDepositWithdraws],
        ...addFeedData[Tag.lpDepositWithdraws],
      ],
      [Tag.mevTransactions]: [
        ...feedData[Tag.mevTransactions],
        ...addFeedData[Tag.mevTransactions],
      ],
      [Tag.nftLiquidations]: [
        ...feedData[Tag.nftLiquidations],
        ...addFeedData[Tag.nftLiquidations],
      ],
      [Tag.nftPriceMove]: [
        ...feedData[Tag.nftPriceMove],
        ...addFeedData[Tag.nftPriceMove],
      ],
      [Tag.nftTrades]: [
        ...feedData[Tag.nftTrades],
        ...addFeedData[Tag.nftTrades],
      ],
      [Tag.swapPoolCreations]: [
        ...feedData[Tag.swapPoolCreations],
        ...addFeedData[Tag.swapPoolCreations],
      ],
      [Tag.transfers]: [
        ...feedData[Tag.transfers],
        ...addFeedData[Tag.transfers],
      ],
    };
    const time = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS00Z");
    setLastTime({
      [Tag.erc20Swaps]: newFeedData[Tag.erc20Swaps].at(-1)?.inserted_at ?? time,
      [Tag.liquidations]:
        newFeedData[Tag.liquidations].at(-1)?.inserted_at ?? time,
      [Tag.lpDepositWithdraws]:
        newFeedData[Tag.lpDepositWithdraws].at(-1)?.inserted_at ?? time,
      [Tag.mevTransactions]:
        newFeedData[Tag.mevTransactions].at(-1)?.inserted_at ?? time,
      [Tag.nftLiquidations]:
        newFeedData[Tag.nftLiquidations].at(-1)?.inserted_at ?? time,
      [Tag.nftPriceMove]:
        newFeedData[Tag.nftPriceMove].at(-1)?.inserted_at ?? time,
      [Tag.nftTrades]: newFeedData[Tag.nftTrades].at(-1)?.inserted_at ?? time,
      [Tag.swapPoolCreations]:
        newFeedData[Tag.swapPoolCreations].at(-1)?.inserted_at ?? time,
      [Tag.transfers]: newFeedData[Tag.transfers].at(-1)?.inserted_at ?? time,
    });
    setFeedData(newFeedData);
  }, [isSelected, lastTime, feedData]);

  useEffect(() => {
    fetchFeedData();
  }, []);

  const allTagsFeeds = allTags
    .map((tag) => feedData[tag].map((fd) => ({ tag: tag, feedData: fd })))
    .flat()
    .sort((d1, d2) => {
      if (
        dayjs(d1.feedData.block_number).isBefore(dayjs(d2.feedData.inserted_at))
      ) {
        return -1;
      } else if (
        dayjs(d1.feedData.inserted_at).isAfter(dayjs(d2.feedData.inserted_at))
      ) {
        return 1;
      } else {
        return 0;
      }
    });

  const [timestamp, setTimestamp] = useState<number>(dayjs().unix());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(dayjs().unix());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-row bg-newspaper">
      <div className="w-72 h-screen border-r border-black py-8 pl-8 flex flex-row justify-start font-helvetica">
        <div className="w-7 h-44 relative bg-black"></div>
        <div className="w-full">
          <div
            className="h-28 border-y border-black py-3.5 flex flex-col justify-evenly text-center hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="text-sm">{`${position.latitude}° N, ${position.longitude}° E`}</div>
            <div className="font-bold text-4xl">CHAINFEED</div>
          </div>
        </div>
      </div>
      <div className="w-[calc(100vw-18rem)] flex flex-col justify-start">
        <div className="h-54 border-b border-black pt-8 pb-12 flex flex-col justify-start">
          <div className="h-12 pl-2 pr-8 flex flex-row justify-between items-center font-helvetica font-bold text-lg">
            <div>SELECT YOUR TAG FOR EASY TRADING</div>
            <div
              className="w-60 h-10 py-1 px-3 border-4 border-transparent rounded-full flex flex-row justify-center items-center hover:cursor-pointer hover:border-slate-200"
              onClick={controlWallet}
            >
              {address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "CONNECT WALLET"}
            </div>
          </div>
          <div className="h-20 flex flex-row justify-start overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <TagItem
              tag="all"
              isSelected={isSelectedAll}
              setTag={() =>
                setIsSelected({
                  [Tag.erc20Swaps]: true,
                  [Tag.liquidations]: true,
                  [Tag.lpDepositWithdraws]: true,
                  [Tag.mevTransactions]: true,
                  [Tag.nftLiquidations]: true,
                  [Tag.nftPriceMove]: true,
                  [Tag.nftTrades]: true,
                  [Tag.swapPoolCreations]: true,
                  [Tag.transfers]: true,
                })
              }
            />
            {allTags.map((_tag) => (
              <TagItem
                tag={_tag}
                isSelected={!isSelectedAll && isSelected[_tag]}
                setTag={() => {
                  const newTags = {
                    [Tag.erc20Swaps]: false,
                    [Tag.liquidations]: false,
                    [Tag.lpDepositWithdraws]: false,
                    [Tag.mevTransactions]: false,
                    [Tag.nftLiquidations]: false,
                    [Tag.nftPriceMove]: false,
                    [Tag.nftTrades]: false,
                    [Tag.swapPoolCreations]: false,
                    [Tag.transfers]: false,
                  };
                  newTags[_tag] = true;
                  setIsSelected(newTags);
                }}
              />
            ))}
          </div>
        </div>
        <div className="h-[calc(100vh-13.5rem)] grid grid-cols-5">
          <div
            className="pb-10 border-r border-black col-span-3 flex flex-col justify-start overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            ref={feedRef}
            onScroll={handleScrollFeed}
          >
            <div className="py-4 px-10 border-b border-black font-bold text-lg">
              FEED
            </div>
            {isSelectedAll
              ? allTagsFeeds.map((d) => (
                  <FeedItem
                    tag={d.tag}
                    feedData={d.feedData}
                    tokens={tokens}
                    timestamp={timestamp}
                  />
                ))
              : feedData[selectedTag].map((feedData) => (
                  <FeedItem
                    tag={selectedTag}
                    feedData={feedData}
                    tokens={tokens}
                    timestamp={timestamp}
                  />
                ))}
          </div>
          <div
            className="pl-20 pb-10 col-span-2 flex flex-col justify-start overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            ref={trendRef}
            onScroll={handleScrollTrend}
          >
            <div className="py-4 font-bold text-lg"># Trending</div>
            {allTagsFeeds
              .filter((_, idx) => [2, 5, 11, 23].includes(idx))
              .map((d) => (
                <TrendItem tag={d.tag} feedData={d.feedData} tokens={tokens} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
