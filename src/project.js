window.__require=function t(e,o,i){function n(c,a){if(!o[c]){if(!e[c]){var r=c.split("/");if(r=r[r.length-1],!e[r]){var l="function"==typeof __require&&__require;if(!a&&l)return l(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+c+"'")}c=r}var h=o[c]={exports:{}};e[c][0].call(h.exports,function(t){return n(e[c][1][t]||t)},h,h.exports,t,e,o,i)}return o[c].exports}for(var s="function"==typeof __require&&__require,c=0;c<i.length;c++)n(i[c]);return n}({block:[function(t,e,o){"use strict";cc._RF.push(e,"b76f7nw8qZPZqM6yimTrRC3","block"),cc.Class({extends:cc.Component,properties:{colorAtlas:cc.SpriteAtlas},onLoad:function(){this.node.on("touchstart",this.onTouchStart,this),this.node.on("touchmove",this.onTouchMove,this),this.node.on("touchend",this.onTouchEnd,this)},onDestroy:function(){this.node.off("touchstart",this.onTouchStart,this),this.node.off("touchmove",this.onTouchMove,this),this.node.off("touchend",this.onTouchEnd,this)},onTouchStart:function(t){this.canMove=!0,this.startPos=this.node.position;var e=window.game.blockNodeArr[this.node.baseIndex];this.node.blockIndex!=e[e.length-1].blockIndex&&(this.canMove=!1)},onTouchMove:function(t){if(this.canMove&&!(window.gameUI.timeVal<=0)){var e=t.getDelta();this.node.x+=e.x,this.node.y+=e.y}},onTouchEnd:function(t){this.canMove&&(window.game.placeBlock(this.node)||(this.node.position=this.startPos))},start:function(){},init:function(t){this.node.getComponent(cc.Sprite).spriteFrame=this.colorAtlas.getSpriteFrame(t),this.node.width=80+40*t},update:function(t){}}),cc._RF.pop()},{}],game:[function(t,e,o){"use strict";cc._RF.push(e,"d85c3iqP99AAYtHTPuvwhE9","game"),cc.Class({extends:cc.Component,properties:{blockLayerNode:cc.Node,blockPrefab:cc.Prefab,baseNodeArr:[cc.Node]},onLoad_init:function(){this.blockNodeArr=[[],[],[]],this.blockNum=3,this.initBlock(this.blockNum)},onLoad:function(){window.game=this,this.onLoad_init()},start_init:function(){this.isPlaying=!0,cc.log("isPlaying: "+this.isPlaying),window.gameUI.countdown()},start:function(){this.start_init()},initBlock:function(t){t>=6&&(t=6);for(var e=0;e<this.blockNodeArr.length;e++)for(var o=this.blockNodeArr[e],i=0;i<o.length;i++)o[i].destroy();this.blockNodeArr=[[],[],[]];for(var n=0;n<t;n++){var s=cc.instantiate(this.blockPrefab);this.blockLayerNode.addChild(s),s.x=this.baseNodeArr[0].x,s.y=44*n-122,s.baseIndex=0;var c=t-n-1;s.blockIndex=c,s.getComponent("block").init(c),this.blockNodeArr[0].push(s)}},baseIndexCheck:function(t){for(var e=0;e<this.baseNodeArr.length;e++){var o=this.baseNodeArr[e];if(t.x>=o.x-o.width/2&&t.x<=o.x+o.width/2)return e}return-1},placeBlock:function(t){var e=this.baseIndexCheck(t.position);if(-1===e)return!1;if(t.baseIndex===e)return!1;var o=this.blockNodeArr[e];if(o.length&&o[o.length-1].blockIndex<=t.blockIndex)return!1;var i=this.baseNodeArr[e];t.x=i.x,this.blockNodeArr[t.baseIndex].pop(),this.blockNodeArr[e].push(t),t.baseIndex=e;var n=this.blockNodeArr[e].length;return t.y=44*(n-1)-122,window.gameUI.countVal++,window.gameUI.countLabel.string=window.gameUI.countVal,this.blockNodeArr[2].length===this.blockNum&&(this.isPlaying=!1,console.log("\u904e\u95dc\u4e86"),this.unscheduleAllCallbacks(),window.gameUI.levelVal<3?(window.gameUI.messageLabel.string="\u606d\u559c\u904e\u95dc!!! Y^^Y",window.gameUI.messageLabel.node.active=!0,this.scheduleOnce(function(){this.isPlaying=!0,this.initBlock(++this.blockNum),window.gameUI.messageLabel.node.active=!1,window.gameUI.levelVal++,window.gameUI.onLoad_init(),window.gameUI.countdown()}.bind(this),2)):(window.gameUI.messageLabel.string="\u606d\u559c\u5168\u7834\u4e86!!! Y^^Y",window.gameUI.messageLabel.node.active=!0,window.gameUI.restartBtn.node.active=!0)),!0},removeAllblock:function(){for(var t=this.blockLayerNode.children,e=t.length-1;e>=0;e--){var o=t[e].getComponent("block");cc.log(o),o&&(o.node.destroy(),this.node.removeChild(o))}},update:function(t){}}),cc._RF.pop()},{}],ui:[function(t,e,o){"use strict";cc._RF.push(e,"837f2OnUyJNbIdsvLKM9Nd2","ui"),cc.Class({extends:cc.Component,properties:{timeLabel:cc.Label,levelLabel:cc.Label,messageLabel:cc.Label,countLabel:cc.Label,restartBtn:cc.Button},onLoad:function(){window.gameUI=this,this.levelVal=1,this.countVal=0,this.onLoad_init()},onLoad_init:function(){this.timeVal=45+15*this.levelVal,this.timeLabel.string=this.timeVal,this.levelLabel.string=this.levelVal,this.messageLabel.node.active=!1,this.unscheduleAllCallbacks(),this.restartBtn.node.active=!1},countdown:function(){if(this.timeVal--,this.timeVal<0)return this.unscheduleAllCallbacks(),this.messageLabel.node.active=!0,this.messageLabel.string="\u6642\u9593\u7d50\u675f\uff0c\u6311\u6230\u5931\u6557QQ",void(this.restartBtn.node.active=!0);this.timeLabel.string=this.timeVal.toString(),window.game.isPlaying&&this.scheduleOnce(this.countdown.bind(this),1)},onClick_restartBtn:function(){window.game.removeAllblock(),this.levelVal=1,this.countVal=0,this.onLoad_init(),window.game.onLoad_init(),window.game.start_init()},start:function(){},update:function(t){}}),cc._RF.pop()},{}]},{},["block","game","ui"]);