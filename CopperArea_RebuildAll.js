var TabIFrame=window.MyScripts.getTabIFrame(window.MyScripts.getActiveTab());
var a = TabIFrame.contentWindow;

a.callCommand.hooks["rebuildAllCopperArea"]();