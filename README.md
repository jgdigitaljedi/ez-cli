# EZ CLI

JUST STARTED THIS IN WHAT LITTLE SPARE TIME I HAVE. There's not much here yet, but it's a WIP.

I AM NOT RESPOSIBLE FOR ANY HARDWARE FAILURES, DELETED CONTENT, CAREER ENDING EMAILS SENT TO YOUR BOSS, WIPED HARD DRIVES, OR ANYTHING ELSE BAD THAT HAPPENS TO YOU, YOUR MACHINE, YOUR NETWORK MACHINES, ETC. USE THIS AT YOUR OWN RISK!! YOU ASSUME ANY RESPOSIBILITY FOR ANYTHING THAT MIGHT HAPPEN AS A RESULT OF USING THIS TOOL! YOU HAVE BEEN WARNED.

That said, I have been testing this on my personal laptop running Ubuntu and everything works for me. I also have a Mac at work which I will also be testing this on. The Windows commands have not been tested as I do not have access to a Windows machine. I'm kind of targeting the low hanging fruit at the moment and testing the water, but I plan on really getting deeper into useful commands after I feel like I've figured out the best way to do things.

### What this does
The goal of this is to provide a simple way to execute commands in an intuative way. If you're like me, you often forget commands or the options that need to be passed to them to get the desired result. This tool aims to make all of that easier.

The OS platform is detected, the appropriate prompts are provided to gather info about what you are trying to do, and if the command provides info it is run immediately, but if it performs an action you are prompted to confirm before execution.

### Teach Mode
When you run:
```
ez init
```
...you will be asked if you want to enable teach mode. Teach mode is a way to help you learn thse commands while you are using ez-cli. When enabled, it will output what command was actually run after it is executed so you can see what is going on behind the scenes and, hopefully, learn the command over time.


## Installation
I don't plan on publishing this to npm until I have a significant amount of functionality built in. Until then, you can clone this repo, cd into the directory, and run:
```
npm i
npm link --scope=<your_username>
```
Then, for the sake of building your personal config file to handle differences in operating systems, run:
```
ez init
```

### Usage
```
ez <command>
```

### Commands and Compatibility

NOTE: I'm abandoning the Windows specific commands for now as I have no access to a Windows machine anywhere. I started on some Windows commands, but they are untested. In theory I think a lot of this will run in Git-Bash, but I don't know. I am not even going to attempt Windows specific commands for now until maybe I pickup a cheap, old box and toss a Windows installation on it. Use at your own risk for Windows. (or put in a pull request if you have access and want to write and test the commands);

Also, I am trying to keep this ES5 so it runs on older versions of Node without problems. That also means no async-await or newer Node API usage either :(

Also, for Linux, the package manager specific commands are untested except for apt. That said, I'm pretty sure the yum commands I've written will work fine, and I haven't circled back to add pacman and yast.

The idea behind the commands are to say WHAT, then the action. This way all tasks pertaining to ssh keys, file operations, etc will be grouped in the list since they will start with the WHAT.

|Command        |Linux | MacOS | Description                                       |
|---------------|------|-------|---------------------------------------------------|
|calendar       |  X   |   X   | Prints calendar to console.                       |
|configView     |  X   |   X   | Show EZ-CLI config                                |
|configTeach    |  X   |   X   | Toggles teach mode.                               |
|configZipcode  |  X   |   X   | Change zipcode in config.                         |
|driveSpace     |  X   |   X   | Prints hard drive info to console.                |
|fileCopy       |  X   |   X   | Copies file to destination.                       |
|folderCopy     |  X   |   X   | Copies folder and contents to destination.        |
|gitForget      |  X   |   X   | Clears git cache.
|init           |  X   |   X   | Build OS specific config. RUN THIS FIRST!         |
|installCurl    |  X   |   X   | Installs curl command line utility.               |
|installOhMyZsh |  X   |       | Installs Oh-My-Zsh.                               |
|linuxUpdates   |  X   |       | Fetches/refreshes Linux system updates.           |
|makeMeASandwich|  X   |   X   | Hmm, I wonder if...                               |
|nodeKill       |  X   |   X   | Kills Node process if one running.                |
|nodeVersion    |  X   |   X   | Print NodeJS version to console.                  |
|npmGlobalsList |  X   |   X   | Lists globally installed npm packages.            |
|npmVersion     |  X   |   X   | Print npm version to console.                     |
|ping           |  X   |   X   | Pings location and prints result to console.      |
|printersList   |  X   |   X   | Lists available printers.                         |
|processId      |  X   |   X   | Prints PID to console, errors if no process found.|
|shellEnvVar    |  X   |   X   | Adds environment variable to shell config.        |
|speedTest      |  X   |   X   | Run speedtest.net from your terminal.             |
|sshKeyClip     |  X   |   X   | Copies ssh public key to clipboard.               |
|sshKeyView     |  X   |   X   | Prints public key to console.                     |
|whereAmI       |  X   |   X   | Prints full path to current directory.            |

