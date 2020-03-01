# EOS monitor

EOS monitor is a demux-js implementation for EOS history-tools.

## Getting Started

PENDING

### Prerequisites

This project is built based on Node.js run-time.

```bash
node --version
v10.18.1
```

### Running demo

Container approach
```bash
# Copy .env.example to .env, remember to edit your .env
cp .env.example .env
# Build image for run local
docker build --rm -f Dockerfile -t eos-monitor:demo .
# Run container from built image
docker container run --rm --env-file .env --name demo eos-monitor:demo
```

Example output of running with `debug` LOG_LEVEL

```bash

> eos-mon@0.0.1 start /usr/src/eos-monitor
> node -r dotenv/config dist/index.js | ./node_modules/.bin/bunyan

[2020-03-01T05:14:24.447Z]  INFO: demux/18 on 15ca8274320e: Action Handler was not initialized before started, so it is being initialized now (source=AbstractActionHandler)
[2020-03-01T05:14:24.452Z] DEBUG: demux/18 on 15ca8274320e: Initializing Action Handler... (source=AbstractActionHandler)
[2020-03-01T05:14:24.452Z] DEBUG: demux/18 on 15ca8274320e: Loading Index State... (source=AbstractActionHandler)
[2020-03-01T05:14:24.452Z] DEBUG: demux/18 on 15ca8274320e: Loaded Index State (0ms) (source=AbstractActionHandler)
[2020-03-01T05:14:24.452Z] DEBUG: demux/18 on 15ca8274320e: Initialized Action Handler (0ms setup + 0ms index state = 0ms) (source=AbstractActionHandler)
[2020-03-01T05:14:24.452Z] DEBUG: demux/18 on 15ca8274320e: Loading Index State... (source=AbstractActionHandler)
[2020-03-01T05:14:24.452Z] DEBUG: demux/18 on 15ca8274320e: Loaded Index State (0ms) (source=AbstractActionHandler)
[2020-03-01T05:14:24.453Z] DEBUG: demux/18 on 15ca8274320e: Updating Index State... (source=AbstractActionHandler)
[2020-03-01T05:14:24.453Z] DEBUG: demux/18 on 15ca8274320e: Updated Index State (0ms) (source=AbstractActionHandler)
[2020-03-01T05:14:24.772Z] DEBUG: demux/18 on 15ca8274320e: Loading Index State... (source=AbstractActionHandler)
[2020-03-01T05:14:24.774Z] DEBUG: demux/18 on 15ca8274320e: Loaded Index State (0ms) (source=AbstractActionHandler)
```
## Contributing

PENDING

## Versioning

PENDING

## Authors

* **Truong Ma Phi**- *Initial work* - [trmaphi](https://github.com/trmaphi)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

Thanks [tiendq](https://github.com/tiendq) for inspiration in working with him at [CAN foundation](https://github.com/canfoundation) projects to come up with this for EOS ecosystem