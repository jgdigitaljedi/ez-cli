# EZ CLI

JUST STARTED THIS IN WHAT LITTLE SPARE TIME I HAVE. There's not much here yet, but it's a WIP.

I AM NOT RESPOSIBLE FOR ANY HARDWARE FAILURES, DELETED CONTENT, CAREER ENDING EMAILS SENT TO YOUR BOSS, WIPED HARD DRIVES, OR ANYTHING ELSE BAD THAT HAPPENS TO YOU, YOUR MACHINE, YOUR NETWORK MACHINES, ETC. USE THIS AT YOUR OWN RISK!! YOU ASSUME ANY RESPOSIBILITY FOR ANYTHING THAT MIGHT HAPPEN AS A RESULT OF USING THIS TOOL! YOU HAVE BEEN WARNED.

That said, I have been testing this on my personal laptop running Ubuntu and everything works for me. I also have a Mac at work which I will also be testing this on. The Windows commands have not been tested as I do not have access to a Windows machine.

### What this does
The goal of this is to provide a simple way to execute commands in an intuative way. If you're like me, you often forget commands or the options that need to be passed to them to get the desired result. This tool aims to make all of that easier.

The OS platform is detected, the appropriate prompts are provided to gather info about what you are trying to do, and if the command provides info it is run immediately, but if it performs an action you are prompted to confirm before execution.


## Installation
I don't plan on publishing this to npm until I have a significant amount of functionality built in. Until then, you can clone this repo and run:
```
npm i
npm link
```

### Usage
```
ez <command>
```

### Commands and Compatibility

|Command     |Linux | MacOS | Windows | Description                               |
|------------|------|-------|---------|-------------------------------------------|
|calendar    |  X   |   X   |         | Prints calendar to console.               |
|copyFile    |  X   |   X   |    X    | Copies file to destination.               |
|copyFolder  |  X   |   X   |    X    | Copies folder and contents to destination.|
|driveSpace  |  X   |   X   |    X    | Prints hard drive info to console.        |
|listPrinters|  X   |   X   |         | Lists available printers.                 |
|whereAmI    |  X   |   X   |    X    | Prints full path to current directory.    |

