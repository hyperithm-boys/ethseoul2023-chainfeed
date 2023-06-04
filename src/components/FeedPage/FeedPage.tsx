import React, { useCallback, useEffect, useState } from "react";
import {
  Erc20Swaps,
  Liquidations,
  LpDepositWithdraws,
  MevTransactions,
  NftLiquidations,
  NftPriceMove,
  NftTrades,
  SwapPoolCreations,
  Token,
  Transfers,
} from "../../services/types";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Tag } from "../../services/types";
import { supabase } from "../../services/supabseClient";
import FeedItem from "../FeedItem/FeedItem";
import { Position } from "../Home/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const FeedPage = () => {
  const { table, id } = useParams();

  const [feedItemData, setFeedItemData] = useState<
    | Erc20Swaps
    | Liquidations
    | LpDepositWithdraws
    | MevTransactions
    | NftLiquidations
    | NftPriceMove
    | NftTrades
    | SwapPoolCreations
    | Transfers
    | null
  >();

  const fetchFeedData = useCallback(async () => {
    if (Object.values(Tag).includes(table as Tag)) {
      const { data } = await supabase
        .from(table as Tag)
        .select()
        .filter("id", "eq", id);
      if (!data) {
        setFeedItemData(null);
      } else {
        setFeedItemData(data[0] as any);
      }
    } else {
      setFeedItemData(null);
    }
  }, []);

  useEffect(() => {
    fetchFeedData();
  }, [fetchFeedData]);

  const [tokens, setTokens] = useState<Token[]>([]);

  const fetchTokens = useCallback(async () => {
    const { data } = await supabase.from("tokens").select();
    setTokens(data as Token[]);
  }, []);

  useEffect(() => {
    fetchTokens();
  }, []);

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

  const [timestamp, setTimestamp] = useState<number>(dayjs().unix());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(dayjs().unix());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  if (feedItemData === null) {
    return <Navigate to="/" replace />;
  } else if (!feedItemData) {
    return null;
  } else {
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
        <div className="py-10 pl-60">
          <div
            className="pl-20 font-bold text-xl hover:cursor-pointer"
            onClick={() => navigate(-1)}
          >
            ←
          </div>
          <FeedItem
            tag={table as string}
            feedData={feedItemData}
            tokens={tokens}
            timestamp={timestamp}
          />
        </div>
      </div>
    );
  }
};

export default FeedPage;
