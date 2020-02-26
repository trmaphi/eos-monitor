import 'module-alias/register';
import { BaseActionWatcher, BunyanProvider } from 'demux'
import { StateHistoryPostgresActionReader } from 'demux-eos/v1.8'
import { DB_CONFIG, DEMUX_CONFIG, LOG_LEVEL } from './config'
import { handlerVersions } from './handlerVersions'
import ObjectActionHandler from './handlers/CustomActionHandler';

// An async init is created and then called to allow for `await`ing the setup code
const init = async () => {
  const actionReader = new StateHistoryPostgresActionReader({
    massiveConfig: DB_CONFIG,
    startAtBlock: DEMUX_CONFIG.startAtBlock, // The block to begin indexing at. For values less than 1, this switches to a "tail" mode, where we start at an offset of the most recent blocks.
    onlyIrreversible: DEMUX_CONFIG.onlyIrreversible, // if true, only blocks that have already reached irreversibility will be handled
  })

  const actionHandler = new ObjectActionHandler(
    handlerVersions,
    { logLevel: LOG_LEVEL },
  );

  const actionWatcher = new BaseActionWatcher(
    actionReader,
    actionHandler,
    { pollInterval: DEMUX_CONFIG.pollInterval },
  )

  await actionReader.initialize().then(() =>
    actionWatcher.watch()
  )
}

const _logger = BunyanProvider.getLogger({
  logSource: 'process handler',
})

process.on('unhandledRejection', (reason) => {
  _logger.error({ reason }, 'unhandledRejection');
  throw reason;
});

process.on('uncaughtException', (err) => {
  _logger.error({ err }, 'uncaughtException');
});

init()
