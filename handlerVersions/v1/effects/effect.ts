/**
 * This is an example Effect. Use Effects for executing non-deterministic mutative actions. They are run asynchronously,
 * and may be run concurrently with other effects. Make sure to export one (and only one) Effect object from this file.
 */

import { Effect, BlockInfo, StatelessActionCallback } from 'demux'
import { BunyanProvider } from 'demux';

const ACTION = 'eosio.token::transfer';

const _logger = BunyanProvider.getLogger({
  logSource: ACTION,
})

const run: StatelessActionCallback = async (payload: any, blockInfo: BlockInfo, context: any) => {
  _logger.info({ payload, blockInfo, context }, 'print params in effect.run');
}

const effect: Effect = {
  run,
  actionType: ACTION, // The actionType this effect will subscribe to
  deferUntilIrreversible: true, // If true, the effect will only run after the action becomes irreversible
}

export default effect
