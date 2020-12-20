import { commands, window, workspace } from "vscode";

export function getOrSetConfig(configKey: string) : Array<number> | undefined{
  let key = getKey();
  if (isNullOrEmpty(key)) {
    commands.executeCommand(`vscbox.open${firstCaseToUpper(configKey)}Settings`);
    window.showWarningMessage(`You seem to have not configured ${configKey} yet, please configure first.`);
  } else {
    return key;
  }
}

export function getOrSetKey() : Array<number> | undefined{
  return getOrSetConfig('keyArray');
}

export function getKey() : Array<number>{
  let configuration = workspace.getConfiguration();
  let keyArray = configuration.get('vscbox.keyArray') as Array<number>;
  if (keyArray.length === 0) {
    let keyStr: string|undefined = configuration.get('vscbox.keyString');
    if (keyStr) {
      keyArray = keyStr.split(',').map((e) => parseInt(e));
    }
  }

  return keyArray;
}

export function isNullOrEmpty(value: Array<any> | undefined) : boolean {
  return value ? value.length == 0 : true;
}

export function firstCaseToUpper(str: string): string {
  return str ? str.replace(str[0], str[0].toUpperCase()) : '';
}

export function addDateSuffixForFilePath(filePath: string): string {
  let dateTimeNowString = DateTimeNowString();
  let dotIndex = filePath.lastIndexOf('.');
  if (dotIndex === -1) {
    dotIndex = filePath.length
  }
  
  return `${filePath.substring(0, dotIndex)}_${dateTimeNowString}${filePath.substring(dotIndex)}`;
}

export function DateTimeNowString() : string {
  return new Date().toJSON().replace(/\D/g, '');
}