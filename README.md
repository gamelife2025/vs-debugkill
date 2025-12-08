# debugkill README

该 VS Code 扩展在 Go 调试会话下提供一个“Kill”按钮，用于向调试运行的程序发送信号（例如 `SIGTERM`、`SIGKILL` 等），以便在调试或本地运行时快速结束目标进程。

## 要点（非常重要）

- 本扩展通过从调试会话中读取配置字段（例如 `program`、`runtimeExecutable`、`name`、`output`）构造匹配字符串，然后在运行的进程列表中查找匹配项以得到 PID。为了保证运行时能正确过滤并找到对应 PID，请在 `launch.json` 的 Go 调试配置中设置 `output`（或确保 `program`/`name` 能唯一标识目标进程）。

示例 `launch.json`（在 `.vscode/launch.json`）：

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "main",
			"type": "go",
			"request": "launch",
			"mode": "auto",
			"program": "${workspaceFolder}/main.go",
			"output": "__debug_bin_main",
			"cwd": "${workspaceFolder}"
		}
	]
}
```

- 在上例中，扩展会使用 `output` 字段的值 `__debug_bin_main` 来在进程列表中寻找包含该字符串的命令行并取回对应的 PID。确保该值能够在目标进程的命令行中被匹配到（Delve 在启动被调试的 Go 程序时通常会使用 `output` 作为二进制名称）。


## 使用说明

1. 确保你的 Go 调试配置（`.vscode/launch.json`）包含可以唯一标识被调试进程的字段（推荐使用 `output`）。
2. 启动 Go 调试会话（使用 Delve）,在调试工具栏会显示 `KILL` 按钮


谢谢使用 `debugkill`！
