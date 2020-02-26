// Credit to EOSIO (MIT licenced)
// https://github.com/EOSIO/demux-js/tree/develop/examples/eos-transfers
/* CustomActionHandler
 * This is an example of an AbstractActionHandler implementation.
 *
 * The role of the Action Handler is to receive block data passed from the Action Reader, and populate some external
 * state deterministically derived from that data, as well as trigger side-effects.
 *
 * The AbstractActionHandler has the following abstract methods:
 *
 * handleWithState(handle)
 *   Call the passed-in `handle` function with the object you would like to pass in as `state` to Updaters and Effects.
 *   In this example, we're just using a simple structured Javascript object, but in a real implementation this will
 *   most likely an interface to a database. See the API documentation for more details.
 *
 * updateIndexState(state, block)
 *   Besides some caching optimizations, the state of the progress of indexing is stored outside of Demux itself, and
 *   this method is implemented to store that data. The data needed to be stored is blockNumber, blockHash, isReplay,
 *   and handlerVersionName. the `state` object passed into the `handle` function of the above `handleWithState` is
 *   provided here as a convenience.
 *
 * loadIndexState()
 *   This returns an `IndexState` object containing all the information saved in the above method.
 *
 * rollbackTo(blockNumber)
 *   If indexing potentially reversible blocks, a mechanism for reverting back to a specific block is necessary.
 *   In this example, we keep a history of the entire state at every block, and load it when called.
 */

import { AbstractActionHandler } from 'demux';

// Initial state
let state = {
    volumeBySymbol: {},
    totalTransfers: 0,
    indexState: {
        blockNumber: 0,
        blockHash: "",
        isReplay: false,
        handlerVersionName: "v1",
    },
}

class CustomActionHandler extends AbstractActionHandler {
    protected async handleWithState(handle: (state: any, context?: any) => void): Promise<void> {
        await handle(state)
    }

    protected async setup(): Promise<void> {
    }

    protected async rollbackTo(blockNumber: number): Promise<void> {
        // const latestBlockNumber = state.indexState.blockNumber
        // const toDelete = [...Array(latestBlockNumber - (blockNumber)).keys()]
        //     .map(n => n + blockNumber + 1)
        // for (const n of toDelete) {
        //     delete stateHistory[n]
        // }
        // state = stateHistory[blockNumber];
    }

    // @ts-ignore
    protected async loadIndexState() {
        return state.indexState
    }

    // @ts-ignore
    protected async updateIndexState(state, { block }, isReplay, handlerVersionName) {
        state.indexState.blockNumber = block.blockInfo.blockNumber
        state.indexState.blockHash = block.blockInfo.blockHash
        state.indexState.isReplay = isReplay
        state.indexState.handlerVersionName = handlerVersionName
    }
}

export default CustomActionHandler;