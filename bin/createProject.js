import fs from 'fs';
import { promisify } from 'util';
import { exec } from "child_process";
import path from "path";
import files from "./files.js";
import ora from 'ora';
import chalk from 'chalk';
export default async function createProject ( dir )
{
    const spinnerData = {
        "spinner": "dots",
        "color": "cyan",
    } 
    const projectDir = path.join( process.cwd(), dir );
    
    if ( !fs.existsSync( projectDir ) )
    {
        fs.mkdirSync( projectDir );
    }
    const spinner = ora( spinnerData );
    spinner.text = chalk.hex("#A64253")("Installing dependencies...");
    spinner.start();
    await promisify(exec)( "npm i aoi.db @akarui/aoi.music", { cwd: projectDir } );
    spinner.succeed(  chalk.hex("#A64253")("Installed dependencies!" ));

    const spinner2 = ora( spinnerData );
    spinner2.text =  chalk.hex("#A64253")("Creating project files...");
    const commandDir = path.join( projectDir, "commands" );
    const voiceDir = path.join( projectDir, "voice" );
    const customFunctionDir = path.join( projectDir, "customFunctions" );
    if ( !fs.existsSync( commandDir ) ) fs.mkdirSync( commandDir );
    if ( !fs.existsSync( voiceDir ) ) fs.mkdirSync( voiceDir );
    if( !fs.existsSync( customFunctionDir ) ) fs.mkdirSync( customFunctionDir );

    for ( const file of Object.keys( files ) )
    {
        fs.writeFileSync( path.join(projectDir, file), files[ file ] );
    }
    spinner2.succeed(  chalk.hex("#A64253")("Created project files!" ));
}