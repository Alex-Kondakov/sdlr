## Introduction

**SDLR** - is simple scheduler written on Node.Js. It allows to execute lists of commands (scripts) on a daily basis in chosen time. You can choose between simultaneous execution of commands from scripts or run them in turn. Each script is file with JSON odject. Each JSON object must contain mandatory properties to be a correct list of commands. **SDLR** runs commands as child processes and prints stdout and stderr of these processes to console.

There are two interconvertible methods to start **SDLR**. You are able to use lite console version which expect you will compose scripts manually. Alternatively there is user interface to handle your scripts, which, however, requires advanced configuring in your environment.

* **name** - String value containing name for script.
* **mode** - Is responsible for commands execution method. This property must be a string with possible values: "simultaneous" or "in turn".
* **schedule** - Is responsible for commands execution scheduling. This property must be an array of strings in the following format: "hh:mm:ss". "hh" - stands for hours, "mm" - for minutes, "ss" - for seconds. Keep this array empty to avoid execution of current script.
* **commands** - Is responsible for commands to be executed. It must be an array of strings, containing console commands.

**./scripts** - is a project directory for storing scripts files. **SDLR** checks this dir on each iteration and run scripts accourding their scheduling rules. JSON below is example of how could script look like. **.json** file extension is not mandatory for scripts, you are free to choose any.

#### example.json:
```json
{
    "name": "Example",
    "mode": "in turn",
    "schedule": [
        "00:30:00",
        "08:30:00",
        "16:30:00"
    ],
    "commands": [
        "node --version",
        "npm --version"
    ]
}
```

## **SDLR** run console version

#### example.json:
```shell
# cd /your/project/dir
# npm start

OR

# cd /your/project/dir
# node index

The second way saves about 25 MB of RAM
```