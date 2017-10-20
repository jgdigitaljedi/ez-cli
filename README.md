# EZ CLI

JUST STARTED THIS IN WHAT LITTLE SPARE TIME I HAVE. There's not much here yet, but it's a WIP.

I AM NOT RESPOSIBLE FOR ANY HARDWARE FAILURES, DELETED CONTENT, CAREER ENDING EMAILS SENT TO YOUR BOSS, WIPED HARD DRIVES, OR ANYTHING ELSE BAD THAT HAPPENS TO YOU, YOUR MACHINE, YOUR NETWORK MACHINES, ETC. USE THIS AT YOUR OWN RISK!! YOU ASSUME ANY RESPOSIBILITY FOR ANYTHING THAT MIGHT HAPPEN AS A RESULT OF USING THIS TOOL! YOU HAVE BEEN WARNED.

That said, I have been testing this on my personal laptop running Ubuntu and everything works for me. I also have a Mac at work which I will also be testing this on. The Windows commands have not been tested as I do not have access to a Windows machine.

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

NOTE: The Windows commands are not yet tested. Also, while trying to support the possibility of running from git-bash or CMD (although I'm not sure how you would run this from CMD), this is a big difference in compatibility between the two.

Windows Compatibility:<br>
GB = git-bash<br>
CMD = CMD<br>
X = both<br>
? = I think it will, but it isn't tested

The idea behind the commands are to say WHAT, then the action. This way all tasks pertaining to ssh keys, file operations, etc will be grouped in the list since they will start with the WHAT.

|Command       |Linux | MacOS | Windows | Description                               |
|--------------|------|-------|---------|-------------------------------------------|
|calendar      |  X   |   X   |         | Prints calendar to console.               |
|configView    |  X   |   X   |    X    | Show EZ-CLI config                        |
|driveSpace    |  X   |   X   |    ?    | Prints hard drive info to console.        |
|fileCopy      |  X   |   X   |    ?    | Copies file to destination.               |
|folderCopy    |  X   |   X   |    ?    | Copies folder and contents to destination.|
|init          |  X   |   X   |    X    | Build OS specific config. RUN THIS FIRST! |
|linuxUpdates  |  X   |       |         | Fetches/refreshes Linux system updates.   |
|nodeKill      |  X   |   X   |    ?    | Kills Node process if one running.        |
|nodeVersion   |  X   |   X   |    X    | Print NodeJS version to console.          |
|npmGlobalsList|  X   |   X   |    ?    | Lists globally installed npm packages.    |
|npmVersion    |  X   |   X   |    X    | Print npm version to console.             |
|printersList  |  X   |   X   |         | Lists available printers.                 |
|speedTest     |  X   |   X   |    ?    | Run speedtest.net from your terminal.     |
|sshKeyCopy    |  X   |   X   |         | Copies ssh public key to clipboard.       |
|sshKeyView    |  X   |   X   |    ?    | Prints public key to console.             |
|whereAmI      |  X   |   X   |    ?    | Prints full path to current directory.    |

