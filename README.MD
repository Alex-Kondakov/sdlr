## Introduction

**SDLR** - is simple scheduler written on Node.Js. It allows to execute lists of commands on a daily basis in chosen time. You can choose between simultaneous execution of commands from list or run them in turn. Each list is file with JSON odject. Each JSON object must contain mandatory properties to be a correct list of commands. **SDLR** runs commands as child processes and prints stdout and stderr of these processes to console.

* **name** - String value containing name for list of commands.
* **mode** - Is responsible for commands execution method. This property must be a string with possible values: "simultaneous" or "in turn".
* **schedule** - Is responsible for commands execution scheduling. This property must be an array of strings in the following format: "hh:mm:ss". "hh" - stands for hours, "mm" - for minutes, "ss" - for seconds. Keep this array empty to avoid execution of current list of commands.
* **commands** - Is responsible for commands to be executed. It must be an array of strings, containing console commands.

**./lists** - is a project directory for storing lists files. **SDLR** check this dir on each iteration and run commands lists accourding their scheduling. JSON below is example of how could commands list look like. **.json** file extension is not mandatory for commands lists, you are free to choose any.

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