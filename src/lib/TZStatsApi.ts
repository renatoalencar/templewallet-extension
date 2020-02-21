import axios, { AxiosPromise } from "axios";

export enum TZStatsNetwork {
  Mainnet = "https://api.tzstats.com",
  Zeronet = "https://api.zeronet.tzstats.com",
  Babylonnet = "https://api.babylonnet.tzstats.com",
  Carthagenet = "https://api.carthagenet.tzstats.com",
  Labnet = "https://api.labnet.tzstats.com"
}

const apiClient = axios.create({
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.response.use(res => res.data);

enum AddressType {
  TZ1 = "ed25519",
  TZ2 = "secp256k1",
  TZ3 = "p256"
}

enum StatusType {
  Applied = "applied",
  Failed = "failed",
  Backtracked = "backtracked",
  Skipped = "skipped"
}

interface TZStatsAccountResponse {
  address: string;
  address_type: AddressType;
  delegate: string;
  manager: string;
  pubkey: string;
  first_in: number;
  first_out: number;
  last_in: number;
  last_out: number;
  first_seen: number;
  last_seen: number;
  delegated_since: number;
  delegate_since: number;
  first_in_time: Date;
  first_out_time: Date;
  last_in_time: Date;
  last_out_time: Date;
  first_seen_time: Date;
  last_seen_time: Date;
  delegated_since_time: Date;
  delegate_since_time: Date;
  total_received: number;
  total_sent: number;
  total_burned: number;
  total_fees_paid: number;
  total_rewards_earned: number;
  total_fees_earned: number;
  total_lost: number;
  frozen_deposits: number;
  frozen_rewards: number;
  frozen_fees: number;
  unclaimed_balance: number;
  spendable_balance: number;
  total_balance: number;
  delegated_balance: number;
  staking_balance: number;
  total_delegations: number;
  active_delegations: number;
  is_funded: boolean;
  is_activated: boolean;
  is_vesting: boolean;
  is_spendable: boolean;
  is_delegatable: boolean;
  is_delegated: boolean;
  is_revealed: boolean;
  is_delegate: boolean;
  is_active_delegate: boolean;
  is_contract: boolean;
  blocks_baked: number;
  blocks_missed: number;
  blocks_stolen: number;
  blocks_endorsed: number;
  slots_endorsed: number;
  slots_missed: number;
  n_ops: number;
  n_ops_failed: number;
  n_tx: number;
  n_delegation: number;
  n_origination: number;
  n_proposal: number;
  n_ballot: number;
  token_gen_min: number;
  token_gen_max: number;
  grace_period: number;
  rolls: number;
  rich_rank: number;
  traffic_rank: number;
  flow_rank: number;
  last_bake_height: number;
  last_bake_block: string;
  last_bake_time: Date;
  last_endorse_height: number;
  last_endorse_block: string;
  last_endorse_time: Date;
  next_bake_height: number;
  next_bake_priority: number;
  next_bake_time: Date;
  next_endorse_height: number;
  next_endorse_time: Date;
}

interface TZStatsContractResponse {
  address: string;
  manager: string;
  delegate: string;
  height: number;
  fee: number;
  gas_limit: number;
  gas_used: number;
  gas_price: number;
  storage_limit: number;
  storage_size: number;
  storage_paid: number;
  is_funded: boolean;
  is_vesting: boolean;
  is_spendable: boolean;
  is_delegatable: boolean;
  is_delegated: boolean;
  first_in: number;
  first_out: number;
  last_in: number;
  last_out: number;
  first_seen: number;
  last_seen: number;
  delegated_since: number;
  first_in_time: Date;
  first_out_time: Date;
  last_in_time: Date;
  last_out_time: Date;
  first_seen_time: Date;
  last_seen_time: Date;
  delegated_since_time: Date;
  n_ops: number;
  n_ops_failed: number;
  n_tx: number;
  n_delegation: number;
  n_origination: number;
  token_gen_min: number;
  token_gen_max: number;
  bigmap_ids: BigInt64Array;
}

interface TZStatsContractScriptResponse {
  script: object;
  storage_type: object;
  entrypoint: object;
}

interface TZStatsContractStorageResponse {
  //GET CONTRACT STORAGE
  meta: object;
  value: object;
  entrypoint: object;
}
interface TZStatsContractCallsResponse {
  entrypoint: string;
  branch: string;
  id: number;
  value: object;
  prim: object;
}

interface TZStatsMarketsTickersResponse {
  pair: string;
  base: string;
  quote: string;
  exchange: string;
  open: number;
  high: number;
  low: number;
  last: number;
  change: number;
  vwap: number;
  n_trades: number;
  volume_base: number;
  volume_quote: number;
  timestamp: Date;
}

interface TZStatsOperationResponse {
  hash: string;
  type: string; // it is should be enum
  block: string;
  time: Date;
  height: number;
  cycle: number;
  counter: number;
  op_n: number;
  op_c: number;
  op_i: number;
  status: StatusType;
  is_success: boolean;
  is_contract: boolean;
  gas_limit: number;
  gas_used: number;
  gas_price: number;
  storage_limit: number;
  storage_size: number;
  storage_paid: number;
  volume: number;
  fee: number;
  reward: number;
  deposit: number;
  burned: number;
  is_internal: boolean;
  has_data: boolean;
  data: any; //any??
  parameters: object; // in docs we have a duplication of "parameters"
  storage: object;
  big_map_diff: object;
  errors: object;
  days_destroyed: number;
  sender: string;
  receiver: string;
  delegate: string;
  manager: string;
  branch_id: number;
  branch_height: number;
  branch_depth: number;
  branch: string;
}

export async function getAccount(
  network: TZStatsNetwork,
  publicKeyHash: string
) {
  return unify(
    apiClient.get<TZStatsAccountResponse>(
      `${network}/explorer/account/${publicKeyHash}`
    )
  );
}

export async function getAccountOperations(
  network: TZStatsNetwork,
  publicKeyHash: string
) {
  return unify(
    apiClient.get<TZStatsAccountResponse>(
      `${network}/explorer/account/${publicKeyHash}/op`
    )
  );
}

export async function getContract(
  network: TZStatsNetwork,
  publicKeyHash: string
) {
  return unify(
    apiClient.get<TZStatsContractResponse>(
      `${network}/explorer/contract/${publicKeyHash}`
    )
  );
}
export async function getContractScript(
  network: TZStatsNetwork,
  publicKeyHash: string
) {
  return unify(
    apiClient.get<TZStatsContractScriptResponse>(
      `${network}/explorer/contract/${publicKeyHash}/script`
    )
  );
}

export async function getContractStorage(
  network: TZStatsNetwork,
  publicKeyHash: string
) {
  return unify(
    apiClient.get<TZStatsContractStorageResponse>(
      `${network}/explorer/contract/${publicKeyHash}/storage`
    )
  );
}

export async function getContractCalls(
  network: TZStatsNetwork,
  publicKeyHash: string
) {
  return unify(
    apiClient.get<TZStatsContractCallsResponse>(
      `${network}/explorer/contract/${publicKeyHash}/calls`
    )
  );
}

export async function getContractManager(
  network: TZStatsNetwork,
  publicKeyHash: string
) {
  // The response schema didnt provided it docs
  return unify(
    apiClient.get<TZStatsContractCallsResponse>(
      `${network}/explorer/contract/${publicKeyHash}/manager`
    )
  );
}

export async function getMarketsTickers(network: TZStatsNetwork) {
  return unify(
    apiClient.get<TZStatsMarketsTickersResponse>(`${network}/markets/tickers`)
  );
}

export async function getOperations(
  network: TZStatsNetwork,
  publicKeyHash: string
) {
  return unify(
    apiClient.get<TZStatsMarketsTickersResponse>(
      `${network}/explorer/op/${publicKeyHash}`
    )
  );
}

async function unify(promise: AxiosPromise) {
  const res = await promise;
  return res.data;
}
