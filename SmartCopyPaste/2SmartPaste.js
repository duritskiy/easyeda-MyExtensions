try
{

    // console.clear()
    console.log("--------------2SmartPaste.js------------------")
    var ms = window.MyScripts;

    //FuncContainer();

    //easyeda.extension.quickScript();    ms.ScriptWindowReSize();


    ms.ShowTimeBegin();

    ms.zoom_750();

    var json = ms.GetJson(); console.log("json",json);
    ms.json = json;
    /////////////////////////////////////////////////////////////////////////////////////

// debugger

    ms.SmartPaste = SmartPaste;
    function SmartPaste(json)
    {
        var TabIFrame = ms.getTabIFrame(ms.getActiveTab());
      var a = TabIFrame.contentWindow; 
      

        a.callCommand.hooks["paste"]();
        
      if (ms.Has(json, "schlib"))
      {
        ms.LastCopiedSchIds = api('getSelectedIds').split(",");
      
      }
        if (ms.Has(json,"FOOTPRINT"))
        {
          ms.LastCopiedPcbIds = api('getSelectedIds').split(",");
          
          console.log("LastCopiedSchObj",ms.LastCopiedSchObj);

            ms.footprint_before_paste = [];
            ms.footprint_before_paste=Object.keys(json.FOOTPRINT);
            console.log("ms.footprint_before_paste", ms.footprint_before_paste);
          
            ms.footprint_before_pasteObj = [];
            ms.footprint_before_paste.forEach(function(currentValue, index, array)
            {var obj = ms.GetLibInfo(ms.json, array[index]); if (obj.pref) ms.footprint_before_pasteObj.push(obj);});
            console.log("ms.footprint_before_pasteObj", ms.footprint_before_pasteObj);
  

            // debugger;

        }

        
    } 




    //////////////////////////////////////////////////////////////////////////////////////
    //debugger
    //ms.SmartCopy(ms.json); 
    ms.SmartPaste(ms.json);
    //SmartRenameLastCopied();
    //SmartReconnectTracks();


    //var PadCoor=[];

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*
    if(Has(json,"schlib"))
    {
    document.MySchJson=json;	
    
    json.itemOrder.sort(SchCompare);
    ShowTime('begin');
    
    //download(JSON.stringify(json,0,2), 'schlib' + Date()+'.json', 'text/plain');
    Renumber(json); ShowTime('Renumber');
    json=SortAndReplaceJsonId(json);ShowTime('SortAndReplaceJsonId');
    //download(JSON.stringify(json,0,2), 'schlib' + Date()+'.json', 'text/plain');
    
    json.itemOrder.sort(SchCompareInv);
    //api('applySource', {source: json, createNew: !true}); ShowTime('applySource');
    }
    */



    //console.log('APIRenameTrack',APIRenameTrack); 
    //console.log('APIRenameLib',APIRenameLib);
    //console.log('APIGetShape',APIGetShape);  
    //console.log('CheckCoor',CheckCoor);  
    //console.log('document.MySchJson',document.MySchJson)
    //console.log('document.MyPcbJson',document.MyPcbJson)

    //console.log('SelectedIds',SelectedIds)
    //download(JSON.stringify(d1,0,2), 'dvw[1].json', 'text/plain');
}
catch (e) {alert('Error: ' + e.name + ":" + e.message + "\n" + e.stack);}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//console.log('getTabIFrame',TabIFrame);
//console.dir(TabIFrame);
//alert(JSON.stringify(api('getShape', {id:'gge10'}),0,2));
//var shape=a.callCommand.apply(a, ["gJsonCache",[{id:'gge10'}]]);
//var shape=a.callCommand.hooks["gJsonCache"].apply(null, [{id:'gge10'}]);
//var shape=a.callCommand.hooks["gJsonCache"]({id:'gge10'});
//alert(JSON.stringify(shape,0,2));
//alert(JSON.stringify(   a.callCommand.hooks["getJsonCache"]()   ,0,2));
//alert(JSON.stringify(   a.callCommand.hooks["getConfig"]()   ,0,2));
//alert(JSON.stringify(   a.callCommand.hooks["getActiveElement"]('gge8')   ,0,2));
//alert(JSON.stringify(   a.callCommand.hooks["getElementInfoById"]('gge62')   ,0,2));
//alert(JSON.stringify(   a.callCommand.hooks["updateBindId"]('gge62')   ,0,2));
//alert(JSON.stringify(   a.callCommand.hooks["updateJsonCache"]('gge62')   ,0,2));


