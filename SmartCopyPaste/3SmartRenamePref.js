try
{
//   console.clear()
console.log("--------------3SmartRenamePref.js--------------")
  var ms = window.parent.MyScripts;
  // easyeda.extension.quickScript(); ms.ScriptWindowReSize();
  ms.ShowTimeBegin();
  ms.zoom_750();
// debugger
  var json = ms.GetJson();
//   if (ms.MySchJson) console.log("schlib", ms.MySchJson.schlib);
//   if (ms.MyPcbJson) console.log("FOOTPRINT", ms.MyPcbJson.FOOTPRINT);

  ms.json = json;
  /////////////////////////////////////////////////////////////////////////////////////
  ms.SmartRenamePref =   function (json)
  {

    if (ms.Has(json, "schlib"))
    {
      
//       debugger

      // ms.a().callCommand.hooks["recoverAllLibMd5Id"]();

      ms.api('select', {ids: ms.LastCopiedSchIds});
      ms.LastCopiedSchObj = [];
      ms.LastCopiedSchPref = [];
      ms.LastCopiedSchIds.forEach(function(currentValue, index, array)
      {
        var obj = ms.GetLibInfo(json, array[index]);
        if (obj.pref)
        {
          ms.LastCopiedSchPref.push(obj.pref);
          ms.LastCopiedSchObj.push(obj);
        }
      });

      console.log("LastCopiedSchObj",ms.LastCopiedSchObj);
      
      // json.head.hasIdFlag = false;
      // ms.api('applySource', {source: json, createNew: false});

//       var o = [{ args: [], uuid: undefined, func: "recoverAllLibMd5Id" }];
      debugger
//       window.callByEditor.apply(ms.a(), o);
      ms.a().parent.callByEditor({ args: [], uuid: undefined, func: "recoverAllLibMd5Id" });


      var json = ms.GetJson();
      if (ms.MySchJson) console.log("schlib", ms.MySchJson.schlib);
      
      console.log("LastCopiedSchObj",ms.LastCopiedSchObj);
     

    }



    if (ms.Has(json, "FOOTPRINT"))
    {
      // ms.footprint_before_paste;
      // ms.LastCopiedPcbIds = Object.keys(json.FOOTPRINT);
      // ms.LastCopiedPcbIds = ms.LastCopiedPcbIds.slice(ms.footprint_before_paste.length, ms.LastCopiedPcbIds.length);
      // debugger
      // ms.api('select', {ids: ms.LastCopiedPcbIds});

       console.log("FOOTPRINT", json.FOOTPRINT);

      

      ms.LastCopiedPcbObj = [];
      ms.LastCopiedPcbIds.forEach(function(currentValue, index, array)
      {var obj = ms.GetLibInfo(ms.json, array[index]); if (obj.pref) ms.LastCopiedPcbObj.push(obj);});



      if (ms.LastCopiedSchObj.length == ms.LastCopiedPcbObj.length)
      {
        

        ms.LastCopiedPcbObj.forEach((v, i) =>
        {

          v.PrefW=ms.LastCopiedSchObj[i].PrefW;
    

          var old_key=v.LibObj.gId;
          var new_key="gge"+MD5(v.PrefW).substr(8, 16);
  

          v.LibObj.head.gId=new_key;

          v.LibObj.gId= new_key;

          if (old_key !== new_key) 
          {
           Object.defineProperty(json.FOOTPRINT, new_key,Object.getOwnPropertyDescriptor(json.FOOTPRINT, old_key));
           delete json.FOOTPRINT[old_key];
          }

//           json.FOOTPRINT
        });

        console.log("footprint_before_pasteObj",ms.footprint_before_pasteObj);
//         console.log("LastCopiedSchObj",ms.LastCopiedSchObj);
        console.log("LastCopiedPcbObj",ms.LastCopiedPcbObj);
//         debugger
        // json.head.hasIdFlag = false;

        console.log("applySource(json)",json);

        ms.api('applySource', {source: json, createNew: false});

//         var o = [{ args: [], uuid: undefined, func: "recoverAllLibMd5Id" }];
        debugger
//         ms.a().callCommand("recoverLibMd5Id",[ms.getActiveTab(), true]);


//           var n = ae(ml.gJsonCache, e, !1, !0);
//           if (!n) return;
//           ml.buildSignals();
//           Xr("setTabUnsaved");
//           parent.$.messager.show({
//               title: "Information",
//               msg: "Component ID reset successfully!",
//               timeout: 3e3,
//               showType: "slide"
//           })

        var json = ms.GetJson();

        if (ms.MyPcbJson) console.log("FOOTPRINT", ms.MyPcbJson.FOOTPRINT);
        
//           console.log("footprint_before_pasteObj",ms.footprint_before_pasteObj);
//           console.log("LastCopiedPcbObj",ms.LastCopiedPcbObj);

      }

      // Renumber(json);

      // if (!ms.LastCopiedSchObj) {alert('Run SmartCopyPaste.js  in SCH before'); return;}

      // if (ms.LastCopiedSchObj.length == ms.LastCopiedPcbObj.length)
      // {
      //   var txt = [];

      //   for (var i = 0;i < ms.LastCopiedSchObj.length;i++)
      //   {
      //     var PcbObj = ms.LastCopiedPcbObj[i];
      //     var SchObj = ms.LastCopiedSchObj[i];

      //     SchObj.BindId = 'gge' + MD5(SchObj.PrefW);

      //     var PcbObjBindId = PcbObj.BindId;
      //     var SchObjBindId = SchObj.BindId;

      //     debugger;

      //     txt += `PrefW: ${PcbObj.PrefW}=>${SchObj.PrefW}\nbindId=${PcbObj.BindId}=>${SchObj.BindId}\n\n`;

      //     ms.api('updateShape',
      //       {
      //         "shapeType": 'FOOTPRINT',
      //         "jsonCache":
      //         {
      //           "gId": PcbObj.gge,
      //           "TEXT": {[PcbObj.PrefObj.gId]: {'text': SchObj.PrefW, 'pathStr': ""}},
      //           "head": {'bind_sch_id': SchObj.BindId}
      //         }
      //       });
      //   }

      //   alert(txt);
      // }
      // else alert(`LastCopiedSchObj.length==${ms.LastCopiedSchObj.length} != LastCopiedPcbObj.length==${ms.LastCopiedPcbObj.length}`)

    }


    //console.log("LastCopiedIds",LastCopiedIds);
    //var obj = api('getShape', {id:LastCopiedIds[LastCopiedIds.length-1]})
  }

  ms.SmartRenamePref(json);


//   ms.Renumber = function (json)///////////////////////////////////////////////////////////////////////////////////////////////////////////////Renumber(json)
//   {
//       var N = 1;
//       var _P = "";
//       // var arr = json.itemOrder;
    
//       if (ms.Has(json,"schlib")) var shapeType = 'schlib';
//       if (ms.Has(json,"FOOTPRINT")) var shapeType = 'FOOTPRINT';
//     var arr = json[shapeType];
    
//     var info = ""
//     debugger
//       for (var i in arr)
//       {
//           var gge = arr[i];
//           if (!ms.Has(json[shapeType],gge)) continue;
//           var LibInfo = ms.GetLibInfo(json,gge);

//           var P = LibInfo.PrefP;
//           if (_P != P)
//           {
//               N = 1;
//               _P = P;
//           }
//           var PrefW = P + N;
//           var bindId = MD5(PrefW);

//           //info+=`${LibInfo.PrefW}:${PrefW}: bindId:${LibInfo.BindId}${LibInfo.BindId==bindId?'==':'<>'}${bindId} \n`;


//           ////var Locked=LibInfo.LibObj.head.locked;
//           if (LibInfo.PrefW != PrefW || LibInfo.BindId != bindId/*|| LibInfo.LibObj.head.locked==1*/)
//           {

//               LibInfo.PrefW = PrefW;
//               LibInfo.BindId = bindId;

//               var PrefObjgId = LibInfo.PrefObj.gId;

//               APIRenameLib++;

//               /*            
//                           if(shapeType == 'schlib') api('updateShape', {"shapeType": shapeType, 
//                                                                         "jsonCache": 
//                                                                         {
//                                                                             "gId": gge, 
//                                                                             "annotation": {[PrefObjgId]:{'string': PrefW}}, 
//                                                                             "head": {'bind_pcb_id': bindId}
//                                                                         }});
              
//                           if(shapeType == 'FOOTPRINT') {api('updateShape', {"shapeType": shapeType, 
//                                                                            "jsonCache": 
//                                                                            {
//                                                                                "gId": gge, 
//                                                                                "TEXT": {[PrefObjgId]: {'text': PrefW,'pathStr':""}}, 
//                                                                                "head": {'bind_sch_id': bindId}}});    }
//               /**/
//           }

//           N++;
//       }

//       if (info) alert(info);
//   }




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


