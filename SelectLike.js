try
{
console.clear()
var ms=window.MyScripts;

//easyeda.extension.quickScript(); ms.ScriptWindowReSize();
 
var a = ms.getTabIFrame(ms.getActiveTab()).contentWindow;
ms.ShowTimeBegin();

var json= ms.GetJson(); console.log("json",json);
ms.json=json;
/////////////////////////////////////////////////////////////////////////////////////



function GetPcbTextTypePObj(obj){return Object.values(ms.objFilter(obj.TEXT,      (item)=>item.type=="N"))[0];} 


if(ms.Has(json,"FOOTPRINT"))
{
	
var SelectedIds = api('getSelectedIds').split(",");
	
if(SelectedIds.length==0)return;	
	
var SelectedIdObj=ms.GetLibInfo(ms.MyPcbJson,SelectedIds[0]); 	

var Value=GetPcbTextTypePObj(SelectedIdObj.LibObj).text;

if(!Value)return;

var FOOTPRINT=ms.MyPcbJson.FOOTPRINT
var ToSelectIds=[];
	
	
	
for (var gge in FOOTPRINT) 
{
if(!ms.Has(FOOTPRINT,gge))continue;
var obj=ms.GetLibInfo(ms.MyPcbJson,gge); 

obj.Value=GetPcbTextTypePObj(obj.LibObj).text;

if(obj.Value  && Value.toLowerCase()== obj.Value.toLowerCase())
{
ToSelectIds.push( obj.gge); 
}

}	
	

api('select', {ids:ToSelectIds }); 

	
}

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


