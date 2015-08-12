'use strict';

module.exports = function (config) {
    return {
        "layout": {
            "hidden": true,
            "top": "center",
            "left": "center",
            "width": "100%",
            "height": "100%"
        },
        "textarea": {
            "top": "top",
            "left": "left",
            "width": "100%",
            "height": "100%-3",
            "border": "line",
            "tags": true,
            "scrollable": true,
            "mouse": true,
            "keys": true,
            "padding": {
                "left": 1,
                "right": 1
            },
            "scrollbar": {
                "ch": " "
            },
            "style": {
                "scrollbar": {
                    "inverse": true
                }
            }
        },
        "menubar": {
            "align": "center",
            "bottom": 0,
            "width": "100%",
            "height": 3,
            "mouse": true,
            "border": "line",
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
                "EXIT": {
                    "keys": config.keys.common.quit
                },
                "PAGE DOWN": {
                    "keys": config.keys.common.pageDown
                },
                "PAGE UP": {
                    "keys": config.keys.common.pageUp
                }
            }
        }
    };
};
