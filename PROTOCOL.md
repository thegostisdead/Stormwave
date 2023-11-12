# C2 / bot protocol 

## Ask for command to execute 
`POST /api/global`
```json
{
	"uuid" : "af7c1fe6-d669-414e-b066-e9733f0de7a8",
	"command" : "GET_COMMAND"
}
```

## Send back the result 
`POST /api/global`
```json
{
	"uuid" : "af7c1fe6-d669-414e-b066-e9733f0de7a8",
	"command" : "ACK_COMMAND",
	"data" : {
	}
}
```