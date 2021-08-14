var UnionTracks=[],ShapesCoor=[], SignalCoor=[], SigErrCoor=[], Sections=[], Nodes=[],Vias=[],ViaTrackMatch=[];

try
{
console.clear()
var ms=window.MyScripts;

//easyeda.extension.quickScript();ms.ScriptWindowReSize();

ms.ShowTimeBegin();
//ms.zoom_750();
var json= ms.GetJson(); console.log("json",json);
ms.json=json;

var SelectedIds = api('getSelectedIds').split(",");
//if(SelectedIds.length>=1 )ms.download(JSON.stringify(api('getShape', {id:SelectedIds[0]}),0,2), 'schlib' + Date()+'.json', 'text/plain');

if(!ms.Has(json,"schlib") || SelectedIds.length<2 )return;

function GetSchMarkNObj(obj){return Object.values(ms.objFilter(obj.annotation,(item)=>item.mark=="N"))[0];}


var LibInfoObj=[];
debugger
for(var index=0;index<SelectedIds.length;index++)
{  
if(ms.GetLibInfo(json,SelectedIds[index]).pref) LibInfoObj.push(ms.GetLibInfo(json,SelectedIds[index]));
};


if(LibInfoObj.length<2 )return;


var SrcObj=LibInfoObj[LibInfoObj.length-1];
var SrcMarkNObj=GetSchMarkNObj(SrcObj.LibObj);


debugger
for(var index=0;index<LibInfoObj.length-1;index++)
{  
var DestObj=LibInfoObj[index];
var DestMarkNObj=GetSchMarkNObj(DestObj.LibObj);


api('updateShape', {
 	"shapeType": "schlib",
	"jsonCache": {
	"gId": DestObj.gge,
	"head": {"c_para":SrcObj.LibObj.head.c_para , "puuid":SrcObj.LibObj.head.puuid},
	"annotation": {[DestMarkNObj.gId]:{'string': SrcMarkNObj.string}} 
}});
/**/
//DestObj.LibObj.head.c_para=SrcObj.LibObj.head.c_para;

//if(SelectedIds.length>=1 )ms.download(JSON.stringify(api('getShape', {id:SelectedIds[0]}),0,2), 'schlib' + Date()+'.json', 'text/plain');

};






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

