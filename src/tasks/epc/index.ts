import chalk from "chalk";
import fs from "fs";
import { promises as fswrite } from 'fs';
import path, { dirname, join } from "path"
import { CDNFILTERS } from "../../types/Types.js";
import { AppendLineToFile, RemoveQuotes } from "./utils/index.js";
// var path = require("path");

export const EpcIpListComparionWithCurrentUGWConfigurations = (ugwFilePathAndCdnFilter: any) => {
    // console.log(" from inner function ugwFilePath", ugwFilePath)

    // const filePathUGW1 = path.resolve(ugwFilePath.ugwConfig)
    const currentPath = dirname(process.argv[1])
    const ipsFoundInUgwConfig = join(currentPath, 'ipsFoundInUgwConfig.txt');
    const ipsAndServiceFoundInUgwConfig = join(currentPath, 'ipsAndServiceFoundInUgwConfig.txt');
    const ipsNOTFOUNDInUgwConfig = join(currentPath, 'ipsNOTFOUNDInUgwConfig.txt');

    // let cdnFilter = ugwFilePathAndCdnFilter.cdnFilter == CDNFILTERS.allCDNs ? null: ugwFilePathAndCdnFilter.cdnFilter
    let { cdnFilter } = ugwFilePathAndCdnFilter

    if (cdnFilter) {
        console.log("cdnFilter in Comparison function", cdnFilter)

    }
    console.log("ugwFilePathAndCdnFilter.cdnFilter", ugwFilePathAndCdnFilter.cdnFilter)
    const ugwFilePathFinal = RemoveQuotes(ugwFilePathAndCdnFilter.ugwConfig)
    const cdnIpListFinal = RemoveQuotes(ugwFilePathAndCdnFilter.cdnIpList)

    const readUgwFile = fs.readFileSync(ugwFilePathFinal, "utf8")
    const readCdnIpList = fs.readFileSync(cdnIpListFinal, "utf8")

    let ugwConfigFileArr = readUgwFile.split(/\r?\n/)

    const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g
    const ipRegexSubnet = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2})/g;
    var filteredIps = readCdnIpList.match(ipRegex);
    var filteredIpsSubnet = readCdnIpList.match(ipRegexSubnet);
    // console.log("filtered",filteredIps);

    const ipSubnetArray = filteredIpsSubnet?.map((match) => {
        const [ip, subnet] = match.split('/');
        return { ip, subnet };
    });

    //   console.log("ip with subnet",ipSubnetArray)

    let filteredIpsStr: String[] = []
    ipSubnetArray?.map(ipNsub => {

        filteredIpsStr.push(`${ipNsub.ip} ${ipNsub.subnet}`)
    })

    //   console.log("filteredIpsStr",filteredIpsStr)

    let matchedIpArry: String[] = []
    let matchedIpAndServiceArry: String[] = []

    // filteredIps?.map((ip: String) => {




    //     ugwConfigFileArr.forEach(async (line: any, idx: number) => {
    //         if (line.includes(ip)) {
    //             console.log((idx + 1) + ':' + line)
    //             let lineMatched = (idx + 1) + ':' + line

    //             AppendLineToFile(ipsFoundInUgwConfig, lineMatched)
    //             // let alreadyAvailableIp =  matchedIpArry.filter(oldIP => oldIP == ip)
    //             if (!matchedIpArry.includes(ip)) {
    //                 matchedIpArry.push(ip)
    //             }

    //         }

    //     });

    // })



    filteredIpsStr?.map((ipNSubnet) => {



        ugwConfigFileArr.forEach(async (line: any, idx: number) => {
            if (line.includes(ipNSubnet)) {
                !cdnFilter && console.log((idx + 1) + ':' + line)
                let lineMatched = (idx + 1) + ':' + line
                // if (lineMatched.includes(cdnFilter)) {
                //     console.log(lineMatched)
                //     AppendLineToFile(ipsAndServiceFoundInUgwConfig, lineMatched)
                //     if (!matchedIpAndServiceArry.includes(ipNSubnet)) {
                //         matchedIpAndServiceArry.push(ipNSubnet)

                //     }

                // }


                AppendLineToFile(ipsFoundInUgwConfig, lineMatched)
                // ipsFoundInUgwConfigArr.push(lineMatched)
                // let alreadyAvailableIp =  matchedIpArry.filter(oldIP => oldIP == ip)
                if (!matchedIpArry.includes(ipNSubnet)) {
                    matchedIpArry.push(ipNSubnet)
                }

            }

        });

    })

    // var ipsNotFound = filteredIps?.filter((x: any) => !matchedIpArry.includes(x));
    // console.log("ipsNotFound", ipsNotFound)


    var ipsNotFoundSub = filteredIpsStr?.filter((x: any) => !matchedIpArry.includes(x))
    // var ipsAndServiceNotFoundSub = filteredIpsStr?.filter((x: any) => !matchedIpAndServiceArry.includes(x))
    console.log("ipsNotFoundSub", ipsNotFoundSub)

    // cdnFilter ? AppendLineToFile(ipsNOTFOUNDInUgwConfig, ipsAndServiceNotFoundSub) : 
    AppendLineToFile(ipsNOTFOUNDInUgwConfig, ipsNotFoundSub)


    // console.log("Filtered IP list", filteredIps?.includes("119.160.60.160"))
    // console.log("Matche IP list", matchedIpArry.includes("119.160.60.160"))

    console.log(chalk.blue('Output saved to file:', ipsFoundInUgwConfig));
    console.log(chalk.blue('Output saved to file:', ipsNOTFOUNDInUgwConfig));








    // console.log("current dir name", process.argv[1])
}

// export default EpcIpListComparionWithCurrentUGWConfigurations

export const EpcIpListComparionWithVariableSubnet = (ugwFilePathAndCdnFilter: any) => {
    // console.log(" from inner function ugwFilePath", ugwFilePath)

    // const filePathUGW1 = path.resolve(ugwFilePath.ugwConfig)
    const currentPath = dirname(process.argv[1])
    const ipsFoundInUgwConfig = join(currentPath, 'ipsFoundInUgwConfig.txt');
    const ipsAndServiceFoundInUgwConfig = join(currentPath, 'ipsAndServiceFoundInUgwConfig.txt');
    const ipsNOTFOUNDInUgwConfig = join(currentPath, 'ipsNOTFOUNDInUgwConfig.txt');

    // let cdnFilter = ugwFilePathAndCdnFilter.cdnFilter == CDNFILTERS.allCDNs ? null: ugwFilePathAndCdnFilter.cdnFilter
    let { cdnFilter } = ugwFilePathAndCdnFilter

    if (cdnFilter) {
        console.log("cdnFilter in Comparison function", cdnFilter)

    }
    console.log("ugwFilePathAndCdnFilter.cdnFilter", ugwFilePathAndCdnFilter.cdnFilter)
    const ugwFilePathFinal = RemoveQuotes(ugwFilePathAndCdnFilter.ugwConfig)
    const cdnIpListFinal = RemoveQuotes(ugwFilePathAndCdnFilter.cdnIpList)

    const readUgwFile = fs.readFileSync(ugwFilePathFinal, "utf8")
    const readCdnIpList = fs.readFileSync(cdnIpListFinal, "utf8")

    let ugwConfigFileArr = readUgwFile.split(/\r?\n/)

    const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g
    const ipRegexSubnet = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2})/g;
    var filteredIps = readCdnIpList.match(ipRegex);
    var filteredIpsSubnet = readCdnIpList.match(ipRegexSubnet);
    // console.log("filtered",filteredIps);

    const ipSubnetArray = filteredIpsSubnet?.map((match) => {
        const [ip, subnet] = match.split('/');
        return { ip, subnet };
    });

    //   console.log("ip with subnet",ipSubnetArray)

    let filteredIpsStr: String[] = []
    ipSubnetArray?.map(ipNsub => {

        filteredIpsStr.push(`${ipNsub.ip} ${ipNsub.subnet}`)
    })

    //   console.log("filteredIpsStr",filteredIpsStr)

    let matchedIpArry: String[] = []
    let matchedIpAndServiceArry: String[] = []

    // filteredIps?.map((ip: String) => {




    //     ugwConfigFileArr.forEach(async (line: any, idx: number) => {
    //         if (line.includes(ip)) {
    //             console.log((idx + 1) + ':' + line)
    //             let lineMatched = (idx + 1) + ':' + line

    //             AppendLineToFile(ipsFoundInUgwConfig, lineMatched)
    //             // let alreadyAvailableIp =  matchedIpArry.filter(oldIP => oldIP == ip)
    //             if (!matchedIpArry.includes(ip)) {
    //                 matchedIpArry.push(ip)
    //             }

    //         }

    //     });

    // })



    // filteredIpsStr?.map((ipNSubnet) => {



    //     ugwConfigFileArr.forEach(async (line: any, idx: number) => {
    //         if (line.includes(ipNSubnet)) {
    //             !cdnFilter && console.log((idx + 1) + ':' + line)
    //             let lineMatched = (idx + 1) + ':' + line
    //             // if (lineMatched.includes(cdnFilter)) {
    //             //     console.log(lineMatched)
    //             //     AppendLineToFile(ipsAndServiceFoundInUgwConfig, lineMatched)
    //             //     if (!matchedIpAndServiceArry.includes(ipNSubnet)) {
    //             //         matchedIpAndServiceArry.push(ipNSubnet)

    //             //     }

    //             // }


    //             AppendLineToFile(ipsFoundInUgwConfig, lineMatched)
    //             // ipsFoundInUgwConfigArr.push(lineMatched)
    //             // let alreadyAvailableIp =  matchedIpArry.filter(oldIP => oldIP == ip)
    //             if (!matchedIpArry.includes(ipNSubnet)) {
    //                 matchedIpArry.push(ipNSubnet)
    //             }

    //         }

    //     });

    // })

    // var ipsNotFound = filteredIps?.filter((x: any) => !matchedIpArry.includes(x));
    // console.log("ipsNotFound", ipsNotFound)


    var ipsNotFoundSub = filteredIpsStr?.filter((x: any) => !matchedIpArry.includes(x))
    // var ipsAndServiceNotFoundSub = filteredIpsStr?.filter((x: any) => !matchedIpAndServiceArry.includes(x))
    console.log("ipsNotFoundSub", ipsNotFoundSub)

    // cdnFilter ? AppendLineToFile(ipsNOTFOUNDInUgwConfig, ipsAndServiceNotFoundSub) : 
    AppendLineToFile(ipsNOTFOUNDInUgwConfig, ipsNotFoundSub)


    // console.log("Filtered IP list", filteredIps?.includes("119.160.60.160"))
    // console.log("Matche IP list", matchedIpArry.includes("119.160.60.160"))

    console.log(chalk.blue('Output saved to file:', ipsFoundInUgwConfig));
    console.log(chalk.blue('Output saved to file:', ipsNOTFOUNDInUgwConfig));








    // console.log("current dir name", process.argv[1])
}