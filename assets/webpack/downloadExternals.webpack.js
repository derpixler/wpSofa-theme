const path           = require('path');
const fs             = require('fs-extra');
const log            = require('signale');
const URLRewriter    = require("cssurl").URLRewriter;
const requestPromise = require('request-promise');

const downloadExternal = async (assetUrl, outputPath, appendToFile) => {

    log.info("Download file: " + assetUrl);
    let fileName = assetUrl.substr(assetUrl.lastIndexOf("/") + 1);
    let domain   = new URL(assetUrl).origin;


    try {
        const options = {
            uri:                     assetUrl,
            resolveWithFullResponse: true
        };

        const response = await requestPromise(options)
            .then(response => {
                if (response.statusCode >= 400) {
                    log.warn("### Could not fetch '%s'! Returned status code %s. ", assetUrl, response.statusCode);
                    throw new Error("DownloadExternal: Response Status " + response.statusCode);
                }
                return response;
            })
            .catch(err => {
                throw new Error(err);
            });

        let fileContent = response.body.toString('utf8');
        // Append To File?
        if (appendToFile) {
            fileContent += appendToFile;
        }

        let rewriter = new URLRewriter(function (url) {
            const _url = url;

            // Check if Base64Img
            if (url.startsWith('data:')) {
                return url;
            }

            if (url.indexOf("//") === -1) {
                url = domain + url;
                log.log("GOT CSS URL: " + _url + " | reworked to: " + url);
            }
            return url;
        });
        fileContent  = rewriter.rewrite(fileContent);
        let filePath = path.join(outputPath, fileName);

        try {
            fs.writeFileSync(filePath, fileContent, {flag: "w+"});
            return filePath;
        } catch (err) {
            log.error("Error writing file " + filePath, err);
            throw new Error(err);
        }
    } catch (err) {
        log.error("Error while requesting external file. This sources will not work. Abort!");
        throw new Error(err);
    }
};

module.exports = downloadExternal;
