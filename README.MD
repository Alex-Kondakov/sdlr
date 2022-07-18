## Introduction

**SDLR** - is simple scheduler on Node.Js. It allows to execute scripts (subsequences of console commands) on a daily basis in chosen time. You can choose between simultaneous execution (async) of commands from scripts or run them in turn (sync). Each script is a file with JSON odject. Each JSON object must contain mandatory properties to be a correct **SDLR** script. **SDLR** runs scripts as standalone processes. **SDLR** doesn't require any third-party modules, databases etc. It saves all data to your filesystem. This is the reason to make sure you run **SDLR** with write permissions.

#### Script mandatory properties:

* **name** - String value containing name for script.
* **mode** - Is responsible for commands execution method. This property must be a string with possible values: "async" or "sync".
* **schedule** - Is responsible for commands execution scheduling. This property must be an array of strings in the following format: "hh:mm:ss". "hh" - stands for hours, "mm" - for minutes, "ss" - for seconds. Important! It should be exactly two digits format for timestamps! Keep this array empty if you want to skip execution of your script.
* **commands** - Is the list of commands. It must be an array of strings, containing console commands.

**./scripts** - is a project directory for storing scripts files. **SDLR** checks this dir on each iteration and run scripts accourding their scheduling rules. JSON below is example of how could script look like. **.json** file extension is not mandatory for scripts, you are free to choose any. However each script file must contain a valid JSON in order to be handled by **SDLR**.

#### exampleSync.json:
```json
{
    "name": "Example",
    "mode": "sync",
    "schedule": [
        "16:40",
        "16:41",
        "16:42",
        "16:43",
        "16:44",
        "16:45",
        "16:46",
        "16:47",
        "16:48",
        "16:49"
    ],
    "commands": [
        "wrong",
        "npm --version",
        "node --version",
        "ls -la"
    ]
}
```

## **SDLR** install

```shell
# cd /path/to/projects
# git clone https://github.com/Alex-Kondakov/sdlr.git
```

## **SDLR** start

**SDLR** designed to run scripts no more frequently than once a second. You can edit **config.js** to define interval between scripts checks. The suggestion is to use default or less value to make sure your script would not be skipped.

#### example.json:
```shell
# cd /path/to/projects/sdlr
# npm start

OR

# cd /path/to/projects/sdlr
# node server

The second way saves about 25 MB of RAM
```