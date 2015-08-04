'use strict';

module.exports = function (config) {
    return {
        "layout": {
            "hidden": true,
            "top": "center",
            "left": "center",
            "width": "50%",
            "height": "50%"
        },
        "list": {
            "top": "top",
            "left": "left",
            "width": "100%",
            "height": "100%-4",
            "data": null,
            "border": "line",
            "align": "left",
            "vi": true,
            "keys": true,
            "style": {
                "border": {
                    "fg": "white"
                },
                "selected": {
                    "bg": "blue"
                }
            }
        },
        "menubar": {
            "align": "center",
            "bottom": 0,
            "width": "100%",
            "height": 3,
            "border": "line",
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
                "CHECKOUT": {
                    "keys": config.keys.branch.checkOut
                },
                "ADD": {
                    "keys": config.keys.branch.add
                },
                "DEL": {
                    "keys": config.keys.branch.delete
                }
            }
        },
        "prompt": {
            "top": "center",
            "left": "center",
            "width": "80%",
            "height": "shrink",
            "border": "line",
            "align": "left",
            "vi": true,
            "keys": true
        }
    };
};
