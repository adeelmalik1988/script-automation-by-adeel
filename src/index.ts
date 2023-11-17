#! /usr/bin/env node

import chalk from 'chalk';
import {EpcIpListComparionWithCurrentUGWConfigurations} from './tasks/epc/index.js'
console.log(chalk.red("Welcome to EPC IP Comparison"))

// console.log(chalk.blue('Hello world!'));

import fs from "fs";
// var path = require("path");
import path from 'path'
import { fileURLToPath } from 'url';
import inquirer from 'inquirer'
import { CDNFILTERS, DOMAINLIST, SMSCTASKLIST, TASKLIST } from './types/Types.js';

// console.log("hello world")

const pathName = fileURLToPath(import.meta.url)
// const fileName = process.argv[2];
// console.log("directory name entered", fileName)

console.log("directory name", fileURLToPath(import.meta.url))
console.log("directory name", path.dirname(pathName))


const taskList : TASKLIST[] = [
    TASKLIST.task01,
    TASKLIST.task02,
    // TASKLIST.task03,
    // TASKLIST.task04
]
// console.log(TASKLIST.task01)

const cdnFilters : CDNFILTERS[] = [
   CDNFILTERS.akamai,
   CDNFILTERS.facebook,
   CDNFILTERS.google,
   CDNFILTERS.netflix,
   CDNFILTERS.pubg,
   CDNFILTERS.tiktok,
   CDNFILTERS.allCDNs,
   CDNFILTERS.imo


]

const domainList : DOMAINLIST[] = Object.values(DOMAINLIST)

const smscTaskList: SMSCTASKLIST[] = Object.values(SMSCTASKLIST)


// const fruitsArray: Fruit[] = [];

// Loop through the enum keys and add them to the array
domainList.forEach((fruit) => {
    console.log(fruit);
  });









const selectDomain = [
    {
        type: "list",
        name: "domain",
        message: "Please select DOMAIN?",
        choices: domainList
    },

]

const questions01 = [
    // {
    //     type: "input",
    //     name: "name",
    //     message: "What's your first name?"
    // },
    // {
    //     type: "input",
    //     name: "email",
    //     message: "What's your email address?"
    // },
    {
        type: "list",
        name: "task",
        message: "What do you want to do?",
        choices: taskList
    },
    // {
    //     type: "checkbox",
    //     name: "technologies",
    //     message: "What technologies do you know?",
    //     choices: [
    //         "React.js",
    //         "Vue",
    //         "Angular",
    //         "Node.js",
    //         "jQuery",
    //         "D3.js",
    //     ]
    // },
    // {
    //     type: "number",
    //     name: "salary",
    //     message: "What is your salary requirement?"
    // }
]

const questions02 = [
    {
            type: "input",
            name: "ugwConfig",
            message: "Please provide path of UGW Config file"
        },
        {
            type: "input",
            name: "cdnIpList",
            message: "Please provide path of CDN IP List"
        },
        // {
        //     type: "input",
        //     name: "cdnFilter",
        //     message: "Please enter relevent service which needs to be filtered?",
        //     // choices: cdnFilters
        // }
]

const questions03 = [
    {
            type: "input",
            name: "ugwConfig",
            message: "Please provide path of UGW Config file"
        },
        {
            type: "input",
            name: "cdnIpList",
            message: "Please provide path of CDN IP List"
        },
        {
            type: "input",
            name: "cdnFilter",
            message: "Please enter relevent service which needs to be filtered?",
            // choices: cdnFilters
        }
]

const smscQuestion = [
    {
        type: "list",
        name: "task",
        message: "What do you want to do?",
        choices: smscTaskList
    },
]




// inquirer
// .prompt(questions01)
// .then((answers) => {
//     const selectedTask = answers.task
//     // console.log( chalk.blue(JSON.stringify(answers, null, 2)))
//     console.log( chalk.blue("selectedTask : ",selectedTask))
//     if(selectedTask == TASKLIST.task01){

//         inquirer.prompt(questions02)
//         .then((answers) => {
//             console.log( chalk.blue(JSON.stringify(answers, null, 2)))
//             // const ans = JSON.stringify(answers, null, 2)

//             let ugwFilePathAndCdnFilter = answers
//             EpcIpListComparionWithCurrentUGWConfigurations(ugwFilePathAndCdnFilter)
            
//         }
//             )
//         .catch((error) => {
//             if (error.isTtyError) {
//                 console.log("Your console environment is not supported!")
//             } else {
//                 console.log(error)
//             }
//         })
//     }
//     if(selectedTask == TASKLIST.task02){

//         inquirer.prompt(questions03)
//         .then((answers) => {
//             console.log( chalk.blue(JSON.stringify(answers, null, 2)))
//             // const ans = JSON.stringify(answers, null, 2)

//             let ugwFilePathAndCdnFilter = answers
//             EpcIpListComparionWithCurrentUGWConfigurations(ugwFilePathAndCdnFilter)
            
//         }
//             )
//         .catch((error) => {
//             if (error.isTtyError) {
//                 console.log("Your console environment is not supported!")
//             } else {
//                 console.log(error)
//             }
//         })
//     }
    



// })
// .catch((error) => {
//     if (error.isTtyError) {
//         console.log("Your console environment is not supported!")
//     } else {
//         console.log(error)
//     }
// })



inquirer
.prompt(selectDomain)
.then((answers) => {
    const selectedDomain = answers.domain
    // console.log( chalk.blue(JSON.stringify(answers, null, 2)))
    console.log( chalk.blue("selectedTask : ",selectedDomain))
    if(selectedDomain == DOMAINLIST.PSCORE){

        inquirer.prompt(questions01)
        .then((answers)=>{

            const selectedTask = answers.task
    
    if(selectedTask == TASKLIST.task01){

        inquirer.prompt(questions02)
        .then((answers) => {
            console.log( chalk.blue(JSON.stringify(answers, null, 2)))
            // const ans = JSON.stringify(answers, null, 2)

            let ugwFilePathAndCdnFilter = answers
            EpcIpListComparionWithCurrentUGWConfigurations(ugwFilePathAndCdnFilter)
            
        }
            )
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Your console environment is not supported!")
            } else {
                console.log(error)
            }
        })
    }
    if(selectedTask == TASKLIST.task02){

        inquirer.prompt(questions03)
        .then((answers) => {
            console.log( chalk.blue(JSON.stringify(answers, null, 2)))
            // const ans = JSON.stringify(answers, null, 2)

            let ugwFilePathAndCdnFilter = answers
            EpcIpListComparionWithCurrentUGWConfigurations(ugwFilePathAndCdnFilter)
            
        }
            )
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Your console environment is not supported!")
            } else {
                console.log(error)
            }
        })
    }
})
.catch((error) => {
    if (error.isTtyError) {
        console.log("Your console environment is not supported!")
    } else {
        console.log(error)
    }
})

} else if (selectedDomain == DOMAINLIST.SMSC){

    inquirer.prompt(smscQuestion)
    .then((answers)=>{
        const selectedTask = answers.task

        if(selectedTask == SMSCTASKLIST.task01){
            console.log(chalk.green("selectedTask : ",selectedTask))

        }

    })



}
    



})
.catch((error) => {
    if (error.isTtyError) {
        console.log("Your console environment is not supported!")
    } else {
        console.log(error)
    }
})
// process.exit(0)

// const filePathCdn_full_ip_list = path.dirname ("./files/cdn_full_IP_list.txt")
// const filePathUGW1 = path.dirname("./files/UGW1_copy.cfg")


// console.log("path name",filePathUGW1)
// const readFileIPs = fs.readFileSync(filePathCdn_full_ip_list, "utf8")
// const readFileUGW1 = fs.readFileSync(filePathUGW1, "utf8")

// let ugwArr =  readFileUGW1.split(/\r?\n/)

// const readFileIPsData = readFileIPs.toString()
// // const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/gm;
// // const ipRegex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/32$/;
// const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g
// var filteredIps = readFileIPs.match(ipRegex);
// // console.log("filtered",filteredIps);
// let matchedIpArry: String[] = []

// filteredIps?.map((ip: String)=>{



    
//     ugwArr.forEach((line: any, idx: number) => {
//         if(line.includes(ip)){
//             console.log((idx+1)+':'+ line)
//             // let alreadyAvailableIp =  matchedIpArry.filter(oldIP => oldIP == ip)
//             if(!matchedIpArry.includes(ip)){
//                 matchedIpArry.push(ip)
//             }

//         } 

//     });
// })

// // console.log("Matched Array",matchedIpArry)

// // var difference = filteredIps.filter((x: Text) => matchedIpArry.indexOf(x) === -1);

// var ipsNotFound = filteredIps?.filter((x: any) => !matchedIpArry.includes(x));
// console.log(chalk.green("ipsNotFound",ipsNotFound))

// console.log("Filtered IP list",filteredIps?.includes("119.160.60.160"))
// console.log("Matche IP list", matchedIpArry.includes("119.160.60.160"))



// // console.log("READING FILE: ", path.resolve(__dirname, "./files/cdn_full_IP_list.txt"));

// // console.log(readFile1)
// // console.log(readFileUGW1)