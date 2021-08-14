var UnionTracks = [], ShapesCoor = [], SignalCoor = [], SigErrCoor = [], Sections = [], Nodes = [], Vias = [], ViaTrackMatch = [];

function JoinTracks(json) 
{

	if (ms.Has(json, "FOOTPRINT")) 
	{

		TabIFrame = ms.getTabIFrame(ms.getActiveTab());
		a = TabIFrame.contentWindow;

		var SelectedIds = api('getSelectedIds').split(",");
		console.log('SelectedIds',SelectedIds)

		if (SelectedIds.length != 2) {alert("You must select 2 tracks only");return;}
		if (!ms.Has(json.TRACK, SelectedIds[0])) {alert("You must select 2 tracks only");return;}
		if (!ms.Has(json.TRACK, SelectedIds[1])) {alert("You must select 2 tracks only");return;}

		var pointArr0 = json.TRACK[SelectedIds[0]].pointArr;
		var pointArr1 = json.TRACK[SelectedIds[1]].pointArr;

		console.log('pointArr0', pointArr0)
		console.log('pointArr1', pointArr1)

		var LX0 = pointArr0[pointArr0.length - 1].x;
		var FX0 = pointArr0[0].x;
		var LY0 = pointArr0[pointArr0.length - 1].y;
		var FY0 = pointArr0[0].y;
		var LX1 = pointArr1[pointArr1.length - 1].x;
		var FX1 = pointArr1[0].x;
		var LY1 = pointArr1[pointArr1.length - 1].y;
		var FY1 = pointArr1[0].y;

		


var UpdateTrack;
var DeleteTrack;



		if ((FX0 == LX1 && FY0 == LY1) || (LX0 == FX1 && LY0 == FY1)) 
		{	

		 if (FX0 == LX1 && FY0 == LY1) 
		 {
			UpdateTrack=json.TRACK[SelectedIds[1]];
			DeleteTrack=json.TRACK[SelectedIds[0]];;
		 }
		
		 if (LX0 == FX1 && LY0 == FY1) 
		 {
			UpdateTrack=json.TRACK[SelectedIds[0]];
			DeleteTrack=json.TRACK[SelectedIds[1]];;
		 }
	
			for (var i = 0; i < DeleteTrack.pointArr.length; i++) 
			{
				UpdateTrack.pointArr.push(DeleteTrack.pointArr[i]);
			}

			var pointArrTMP = [];

			for (var i = 0; i < UpdateTrack.pointArr.length; i++) 
			{
				if (i == UpdateTrack.pointArr.length - 1 || 
                    UpdateTrack.pointArr[i].x != UpdateTrack.pointArr[i + 1].x || 
                    UpdateTrack.pointArr[i].y != UpdateTrack.pointArr[i + 1].y) pointArrTMP.push(UpdateTrack.pointArr[i]);
			}

			console.log('pointArrTMP', pointArrTMP)

			api('updateShape', {"shapeType": 'TRACK', "jsonCache":  { "gId": UpdateTrack.gId, pointArr: pointArrTMP}});

			api('delete', {ids: [DeleteTrack.gId]});
		}
		
        else
		if ((FX0 == FX1 && FY0 == FY1) || (LX0 == LX1 && LY0 == LY1)) 
		{
			UpdateTrack=json.TRACK[SelectedIds[1]];
			DeleteTrack=json.TRACK[SelectedIds[0]];
			var pointArrTMP = [];

            if(FX0 == FX1 && FY0 == FY1)
            {
			for (var i = DeleteTrack.pointArr.length-1; i >=0 ; i--) pointArrTMP.push(DeleteTrack.pointArr[i]);
			for (var i = 0; i <UpdateTrack.pointArr.length ; i++)    pointArrTMP.push(UpdateTrack.pointArr[i]);
			}
         
  		    if(LX0 == LX1 && LY0 == LY1)
            {
			for (var i = 0; i <UpdateTrack.pointArr.length ; i++)    pointArrTMP.push(UpdateTrack.pointArr[i]);
			for (var i = DeleteTrack.pointArr.length-1; i >=0 ; i--) pointArrTMP.push(DeleteTrack.pointArr[i]);
			}
			
			var pointArrTMP2 = [];
			for (var i = 0; i < pointArrTMP.length; i++) 
			{
				if ((i == pointArrTMP.length - 1  && 
                    (pointArrTMP[i].x != pointArrTMP[0].x && 
                     pointArrTMP[i].y != pointArrTMP[0].y)) || 
                    (i < pointArrTMP.length - 1 && ( pointArrTMP[i].x != pointArrTMP[i + 1].x || 
                    pointArrTMP[i].y != pointArrTMP[i + 1].y))) pointArrTMP2.push(pointArrTMP[i]);
			}			
			
			

			console.log('pointArrTMP', pointArrTMP2)

			api('updateShape', {"shapeType": 'TRACK', "jsonCache":  { "gId": UpdateTrack.gId, pointArr: pointArrTMP2}});
			api('delete', {ids: [DeleteTrack.gId]});
			
			
			
		}




	}

}

try 
{

	//alert(api('unitConvert', {type:'mm2pixel',value:1}))

	console.clear()
	var ms = window.MyScripts;

	//easyeda.extension.quickScript(); ms.ScriptWindowReSize();

	ms.ShowTimeBegin();
	//ms.zoom_750();
	var json = ms.GetJson();
	console.log("json", json);
	ms.json = json;

	//////////////////////////////////////////////////////////////////////////////////////////////////////

	console.log("Tracks", json.TRACK);

	JoinTracks(json);

	//console.log("LastCopiedSchObj",window.MyScripts.LastCopiedSchObj);

	//download(JSON.stringify(d1,0,2), 'dvw[1].json', 'text/plain');
} catch (e) {
	alert('Error: ' + e.name + ":" + e.message + "\n" + e.stack);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

