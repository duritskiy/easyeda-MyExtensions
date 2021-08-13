if (!window.MyScripts) window.MyScripts = {}
var ms = window.MyScripts;

document.ms = ms;

// var ms = window.MyScripts;



FuncContainer();


/*
ms.ExecScriptByName=ExecScriptByName;
ms.GetScriptNames=GetScriptNames;
ms.ScriptWindowReSize=ScriptWindowReSize;
ms.copyTextToClipboard=copyTextToClipboard;
window.download=download;

ms.getActiveTab=getActiveTab;
ms.getTabIFrame=getTabIFrame;
*/


var ScriptNames = ms.GetScriptNames();
var Menu = [];

for (var i = 0;i < ScriptNames.length;i++)
{
    var ScriptName = ScriptNames[i];
    var extname = 'extension-MyExtensions-' + ScriptName;
    Menu[i] = {"text": ScriptName,"cmd": extname};
}

api('createToolbarButton',
{
    icon: api('getRes',{file: 'icon.svg'}),
    title: 'MyExtensions',
    fordoctype: 'sch,schlib,pcb',
    menu: Menu
});



var toolbar=$("#toolbar-common")[0];

var firstChild=toolbar.firstChild;
var lastChild=toolbar.lastChild;
//var myDiv2Para = $(lastChild).detach();
//myDiv2Para.insertAfter(firstChild);

$(lastChild).detach().insertAfter(firstChild);


var e = "";

for (var i = 0;i < ScriptNames.length;i++)
{
    var ScriptName = ScriptNames[i];
    var extname = 'extension-MyExtensions-' + ScriptName;
    api('createCommand',{[extname]: new Function('',`window.MyScripts.ExecScriptByName("${ScriptName}");`)});
}

/*
//Add a button on the toolbar
api('createToolbarButton', {
	icon: api('getRes', {file:'icon.svg'}),
	title:'MyExtensions',
	fordoctype:'sch,schlib,pcb',
	menu:[
	    {"text":"ShowScript", "cmd":"extension-MyExtensions-ShowScript"},
	    {"text":"ReNumberScript", "cmd":"extension-MyExtensions-ReNumberScript"}
	
	]
});




debugger;
api('createCommand', 
{
	'extension-MyExtensions-ShowScript' : function ()
	{
	    easyeda.extension.quickScript ();
		ScriptWindowReSize();
	}
});

api("createCommand", {"extension-MyExtensions-ReNumberScript" : function (){ExecScriptByName("ReNumberScript");}});


/**/


function FuncContainer()
{
  
var regex = new RegExp('([^\\d]*)([\\d]*)');
//var UnionTracks=[],ShapesCoor=[], SignalCoor=[], SigErrCoor=[], Sections=[], Nodes=[],Vias=[],ViaTrackMatch=[];
var APIRenameTrack = 0,APIRenameLib = 0,APIGetShape = 0,CheckCoor = 0,AddUnionCount = 0;
var TabIFrame;
// var a;

ms.a = function()
{
  // debugger
    TabIFrame = ms.getTabIFrame(ms.getActiveTab());
    var a = TabIFrame&&TabIFrame.contentWindow;
    return a;
};

debugger
ms.hooks = function() { return ms.a()&&ms.a().callCommand.hooks; }




    ms.zoom_750 = zoom_750;
    function zoom_750()
    {
        TabIFrame = ms.getTabIFrame(ms.getActiveTab());
        a = TabIFrame.contentWindow;
       
        if (TabIFrame.attributes['winzoom'].nodeValue > 750) easyeda.extension.doCommand("zoom_750");
    }


  ms.api = api;

    ms.GetJson = GetJson;
    function GetJson()
    {
        var json = api('getSource',{type: "json"}); console.log("json",json);
        if (ms.Has(json,"FOOTPRINT")) ms.MyPcbJson = json;
        if (ms.Has(json,"schlib")) ms.MySchJson = json;
        return json;
    }


    // ms.SmartCopy = SmartCopy;
    // function SmartCopy(json)
    // {
    //     ms.SmartSelect(json);
    //     a.callCommand.hooks["copy"]()
    // }
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ms.SmartPaste = SmartPaste;
    function SmartPaste(json)
    {

        a.callCommand.hooks["paste"]();
        debugger;
        if (ms.Has(json,"schlib")) ms.LastCopiedSchIds = api('getSelectedIds').split(",");
        if (ms.Has(json,"FOOTPRINT")) ms.LastCopiedPcbIds = api('getSelectedIds').split(",");
    }










    ms.Renumber = Renumber;
    function Renumber(json)///////////////////////////////////////////////////////////////////////////////////////////////////////////////Renumber(json)
    {
        var N = 1;
        var _P = "";
        var arr = json.itemOrder;

        if (ms.Has(json,"schlib")) var shapeType = 'schlib';
        if (ms.Has(json,"FOOTPRINT")) var shapeType = 'FOOTPRINT';

        var info = ""
        for (var i in arr)
        {
            var gge = arr[i];
            if (!ms.Has(json[shapeType],gge)) continue;
            var LibInfo = ms.GetLibInfo(json,gge);

            var P = LibInfo.PrefP;
            if (_P != P)
            {
                N = 1;
                _P = P;
            }
            var PrefW = P + N;
            var bindId = MD5(PrefW);

            //info+=`${LibInfo.PrefW}:${PrefW}: bindId:${LibInfo.BindId}${LibInfo.BindId==bindId?'==':'<>'}${bindId} \n`;


            ////var Locked=LibInfo.LibObj.head.locked;
            if (LibInfo.PrefW != PrefW || LibInfo.BindId != bindId/*|| LibInfo.LibObj.head.locked==1*/)
            {

                LibInfo.PrefW = PrefW;
                LibInfo.BindId = bindId;

                var PrefObjgId = LibInfo.PrefObj.gId;

                APIRenameLib++;

                /*            
                            if(shapeType == 'schlib') api('updateShape', {"shapeType": shapeType, 
                                                                          "jsonCache": 
                                                                          {
                                                                              "gId": gge, 
                                                                              "annotation": {[PrefObjgId]:{'string': PrefW}}, 
                                                                              "head": {'bind_pcb_id': bindId}
                                                                          }});
                
                            if(shapeType == 'FOOTPRINT') {api('updateShape', {"shapeType": shapeType, 
                                                                             "jsonCache": 
                                                                             {
                                                                                 "gId": gge, 
                                                                                 "TEXT": {[PrefObjgId]: {'text': PrefW,'pathStr':""}}, 
                                                                                 "head": {'bind_sch_id': bindId}}});    }
                /**/
            }

            N++;
        }

        if (info) alert(info);
    }

    ms.MagnitEndNodes = MagnitEndNodes;
    function MagnitEndNodes(json,ShapesCoor,Nodes)
    {
        for (var i = 0;i < ShapesCoor.length;i++)
        {
            var Shape = ShapesCoor[i].PlateObj;
            for (var gId in json.TRACK)
            {
                if (!ms.Has(json.TRACK,gId)) continue;
                var Track = json.TRACK[gId];
                for (var k = 0;k < Track.pointArr.length;k++)
                {
                    var Node = Track.pointArr[k];
                    if (Shape.type == 'PAD')
                    {
                        var ms = Math.min(Shape.width,Shape.height);
                        if (Shape.shape == 'RECT')
                            if (Node.x <= Shape.x + ms && Node.x >= Shape.x - ms && Node.y <= Shape.y + ms && Node.y >= Shape.y - ms)
                            {; Node.x = Shape.x; Node.y = Shape.y;}
                    }
                }
            }
        }
    }

    ms.SortAndReplaceJsonId = SortAndReplaceJsonId;
    function SortAndReplaceJsonId(json)
    {

        var src = []
        var dest = []
        var i = 0;
        for (var index = 0;index < json.itemOrder.length;index++)
        {
            var obj = ms.GetLibInfo(json,json.itemOrder[index]);
            if (obj.pref)
            {
                //console.log(json.itemOrder[index]+  ' '+ index+ ': '+ obj.gge +' ' + obj.pref  ) 
                src[i] = dest[i++] = obj.gge;
            }
        };

        dest.sort((a,b) => a > b ? 1 : a < b ? -1 : 0);

        //for(var index=0;index<src.length;index++)
        //console.log(src[index]+':'+dest[index]) 

        //console.log(JSON.stringify(src))


        var d = JSON.stringify(json);
        var s = d;
        //console.log(d)
        for (var i = 0;i < src.length;i++) d = d.replace(RegExp(`"${src[i]}"`,'g'),`"z${dest[i]}z"`);
        for (var i = 0;i < src.length;i++) d = d.replace(RegExp(`"z${dest[i]}z"`,'g'),`"${dest[i]}"`);

        //console.log(d)
        //console.log(JSON.stringify(dest))

        //alert(a==d)

        //console.log('json',json)

        var json2 = JSON.parse(d)
        return json2;


    }







    ms.DeleteByAttrFromArray = DeleteByAttrFromArray;
    function DeleteByAttrFromArray(arr,attr,value)
    {
        var i = arr.length;
        while (i--) if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) arr.splice(i,1);
        return arr;
    }



    ms.FirstKey = FirstKey;
    function FirstKey(obj) {for (var k in obj) return k}

    /*
    function ReConnectTracksToTracks(json)
    {
        
    
        for(var i= 0; i < UnionTracks.length; i++)
        {
            var UnionTrack= UnionTracks[i];
            ms.RenameUnionTrackNet(json,UnionTrack, UnionTrack[ms.FirstKey(UnionTrack)].net)
        }
    }
    */





    ms.ReConnect = ReConnect;
    function ReConnect(json)
    {/*
   if(!ms.Has(json, 'FOOTPRINT') || !ms.Has(json, 'TRACK') || !ms.Has(json, 'SIGNALS')) return;

   ms.GetShapeCoor(json); 
ms.ShowTime('GetShapeCoor');
   ms.ReConnectTracksToTracks(json);
ms.ShowTime('ReConnectTracksToTracks');
   ms.ReConnectTracksToPlates(json,ShapesCoor,UnionTracks);
ms.ShowTime('ReConnectTracksToPlates');
   //ms.TestSignals(json);
*/
    }











    /*
    ms.TestSignals=TestSignals;
    function TestSignals(json)
    {    
        var Signals= json['SIGNALS'];
        for(var name in Signals)
        {
    
            if(!ms.Has(Signals, name)) continue;
    
            for(var i=0;i<Signals[name].length;i++)
            {  //if(!ms.Has(Signals,name))continue;
               var SigNode=Signals[name][i];	
               if(SigNode.cmd=='TRACK')
               {
                 SigErrCoor.push({ 'net':name , 
                                'fid':SigNode.fid,
                                'cmd':SigNode.cmd,
                                'gId':SigNode.gId,
                                'SignalObj': Signals[name] });
    
                 continue; 
                }
                APIGetShape++;
               var Lib=api('getShape', {id: SigNode.fid});;//[SigNode.cmd][SigNode.gId];
               var Shape=ms.Has(Lib,SigNode.cmd)?Lib[SigNode.cmd][SigNode.gId] : null;
             if(Shape)SignalCoor.push({ 'net':name , 
                                        'fid':SigNode.fid,
                                        'cmd':SigNode.cmd,
                                        'gId':SigNode.gId,
                                        'x':Shape.x, 'y':Shape.y,
                                        'SignalObj': Signals[name],
                                        'ShapeObj': Shape });
             else SigErrCoor.push({ 'net':name , 
                                 'fid':SigNode.fid,
                                 'cmd':SigNode.cmd,
                                 'gId':SigNode.gId,
                                 'SignalObj': Signals[name] });
    
            }
        }
       // SignalCoor.sort(PlateCompare);
    
    console.log('SignalCoor',SignalCoor); 
    console.log('SigErrCoor',SigErrCoor); 
    }
    */


    ms.GetPrefP = GetPrefP;
    function GetPrefP(PrefW) {var matcha = regex.exec(PrefW); if (matcha && matcha.length > 2) return matcha[1];}

    ms.GetPrefN = GetPrefN;
    function GetPrefN(PrefW) {var matcha = regex.exec(PrefW); if (matcha && matcha.length > 2) return parseInt(matcha[2]);}

    ms.GetSchPrefObj = GetSchPrefObj;
    function GetSchPrefObj(obj) {return Object.values(objFilter(obj.annotation,(item) => item.mark == "P"))[0];}

    ms.GetPcbPrefObj = GetPcbPrefObj;
    function GetPcbPrefObj(obj) {return Object.values(objFilter(obj.TEXT,(item) => item.type == "P"))[0];}


    ms.GetPcbPrefW = GetPcbPrefW;
    function GetPcbPrefW(obj) {return obj.text;}

    ms.GetSchPrefW = GetSchPrefW;
    function GetSchPrefW(obj) {return obj.string;}

    ms.SetPcbPrefW = SetPcbPrefW;
    function SetPcbPrefW(obj,value) {obj.text = value; obj.pathStr = "";}

    ms.SetSchPrefW = SetSchPrefW;
    function SetSchPrefW(obj,value) {obj.string = value;}

    ms.GetPcbBindId = GetPcbBindId;
    function GetPcbBindId(obj) {return obj.head.bind_sch_id;}

    ms.GetSchBindId = GetSchBindId;
    function GetSchBindId(obj) {return obj.head.bind_pcb_id;}

    ms.SetPcbBindId = SetPcbBindId;
    function SetPcbBindId(obj,value) {obj.head.bind_sch_id = value;}

    ms.SetSchBindId = SetSchBindId;
    function SetSchBindId(obj,value) {obj.head.bind_pcb_id = value;}

    ms.GetLibInfo = GetLibInfo;
    function GetLibInfo(json,gge)
    {

        var obj = new Object();
        obj.gge = gge;

        if (ms.Has(json,'schlib'))   
        {
            var type = 'schlib';
            var GetPrefObj = ms.GetSchPrefObj;
            var GetPrefW = ms.GetSchPrefW;
            var SetPrefW = ms.SetSchPrefW;
            var GetBindId = ms.GetSchBindId;
            var SetBindId = ms.SetSchBindId;
        }
        if (ms.Has(json,'FOOTPRINT'))
        {
            var type = 'FOOTPRINT';
            var GetPrefObj = ms.GetPcbPrefObj;
            var GetPrefW = ms.GetPcbPrefW;
            var SetPrefW = ms.SetPcbPrefW;
            var GetBindId = ms.GetPcbBindId;
            var SetBindId = ms.SetPcbBindId;
        }

        if (ms.Has(json,type) && ms.Has(json[type],gge))
        {
            var arr = json[type];
            //if(SelectedId && SelectedId.length && SelectedId[0]!="" && !ms.Has(SelectedId, gge)) continue;
            obj.type = type;
            obj.LibObj = arr[gge];
            // obj.json   = json;
            Object.defineProperty(obj,"PrefObj",{get: function() {return GetPrefObj(obj.LibObj);}});

            Object.defineProperty(obj,"BindId",
                {
                    get: function() {return GetBindId(this.LibObj);},
                    set: function(value) {SetBindId(this.LibObj,value);}
                });

            Object.defineProperty(obj,"PrefW",
                {
                    get: function() {return GetPrefW(this.PrefObj);},
                    set: function(value) {SetPrefW(this.PrefObj,value);}
                });
            Object.defineProperty(obj,"PrefP",{get: function() {return ms.GetPrefP(this.PrefW);}});
            Object.defineProperty(obj,"PrefN",{get: function() {return ms.GetPrefN(this.PrefW);}});
        }




        obj.pref = obj.PrefW;

        return obj;
    }





    /////////////////////////////////////////

    ms.ShowJson2 = ShowJson2;
    function ShowJson2(ind,param)
    {
        //console.log(Object.getOwnPropertyNames(param));
        var str = "";

        for (var name1 in param)
        {
            if (param.hasOwnProperty(name1))
            {
                str += ind + name1 + "=" + param[name1] + "\n";

                var fp = param[name1];

                //console.log(name1 + "=" + fp + " (" + typeof fp + ")\n");
                //if(fp!=null)console.log(Object.getOwnPropertyNames(fp));
                //console.log("");

                if (fp != null && Object.keys(fp).length > 0 && typeof fp == 'object') str += ms.ShowJson2(ind + "  ",fp);
            }
        }
        return str;
    }
    /**/



    ms.Compare = Compare;
    function Compare(obja,objb)
    {

        if ((obja.PrefP == undefined ? "_" : obja.PrefP) < (objb.PrefP == undefined ? "_" : objb.PrefP)) return -1;
        else if ((obja.PrefP == undefined ? "_" : obja.PrefP) > (objb.PrefP == undefined ? "_" : objb.PrefP)) return 1;
        else
        {
            if (obja.PrefN < objb.PrefN) return -1;
            else if (obja.PrefN > objb.PrefN) return 1;
            else return 0;
        }
    }

    ms.CompareInv = CompareInv;
    function CompareInv(obja,objb)
    {

        if ((obja.PrefP == undefined ? "_" : obja.PrefP) < (objb.PrefP == undefined ? "_" : objb.PrefP)) return 1;
        else if ((obja.PrefP == undefined ? "_" : obja.PrefP) > (objb.PrefP == undefined ? "_" : objb.PrefP)) return -1;
        else
        {
            if (obja.PrefN < objb.PrefN) return 1;
            else if (obja.PrefN > objb.PrefN) return -1;
            else return 0;
        }
    }


    ms.SchCompare = SchCompare;
    function SchCompare(a,b)
    {
        var obja = ms.GetPref2(ms.MySchJson,a,"schlib","annotation","mark","string");
        var objb = ms.GetPref2(ms.MySchJson,b,"schlib","annotation","mark","string");
        return ms.Compare(obja,objb);
    }

    ms.SchCompareInv = SchCompareInv;
    function SchCompareInv(a,b)
    {
        var obja = ms.GetPref2(ms.MySchJson,a,"schlib","annotation","mark","string");
        var objb = ms.GetPref2(ms.MySchJson,b,"schlib","annotation","mark","string");
        return ms.CompareInv(obja,objb);
    }



    ms.PcbCompare = PcbCompare;
    function PcbCompare(a,b)
    {
        var obja = ms.GetPref2(ms.MyPcbJson,a,"FOOTPRINT","TEXT","type","text");
        var objb = ms.GetPref2(ms.MyPcbJson,b,"FOOTPRINT","TEXT","type","text");
        return ms.Compare(obja,objb);
    }

    ms.PcbCompareInv = PcbCompareInv;
    function PcbCompareInv(a,b)
    {
        var obja = ms.GetPref2(ms.MyPcbJson,a,"FOOTPRINT","TEXT","type","text");
        var objb = ms.GetPref2(ms.MyPcbJson,b,"FOOTPRINT","TEXT","type","text");
        return ms.CompareInv(obja,objb);
    }




    ms.GetPref2 = GetPref2;
    function GetPref2(json,gge,lib,desc,type,pref)
    {
        var obj = new Object();
        obj.gge = gge;
        if (json[lib].hasOwnProperty(gge))
        {
            var arr = json[lib][gge][desc];
            for (var item in arr)
                if (arr[item][type] == "P") 
                {
                    obj.PrefW = arr[item][pref];
                    var matcha = regex.exec(obj.PrefW);

                    if (matcha && matcha.length > 2)
                    {
                        obj.PrefP = matcha[1];
                        obj.PrefN = parseInt(matcha[2]);
                    }

                }
        }
        return obj;
    }

    ms.GetPref = GetPref;
    function GetPref(json,gge)
    {
        if (json.hasOwnProperty("FOOTPRINT")) return ms.GetPref2(json,gge,"FOOTPRINT","TEXT","type","text");
        if (json.hasOwnProperty("schlib")) return ms.GetPref2(json,gge,"schlib","annotation","mark","string");
    }




    ms.SortObj = SortObj;
    function SortObj(object)
    {
        var newObject = {}
        Object.keys(object).sort().forEach(function(name) {newObject[name] = object[name]})
        return newObject
    }

    ms.SortJson = SortJson;
    function SortJson(param)
    {

        param = ms.SortObj(param);

        for (var name1 in param)
        {
            if (param.hasOwnProperty(name1))
            {
                var fp = param[name1];
                if (fp != null && Object.keys(fp).length > 0 && typeof fp == 'object' && [fp] != 'itemOrder') 
                {
                    fp = ms.SortObj(fp);
                    ms.SortJson(fp);
                }
            }
        }
        return str;
    }



    ms.objFilter = objFilter;
    function objFilter(obj,filter,nonstrict)
    {
        r = {}
        if (!filter) return {}
        if (typeof filter == 'string') return {[filter]: obj[filter]}
        for (var p in obj)
        {
            if (typeof filter == 'object' && nonstrict && obj[p] == filter[p]) r[p] = obj[p]
            else if (typeof filter == 'object' && !nonstrict && obj[p] === filter[p]) r[p] = obj[p]
            else if (typeof filter == 'function') {if (filter(obj[p],p,obj)) r[p] = obj[p]}
            else if (filter.length && filter.includes(p)) r[p] = obj[p]
        }
        return r
    }
    //Example/////////////////////////////////////////////
    /*
    obj = {a:1, b:2, c:3}
    objFilter(obj, 'a') // returns: {a: 1}
    objFilter(obj, ['a','b']) // returns: {a: 1, b: 2}
    objFilter(obj, {a:1}) // returns: {a: 1}
    objFilter(obj, {'a':'1'}, true) // returns: {a: 1}
    console.log(objFilter(obj, (v) => v%2===1)) // returns: {a: 1, c: 3}
    /**/


    ms.Unique = Unique;
    function Unique(arr)
    {
        var obj = {};

        for (var i = 0;i < arr.length;i++)
        {
            var str = arr[i];
            obj[str] = true;
        }

        return Object.keys(obj);
    }

    ms.Map = Map;
    function Map(obj,func) 
    {
        if (typeof obj == 'object')
        {
            if (Array.isArray(obj)) return obj.map(func);
            else return Object.keys(obj).map(func);
        }
    }


    ms.ShowTimeBegin = ShowTimeBegin;
    function ShowTimeBegin() {window.ShowTimer = new Date().getTime();}

    ms.ShowTime = ShowTime;
    function ShowTime(text)
    {
        newtime = new Date().getTime();
        console.log(`TIME: ${text}(): ${newtime - window.ShowTimer}ms`);
        window.ShowTimer = newtime;
    }



    ms.GetScriptNames = GetScriptNames;
    function GetScriptNames()
    {
      var e1 =
        [
          {exportAPI: "scripts", storeName: "scripts"},
          {exportAPI: "files", storeName: "files"},
          {exportAPI: "openedDocsTable",storeName: "openedDocsTable",singleKey: "cacheDocs"},
          {exportAPI: "autoSaveTable", storeName: "autoSaveTable", indexKeys: ["pid", "fid", {indexName: "pid_fid", keyPath: ["pid", "fid"]}]},
          {exportAPI: "fonts", storeName: "fonts"},
          {exportAPI: "copperArea", storeName: "copperArea"}
        ];



        var treeScripts = $("#treeScripts")[0];

        var _Cache = $(treeScripts.children[1]).find("div.tree-node")
            .map(function(x) 
            {
                var treeNode = $.cache[this[$.expando]].data.treeNode;
                if (treeNode.attributes.hasOwnProperty('id')) return treeNode;
            });

        //var id=Object.values(_Cache.filter((i, item)=>item.text==ScriptName))[0].attributes.id;
        var scriptsNames = _Cache.map((i,item) => item.text);
        //console.dir(scriptsNames)
        return scriptsNames;
    }


    ms.ExecScriptByName = ExecScriptByName;
    function ExecScriptByName(ScriptName)
    {
        var e1 = [{exportAPI: "scripts",storeName: "scripts"},{exportAPI: "files",storeName: "files"},
        {exportAPI: "openedDocsTable",storeName: "openedDocsTable",singleKey: "cacheDocs"},
        {
            exportAPI: "autoSaveTable",storeName: "autoSaveTable",indexKeys: ["pid","fid",
                {indexName: "pid_fid",keyPath: ["pid","fid"]}]
        },{exportAPI: "fonts",storeName: "fonts"},
        {exportAPI: "copperArea",storeName: "copperArea"}];


        //debugger;
        var treeScripts = $("#treeScripts")[0];

        var _Cache = $(treeScripts.children[1]).find("div.tree-node")
            .map(function(x) 
            {
                var treeNode = $.cache[this[$.expando]].data.treeNode;
                if (treeNode.attributes.hasOwnProperty('id')) return treeNode;
            });

        //var id=Object.values(_Cache.filter((i, item)=>item.text==ScriptName))[0].attributes.id;
        var id = _Cache.filter((i,item) => item.text == ScriptName)[0].attributes.id;


        simpleDB("DBEasyEDA",9,e1).scripts.get(id,ExecScriptFunc,Er)

        function Er() {$.messager.error("Failed to load script")};

        function ExecScriptFunc(e)
        {
            //      if(!e.match(/ [^\s] /)) return !0;
            var a = "__userjs_" + (1e6 * Math.random() | 0) + "__",r = "function " + a + "(api,$,Locale){try{\n\n" + e + "\n\n}catch(err" + a + "){\n$.messager.error(err" + a + ");\ndebugger;\n}}";
            setTimeout(
                function()
                {
                    try
                    {
                        (0,eval)(r); this[a](api,$,Locale);
                        // delete this[a];
                    } catch (e) {$.messager.error(e + ""); return !1}
                },0);
            return !0
        }

    }


    ms.ScriptWindowReSize = ScriptWindowReSize;
    function ScriptWindowReSize()
    {
        //debugger;
        var PanelWindow = document.getElementById('dlgInstallScript').parentElement;
        PanelWindow.style.width = '950px'

        var PanelHeader = PanelWindow.getElementsByClassName('panel-header panel-header-noborder window-header')[0];
        PanelHeader.style.width = '100%'
        //   PanelHeader.style.right=null



        var PanelTool = PanelHeader.getElementsByClassName('panel-tool')[0];
        PanelTool.style.right = '830px';


        //PanelTool.style.left='40px';
        //PanelTool.style.width=null;
        //PanelTool.style.resize='both';
        /**/


        var dlgInstallScript = document.getElementById('dlgInstallScript');
        dlgInstallScript.style.width = '100%'
        dlgInstallScript.style.height = '650px'

        var Panel = dlgInstallScript.getElementsByClassName('panel')[0];
        Panel.style.width = '100%'
        Panel.style.height = '600px'


        var DialogContent = Panel.getElementsByClassName('dialog-content panel-body panel-body-noheader panel-body-noborder')[0];
        DialogContent.style.width = '100%'
        DialogContent.style.height = '100%'

        var textarea = DialogContent.getElementsByTagName('textarea')[0];
        textarea.style.width = '98%'
        textarea.style.height = "565px";

        // textarea.style['overflow-x']="auto";
        //textarea.style.['white-space']="nowrap";

        var DialogButton = dlgInstallScript.getElementsByClassName('dialog-button')[0];
        DialogButton.style["text-align"] = "left"


    }



    ms.copyTextToClipboard = copyTextToClipboard;
    function copyTextToClipboard(text) 
    {
        var textArea = document.createElement("textarea");

        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try
        {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err)
        {
            console.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
    }


    ms.Has = Has;
    function Has(o,p)
    {
        if (typeof o == 'object' && o.hasOwnProperty(p)) return 1
        if (Array.isArray(o) && o.includes(p)) return 1
        return 0;
    }

    ms.download = download;
    function download(content,fileName,contentType = 'text/plain') 
    {
        // if (!contentType) contentType = 'text/plain';



        var a = document.createElement("a");
        var file = new Blob([content],{type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }



    ms.getActiveTab = getActiveTab;
    function getActiveTab()
    {
        return $("#sub-tabbar > div:visible .tabbar-tab.active").attr("uuid") || $("#tabbar .tabbar-tab.single-tab.active").attr("tabid") || ""
    }

    ms.getTabIFrame = getTabIFrame;
    function getTabIFrame(ActiveTab) {return ActiveTab ? document.getElementById("frame_" + ActiveTab) : null;}



}


