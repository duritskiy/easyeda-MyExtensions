try
{
console.clear()
var ms=window.MyScripts;

//FuncContainer();

//easyeda.extension.quickScript();
//ms.ScriptWindowReSize();


ms.ShowTimeBegin();

ms.zoom_750();

var json= ms.GetJson(); 

if (ms.Has(json,"schlib")) console.log("schlib json",json);
if (ms.Has(json,"FOOTPRINT")) console.log("FOOTPRINT json",json);


  ms.json = json;
  
  
  ms.SmartSelect = SmartSelect;
  function SmartSelect(json)
  {
      var SelectedIds = api('getSelectedIds').split(",");
      SelectedIds.forEach(function(currentValue,index,array) {array[index] = array[index].replace(/fake-[\d]+/,'');});
      SelectedIds = ms.Unique(SelectedIds);
      if (ms.Has(json,"schlib")) SelectedIds.sort(ms.SchCompare);
      if (ms.Has(json,"FOOTPRINT")) SelectedIds.sort(ms.PcbCompare);
      console.log("SelectedIds ",SelectedIds);
      api('select',{ids: SelectedIds});
      // SelectedIds = api('getSelectedIds').split(",");
  }

  ms.SmartCopy = SmartCopy;
  function SmartCopy(json)
  {
    debugger;
    ms.SmartSelect(json);
    ms.a().callCommand.hooks["copy"]();

    if (ms.Has(json, "schlib"))
    {
      ms.LastCopiedSchIds = [];
      ms.LastCopiedSchObj = [];
    
    }

    if (ms.Has(json, "FOOTPRINT"))
    {
      ms.LastCopiedPcbIds = [];
      ms.LastCopiedPcbObj = [];
      ms.footprint_before_paste = [];
      ms.footprint_before_pasteObj = [];
    
    }

  }


//////////////////////////////////////////////////////////////////////////////////////

ms.SmartCopy(ms.json); 
//ms.SmartPaste(ms.json);
//SmartRenameLastCopied();
//SmartReconnectTracks();

console.log("LastCopiedSchObj",ms.LastCopiedSchObj);
console.log("LastCopiedPcbObj",ms.LastCopiedPcbObj);

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
catch(e) { alert('Error: ' + e.name + ":" + e.message + "\n" + e.stack);}

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


