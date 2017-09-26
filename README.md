# vscode_tools
Export and install vscode extensions via text file

``` Run node vscode_extensions.js ```
```
Options:
  --version           Show version number                              [boolean]
  -d                  Disable all vscode extensions
  --dev, --vscodeDev  Use vscode insiders
  -e                  Export all vscode extensions to vscode_extensions.txt
  -f, --file          Load a file
  -i                  Install all vscode extensions
  -h                  Show help                                        [boolean]

Examples:
  vscode_extensions.js -i -f                Install all vscode extensions
  vscode_extensions.txt
  vscode_extensions.js -i -dev -f           Install all vscode extensions with
  vscode_extensions.txt                     insiders
  vscode_extensions.js -e                   Export all vscode extensions
  vscode_extensions.js -d                   Disable all vscode extensions

copyright 2017

```
