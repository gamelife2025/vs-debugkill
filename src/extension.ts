import * as vscode from 'vscode';
import {exec} from 'child_process';

function executeCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(stdout);
            }
        });
    });
}

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.debugkillButton', async () => {
        const debugSession = vscode.debug.activeDebugSession;
        if (debugSession) {
            executeCommand(`ps -aux|grep "${debugSession.configuration.output}" |grep -v grep|awk '{print $2}'`)
            .then((v:string)=>{
                let pid = parseInt(v);
                executeCommand(`kill -TERM ${pid}`)
                .then((kill_stdout:string)=>{
                })
                .catch((kill_stderr:string)=>{
                    vscode.window.showInformationMessage(`kill pid:${pid} err:${kill_stderr}`);
                });
            })
            .catch((error:string)=>{
                vscode.window.showInformationMessage(`get pid err:${error}`);
            });
        } else {
            vscode.window.showInformationMessage('没有获取到激活的debug回话');
        }
        
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
