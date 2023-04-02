## Repository description:
My repository consists of one **MyExtention** extension and several **User scripts**.

## **MyExtensions**:
#### It is a useful *Easy-eda-extension* that creates a *Toolbar Menu* for all your installed scripts.
When loading Easy-eda **MyExtention** scans all your installed **User scripts** and adds them to the Menu called *[MyExtention]*.

![image](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/InstalledScripts.png)

Moreover, MyExtention does not depend on my scripts, it works separately, so it can use scripts of other users. 
But most of my scripts won't work without **MyExtention** installed.
 
 1) First of all, you have to install the extension **MyExtensions**.
 2) Then (or before) you must install any of your (or mine) Easy-eda **java scripts**.
 3) Reload Easy-eda.
  
### Install Main Extension (`MyExtensions`)

`MyExtensions` provides a menu in the toolbar to easily choose any EasyEDA User Script you have installed, it also provides some support for the scripts in `easyeda-MyExtensions` and is required to use them.

  1. Download Zip and extract files
  2. In EasyEDA Select Advanced > Extensions > Extensions Setting
  3. Click Load Extension
  4. Click Select Files
  5. In the file dialog that opens, navigate to the "`MyExtensions`" folder which was unzipped and select all the files in that folder which includes `manifest.json`, `main.js`, `locale.txt`... you must choose all the files at once (shift-click) in the dialog, click open/ok in the file dialog.
  6. Extension ID should be filled out and say MyExtensions, click Load extension button with the tick next to it.
  7. Make sure you have saved any changes to open project, and then reload EasyEDA

### Install Scripts (eg `ReplaceSchlib`)

After you have installed the `MyExtensions` above, you can then install the scripts you want to use.

  1. In EasyEDA select Advanced > Extensions > Load Script
  2. Click "Install..." button
  3. In the file dialod that appears locate the script `*.js` file - for example `ReplaceSchlib.js`
  4. Click open/ok in the file dialog
  5. Make sure you have saved any changes to open project, and then reload EasyEDA

### Using MyExtension Menu

After reloading you will see the `MyExtension` menu in the toolbar and can choose from scripts to run.  Some scripts require that you must choose things before you run them, for example, `ReplaceSchlib` script you must choose all the items you want to replace, and the last item the one you want to replace those items with (each is replaced with a copy).

(Please note that the following pictures are GIF animation, and in order for it to start playing you must click on the "Play" button in the upper right corner of this gif-picture)

![Preview](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/Video%20MyExtensions.gif)

# My User Scripts description:
**User Script** is a java script file with a **.js** extension.
In my repository you can find such scripts:

[[SmartCopyPaste]](https://github.com/duritskiy/easyeda-MyExtensions/tree/main/SmartCopyPaste)/
[1SmartCopy.js](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/SmartCopyPaste/1SmartCopy.js)</br>
[[SmartCopyPaste]](https://github.com/duritskiy/easyeda-MyExtensions/tree/main/SmartCopyPaste)/
[2SmartPaste.js](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/SmartCopyPaste/2SmartPaste.js)</br>
[[SmartCopyPaste]](https://github.com/duritskiy/easyeda-MyExtensions/tree/main/SmartCopyPaste)/
[3SmartRenamePref.js](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/SmartCopyPaste/3SmartRenamePref.js)</br>
[[SmartCopyPaste]](https://github.com/duritskiy/easyeda-MyExtensions/tree/main/SmartCopyPaste)/
[4SmartReconnectTracks.js](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/SmartCopyPaste/4SmartReconnectTracks.js)</br>

[[ReplaceSchlib]](https://github.com/duritskiy/easyeda-MyExtensions/tree/main/ReplaceSchlib)/
[ReplaceSchlib.js](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/ReplaceSchlib/ReplaceSchlib.js)</br>

[[JoinTracks]](https://github.com/duritskiy/easyeda-MyExtensions/tree/main/JoinTracks)/
[JoinTracks.js](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/JoinTracks/JoinTracks.js)</br>

[CopperArea_Clone.js](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/CopperArea_Clone.js)</br>
[CopperArea_RebuildAll.js](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/CopperArea_RebuildAll.js)</br>
[SelectLike.js](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/SelectLike.js)</br>
[ShowHidePref.js](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/ShowHidePref.js)</br>

### [SmartCopyPaste](https://github.com/duritskiy/easyeda-MyExtensions/tree/main/SmartCopyPaste) scripts description:
#### Creates correct duplicate circuits in SCH and PCB

#### In SCH:
  Select part of scheme, then **1SmartCopy.js** and **2SmartPaste.js**, then **3SmartRenamePref.js** and **Save**.

![Preview](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/SmartCopyPaste/Video%201%20Sch%20-%20Copy%2CPaste%2CRename.gif)

#### In Pcb:  
   Select part of scheme, then **1SmartCopy.js** and **2SmartPaste.js**, then **3SmartRenamePref.js** and **Import Changes**.

![Preview](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/SmartCopyPaste/Video%202%20Pcb%20-%20Copy%2CPaste%2CRename.gif)

   Select, then **SmartReconnectTracks**, and then **Import Changes** to Verify.

![Preview](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/SmartCopyPaste/Video%203%20Pcb%20-%20SmartReconnectTracks.gif)



### Easy-eda-script: Join two tracks into one

#### In Pcb:  
![Preview](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/JoinTracks/JoinTracks.gif)


### Easy-eda-script: Replacing several components with another
#### In SCH:  

First you need to select the components to be replaced and the last one is the replacement sample.
![Preview](https://github.com/duritskiy/easyeda-MyExtensions/blob/main/ReplaceSchlib/Video%20-%20ReplaceSchlib.gif)




