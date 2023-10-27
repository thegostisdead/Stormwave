# Backend 

## Requirements
- Node 18.0.0 or higher 
- NPM 6.14.0 or higher
- Go (installed and in path)
- Core sources (to generate custom core payloads)

## Routes 

### Machine
- GET  /machine-uuid/command
- POST /machine-uuid/command/ack
- POST /machine-uuid/modules

### Builder
- POST /builder/build (body: {username: string, uuid: string, publicIp: string, platform: string, arch: string})
- GET /builder/get-binary/:dropper_uuid

TODO : move common routes in one big route and pass the command name in the body
## How to run (docker)

```bash
docker compose up -d
```


