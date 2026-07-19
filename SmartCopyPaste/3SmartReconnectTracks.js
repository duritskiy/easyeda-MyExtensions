var UnionTracks=[],ShapesCoor=[], SignalCoor=[], SigErrCoor=[], Sections=[], Nodes=[],Vias=[],ViaTrackMatch=[];

try
{

//alert(ms.api('unitConvert', {type:'mm2pixel',value:1}))

console.clear()
var ms=window.MyScripts;
if(!ms && window.parent.ms) window.ms=window.parent.ms;



//easyeda.extension.quickScript();ms.ScriptWindowReSize();

ms.ShowTimeBegin();
//ms.zoom_750();
var json= ms.GetJson(); console.log("json",json);
ms.json=json;



//////////////////////////////////////////////////////////////////////////////////////////////////////


//ms.SmartCopy(ms.json); 
//ms.SmartPaste(ms.json);
//ms.SmartRenamePref();
SmartReconnectTracks(json);



console.log("LastCopiedSchObj",window.MyScripts.LastCopiedSchObj);
console.log("LastCopiedPcbObj",window.MyScripts.LastCopiedPcbObj);


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



function CreateUnionTracks(json,Nodes,Sections,UnionTracks,ShapeCoor)
{
var jb=0;
var Connected=[];
var c=0;
      for(var i=0; i<Nodes.length; i++)
      {
        for(var j=jb; j<Sections.length; j++ )
        {
        var x2=Sections[j].x2;
        var x=Nodes[i].x;
        var sr=x2<x;

           var Node=Nodes[i];
           var Section=Sections[j];

          
          if(Sections[j].x2+ 0.1 <Nodes[i].x){jb=j+1;  continue;  }
          if( IsOnSection(Sections[j].x1,Sections[j].y1,Sections[j].x2,Sections[j].y2,Nodes[i].x,Nodes[i].y, 0.6) && 
              IsOnLine(Sections[j].x1,Sections[j].y1,Sections[j].x2,Sections[j].y2,Nodes[i].x,Nodes[i].y, 0.6))
          {

           if(Sections[j].TrackObj.layerid===Nodes[i].TrackObj.layerid)
              {

              Connected[c++]=[Nodes[i].gId,Sections[j].gId];
              }
           else
              {
              var Via;

debugger
              if((Via=ShapeCoor.find( function(element, index, array)
                       { 
                          return almost_equal(element.x,Node.x,0.6) && 
                                 almost_equal(element.y,Node.y,0.6) && element.PlateObj.layerid===11;})))
                {  
                 Connected[c++]=[Nodes[i].gId,Sections[j].gId];
               
                 ViaTrackMatch.push({ShapesObj:Via,TrackObj:Node.TrackObj });
                   
                }

              } 



          }
        }
     }

Connected.forEach(function(item){ item[0]=eval(item[0].slice(3)); item[1]=eval(item[1].slice(3));  })
Connected.sort((a,b)=>a[0]>b[0]?1:a[0]<b[0]?-1:a[1]>b[1]?1:a[1]<b[1]?-1:0)


var L0,L1;
for(var i=0;i<Connected.length;)
{
if(L0==Connected[i][0] && L1==Connected[i][1]) Connected.splice(i,1);
else {L0=Connected[i][0]; L1=Connected[i][1]; i++;   }
}



var lastNode;
var lastUnionTrack;

console.log('Connected');console.dir(Connected);

for(var i=0;i<Connected.length;i++)
{
var node=Connected[i][0];
var section=Connected[i][1];

 if(lastNode!=node)
 {
  if(node==section)
  {
   if(!UnionTracks.find( function(element, index, array){ return element.includes(node); })) 
   {
      lastUnionTrack=UnionTracks[UnionTracks.push([node])-1];  lastNode=node;

 //     if(node==16 || section==16 )debugger;
       
   }
  }
  else
  {
   if((lastUnionTrack=UnionTracks.find( function(element, index, array){ return element.includes(node);}))) 
   {
     lastUnionTrack.push(section);     lastNode=section;
   //  if(node==16 || section==16 )debugger;
   }
   else
   {
   if((lastUnionTrack=UnionTracks.find( function(element, index, array){ return element.includes(section);}))) 
     {
       lastUnionTrack.push(node);    lastNode=node;
  //     if(node==16 || section==16 )debugger;
     }
   else 
     {
       lastUnionTrack=UnionTracks[UnionTracks.push([node,section])-1];   lastNode=node;
   //    if(node==16 || section==16 )debugger;
     }
   }
  }
  //lastNode=node;
 }
 else
{ 
 if(lastNode==node && node!=section)
 { 
  lastUnionTrack.push(section);
 // if(node==16 || section==16 )debugger;
 }
}
}

console.log('UnionTracks');console.dir(UnionTracks);

UnionTracks.forEach( 
function(UnionTrack, ind, arr)
	{	 	
	arr[ind]=ms.Unique(UnionTrack); 
	arr[ind].forEach( function(currentValue, index, array){  array[index]=json.TRACK['gge'+currentValue] });    
	}   );
}





function SmartReconnectTracks(json)
{
if(ms.Has(json,"FOOTPRINT"))
{
	
ms.SmartSelect();
ms.LastCopiedPcbIds = ms.api('getSelectedIds').split(",");

ms.LastCopiedPcbObj=[];
ms.LastCopiedPcbIds.forEach( function(currentValue, index, array)
{var obj=ms.GetLibInfo(ms.json,array[index]); if(obj.pref)ms.LastCopiedPcbObj.push( obj); });



/**/
 
ms.MyPcbJson=json;	
json.itemOrder.sort(ms.PcbCompare);

ms.ShowTime('begin');
ShapeCoor=GetPadCoor(json,ms.LastCopiedPcbObj,ms.LastCopiedPcbIds);
console.log('ShapeCoor'); console.dir(ShapeCoor); 

 //CreateVias(json, Vias,ms.LastCopiedPcbIds );// ms.ShowTime('Vias');
 CreateSections(json, Sections,ms.LastCopiedPcbIds);// ms.ShowTime('CreateSections');
 CreateNodes(json, Nodes,ms.LastCopiedPcbIds);//ms.ShowTime('CreateNodes');

// ms.MagnitEndNodes(json,ShapesCoor,Nodes);// ms.ShowTime('MagnitEndNodes');

CreateUnionTracks(json,Nodes,Sections,UnionTracks,ShapeCoor);// ms.ShowTime('CreateUnionTracks');

    console.log('UnionTracks'); console.dir(UnionTracks); 

    console.log('Sections'); console.dir(Sections); 
    console.log('Nodes'); console.dir(Nodes); 


debugger

ReConnectTracksToPlates(json,ShapeCoor,UnionTracks,ViaTrackMatch); ms.ShowTime('ReConnectTracksToPlates');
ReConnectViaToTrack(json,ViaTrackMatch); ms.ShowTime('ReConnectViaToTrack');
 
console.log('ViaTrackMatch'); console.dir(ViaTrackMatch); 
//console.log('Vias'); console.dir(Vias); 

ms.api('applySource', {source: json, createNew: false});

}
}


function ReConnectTracksToPlates(json,ShapesCoor,UnionTracks,ViaTrackMatch)
{
/*
var nnn;
	for(var i=0;i<UnionTracks.length ;i++)//for(var i=UnionTracks.length; i-- ;)
	{
        var UnionTrack=UnionTracks[i];
        for(var t=0; t<UnionTrack.length ;t++)//for(var t=UnionTrack.length; t-- ;)
		{   
var Track=UnionTrack[t];
//if(Track.gId=="gge229")nnn=i;
}}
*/


	for(var i=0;i<UnionTracks.length ;i++)//for(var i=UnionTracks.length; i-- ;)
	{


        var UnionTrack=UnionTracks[i];
        for(var t=0; t<UnionTrack.length ;t++)//for(var t=UnionTrack.length; t-- ;)
		{   
			var Track=UnionTrack[t];
			var found=0;
			var pointArr=Track.pointArr;
            
            for(var k=0;k<pointArr.length;k+=pointArr.length-1)
			{	
          		for(var j= 0; j<ShapesCoor.length;j++ )	//for(var j= ShapesCoor.length; j --; )	
				{   
                    
                    if(almost_equal(ShapesCoor[j].x ,pointArr[k].x,0.5) &&  almost_equal(ShapesCoor[j].y,pointArr[k].y,0.5) )
 					{   

                       if(ShapesCoor[j].Name=="VIA"  
                         ||(ShapesCoor[j].Name=="PAD" && ShapesCoor[j].fid=="" ))
						{
						  if(ShapesCoor[j].PlateObj.layerid==Track.layerid || ShapesCoor[j].PlateObj.layerid==11)	
                          ViaTrackMatch.push({ShapesObj:ShapesCoor[j],TrackObj:Track });
						//ShapesCoor[j].PlateObj.net=Track.net;
						}
						else 
                        {
						RenameUnionTrackNet(json,UnionTrack,ShapesCoor[j].net,Vias)
		                //found=1; 
                        k=pointArr.length;
						break;
                        } 

						
						
/**/
					}
				}
			}
			if(found)break;
		}
	}
}


function GetPadCoor(json,LastCopiedPcbObj,ViasFromHere)
{
	
	var shapeCoor=[];
     var ShapeTypes=['PAD', 'VIA'];

    //GetPlates(json,ShapeTypes,shapeCoor,0);
    for(var fid in LastCopiedPcbObj) if(ms.Has(LastCopiedPcbObj,fid)) GetPlates(LastCopiedPcbObj[fid].LibObj,ShapeTypes,shapeCoor,LastCopiedPcbObj[fid].gge);
	
	if(ViasFromHere) ViasFromHere.forEach( 
function(value, index, array){  if(ms.Has(json.VIA,value)) shapeCoor.push(GetPlate('VIA',json.VIA,value,""))   });  

	if(ViasFromHere) ViasFromHere.forEach( 
function(value, index, array){  if(ms.Has(json.PAD,value)) shapeCoor.push(GetPlate('PAD',json.PAD,value,""))   });  
	

    shapeCoor.sort(PlateCompare );
	return shapeCoor;
}




function PlateCompare(a,b) {return a.x-b.x?a.x-b.x:a.y-b.y;}

/*
function CreateVias(json, Vias, ViasFromHere)
{
    for(var gId in json.VIA)
    {
     if(!ms.Has(json.VIA, gId)) continue;
     var Via= json.VIA[gId];
	 if(!ViasFromHere || ViasFromHere.includes(gId)) Vias.push(CreateVia(Via, Via.x, Via.y));
	}
	Vias.sort(function(a,b){return a.x-b.x} );
}

function CreateVia(Via, x, y)
{
    var ThisObj     = {};
    ThisObj.gId     = Via.gId;
    


    ThisObj.x      = x;
    ThisObj.y      = y;
   

  Object.defineProperty(ThisObj, "net",  
  {
  get: function()     {  return this.ViaObj.net;}, 
  set : function(value){ this.ViaObj.net= value;}});

  ThisObj.ViaObj= Via;

  return ThisObj;
}
*/

function GetPlates(lib,ShapeTypes,ShapesCoor,fid)
{
      for(var PlateName in lib)
      {
        if(ms.Has(ShapeTypes,PlateName))
        {
        var Plates=lib[PlateName];
        for(var gId in Plates)if(ms.Has(Plates,gId)) ShapesCoor.push(GetPlate(PlateName,Plates,gId,fid));  
        }
      }
 } 



function GetPlate(PlateName,Shapes,gId,fid)
{
return {  Name:PlateName, gId:gId ,  net: Shapes[gId].net, fid:fid,x:Shapes[gId].x, y:Shapes[gId].y, Shapes: Shapes[gId].shape, PlateObj: Shapes[gId]};
} 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
function GetShapeCoor(json)
{
    
    var ShapeTypes=['PAD', 'VIA'];

    GetPlates(json,ShapeTypes,ShapesCoor,0);
    for(var fid in json.FOOTPRINT) if(ms.Has(json.FOOTPRINT,fid)) GetPlates(json.FOOTPRINT[fid],ShapeTypes,ShapesCoor,fid);

    ShapesCoor.sort(PlateCompare );
}
*/
//almost_equal=almost_equal;
function almost_equal(a,b,d){return (Math.abs(a - b)<d)?true:false; }

//IsOnLine=IsOnLine;
function IsOnLine(x1, y1, x2, y2, px, py,accuracy){ if(!accuracy)accuracy=0.6; return almost_equal((py-y1)*(x2-x1),(y2-y1)*(px-x1) , accuracy); }

IsOnSection=IsOnSection;
function IsOnSection(x1, y1, x2, y2, x, y,accuracy){if(!accuracy)accuracy=0.6; return Math.min(x1,x2)-accuracy<=x && x<=Math.max(x1,x2)+accuracy && Math.min(y1,y2)-accuracy<=y && y<=Math.max(y1,y2)+accuracy  }
////////////////







function ReConnectViaToTrack(json,ViaTrackMatch)
{

for(var j= 0; j<ViaTrackMatch.length;j++ )
{
var ViaTrackMatchObj=ViaTrackMatch[j];

ViaTrackMatchObj.ShapesObj.PlateObj.net=ViaTrackMatchObj.TrackObj.net;

if(ViaTrackMatchObj.ShapesObj.Name=='VIA')
ms.api('updateShape', {"shapeType": 'VIA', 
					 "jsonCache": 
                                {
								 "gId": ViaTrackMatchObj.ShapesObj.gId, "net": ViaTrackMatchObj.TrackObj.net
								 
                                 }});   

if(ViaTrackMatchObj.ShapesObj.Name=='PAD')
ms.api('updateShape', {"shapeType": 'PAD', 
					 "jsonCache": 
                                {
								 "gId": ViaTrackMatchObj.ShapesObj.gId, "net": ViaTrackMatchObj.TrackObj.net
								 
                                 }});   


}

}




function RenameTrackNet(gId,Net)
{
//APIRenameTrack++;
ms.api('updateShape', {"shapeType": 'TRACK', "jsonCache":  { "gId": gId, "net": Net  }});
}




function RenameUnionTrackNet(json,UnionTrackObj,Net,Vias)
{
  for(var i=UnionTrackObj.length;i--;) 
  { 
    var UnionTrackObjnet=UnionTrackObj[i].net;
    if(UnionTrackObjnet!=Net)
    {

      var gId=UnionTrackObj[i].gId;
      var OldSignal= json.SIGNALS[UnionTrackObjnet].find(x => x.gId == gId);
      json.SIGNALS[Net].push( OldSignal );
      ms.DeleteByAttrFromArray(json.SIGNALS[UnionTrackObjnet], 'gId', gId);
      
      if(!json.SIGNALS[UnionTrackObjnet].length) delete json.SIGNALS[UnionTrackObjnet]; 
      UnionTrackObj[i].net=Net;
	  RenameTrackNet(gId,Net);
    }
  }
}



////////////////////////////




/////////////////





function CreateNode(Track, x, y)
{
    var ThisObj     = {};
    ThisObj.gId     = Track.gId;
    ThisObj.x       = x;
    ThisObj.y       = y;
    ThisObj.TrackObj= Track;

  Object.defineProperty(ThisObj, "net",  
  {
  get: function()     {  return this.TrackObj.net;}, 
  set : function(value){ this.TrackObj.net= value;}});

  return ThisObj;
}


function CreateNodes(json, Nodes,ViasFromHere)
{
    for(var gId in json.TRACK)
    {
        if(!ms.Has(json.TRACK, gId)) continue;
        var Track= json.TRACK[gId];
        //for(var k= 0; k < Track.pointArr.length; k++)   Nodes.push(CreateNode(Track, Track.pointArr[k].x, Track.pointArr[k].y));
		if(!ViasFromHere || ViasFromHere.includes(gId))
		{
        Nodes.push(CreateNode(Track, Track.pointArr[0].x, Track.pointArr[0].y));
        Nodes.push(CreateNode(Track, Track.pointArr[Track.pointArr.length-1].x, Track.pointArr[Track.pointArr.length-1].y));
		}
    }
Nodes.sort(function(a,b){return a.x-b.x} );
	
}





function CreateSections(json, Sections,ViasFromHere)
{
    for(var gId in json.TRACK)
    {
     if(!ms.Has(json.TRACK, gId)) continue;
     var Track= json.TRACK[gId];
     for(var k= 0; k < Track.pointArr.length - 1; k++) 
     if(!ViasFromHere || ViasFromHere.includes(gId)) Sections.push(CreateSection(Track, Track.pointArr[k].x, Track.pointArr[k].y, Track.pointArr[k + 1].x, Track.pointArr[k + 1].y));
    }
	
	//Sections.sort(function(a,b){return a.gId<b.gId?-1 : a.gId>b.gId?1:0} )
	Sections.sort(function(a,b){return a.x2-b.x2} );
	
}


function CreateSection(Track, x1, y1, x2, y2)
{
    var ThisObj     = {};
    ThisObj.gId     = Track.gId;
    

    if(x1<x2)
    {
    ThisObj.x1      = x1;
    ThisObj.y1      = y1;
    ThisObj.x2      = x2;
    ThisObj.y2      = y2;
    }
    else
    {
    ThisObj.x1      = x2;
    ThisObj.y1      = y2;
    ThisObj.x2      = x1;
    ThisObj.y2      = y1;
    }
    

  Object.defineProperty(ThisObj, "net",  
  {
  get: function()     {  return this.TrackObj.net;}, 
  set : function(value){ this.TrackObj.net= value;}});

  ThisObj.TrackObj= Track;

  return ThisObj;
}










//console.log('getTabIFrame',TabIFrame);
//console.dir(TabIFrame);
//alert(JSON.stringify(ms.api('getShape', {id:'gge10'}),0,2));
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

