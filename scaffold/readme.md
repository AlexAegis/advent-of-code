# AoC Project Scaffolder

To use first acquire an AoC session id by logging into the site and then from the Network tab of the Chrome debug tool just search for a request that has a Cookie request header with the session entry in it. Copy that into a `scaffold.env` file in the env folder if you're using it from the VS Code launch option or just set it as a regular env variable.

It will load the description of the task and print it into a markdown file, and the your input too.

## Disclaimer

Do not use this to spam the input endpoint. This project is not for that, it's for automation. If you abuse the endpoint it could get you restricted anyways.

## Requirements

- [Rust](https://rustup.rs/)

## How to run

1. Directly from VS Code

Launch the `Project Scaffolder` launch option and answer which years and which days project you want to generate. Everything will be placed in the current working directory. If something already exists its gonna simply overwrite it so be careful.

2. With Cargo from the root of the repository

```bash
cargo run -p scaffold 2015 4
```

Don't forget to [set the env value](https://www.shellhacks.com/windows-set-environment-variable-cmd-powershell/) for the session id

Windows CMD

```cmd
set SESSION="value"
```

Windows PowerShell

```ps
$env:SESSION="value"
```

Bash

```bash
export SESSION="value"
```
