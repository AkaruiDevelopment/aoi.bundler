#! /usr/bin/env node

    import chalk from "chalk";
    import boxen from "boxen";
import createProject from "./createProject.js";
import pack from "../package.json" assert { type : "json"}
    const argv = process.argv.slice(2);

    const name = argv[0] || "";
    if (!name) {
        const msgbox = boxen(
            chalk.cyanBright(
                `
              :!^.            
             :7PY~.           
            :7PBBJ^.                                
           :75PPGGJ^.                               
            JGPPPPP?^.                      ${chalk.hex("#A64253")(
                "A CLI for handling aoi.js projects",
            )}                             
         .7  YBBGPGP?:.     
        :7&@  YGGPPBG7:.                            
       .7&@@@  YPPGGBP7^:                   ${chalk.hex("#8700ff")(
           "Version:",
       )} ${chalk.hex("#A64253")(await pack.version)}
      .7#&&&@@  YBBGPBG!::                          
     .!B&##&@#   P#####P~::                 
    ^7B#B###B!:  ~5&####5~::                ${chalk.hex("#8700ff")(
        "Author:",
    )} ${chalk.hex("#A64253")(await pack.author)}
   .~GBGGGGG!.    ~P###GBY~.:  
  .~B&BBBBG!.      ~5##GGGY~.: 
 .:!J??7??~.        ~7777?7~:.: 
:7&!#&@##:.          ~7?7?7~:.::             
`,
            ),
            {
                padding: 1,
                margin: 1,
                borderStyle: "round",
                borderColor: "cyan",
                align: "left",
                backgroundColor: "#101010",
                title: "AoiBun",
                float: "center",
                fullscreen: true,
                height: "100%",
            },
        );

        console.log(msgbox);
    } else if (name === "help" || name === "-h" || name === "--help") {
        const cmds = {
            help: {
                desc: "Shows this message",
                aliases: ["-h", "--help"],
            },
            version: {
                desc: "Shows the version of AoiBun",
                aliases: ["-v", "--version"],
            },
            new: {
                desc: "Creates a new aoi.js project",
                aliases: ["-n", "--new"],
            },
            bundle: {
                desc: "Bundles the project into a single file",
                aliases: ["-b", "--bundle"],
            },
        };
        const msgbox = boxen(
            Object.entries(cmds)
                .map(
                    ([cmd, desc]) =>
                        `${chalk.hex("#8700FF")(
                            cmd.padEnd(10, " "),
                        )} ${chalk.hex("#9721A9")(
                            desc.aliases.join(" ").padEnd(15, " "),
                        )} ${chalk.hex("#A64253")(desc.desc.padEnd(10, " "))}`,
                )
                .join("\n"),
            {
                padding: 1,
                margin: 1,
                borderStyle: "round",
                borderColor: "cyan",
                align: "left",
                backgroundColor: "#101010",
                title: "AoiBun",
                float: "center",
                fullscreen: true,
                height: "100%",
            },
        );

        console.log(msgbox);
    } else if (name === "version" || name === "-v" || name === "--version") {
        console.log(chalk.hex("#A64253")(pack.version));
    } else if(name === "new" || name === "-n" || name === "--new") {
        const dir = argv[1] || "src";
        createProject(dir);
    }

