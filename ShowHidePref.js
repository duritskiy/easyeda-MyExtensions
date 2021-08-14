
ShowHidePref();
function ShowHidePref()
{
var json= api('getSource', {type: "json"}); console.log("json",json);
var AllSelectedIds = api('getSelectedIds').split(",");

if(!json.hasOwnProperty('FOOTPRINT'))return;
var SelectedLibsId=AllSelectedIds.filter(function(item,i, arr){ return json.FOOTPRINT.hasOwnProperty(item)});


var SelectedLibs=SelectedLibsId.map(function(item){return{fid:item, PrefObj:Object.values(json.FOOTPRINT[item].TEXT).find((item)=>item.type=="P")}})
if(!SelectedLibs.length) return;
console.log('SelectedLibs',SelectedLibs)

var visible
if(SelectedLibs[0].PrefObj.hasOwnProperty('display') && SelectedLibs[0].PrefObj.display=='none') visible=0;
else visible=1;



for(var i=0;i<SelectedLibs.length;i++)
{
//debugger
if(visible)
api('updateShape',{"shapeType":'FOOTPRINT',"jsonCache":{"gId": SelectedLibs[i].fid,"TEXT":{[SelectedLibs[i].PrefObj.gId]:{'display': 'none'}}}});  
else 
api('updateShape',{"shapeType":'FOOTPRINT',"jsonCache":{"gId": SelectedLibs[i].fid,"TEXT":{[SelectedLibs[i].PrefObj.gId]:{'display': null}}}});  

}


}