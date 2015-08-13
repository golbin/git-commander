'use strict';

module.exports = function (config) {
    return {
        "screen": {
            "autoPadding": false,
            "fullUnicode": true
        },
        "title": {
            "staged": {
                "top": "top",
                "left": "left",
                "width": "50%",
                "height": 3,
                "align": "center",
                "content": "Staged Files",
                "tags": true,
                "border": {
                    "type": "none"
                },
                "style": {
                    "fg": "green"
                }
            },
            "unstaged": {
                "top": "top",
                "left": "50%",
                "width": "50%",
                "height": 3,
                "align": "center",
                "content": "Not Staged Files",
                "tags": true,
                "border": {
                    "type": "none"
                },
                "style": {
                    "fg": "red"
                }
            }
        },
        "list": {
            "staged": {
                "top": "top+2",
                "left": "left",
                "data": null,
                "border": "line",
                "align": "left",
                "tags": true,
                "width": "50%",
                "height": "100%-6",
                "interactive": false,
                "keys": true,
                "style": {
                    "border": {
                        "fg": "green"
                    },
                    "selected": {
                        "bg": "blue"
                    }
                }
            },
            "unstaged": {
                "top": "top+2",
                "left": "50%",
                "data": null,
                "border": "line",
                "align": "left",
                "tags": true,
                "width": "50%",
                "height": "100%-6",
                "interactive": true,
                "keys": true,
                "style": {
                    "border": {
                        "fg": "red"
                    },
                    "selected": {
                        "bg": "blue"
                    }
                }
            }
        },
        "branchbox": {
            "bottom": 3,
            "height": 1,
            "width": "100%",
            "align": "right",
            "tags": true,
            "padding": {
                "right": 2
            }
        },
        "menubar1": {
            "align": "center",
            "bottom": 1,
            "height": 2,
            "mouse": true,
            "vi": true,
            "keys": true,
            "style": {
                "prefix": {
                    "fg": "white"
                },
                "item": {
                    "fg": "cyan"
                },
                "selected": {
                    "fg": "cyan"
                }
            },
            "commands": {
                "SELECT": {
                    "keys": config.keys.main.select
                },
                "ADD": {
                    "keys": config.keys.main.add
                },
                "RESET": {
                    "keys": config.keys.main.reset
                },
                "COMMIT": {
                    "keys": config.keys.main.commit
                }
            }
        },
        "menubar2": {
            "align": "center",
            "bottom": 1,
            "height": 1,
            "mouse": true,
            "vi": true,
            "keys": true,
            "style": {
                "prefix": {
                    "fg": "white"
                },
                "item": {
                    "fg": "cyan"
                },
                "selected": {
                    "fg": "cyan"
                }
            },
            "commands": {
                "ALL ": {
                    "keys": config.keys.main.selectAll
                },
                "LOG": {
                    "keys": config.keys.main.log
                },
                "DIFF ": {
                    "keys": config.keys.main.diff
                },
                "BRANCH": {
                    "keys": config.keys.main.showBranch
                }
            }
        },
        "loading": {
            "top": "center",
            "left": "center",
            "align": "center",
            "height": 5,
            "width": "50%",
            "tags": true,
            "hidden": true,
            "border": "line"
        },
        "popup": {
            "top": "center",
            "left": "center",
            "align": "left",
            "height": "shrink",
            "width": "shrink",
            "tags": true,
            "hidden": true,
            "border": "line",
            "padding": {
                "top": 1,
                "bottom": 1,
                "left": 3,
                "right": 3
            },
            "style": {
                "border": {
                    "fg": "red"
                }
            }
        }
    };
};
