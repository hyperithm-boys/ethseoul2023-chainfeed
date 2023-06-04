export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      erc20_swaps: {
        Row: {
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
        };
        Insert: {
          block_number: number;
          from_amount: string;
          from_token_address: string;
          id?: number;
          inserted_at?: string;
          to_amount: string;
          to_token_address: string;
          transaction_hash: string;
          updated_at?: string;
          usd_value: number;
        };
        Update: {
          block_number?: number;
          from_amount?: string;
          from_token_address?: string;
          id?: number;
          inserted_at?: string;
          to_amount?: string;
          to_token_address?: string;
          transaction_hash?: string;
          updated_at?: string;
          usd_value?: number;
        };
      };
      liquidations: {
        Row: {
          block_number: number;
          collateral_amount: string;
          collateral_token_address: string;
          id: number;
          inserted_at: string;
          pool_address: string;
          transaction_hash: string;
          updated_at: string;
          usd_value: number;
        };
        Insert: {
          block_number: number;
          collateral_amount: string;
          collateral_token_address: string;
          id?: number;
          inserted_at?: string;
          pool_address: string;
          transaction_hash: string;
          updated_at?: string;
          usd_value: number;
        };
        Update: {
          block_number?: number;
          collateral_amount?: string;
          collateral_token_address?: string;
          id?: number;
          inserted_at?: string;
          pool_address?: string;
          transaction_hash?: string;
          updated_at?: string;
          usd_value?: number;
        };
      };
      lp_deposit_withdraw_token_entries: {
        Row: {
          amount: string;
          block_number: number;
          event_id: number;
          id: number;
          inserted_at: string;
          token_address: string;
          transaction_hash: string;
          updated_at: string;
        };
        Insert: {
          amount: string;
          block_number: number;
          event_id: number;
          id?: number;
          inserted_at?: string;
          token_address: string;
          transaction_hash: string;
          updated_at?: string;
        };
        Update: {
          amount?: string;
          block_number?: number;
          event_id?: number;
          id?: number;
          inserted_at?: string;
          token_address?: string;
          transaction_hash?: string;
          updated_at?: string;
        };
      };
      lp_deposit_withdraws: {
        Row: {
          block_number: number;
          id: number;
          inserted_at: string;
          transaction_hash: string;
          updated_at: string;
          usd_value: number;
        };
        Insert: {
          block_number: number;
          id?: number;
          inserted_at?: string;
          transaction_hash: string;
          updated_at?: string;
          usd_value: number;
        };
        Update: {
          block_number?: number;
          id?: number;
          inserted_at?: string;
          transaction_hash?: string;
          updated_at?: string;
          usd_value?: number;
        };
      };
      mev_transaction_entries: {
        Row: {
          from_amount: string;
          from_token_address: string;
          id: number;
          inserted_at: string;
          to_amount: string;
          to_token_address: string;
          transaction_index: number;
          updated_at: string;
          usd_value: number;
        };
        Insert: {
          from_amount: string;
          from_token_address: string;
          id?: number;
          inserted_at?: string;
          to_amount: string;
          to_token_address: string;
          transaction_index: number;
          updated_at?: string;
          usd_value: number;
        };
        Update: {
          from_amount?: string;
          from_token_address?: string;
          id?: number;
          inserted_at?: string;
          to_amount?: string;
          to_token_address?: string;
          transaction_index?: number;
          updated_at?: string;
          usd_value?: number;
        };
      };
      mev_transactions: {
        Row: {
          block_number: number;
          id: number;
          inserted_at: string;
          transaction_hash: string;
          updated_at: string;
        };
        Insert: {
          block_number: number;
          id?: number;
          inserted_at?: string;
          transaction_hash: string;
          updated_at?: string;
        };
        Update: {
          block_number?: number;
          id?: number;
          inserted_at?: string;
          transaction_hash?: string;
          updated_at?: string;
        };
      };
      nft_liquidations: {
        Row: {
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
        };
        Insert: {
          block_number: number;
          floor_usd_value: number;
          id?: number;
          inserted_at?: string;
          nft_contract_address: string;
          nft_name: string;
          nft_revision: number;
          pool_contract_address: string;
          transaction_hash: string;
          updated_at?: string;
        };
        Update: {
          block_number?: number;
          floor_usd_value?: number;
          id?: number;
          inserted_at?: string;
          nft_contract_address?: string;
          nft_name?: string;
          nft_revision?: number;
          pool_contract_address?: string;
          transaction_hash?: string;
          updated_at?: string;
        };
      };
      nft_price_move: {
        Row: {
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
        };
        Insert: {
          after_floor_usd_value: number;
          before_floor_usd_value: number;
          block_number: number;
          contract_address: string;
          id?: number;
          inserted_at?: string;
          nft_name: string;
          nft_revision: number;
          transaction_hash: string;
          updated_at?: string;
        };
        Update: {
          after_floor_usd_value?: number;
          before_floor_usd_value?: number;
          block_number?: number;
          contract_address?: string;
          id?: number;
          inserted_at?: string;
          nft_name?: string;
          nft_revision?: number;
          transaction_hash?: string;
          updated_at?: string;
        };
      };
      nft_trades: {
        Row: {
          block_number: number;
          contract_address: string;
          from_address: string;
          id: number;
          inserted_at: string;
          nft_name: string;
          nft_symbol: string;
          nft_token_id: string;
          price_eth: number;
          to_address: string;
          transaction_hash: string;
          updated_at: string;
        };
        Insert: {
          block_number: number;
          contract_address: string;
          from_address: string;
          id?: number;
          inserted_at?: string;
          nft_name: string;
          nft_symbol: string;
          nft_token_id: string;
          price_eth: number;
          to_address: string;
          transaction_hash: string;
          updated_at?: string;
        };
        Update: {
          block_number?: number;
          contract_address?: string;
          from_address?: string;
          id?: number;
          inserted_at?: string;
          nft_name?: string;
          nft_symbol?: string;
          nft_token_id?: string;
          price_eth?: number;
          to_address?: string;
          transaction_hash?: string;
          updated_at?: string;
        };
      };
      swap_pool_creations: {
        Row: {
          block_number: number;
          id: number;
          inserted_at: string;
          token_address1: string;
          token_address2: string;
          transaction_hash: string;
          updated_at: string;
        };
        Insert: {
          block_number: number;
          id?: number;
          inserted_at?: string;
          token_address1: string;
          token_address2: string;
          transaction_hash: string;
          updated_at?: string;
        };
        Update: {
          block_number?: number;
          id?: number;
          inserted_at?: string;
          token_address1?: string;
          token_address2?: string;
          transaction_hash?: string;
          updated_at?: string;
        };
      };
      tokens: {
        Row: {
          contract_address: string;
          decimals: number;
          inserted_at: string;
          name: string;
          symbol: string;
          updated_at: string;
        };
        Insert: {
          contract_address: string;
          decimals: number;
          inserted_at?: string;
          name: string;
          symbol: string;
          updated_at?: string;
        };
        Update: {
          contract_address?: string;
          decimals?: number;
          inserted_at?: string;
          name?: string;
          symbol?: string;
          updated_at?: string;
        };
      };
      transfers: {
        Row: {
          amount: string;
          block_number: number;
          from_address: string;
          id: number;
          inserted_at: string;
          to_address: string;
          token_address: string;
          transaction_hash: string;
          updated_at: string;
        };
        Insert: {
          amount: string;
          block_number: number;
          from_address: string;
          id?: number;
          inserted_at?: string;
          to_address: string;
          token_address: string;
          transaction_hash: string;
          updated_at?: string;
        };
        Update: {
          amount?: string;
          block_number?: number;
          from_address?: string;
          id?: number;
          inserted_at?: string;
          to_address?: string;
          token_address?: string;
          transaction_hash?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
