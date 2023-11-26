## Зависимости
Для робаоты необходимо импортировать 3 библиотеки
```
import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as fs from 'fs';
```
- Первая нужна для работы с vs code
- Вторая нужна для работы с cmd. Используется для создания виртуального окружения
- Третья используется для работы с файловой системой. Нужна из-за функций записи и чтения.

## Активация и деактивация расширения
Функции activate и deactivate используются для активации и деактивации расширения соответственно.

## Создание виртуального окружения
```
const pythonEnvPath = vscode.Uri.joinPath(workspaceFolder.uri, 'venv').fsPath;
        exec(`python -m venv ${pythonEnvPath}`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                vscode.window.showErrorMessage('Failed to create Python environment.');
                return;
            }
```

## Создание файла .gitignore
```
const gitignorePath = vscode.Uri.joinPath(workspaceFolder.uri, '.gitignore').fsPath;
            const gitignoreContent = `
            
            //Зависимости
`;
            // запись зависимостей в gitignore
            fs.writeFile(gitignorePath, gitignoreContent, (err) => {
                if (err) {
                    console.error(err);
                    vscode.window.showErrorMessage('Failed to generate .gitignore file.');
                    return;
                }
```
## Создание main.py
```
const mainFilePath = vscode.Uri.joinPath(workspaceFolder.uri, 'main.py').fsPath;
                const mainFileContent = `def main():
    print('Hello, World!')
        
if __name__ == '__main__':
    main()`;
                fs.writeFile(mainFilePath, mainFileContent, (err) => {
                    if (err) {
                        console.error(err);
                        vscode.window.showErrorMessage('Failed to generate main.py file.');
                        return;
                    }
```
Все это работает так как функция active реагирует на команду.