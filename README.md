# git commander

A git tool with an easy terminal interface.

![ScreenShot](https://raw.githubusercontent.com/golbin/git-commander/master/doc/git-commander.gif)

# Features

- [x] git status
- [x] git add [files]
- [x] git reset -- [files]
- [x] git commit [files]
- [x] git log
- [x] git reset <commit>
- [x] git diff file
- [ ] git branch
- [ ] git merge (handling conflict)
- [ ] git push

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

# Tips

If you use non-ascii character for source files, You need to disable
the **core.quotepath** option using following command:

```bash
$ git config --global core.quotepath false
```

# License

MIT
