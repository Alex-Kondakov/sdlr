## Introduction

**SDLR** - is simple scheduler written on Node.Js. It allows to execute lists of commands on daily basis in chosen time. You can choose between simultaneous execution of commands from list or run them in turn. Each list is file with JSON odject. Each JSON object must contain mandatory properties to be correct list of commands.

* **name** - String value containing name for list of commands.
* **mode** - is responsible for commands execution method. This property must be a string with possible values: "simultaneous" or "in turn".
* **schedule** - is responsible for commands execution scheduling. This property must be an array of strings in the following format: "hh:mm:ss". "hh" - stands for hours, "mm" - for minutes, "ss" - for seconds. Keep this array empty to avoid execution of current list of commands.