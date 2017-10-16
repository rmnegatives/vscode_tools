#!/usr/bin/env node

const fs = require( 'fs' );
const chalk = require('chalk');
const exec = require( 'child_process' ).exec;
const argv = require( 'yargs' )
  .usage( 'Usage: $0 <command> [options]' )
  .example( '$0 -i -f vscode_extensions.txt', 'Install all vscode extensions' )
  .example( '$0 -i -dev -f vscode_extensions.txt', 'Install all vscode extensions with insiders' )
  .example( '$0 -e', 'Export all vscode extensions' )
  .example( '$0 -d', 'Disable all vscode extensions' )
  .alias( 'dev', 'vscodeDev' )
  .alias( 'f', 'file' )
  .nargs( 'f', 1 )
  .describe( 'd', 'Disable all vscode extensions' )
  .describe( 'dev', 'Use vscode insiders' )
  .describe( 'e', 'Export all vscode extensions to vscode_extensions.txt' )
  .describe( 'f', 'Load a file' )
  .describe( 'i', 'Install all vscode extensions' )
  .help( 'h' )
  .epilog( 'copyright 2017' )
  .argv;

const vsCodeCommandLine = {
  install: '--install-extension',
  disable: '--disable-extensions',
  list: '--list-extensions',
};

let vscodeVersion = 'code';
let vsCodeExecute = '';

if ( argv.vscodeDev ) {
  vscodeVersion = 'code-insiders';
}

if ( argv.d ) {
  const disableCommand = `${vscodeVersion} ${vsCodeCommandLine.disable}`;
  exec( disableCommand, execResult );
  return;
}

if ( argv.e ) {
  const exportCommand = `${vscodeVersion} ${vsCodeCommandLine.list} >> vscode_extensions.txt`;
  exec( exportCommand, execResult );
  return;
}

if ( argv.f && argv.i) {
  let extensions = [];
  const vsCodeExecute = `${vscodeVersion} ${vsCodeCommandLine.install}`;
  const fileStream = fs.createReadStream( argv.file );
  fileStream.on( 'data', function ( buf ) {
    const extension = buf.toString();
    extensions = extension.toString().split( "\n" );
  } );

  fileStream.on( 'end', () => {

    extensions.forEach( ( val, i ) => {
      const command = `${vsCodeExecute} ${val}`;
      console.log(chalk.blue(`Installing extension: ${val}`));
      exec( command, execResult );
    } );
  } );

  function execResult( error, stdout, stderr ) {
    if ( error ) {
      console.error( `exec error: ${error}` );
      return;
    }
  }

  console.log(chalk.green( 'All Extensions Installed'));
}
