try
{
    // console.clear()
    console.log("--------------2SmartPaste.js------------------")
    var ms = window.MyScripts;

//    easyeda.extension.quickScript();    ms.ScriptWindowReSize();

    ms.ShowTimeBegin();
    ms.zoom_750();

    var ActiveTab = ms.getActiveTab()
    var TabIFrame = ms.getTabIFrame(ms.getActiveTab());
    var a = TabIFrame.contentWindow;
    let root = $('#root', a.document)[0];


    /*

                        x: i[0],
                        y: i[1],
                        width: i[2],
                        height: i[3]

    canvasHeight: 896
    canvasWidth: 459
    clientHeight: 896
    clientWidth: 459
    height: 896
    scrollHeight: 896
    scrollLeft: 0
    scrollTop: 0
    scrollWidth: 459
    viewBox: "3952.6558385778376 3067.4175925925933 85 165.92592592592592"
    width: 459
    zoom: 540
    */

    var ViewStatus = a.callCommand.hooks["getViewStatus"]();
    var ViewBox = ViewStatus.viewBox.split(" ").map(parseFloat)
    //debugger
    //return 
    /////////////////////////////////////////////////////////////////////////////////////

    ms.SmartPaste = function SmartPaste()
    {
        var ActiveTab = ms.getActiveTab()
        var TabIFrame = ms.getTabIFrame(ms.getActiveTab());
        var a = TabIFrame.contentWindow;
        let root = $('#root', a.document)[0];

        var AbstractFileType = getAbstractFileType(parent.globalEditorClipboard[0])

        //debugger
        if (!parent.globalEditorClipboard) return;

        ms.json = ms.GetJson();
        //console.log("json", ms.json);

        if (ms.Has(ms.json, "FOOTPRINT") && AbstractFileType == "pcb")
        {
            a.callCommand.hooks["paste"]();

            xDown = 0
            yDown = 0


            function GetMouseDownCoorPcb(event)
            {
                xDown = event.x
                yDown = event.y
            }


            function MouseDownEventPcb(event)
            {
                console.log('MouseDownEventPcb(event)');
                console.log(event)

                root.removeEventListener('mousedown', MouseDownEventPcb);

                ms.LastCopiedPcbIds = api('getSelectedIds').split(",");
                console.log("LastCopiedSchObj", ms.LastCopiedSchObj);

                if (ms.LastCopiedPcbIds[0] == "")
                {
                    //  alert("Error: Nothing to copy")
                    root.removeEventListener('mouseup', MouseUpEventPcb);
                    root.removeEventListener('mousedown', GetMouseDownCoorPcb);
                    root.removeEventListener('mousedown', MouseDownEventPcb);
                    return
                }


                ms.footprint_before_paste = [];
                ms.footprint_before_paste = Object.keys(ms.json.FOOTPRINT);
                console.log("ms.footprint_before_paste", ms.footprint_before_paste);

                ms.footprint_before_pasteObj = [];
                ms.footprint_before_paste.forEach(function(currentValue, index, array)
                {
                    var obj = ms.GetLibInfo(ms.json, array[index]);
                    if (obj.pref) ms.footprint_before_pasteObj.push(obj);
                });
                console.log("ms.footprint_before_pasteObj", ms.footprint_before_pasteObj);
                //                console.log("LastCopiedSchObj", api('getSelectedIds').split(","));
                //                debugger
            }


            function MouseUpEventPcb(event)
            {
                console.log('MouseUpEventPcb(event)');
                //console.log(event)
                //debugger

                //                if(event.button==1 && event.buttons==4) return  // middle button
                //                else  
                //                if(event.button==2 && event.buttons==2) // right button

                //
                if ((event.button == 2 && xDown == event.x && yDown == event.y) || ms.LastCopiedPcbIds[0] == "") // right button
                {
                    root.removeEventListener('mouseup', MouseUpEventPcb);
                    root.removeEventListener('mousedown', GetMouseDownCoorPcb);
                    console.log('Cancel Paste');
                    return
                }

                SelectedIdsCheck = api('getSelectedIds')

                if (SelectedIdsCheck == "")
                {
                    root.removeEventListener('mouseup', MouseUpEventPcb);
                    root.removeEventListener('mousedown', GetMouseDownCoorPcb);

                    console.log('Wait 1000ms');
                    runWithDelay(1000, () =>
                    {
                        ms.SmartRenamePref();
                        // alert('Прошла 1 секунда');
                    });
                }
                //      else alert("Error")

            }


            root.addEventListener('mousedown', GetMouseDownCoorPcb);
            root.addEventListener('mousedown', MouseDownEventPcb);
            root.addEventListener('mouseup', MouseUpEventPcb);
        }


        if (ms.Has(ms.json, "schlib") && AbstractFileType == "sch")
        {
            let root = $('#root', a.document)[0];
            a.callCommand.hooks["paste"]();

            function MouseDownFuncSch(event)
            {
                console.log('MouseDownFuncSch(event)');
                root.removeEventListener('mousedown', MouseDownFuncSch);

                runWithDelay(1000, () =>
                {
                    //debugger
                    ms.LastCopiedSchIds = api('getSelectedIds').split(",");

                    ms.SmartRenamePref();
                    //                    alert('Прошла 1 секунда');
                });


            }

            root.addEventListener('mousedown', MouseDownFuncSch);
        }
    }


    ms.SmartRenamePref = function()
    {
        ms.json = ms.GetJson();

        if (ms.Has(ms.json, "schlib"))/////////////////////////////////////////////////////////////////////////////
        {

            //debugger

            ms.api('select',
            {
                ids: ms.LastCopiedSchIds
            });

            ms.LastCopiedSchObj = [];
            ms.LastCopiedSchPref = [];
            ms.LastCopiedSchIds.forEach(function(currentValue, index, array)
            {
                var obj = ms.GetLibInfo(ms.json, array[index]);
                if (obj.pref)
                {
                    ms.LastCopiedSchPref.push(obj.pref);
                    ms.LastCopiedSchObj.push(obj);
                }
            });

            console.log("LastCopiedSchObj", ms.LastCopiedSchObj);

            console.log("recoverAllLibMd5Id");
            a.parent.callByEditor(
            {
                args: [],
                uuid: undefined,
                func: "recoverAllLibMd5Id"
            });

            console.log("LastCopiedSchObj", ms.LastCopiedSchObj);
        }


        if (ms.Has(ms.json, "FOOTPRINT"))/////////////////////////////////////////////////////////////////////////////
        {
            console.log("FOOTPRINT", ms.json.FOOTPRINT);
            ms.LastCopiedPcbObj = [];

            //debugger
            ms.LastCopiedPcbIds.forEach(function(currentValue, index, array)
            {
                var obj = ms.GetLibInfo(ms.json, array[index]);
                if (obj.pref) ms.LastCopiedPcbObj.push(obj);
            });

            if (ms.LastCopiedSchObj.length == ms.LastCopiedPcbObj.length)
            {
                ms.LastCopiedPcbObj.forEach((v, i) =>
                {
                    v.PrefW = ms.LastCopiedSchObj[i].PrefW;

                    var old_key = v.LibObj.gId;
                    var new_key = "gge" + MD5(v.PrefW).substr(8, 16);
                    v.LibObj.head.gId = new_key;
                    v.LibObj.gId = new_key;

                    if (old_key !== new_key)
                    {
                        Object.defineProperty(ms.json.FOOTPRINT, new_key, Object.getOwnPropertyDescriptor(ms.json.FOOTPRINT, old_key));
                        delete ms.json.FOOTPRINT[old_key];
                    }
                });

                console.log("footprint_before_pasteObj", ms.footprint_before_pasteObj);
                console.log("LastCopiedPcbObj", ms.LastCopiedPcbObj);

                console.log('applySource');
                ms.api('applySource',
                {
                    source: ms.json,
                    createNew: false
                });

                //debugger
                a.callCommand("recoverLibMd5Id", [ms.getActiveTab(), true]);

                //                ms.json = ms.GetJson();
                //                console.log("FOOTPRINT", ms.json.FOOTPRINT);

                console.log('importChanges');
                $('a[cmd="importChanges"]').click();

                console.log('setViewBox');
                a.callCommand.hooks["setViewBox"](ViewBox);
            }
        }
    }

    async function runWithDelay(delay, asyncFunc)
    {
        await new Promise(resolve => setTimeout(resolve, delay)); // 1000 мс = 1 сек
        asyncFunc(); // вызов твоей функции
    }

    function getAbstractFileType(e)
    {
        switch (e + "")
        {
            case fa.SCH:
            case fa.SUBCKT:
            case fa.SCHMODULE:
                return "sch";
            case fa.PCB:
            case fa.PCBMODULE:
                return "pcb";
            default:
                return
        }
    }
/*
    function CtrlAltC_ShortCut(e)
    {
        // Проверяем: Ctrl + Alt + C (регистр не важен: e.key === 'c' или 'C')
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'c')
        {
            //e.preventDefault(); // отменяем стандартное действие, если нужно
            alert('Сработало Ctrl+Alt+C');
        }
    }
*/
  
    var fa = {
        NETLIST: "9",
        PCB: "3",
        PCBLIB: "4",
        PCBLIB3D: "16",
        PCBMODULE: "14",
        PHOTOVIEW: "12",
        PRJ: "5",
        SCH: "1",
        SCHLIB: "2",
        SCHLIB3D: "11",
        SCHMODULE: "13",
        SPICESYMBOL: "7",
        SUBCKT: "8",
        SUBPART: "6",
        VIEW3D: "15",
        WAVEFORM: "10"
    }


    //debugger
    //ms.SmartCopy(ms.json); 
    ms.SmartPaste(ms.json);
    //SmartRenameLastCopied();
    //SmartReconnectTracks();
}
catch (e)
{
    alert('Error: ' + e.name + ":" + e.message + "\n" + e.stack);
}

//a.callCommand("importChanges", [TabIFrame, true]);
//a.callCommand.hooks["importChanges"]($("#dlgShowImportChanges").data("changesObj"));
//$("#dlgShowImportChanges").dialog("close")


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
