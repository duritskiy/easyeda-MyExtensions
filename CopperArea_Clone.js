var UnionTracks=[],ShapesCoor=[], SignalCoor=[], SigErrCoor=[], Sections=[], Nodes=[],Vias=[],ViaTrackMatch=[];

try
{
console.clear()
var ms=window.MyScripts;

easyeda.extension.quickScript();ms.ScriptWindowReSize();

ms.ShowTimeBegin();
ms.zoom_750();
var json= ms.GetJson(); console.log("json",json);
ms.json=json;


var selected = api('getSelectedIds').split(",");
var newIds = api('clone', {ids:selected})



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


//SmartReconnectTracks(json);

