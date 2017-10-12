# EZ CLI

JUST STARTED THIS IN WHAT LITTLE SPARE TIME I HAVE. There's not much here yet, but it's a WIP.

I AM NOT RESPOSIBLE FOR ANY HARDWARE FAILURES, DELETED CONTENT, CAREER ENDING EMAILS SENT TO YOUR BOSS, WIPED HARD DRIVES, OR ANYTHING ELSE BAD THAT HAPPENS TO YOU, YOUR MACHINE, YOUR NETWORK MACHINES, ETC. USE THIS AT YOUR OWN RISK!! YOU ASSUME ANY RESPOSIBILITY FOR ANYTHING THAT MIGHT HAPPEN AS A RESULT OF USING THIS TOOL! YOU HAVE BEEN WARNED.

That said, I have been testing this on my personal laptop running Ubuntu and everything works for me. I also have a Mac at work which I will also be testing this on. The Windows commands have not been tested as I do not have access to a Windows machine.

Also, you'll notice that my approach this seems a little random. I'm trying all different types of operations at the moment to figure out the scope of what can be accomplished before I really start focusing on a command or command type and really hammer out all of the possibilities.

### What this does
The goal of this is to provide a simple way to execute commands in an intuative way. If you're like me, you often forget commands or the options that need to be passed to them to get the desired result. This tool aims to make all of that easier.

The OS platform is detected, the appropriate prompts are provided to gather info about what you are trying to do, and if the command provides info it is run immediately, but if it performs an action you are prompted to confirm before execution.


## Installation
I don't plan on publishing this to npm until I have a significant amount of functionality built in. Until then, you can clone this repo, cd into the directory, and run:
```
npm i
npm link --scope=<your_username>
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

|Command      |Linux | MacOS | Windows | Description                               |
|-------------|------|-------|---------|-------------------------------------------|
|calendar     |  X   |   X   |         | Prints calendar to console.               |
|copyFile     |  X   |   X   |    ?    | Copies file to destination.               |
|copyFolder   |  X   |   X   |    ?    | Copies folder and contents to destination.|
|copySshKey   |  X   |   X   |         | Copies ssh public key to clipboard.       |
|driveSpace   |  X   |   X   |    ?    | Prints hard drive info to console.        |
|linuxUpdates |  X   |       |         | Fetches/refreshes Linux system updates.   |
|listGlobalNpm|  X   |   X   |    ?    | Lists globally installed npm packages.    |
|listPrinters |  X   |   X   |         | Lists available printers.                 |
|speedTest    |  X   |   X   |    ?    | Run speedtest.net from your terminal.     |
|viewSshKey   |  X   |   X   |    ?    | Prints public key to console.             |
|whereAmI     |  X   |   X   |    ?    | Prints full path to current directory.    |

