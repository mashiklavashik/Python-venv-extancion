import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

    // регистрация команды, которая вызывает расщирение
    let disposable = vscode.commands.registerCommand('pythonenv.createPythonEnv', () => {

        // для работы нужна рабочая папка, поэтому существует эта проверка
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }

        //создание виртуального окружения
        const pythonEnvPath = vscode.Uri.joinPath(workspaceFolder.uri, 'venv').fsPath;
        exec(`python -m venv ${pythonEnvPath}`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                vscode.window.showErrorMessage('Failed to create Python environment.');
                return;
            }

            // создание gitignore
            const gitignorePath = vscode.Uri.joinPath(workspaceFolder.uri, '.gitignore').fsPath;
            const gitignoreContent = `# Byte-compiled / optimized / DLL files
            __pycache__/
            *.py[cod]
            *$py.class
            
            # C extensions
            *.so
            
            # Distribution / packaging
            dist/
            build/
            *.egg-info/
            *.egg
            
            # PyInstaller
            #  Usually these files are written by a python script from a template
            #  before PyInstaller builds the exe, so as to inject date/other infos into it.
            *.manifest
            *.spec
            
            # Installer logs
            pip-log.txt
            pip-delete-this-directory.txt
            
            # Unit test / coverage reports
            htmlcov/
            .coverage
            .tox/
            .nox/
            .coverage.*
            .cache
            nosetests.xml
            coverage.xml
            *.cover
            *.py,cover
            .hypothesis/
            .pytest_cache/
            
            # Translations
            *.mo
            *.pot
            
            # Django stuff:
            *.log
            local_settings.py
            db.sqlite3
            db.sqlite3-journal
            
            # Flask stuff:
            instance/
            .webassets-cache
            
            # Scrapy stuff:
            .scrapy
            
            # Sphinx documentation
            docs/_build/
            
            # PyBuilder
            target/
            
            # Jupyter Notebook
            .ipynb_checkpoints
            
            # IPython
            profile_default/
            ipython_config.py
            
            # pyenv
            .python-version
            
            # pipenv
            # According to pypa/pipenv#598, it is recommended to include Pipfile.lock in version control.
            # However, in case of collaboration, if having platform-specific dependencies or dependencies
            # having no cross-platform support, pipenv may install dependencies that don't work, or not
            # install all needed dependencies.
            #Pipfile.lock
            
            # PEP 582; used by e.g. github.com/David-OConnor/pyflow
            __pypackages__/
            
            # Celery stuff
            celerybeat-schedule
            celerybeat.pid
            
            # SageMath parsed files
            *.sage.py
            
            # Environments
            .env
            .venv
            env/
            venv/
            ENV/
            env.bak/
            venv.bak/
            
            # Spyder project settings
            .spyderproject
            .spyproject
            
            # Rope project settings
            .ropeproject
            
            # mkdocs documentation
            /site
            
            # mypy
            .mypy_cache/
            .dmypy.json
            dmypy.json
            
            # Pyre type checker
            .pyre/
            
            # pytype static type analyzer
            .pytype/
            
            # Cython debug symbols
            cython_debug/
            
            # PyCharm files
            .idea/
            .venv/
            .vscode/
            *.iml
            *.iws
            *.ipr
            
            # Visual Studio Code files
            .vscode/
`;
            // запись зависимостей в gitignore
            fs.writeFile(gitignorePath, gitignoreContent, (err) => {
                if (err) {
                    console.error(err);
                    vscode.window.showErrorMessage('Failed to generate .gitignore file.');
                    return;
                }

                // создание кастомного файла main.py
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

                    vscode.window.showInformationMessage('.gitignore and main.py files generated successfully.');
                });
            });
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}