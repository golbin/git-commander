# git commander

A git tool with an easy terminal interface.

![ScreenShot](https://raw.githubusercontent.com/golbin/git-commander/master/doc/git-commander@2x.gif)

# Features

- [x] git status
- [x] git add [files]
- [x] git reset -- [files]
- [x] git commit [files]
- [x] git log
- [x] git reset <commit>
- [x] git diff file
- [x] git branch
- [ ] git merge (handling conflict)
- [ ] git pull/push

# Install & Usage

```bash
$ npm install -g git-commander
$ git-commander
```

# Requirements

- **git** >= 2.4
- **nodejs** >= 0.12
- **blessed** >= 0.1.7
- **lodash** >= 3.0

# Key Configuration

We have two key sets _vi_ and _mc_ preconfigured. The default one is _vi_.

##### Using the mc key set

You will need to place a file at `~/.config/git-commander/config.json` with the following content:

```
{
    "keySet": "mc"
}
```

##### Redefining keys one by one

You also can redefine keys one by one if you would like. You'll need to extend your `~/.config/git-commander/config.json` file with a key called `keys` and put all your key definitions there. For example if you would like to use the _mc_ key set and make key _x_ quit the application, you'll need to add the following:

```
{
    "keySet": "mc",
    "keys": {
        "common": {
            "quit": [
                "x"
            ]
        }
    }
}
```

You can find [default settings here](https://github.com/golbin/git-commander/tree/master/config/key).

# Troubleshootings

## ANSI color codes are displayed

ANSI color codes are being displayed if you set "always" for color settings in your **.gitconfig**. For fixing this, set "auto" for color settings like below.

```
[color]
    # diff = always
    diff = auto
    status = auto
    ui = auto
    branch = auto
```

## Non-ascii character problem

If you use non-ascii character for source files, You need to disable
the **core.quotepath** option using following command:

```bash
$ git config --global core.quotepath false
```

# License

MIT
