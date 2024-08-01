// JavaScript for Automation (JXA) script
var app = Application.currentApplication();
app.includeStandardAdditions = true;

// Prompt the user to choose a folder
var chosenFolder = app.chooseFolder({
    withPrompt: "Please select a folder to process:"
});

// Process the selected folder
try {
    var fileManager = $.NSFileManager.defaultManager;
    var fileList = fileManager.contentsOfDirectoryAtPathError(chosenFolder.toString(), null);
    const regex = /[!@#$%^&*()\+={}[\]:;"'<>,?\/\\ ]/g;



    // Convert the NSArray to a regular JavaScript array
    var fileArray = ObjC.deepUnwrap(fileList);


    for (var i = 0; i < fileArray.length; i++) {
        var fileName = fileArray[i];
        var filePath = chosenFolder.toString() + "/" + fileName;
        var origName = fileName;

        // Check if fileName is a valid string
        if (typeof fileName !== 'string') {
            throw new Error('File name is not a valid string.');
        }

        // Change the entire file name to lowercase
        fileName = fileName.toLowerCase();

        // If the file contains special characters, replace with a dash
        if (regex.test(fileName)){
            fileName = fileName.replace(regex, '-');
        }

        // Create copies of image files
        if (fileName.indexOf("app1x") !== -1) {
            var originalName = fileName;
            var newMobileName = originalName.replace("app1x", "_mobile");
            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + newMobileName, null);
            fileManager.removeItemAtPathError(filePath, null);
        }
        else if (fileName.indexOf("_1x") !== -1) {
            var originalName = fileName;
            var newMobileName = originalName.replace("_1x", "_mobile");
            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + newMobileName, null);
            fileManager.removeItemAtPathError(filePath, null);
        }

        else if (fileName.indexOf("app2x") !== -1) {
            // Copy the file and rename as described for APP2X
            var originalName = fileName;
            var newName = originalName.replace("app2x", "_iphone_2x");
            var newName2 = originalName.replace("app2x", "_android_xhpdi");
            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + newName, null);
            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + newName2, null);

            fileManager.removeItemAtPathError(filePath, null);

        }
        else if (fileName.indexOf("_2x") !== -1 && fileName.indexOf("_iphone_2x") === -1) {
            // Copy the file and rename as described for _2X
            var originalName = fileName;
            var newName = originalName.replace("_2x", "_iphone_2x");
            var newName2 = originalName.replace("_2x", "_android_xhpdi");
            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + newName, null);
            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + newName2, null);

            fileManager.removeItemAtPathError(filePath, null);
        }
        else if (fileName.indexOf("app3x") !== -1) {
            // Make 4 copies with different suffixes for APP3X
            var originalName = fileName;
            var copy1Name = originalName.replace("app3x", "_tablet");
            var copy2Name = originalName.replace("app3x", "_iphone_3x");
            var copy3Name = originalName.replace("app3x", "_android_xxhpdi");
            var copy4Name = originalName.replace("app3x", "_android_xxxhpdi");

            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + copy1Name, null);
            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + copy2Name, null);
            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + copy3Name, null);
            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + copy4Name, null);

            fileManager.removeItemAtPathError(filePath, null);

        }
        else if (fileName.indexOf("_3x") !== -1 && fileName.indexOf("_iphone_3x") === -1) {
            // Make 4 copies with different suffixes for _3X
            var originalName = fileName;
            var copy1Name = originalName.replace("_3x", "_tablet");
            var copy2Name = originalName.replace("_3x", "_iphone_3x");
            var copy3Name = originalName.replace("_3x", "_android_xxhpdi");
            var copy4Name = originalName.replace("_3x", "_android_xxxhpdi");

            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + copy1Name, null);
            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + copy2Name, null);
            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + copy3Name, null);
            fileManager.copyItemAtPathToPathError(filePath, chosenFolder.toString() + "/" + copy4Name, null);

            fileManager.removeItemAtPathError(filePath, null);
        }
        else if (fileName !== origName) {
            var newFilePath = chosenFolder.toString() + "/" + fileName;
            fileManager.moveItemAtPathToPathError(filePath, newFilePath, null);
        }



    }

    // Display success message
    app.displayDialog("Processing complete.", { buttons: ["OK"], defaultButton: "OK" });
} catch (errMsg) {
    // Display error message if an error occurs
    app.displayDialog("Error: " + errMsg.toString(), { buttons: ["OK"], defaultButton: "OK", withIcon: "stop" });
}
