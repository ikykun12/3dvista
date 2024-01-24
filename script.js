(function(){
    var script = {
 "scrollBarMargin": 2,
 "layout": "absolute",
 "id": "rootPlayer",
 "children": [
  "this.MainViewer",
  "this.Container_22DA83A9_2F7E_6D30_41C1_3DB5D4AE7D4E",
  "this.Container_21309561_2F8A_F533_41C3_15ED6239210B",
  "this.IconButton_21302561_2F8A_F533_4183_C6B1B32FE7CA"
 ],
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_2130E561_2F8A_F533_4183_D536CAFB3BFD], 'gyroscopeAvailable'); if(!this.get('fullscreenAvailable')) { [this.IconButton_2130D561_2F8A_F533_41BB_BE86667AEB92].forEach(function(component) { component.set('visible', false); }) }",
 "width": "100%",
 "paddingRight": 0,
 "scripts": {
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "existsKey": function(key){  return key in window; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "unregisterKey": function(key){  delete window[key]; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "registerKey": function(key, value){  window[key] = value; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getKey": function(key){  return window[key]; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } }
 },
 "scrollBarWidth": 10,
 "minHeight": 20,
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.IconButton_2130D561_2F8A_F533_41BB_BE86667AEB92",
 "downloadEnabled": false,
 "verticalAlign": "top",
 "paddingLeft": 0,
 "minWidth": 20,
 "height": "100%",
 "contentOpaque": false,
 "class": "Player",
 "buttonToggleMute": "this.IconButton_2130F561_2F8A_F533_4187_ABA0B2B586FB",
 "borderRadius": 0,
 "borderSize": 0,
 "definitions": [{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE"
  }
 ],
 "label": "Ruang Pamer Museum",
 "id": "panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3C032B18_2C30_05C0_41BB_218223EB3E02",
  "this.overlay_20ACE814_2D23_3C2A_41C4_8D0E9E73783A"
 ],
 "vfov": 80,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E"
  }
 ],
 "label": "15",
 "id": "panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_34BFD786_2C50_0CC0_41C5_4C494B1665C4"
 ],
 "vfov": 80,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594"
  }
 ],
 "label": "47",
 "id": "panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3B850000_2C50_03C0_41BD_6FFFCDD16C80"
 ],
 "vfov": 80,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302"
  }
 ],
 "label": "32",
 "id": "panorama_3E3FD873_2C70_0440_4183_6CAB690645BC",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3F95A3E3_2C70_0440_419B_7A23FE690227"
 ],
 "vfov": 80,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_3E3FD873_2C70_0440_4183_6CAB690645BC_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FD873_2C70_0440_4183_6CAB690645BC_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3E3FD873_2C70_0440_4183_6CAB690645BC_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3E3FD873_2C70_0440_4183_6CAB690645BC_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3E3FD873_2C70_0440_4183_6CAB690645BC_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3E3FD873_2C70_0440_4183_6CAB690645BC_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3E3FD873_2C70_0440_4183_6CAB690645BC_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "maximumAngle": 43.25,
 "loop": true,
 "yaw": -0.79,
 "audio": "this.audioresource_3E043561_2D67_34EA_418A_CA92C61DC08C",
 "autoplay": true,
 "pitch": -16.44,
 "id": "audio_3E042561_2D67_34EA_41B9_1FBE03248EE4",
 "data": {
  "label": "Audio1"
 },
 "class": "DirectionalPanoramaAudio"
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_38452F45_2C70_1C40_41BA_31855ACF10D6"
  }
 ],
 "label": "Ruangan Perpustakaan Museum",
 "id": "panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_234F73D2_2D26_EC2E_41AE_0148325DE8C4",
  "this.overlay_3F2005AE_2C70_0CC0_41B3_218FE3A16C4B"
 ],
 "vfov": 79.95,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A"
  }
 ],
 "label": "2",
 "id": "panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3DE48D3C_2CD0_7DC0_41C4_CDF460EE4605"
 ],
 "vfov": 80.03,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B_0/f/0/{row}_{column}.jpg",
      "rowCount": 12,
      "tags": "ondemand",
      "height": 6144,
      "width": 6144,
      "colCount": 12,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B_0/f/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "manualZoomSpeed": 0,
 "id": "panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48"
  }
 ],
 "label": "40",
 "id": "panorama_38452F45_2C70_1C40_41BA_31855ACF10D6",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_38CA5607_2C70_0FC0_41C5_3A5FAE926CB4"
 ],
 "vfov": 79.95,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_38452F45_2C70_1C40_41BA_31855ACF10D6_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38452F45_2C70_1C40_41BA_31855ACF10D6_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38452F45_2C70_1C40_41BA_31855ACF10D6_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38452F45_2C70_1C40_41BA_31855ACF10D6_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38452F45_2C70_1C40_41BA_31855ACF10D6_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_38452F45_2C70_1C40_41BA_31855ACF10D6_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4"
  }
 ],
 "label": "43",
 "id": "panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3",
 "hfovMax": 30,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3BFEE187_2C50_04C0_41BF_9E8E7146AB83"
 ],
 "vfov": 80,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD"
  }
 ],
 "label": "Ruang Audio Visual",
 "id": "panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD",
 "hfovMax": 30,
 "class": "Panorama",
 "audios": [
  "this.audio_3E042561_2D67_34EA_41B9_1FBE03248EE4"
 ],
 "pitch": 0,
 "vfov": 80,
 "overlays": [
  "this.overlay_3F9CA291_2C50_04C0_41B2_AA513E13F4A4",
  "this.overlay_23FAF767_2D21_74F7_415C_71CA6602E2BE"
 ],
 "partial": true,
 "thumbnailUrl": "media/panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_t.jpg",
 "frames": [
  {
   "thumbnailUrl": "media/panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfov": 60
},
{
 "hfovMin": "169%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B"
  }
 ],
 "label": "1",
 "id": "panorama_2758614E_2C30_0440_41A8_AC478E9E9265",
 "hfovMax": 104,
 "class": "Panorama",
 "overlays": [
  "this.overlay_233870FD_2C30_0440_41C2_1AB962C77C23",
  "this.overlay_381EAF16_2D66_D429_41C1_5ADA44731FDC"
 ],
 "vfov": 80.03,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_2758614E_2C30_0440_41A8_AC478E9E9265_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2758614E_2C30_0440_41A8_AC478E9E9265_0/f/0/{row}_{column}.jpg",
      "rowCount": 12,
      "tags": "ondemand",
      "height": 6144,
      "width": 6144,
      "colCount": 12,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2758614E_2C30_0440_41A8_AC478E9E9265_0/f/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2758614E_2C30_0440_41A8_AC478E9E9265_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2758614E_2C30_0440_41A8_AC478E9E9265_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2758614E_2C30_0440_41A8_AC478E9E9265_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_2758614E_2C30_0440_41A8_AC478E9E9265_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "hfovMin": "150%",
 "vfov": 79.95,
 "overlays": [
  "this.overlay_2344CCC1_2D22_F42B_41C4_210809649F67"
 ],
 "label": "Ruang Administrasi Museum",
 "id": "panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48",
 "thumbnailUrl": "media/panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48_t.jpg"
  }
 ],
 "partial": true,
 "pitch": 0,
 "hfovMax": 60,
 "hfov": 60,
 "class": "Panorama"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D"
  }
 ],
 "label": "44",
 "id": "panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3A0CEA34_2C50_07C0_41A3_31AD7BA8D733"
 ],
 "vfov": 80,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_382CA8F4_2C70_0440_41AC_561F653396EE"
  }
 ],
 "label": "24",
 "id": "panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3E3380BD_2C70_04C0_41AF_189E3D95384D",
  "this.overlay_38B078AC_2C70_04C0_41BF_50751C875B44",
  "this.overlay_23433E29_2D2F_547A_41C4_DBFF876134F3"
 ],
 "vfov": 80.03,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_0/f/0/{row}_{column}.jpg",
      "rowCount": 12,
      "tags": "ondemand",
      "height": 6144,
      "width": 6144,
      "colCount": 12,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_0/f/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "items": [
  {
   "media": "this.panorama_2758614E_2C30_0440_41A8_AC478E9E9265",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2758614E_2C30_0440_41A8_AC478E9E9265_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3E35B665_2C50_0C40_41BD_A0678485E337",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3E35B665_2C50_0C40_41BD_A0678485E337_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3E3FD873_2C70_0440_4183_6CAB690645BC",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3E3FD873_2C70_0440_4183_6CAB690645BC_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_382CA8F4_2C70_0440_41AC_561F653396EE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_382CA8F4_2C70_0440_41AC_561F653396EE_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_38452F45_2C70_1C40_41BA_31855ACF10D6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_38452F45_2C70_1C40_41BA_31855ACF10D6_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E3FD873_2C70_0440_4183_6CAB690645BC_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -3.61,
  "class": "PanoramaCameraPosition",
  "pitch": 5.98
 },
 "id": "panorama_2758614E_2C30_0440_41A8_AC478E9E9265_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD"
  }
 ],
 "label": "38",
 "id": "panorama_382CA8F4_2C70_0440_41AC_561F653396EE",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_39D4CD17_2C70_7DC0_41B4_AD28072605D8"
 ],
 "vfov": 80.03,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_382CA8F4_2C70_0440_41AC_561F653396EE_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_382CA8F4_2C70_0440_41AC_561F653396EE_0/f/0/{row}_{column}.jpg",
      "rowCount": 12,
      "tags": "ondemand",
      "height": 6144,
      "width": 6144,
      "colCount": 12,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_382CA8F4_2C70_0440_41AC_561F653396EE_0/f/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_382CA8F4_2C70_0440_41AC_561F653396EE_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_382CA8F4_2C70_0440_41AC_561F653396EE_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_382CA8F4_2C70_0440_41AC_561F653396EE_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_382CA8F4_2C70_0440_41AC_561F653396EE_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_38452F45_2C70_1C40_41BA_31855ACF10D6_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "gyroscopeVerticalDraggingEnabled": true,
 "touchControlMode": "drag_rotation",
 "buttonCardboardView": [
  "this.IconButton_22DAB3A9_2F7E_6D30_41C7_621A48D0B0AA",
  "this.IconButton_21301561_2F8A_F533_41C3_C78625B1A031"
 ],
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_2130E561_2F8A_F533_4183_D536CAFB3BFD",
 "buttonToggleHotspots": "this.IconButton_2130C561_2F8A_F533_41B9_7DB7375223B6"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E35B665_2C50_0C40_41BD_A0678485E337_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD"
  }
 ],
 "label": "45",
 "id": "panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3B010190_2C50_04C0_41BA_4109BE6D19D3"
 ],
 "vfov": 80,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F"
  }
 ],
 "label": "46",
 "id": "panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_34836BE8_2C50_044F_41C5_164669C84E90"
 ],
 "vfov": 80,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD"
  }
 ],
 "label": "8",
 "id": "panorama_3E35B665_2C50_0C40_41BD_A0678485E337",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3E975CBF_2C50_7CC0_41A5_22D4CACB3482"
 ],
 "vfov": 80,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_3E35B665_2C50_0C40_41BD_A0678485E337_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E35B665_2C50_0C40_41BD_A0678485E337_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3E35B665_2C50_0C40_41BD_A0678485E337_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3E35B665_2C50_0C40_41BD_A0678485E337_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3E35B665_2C50_0C40_41BD_A0678485E337_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3E35B665_2C50_0C40_41BD_A0678485E337_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3E35B665_2C50_0C40_41BD_A0678485E337_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3"
  }
 ],
 "label": "42",
 "id": "panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_39AF6E0D_2C51_FFC0_41C2_CC25A497B28D"
 ],
 "vfov": 80,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302"
  }
 ],
 "label": "48",
 "id": "panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3B7A67E2_2C50_0C40_41C1_140CA35290B5"
 ],
 "vfov": 80,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E3FD873_2C70_0440_4183_6CAB690645BC"
  }
 ],
 "label": "5",
 "id": "panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3CD041C3_2CD0_0440_41A9_E535ECB81A73",
  "this.overlay_3E990E33_2C70_FFC0_41B4_818B0BEE5981"
 ],
 "vfov": 21.8,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_382CA8F4_2C70_0440_41AC_561F653396EE_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E"
  }
 ],
 "label": "Ruang Penyimpanan Koleksi Museum",
 "id": "panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3808BCEE_2C70_7C40_41B7_5A0C8C35BB63",
  "this.overlay_383B4753_2C50_0C47_41AF_2B2CFBBDB2D4",
  "this.overlay_239D3E1E_2D23_5456_41BA_CDA2A9278E6F"
 ],
 "vfov": 80,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_0/f/0/{row}_{column}.jpg",
      "rowCount": 10,
      "tags": "ondemand",
      "height": 5120,
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_0/f/1/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E35B665_2C50_0C40_41BD_A0678485E337"
  }
 ],
 "label": "4",
 "id": "panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F",
 "hfovMax": 60,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3FCB4871_2C50_0440_41C3_2C1EF9DFD855",
  "this.overlay_3F71907A_2C50_0440_41AB_95EC5D61F69B"
 ],
 "vfov": 28.05,
 "pitch": 0,
 "partial": true,
 "thumbnailUrl": "media/panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_0/f/0/{row}_{column}.jpg",
      "rowCount": 15,
      "tags": "ondemand",
      "height": 7680,
      "width": 7680,
      "colCount": 15,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_0/f/1/{row}_{column}.jpg",
      "rowCount": 8,
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_0/f/2/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_t.jpg"
  }
 ],
 "hfov": 60
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "id": "MainViewer",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "minHeight": 50,
 "toolTipShadowColor": "#FFFF00",
 "playbackBarBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "minWidth": 100,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Tempus Sans ITC",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "shadow": false,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "transparent",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 10,
 "top": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 9,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 10,
 "borderRadius": 0,
 "class": "ViewerArea",
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#000033",
 "data": {
  "name": "Main Viewer"
 },
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "layout": "absolute",
 "id": "Container_22DA83A9_2F7E_6D30_41C1_3DB5D4AE7D4E",
 "left": "0%",
 "children": [
  "this.Image_22DB23A9_2F7E_6D30_41C5_1687F6B36B8B",
  "this.Container_22DB33A9_2F7E_6D30_4190_46A8CA6EC6DD",
  "this.IconButton_22DAB3A9_2F7E_6D30_41C7_621A48D0B0AA"
 ],
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "verticalAlign": "top",
 "paddingLeft": 0,
 "height": "12.832%",
 "horizontalAlign": "left",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--- MENU"
 },
 "paddingBottom": 0,
 "gap": 10,
 "shadow": false,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "layout": "absolute",
 "id": "Container_21309561_2F8A_F533_41C3_15ED6239210B",
 "width": 115.05,
 "right": "0%",
 "children": [
  "this.Container_21305560_2F8A_F531_41C0_B58DF2A95E40",
  "this.Container_21300561_2F8A_F533_41C4_D4EFB33EDE39"
 ],
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "height": 641,
 "horizontalAlign": "left",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--SETTINGS"
 },
 "paddingBottom": 0,
 "gap": 10,
 "shadow": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_21302561_2F8A_F533_4183_C6B1B32FE7CA",
 "width": 60,
 "right": "0.79%",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_21302561_2F8A_F533_4183_C6B1B32FE7CA_pressed.png",
 "horizontalAlign": "center",
 "minHeight": 1,
 "pressedRollOverIconURL": "skin/IconButton_21302561_2F8A_F533_4183_C6B1B32FE7CA_pressed_rollover.png",
 "paddingLeft": 0,
 "top": "1.09%",
 "iconURL": "skin/IconButton_21302561_2F8A_F533_4183_C6B1B32FE7CA.png",
 "verticalAlign": "middle",
 "height": 60,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "click": "if(!this.Container_21300561_2F8A_F533_41C4_D4EFB33EDE39.get('visible')){ this.setComponentVisibility(this.Container_21300561_2F8A_F533_41C4_D4EFB33EDE39, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_21300561_2F8A_F533_41C4_D4EFB33EDE39, false, 0, null, null, false) }",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "image button menu"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "maxHeight": 58,
 "id": "IconButton_2130D561_2F8A_F533_41BB_BE86667AEB92",
 "width": 58,
 "maxWidth": 58,
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_2130D561_2F8A_F533_41BB_BE86667AEB92_pressed.png",
 "horizontalAlign": "center",
 "minHeight": 1,
 "pressedRollOverIconURL": "skin/IconButton_2130D561_2F8A_F533_41BB_BE86667AEB92_pressed_rollover.png",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_2130D561_2F8A_F533_41BB_BE86667AEB92.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "maxHeight": 58,
 "id": "IconButton_2130F561_2F8A_F533_4187_ABA0B2B586FB",
 "width": 58,
 "maxWidth": 58,
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_2130F561_2F8A_F533_4187_ABA0B2B586FB_pressed.png",
 "horizontalAlign": "center",
 "minHeight": 1,
 "pressedRollOverIconURL": "skin/IconButton_2130F561_2F8A_F533_4187_ABA0B2B586FB_pressed_rollover.png",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_2130F561_2F8A_F533_4187_ABA0B2B586FB.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton MUTE"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 8.02,
   "yaw": 0.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_1_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -19.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3E160455_2CD0_0C40_41C1_D89B0ABACB16",
   "pitch": -19.82,
   "yaw": 0.73,
   "hfov": 8.02,
   "distance": 100
  }
 ],
 "id": "overlay_3C032B18_2C30_05C0_41BB_218223EB3E02",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 23.1,
   "yaw": 2.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_0_HS_1_0_map.gif",
      "width": 100,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Ruang Pamer Museum"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_0_HS_1_0.png",
      "width": 943,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 2.29,
   "yaw": 2.31,
   "hfov": 23.1,
   "distance": 50
  }
 ],
 "id": "overlay_20ACE814_2D23_3C2A_41C4_8D0E9E73783A",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 10.01,
   "yaw": 19.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -2.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F6AB54C_2D21_D439_41AD_08178F4D1F92",
   "pitch": -2.59,
   "yaw": 19.14,
   "hfov": 10.01,
   "distance": 50
  }
 ],
 "id": "overlay_34BFD786_2C50_0CC0_41C5_4C494B1665C4",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 21.24,
   "yaw": -0.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F_0_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -6.02,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F688551_2D21_D42B_41BC_F6FCA9AAA88D",
   "pitch": -6.02,
   "yaw": -0.59,
   "hfov": 21.24,
   "distance": 100
  }
 ],
 "id": "overlay_3B850000_2C50_03C0_41BD_6FFFCDD16C80",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 21.95,
   "yaw": 4.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FD873_2C70_0440_4183_6CAB690645BC_0_HS_0_0_0_map.gif",
      "width": 51,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -13.76,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 06a Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3BE7FDAB_2C50_3CC0_41B6_4259FE002C85",
   "pitch": -13.76,
   "yaw": 4.68,
   "hfov": 21.95,
   "distance": 50
  }
 ],
 "id": "overlay_3F95A3E3_2C70_0440_419B_7A23FE690227",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "mp3Url": "media/audio_3E042561_2D67_34EA_41B9_1FBE03248EE4.mp3",
 "id": "audioresource_3E043561_2D67_34EA_418A_CA92C61DC08C",
 "oggUrl": "media/audio_3E042561_2D67_34EA_41B9_1FBE03248EE4.ogg",
 "class": "AudioResource"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 20.09,
   "yaw": 2.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD_0_HS_1_0_map.gif",
      "width": 113,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 8.13,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Ruang Perpustakaan Museum"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD_0_HS_1_0.png",
      "width": 405,
      "height": 57,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 8.13,
   "yaw": 2.29,
   "hfov": 20.09,
   "distance": 50
  }
 ],
 "id": "overlay_234F73D2_2D26_EC2E_41AE_0148325DE8C4",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 22.65,
   "yaw": 18.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -7.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 03 Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F6D854B_2D21_D43F_41B2_D991031D0E8B",
   "pitch": -7.47,
   "yaw": 18.14,
   "hfov": 22.65,
   "distance": 50
  }
 ],
 "id": "overlay_3F2005AE_2C70_0CC0_41B3_218FE3A16C4B",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 7.48,
   "yaw": 1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -17.19,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3D65388F_2CD0_04C0_41B3_187D7AF71295",
   "pitch": -17.19,
   "yaw": 1,
   "hfov": 7.48,
   "distance": 50
  }
 ],
 "id": "overlay_3DE48D3C_2CD0_7DC0_41C4_CDF460EE4605",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 29.98,
   "yaw": -2.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38452F45_2C70_1C40_41BA_31855ACF10D6_0_HS_0_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -14.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3BE4BDAC_2C50_3CC0_41AA_CB537C6A7F25",
   "pitch": -14.4,
   "yaw": -2.05,
   "hfov": 29.98,
   "distance": 100
  }
 ],
 "id": "overlay_38CA5607_2C70_0FC0_41C5_3A5FAE926CB4",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 9.38,
   "yaw": 17.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -4.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F6BF550_2D21_D429_41A4_A7740B07FCAD",
   "pitch": -4.22,
   "yaw": 17.69,
   "hfov": 9.38,
   "distance": 50
  }
 ],
 "id": "overlay_3BFEE187_2C50_04C0_41BF_9E8E7146AB83",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 6.76,
   "yaw": 16.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -2.37,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F6FE54A_2D21_D439_41BD_A54918D3AB33",
   "pitch": -2.37,
   "yaw": 16.9,
   "hfov": 6.76,
   "distance": 50
  }
 ],
 "id": "overlay_3F9CA291_2C50_04C0_41B2_AA513E13F4A4",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 25.35,
   "yaw": 0.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_0_HS_1_0_map.gif",
      "width": 146,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 17.27,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "RUANGAN AUDIO VISUAL"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_0_HS_1_0.png",
      "width": 1083,
      "height": 118,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 17.27,
   "yaw": 0.59,
   "hfov": 25.35,
   "distance": 50
  }
 ],
 "id": "overlay_23FAF767_2D21_74F7_415C_71CA6602E2BE",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 4.33,
   "yaw": 0.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2758614E_2C30_0440_41A8_AC478E9E9265_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -10.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 02 Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3D66188F_2CD0_04C0_41C0_F368C4C60211",
   "pitch": -10.05,
   "yaw": 0.74,
   "hfov": 4.33,
   "distance": 50
  }
 ],
 "id": "overlay_233870FD_2C30_0440_41C2_1AB962C77C23",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "bleachingDistance": 0.4,
 "yaw": -0.54,
 "pitch": 9.5,
 "bleaching": 0.7,
 "id": "overlay_381EAF16_2D66_D429_41C1_5ADA44731FDC",
 "class": "LensFlarePanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 30.34,
   "yaw": 1.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48_0_HS_0_0_map.gif",
      "width": 155,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 8.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Ruang Administrasi Museum"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38C4B5D0_2C70_0C40_41B1_E2D904A3CB48_0_HS_0_0.png",
      "width": 613,
      "height": 63,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 8.35,
   "yaw": 1.85,
   "hfov": 30.34,
   "distance": 50
  }
 ],
 "id": "overlay_2344CCC1_2D22_F42B_41C4_210809649F67",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 19.3,
   "yaw": 22.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4_0_HS_0_0_0_map.gif",
      "width": 19,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -9.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3BE50DAD_2C50_3CC0_41BA_0367C28E8710",
   "pitch": -9.36,
   "yaw": 22.42,
   "hfov": 19.3,
   "distance": 100
  }
 ],
 "id": "overlay_3A0CEA34_2C50_07C0_41A3_31AD7BA8D733",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 11.6,
   "yaw": 24.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -10.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F6CD54B_2D21_D43F_41C6_59AF8F21D2B2",
   "pitch": -10.16,
   "yaw": 24.06,
   "hfov": 11.6,
   "distance": 50
  }
 ],
 "id": "overlay_3E3380BD_2C70_04C0_41AF_189E3D95384D",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 18.43,
   "yaw": -3.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_0_HS_1_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -8.62,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F6D754B_2D21_D43F_41AB_CA649F845CAB",
   "pitch": -8.62,
   "yaw": -3.49,
   "hfov": 18.43,
   "distance": 100
  }
 ],
 "id": "overlay_38B078AC_2C70_04C0_41BF_50751C875B44",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 19.98,
   "yaw": -4.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_0_HS_2_0_map.gif",
      "width": 62,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -14.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Ruang Audio Visual"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_0_HS_2_0.png",
      "width": 1074,
      "height": 274,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -14.86,
   "yaw": -4.63,
   "hfov": 19.98,
   "distance": 50
  }
 ],
 "id": "overlay_23433E29_2D2F_547A_41C4_DBFF876134F3",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 15.63,
   "yaw": 18.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_382CA8F4_2C70_0440_41AC_561F653396EE_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -13.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3BE44DAB_2C50_3CC0_41AC_1E3EB1537B93",
   "pitch": -13.1,
   "yaw": 18.72,
   "hfov": 15.63,
   "distance": 50
  }
 ],
 "id": "overlay_39D4CD17_2C70_7DC0_41B4_AD28072605D8",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "maxHeight": 37,
 "maxWidth": 49,
 "id": "IconButton_22DAB3A9_2F7E_6D30_41C7_621A48D0B0AA",
 "width": 49,
 "right": 30,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_22DAB3A9_2F7E_6D30_41C7_621A48D0B0AA.png",
 "verticalAlign": "middle",
 "height": 37,
 "minWidth": 1,
 "mode": "push",
 "backgroundOpacity": 0,
 "bottom": 8,
 "class": "IconButton",
 "rollOverIconURL": "skin/IconButton_22DAB3A9_2F7E_6D30_41C7_621A48D0B0AA_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton VR"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "maxHeight": 58,
 "id": "IconButton_21301561_2F8A_F533_41C3_C78625B1A031",
 "width": 58,
 "maxWidth": 58,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_21301561_2F8A_F533_41C3_C78625B1A031.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "rollOverIconURL": "skin/IconButton_21301561_2F8A_F533_41C3_C78625B1A031_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton VR"
 },
 "paddingBottom": 0,
 "shadow": false,
 "visible": false,
 "cursor": "hand"
},
{
 "maxHeight": 58,
 "id": "IconButton_2130E561_2F8A_F533_4183_D536CAFB3BFD",
 "width": 58,
 "maxWidth": 58,
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_2130E561_2F8A_F533_4183_D536CAFB3BFD_pressed.png",
 "horizontalAlign": "center",
 "minHeight": 1,
 "pressedRollOverIconURL": "skin/IconButton_2130E561_2F8A_F533_4183_D536CAFB3BFD_pressed_rollover.png",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_2130E561_2F8A_F533_4183_D536CAFB3BFD.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton GYRO"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "maxHeight": 58,
 "id": "IconButton_2130C561_2F8A_F533_41B9_7DB7375223B6",
 "width": 58,
 "maxWidth": 58,
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_2130C561_2F8A_F533_41B9_7DB7375223B6_pressed.png",
 "horizontalAlign": "center",
 "minHeight": 1,
 "pressedRollOverIconURL": "skin/IconButton_2130C561_2F8A_F533_41B9_7DB7375223B6_pressed_rollover.png",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_2130C561_2F8A_F533_41B9_7DB7375223B6.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton HS "
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 16.26,
   "yaw": 0.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 11.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 02a Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F683550_2D21_D429_41B6_D6C708538676",
   "pitch": 11.82,
   "yaw": 0.64,
   "hfov": 16.26,
   "distance": 50
  }
 ],
 "id": "overlay_3B010190_2C50_04C0_41BA_4109BE6D19D3",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 16.75,
   "yaw": 5.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -9.23,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 02a Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F68D551_2D21_D42B_41A4_17D6E3A1DD21",
   "pitch": -9.23,
   "yaw": 5.91,
   "hfov": 16.75,
   "distance": 50
  }
 ],
 "id": "overlay_34836BE8_2C50_044F_41C5_164669C84E90",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 9.96,
   "yaw": -1.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E35B665_2C50_0C40_41BD_A0678485E337_0_HS_1_0_0_map.gif",
      "width": 51,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -12.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 06b Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3E0FB19B_2C50_04C0_41C2_FA917256A243",
   "pitch": -12.48,
   "yaw": -1.08,
   "hfov": 9.96,
   "distance": 50
  }
 ],
 "id": "overlay_3E975CBF_2C50_7CC0_41A5_22D4CACB3482",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 7.36,
   "yaw": -6.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -4.62,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F6B5550_2D21_D429_41C2_8130361C70F7",
   "pitch": -4.62,
   "yaw": -6.35,
   "hfov": 7.36,
   "distance": 50
  }
 ],
 "id": "overlay_39AF6E0D_2C51_FFC0_41C2_CC25A497B28D",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 15.49,
   "yaw": -1.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594_0_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -5.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F690551_2D21_D42B_41C5_70EDB780172A",
   "pitch": -5.58,
   "yaw": -1.91,
   "hfov": 15.49,
   "distance": 100
  }
 ],
 "id": "overlay_3B7A67E2_2C50_0C40_41C1_140CA35290B5",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 4.95,
   "yaw": -20.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -3.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_23783072_2CD0_0440_41AF_16622F9CCFD4",
   "pitch": -3.93,
   "yaw": -20.02,
   "hfov": 4.95,
   "distance": 50
  }
 ],
 "id": "overlay_3CD041C3_2CD0_0440_41A9_E535ECB81A73",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 3.73,
   "yaw": 14.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -6.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3BDD3604_2C70_0FC7_41C2_8DA47464F998",
   "pitch": -6.55,
   "yaw": 14.12,
   "hfov": 3.73,
   "distance": 50
  }
 ],
 "id": "overlay_3E990E33_2C70_FFC0_41B4_818B0BEE5981",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 10.37,
   "yaw": -19.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -10.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F6EC54A_2D21_D439_4182_9CBD67CDEFB9",
   "pitch": -10.68,
   "yaw": -19.45,
   "hfov": 10.37,
   "distance": 50
  }
 ],
 "id": "overlay_3808BCEE_2C70_7C40_41B7_5A0C8C35BB63",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 8.57,
   "yaw": -3.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_0_HS_1_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -5.89,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3F6F554A_2D21_D439_41AD_26E094121B63",
   "pitch": -5.89,
   "yaw": -3.36,
   "hfov": 8.57,
   "distance": 100
  }
 ],
 "id": "overlay_383B4753_2C50_0C47_41AF_2B2CFBBDB2D4",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 28.91,
   "yaw": -1.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_0_HS_2_0_map.gif",
      "width": 99,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -19.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Ruang Penyimpanan Koleksi Museum"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_0_HS_2_0.png",
      "width": 1248,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -19.08,
   "yaw": -1.78,
   "hfov": 28.91,
   "distance": 50
  }
 ],
 "id": "overlay_239D3E1E_2D23_5456_41BA_CDA2A9278E6F",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 2.68,
   "yaw": 14.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_1_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.8,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_38DF6197_2C50_04C0_41A0_C05A9F329786",
   "pitch": -0.8,
   "yaw": 14.38,
   "hfov": 2.68,
   "distance": 100
  }
 ],
 "id": "overlay_3FCB4871_2C50_0440_41C3_2C1EF9DFD855",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "maps": [
  {
   "hfov": 4.77,
   "yaw": -11.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -8.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Arrow 03 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_38DC8198_2C50_04C0_41C3_7F6D9C7F1CD2",
   "pitch": -8.53,
   "yaw": -11.09,
   "hfov": 4.77,
   "distance": 50
  }
 ],
 "id": "overlay_3F71907A_2C50_0440_41AB_95EC5D61F69B",
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay"
},
{
 "maxHeight": 2,
 "maxWidth": 3000,
 "id": "Image_22DB23A9_2F7E_6D30_41C5_1687F6B36B8B",
 "left": "0%",
 "right": "0%",
 "paddingRight": 0,
 "url": "skin/Image_22DB23A9_2F7E_6D30_41C5_1687F6B36B8B.png",
 "horizontalAlign": "center",
 "minHeight": 1,
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "height": 2,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "bottom": 53,
 "class": "Image",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_outside",
 "data": {
  "name": "white line"
 },
 "paddingBottom": 0,
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "id": "Container_22DB33A9_2F7E_6D30_4190_46A8CA6EC6DD",
 "left": "0%",
 "width": 1558,
 "children": [
  "this.Button_22DB03A9_2F7E_6D30_41BE_7480C2A76ACF",
  "this.Button_22DB13A9_2F7E_6D30_41C5_B5B76ACD1B17",
  "this.Button_21DFC027_2F7A_2B3F_4142_D4D7D24138F1",
  "this.Button_21AF6FAC_2F7A_5530_4179_3FC4BACCA756",
  "this.Button_217EBCF3_2F7A_3B17_41C7_0D5873688CC3",
  "this.Button_206C3772_2F76_5510_41C2_A9572CCDF7FB"
 ],
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "paddingLeft": 30,
 "verticalAlign": "middle",
 "height": 51,
 "horizontalAlign": "left",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set container"
 },
 "paddingBottom": 0,
 "gap": 3,
 "shadow": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "id": "Container_21305560_2F8A_F531_41C0_B58DF2A95E40",
 "width": 110,
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "verticalAlign": "middle",
 "height": 110,
 "horizontalAlign": "center",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "button menu sup"
 },
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "layout": "vertical",
 "id": "Container_21300561_2F8A_F533_41C4_D4EFB33EDE39",
 "children": [
  "this.IconButton_21301561_2F8A_F533_41C3_C78625B1A031",
  "this.IconButton_2130E561_2F8A_F533_4183_D536CAFB3BFD",
  "this.IconButton_2130F561_2F8A_F533_4187_ABA0B2B586FB",
  "this.IconButton_2130C561_2F8A_F533_41B9_7DB7375223B6",
  "this.IconButton_2130D561_2F8A_F533_41BB_BE86667AEB92",
  "this.IconButton_2130B561_2F8A_F533_41C1_ECC70471A86D",
  "this.IconButton_21308561_2F8A_F533_41C6_6E285E603180"
 ],
 "right": "0%",
 "width": "91.304%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "verticalAlign": "top",
 "paddingLeft": 0,
 "height": "85.959%",
 "horizontalAlign": "center",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 3,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 },
 "paddingBottom": 0,
 "shadow": false,
 "visible": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_23A91555_2C30_0C40_41B3_DAE7FB1BAF5A_1_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3E160455_2CD0_0C40_41C1_D89B0ABACB16",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_39ACBCEE_2C70_3C5D_41BE_8FCBAD96ABD1_0_HS_0_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3F6AB54C_2D21_D439_41AD_08178F4D1F92",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3A15D68F_2C50_0CC0_41AF_D935C63BF72F_0_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3F688551_2D21_D42B_41BC_F6FCA9AAA88D",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3E3FD873_2C70_0440_4183_6CAB690645BC_0_HS_0_0.png",
   "width": 640,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3BE7FDAB_2C50_3CC0_41B6_4259FE002C85",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3F6E7CFB_2C70_1C40_41B2_B1E5392E74FD_0_HS_0_0.png",
   "width": 640,
   "height": 960,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3F6D854B_2D21_D43F_41B2_D991031D0E8B",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_23B85BAD_2C30_04C0_41C2_A192190EDA9B_1_HS_1_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3D65388F_2CD0_04C0_41B3_187D7AF71295",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_38452F45_2C70_1C40_41BA_31855ACF10D6_0_HS_0_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3BE4BDAC_2C50_3CC0_41AA_CB537C6A7F25",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_39EFE984_2C50_04C0_41BD_45B773E4A9F3_0_HS_0_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3F6BF550_2D21_D429_41A4_A7740B07FCAD",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3E000519_2C30_0DC0_41A2_9546CB72A7CD_0_HS_0_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3F6FE54A_2D21_D439_41BD_A54918D3AB33",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2758614E_2C30_0440_41A8_AC478E9E9265_1_HS_0_0.png",
   "width": 380,
   "height": 570,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3D66188F_2CD0_04C0_41C0_F368C4C60211",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3946BEDB_2C50_1C40_4184_7F319F4A05F4_0_HS_0_0.png",
   "width": 380,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3BE50DAD_2C50_3CC0_41BA_0367C28E8710",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_0_HS_0_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3F6CD54B_2D21_D43F_41C6_59AF8F21D2B2",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_38C560D1_2C70_0440_41B1_D6EF4D78D302_0_HS_1_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3F6D754B_2D21_D43F_41AB_CA649F845CAB",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_382CA8F4_2C70_0440_41AC_561F653396EE_0_HS_0_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3BE44DAB_2C50_3CC0_41AC_1E3EB1537B93",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3AA758AE_2C50_04C0_41C2_13759BE28E3D_0_HS_0_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3F683550_2D21_D429_41B6_D6C708538676",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3AB7A1DF_2C50_0440_41A2_7E9AA8BEE2DD_0_HS_0_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3F68D551_2D21_D42B_41A4_17D6E3A1DD21",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3E35B665_2C50_0C40_41BD_A0678485E337_0_HS_1_0.png",
   "width": 640,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3E0FB19B_2C50_04C0_41C2_FA917256A243",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_39C1C660_2C50_0C40_41A3_6A2F64D7347E_0_HS_0_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3F6B5550_2D21_D429_41C2_8130361C70F7",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_346FCF1A_2C50_1DC0_41C4_66D111FA4594_0_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3F690551_2D21_D42B_41C5_70EDB780172A",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE_0_HS_0_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_23783072_2CD0_0440_41AF_16622F9CCFD4",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3C8EB325_2CD0_05C0_41B8_582A517670BE_0_HS_1_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3BDD3604_2C70_0FC7_41C2_8DA47464F998",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_0_HS_0_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3F6EC54A_2D21_D439_4182_9CBD67CDEFB9",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3DA08F7F_2C30_3C40_41C4_610955BD4CDD_0_HS_1_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_3F6F554A_2D21_D439_41AD_26E094121B63",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_1_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_38DF6197_2C50_04C0_41A0_C05A9F329786",
 "colCount": 3,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3C73610A_2CD0_05C1_41A9_8FD98254B28F_1_HS_1_0.png",
   "width": 640,
   "height": 960,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_38DC8198_2C50_04C0_41C3_7F6D9C7F1CD2",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "iconWidth": 0,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "rollOverShadow": false,
 "id": "Button_22DB03A9_2F7E_6D30_41BE_7480C2A76ACF",
 "width": 120,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "layout": "horizontal",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "iconHeight": 0,
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "horizontalAlign": "center",
 "minHeight": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 40,
 "minWidth": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 0,
 "fontSize": 18,
 "shadowBlurRadius": 15,
 "class": "Button",
 "label": "Beranda",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.mainPlayList.set('selectedIndex', 0)",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "paddingBottom": 0,
 "shadow": false,
 "data": {
  "name": "Button house info"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "id": "Button_22DB13A9_2F7E_6D30_41C5_B5B76ACD1B17",
 "width": 219,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "layout": "horizontal",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "horizontalAlign": "center",
 "minHeight": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 40,
 "minWidth": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "fontSize": 18,
 "shadowBlurRadius": 15,
 "class": "Button",
 "label": "Ruang Pamer Museum",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.mainPlayList.set('selectedIndex', 2)",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "paddingBottom": 0,
 "shadow": false,
 "data": {
  "name": "Button panorama list"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "id": "Button_21DFC027_2F7A_2B3F_4142_D4D7D24138F1",
 "width": 265,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "layout": "horizontal",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "horizontalAlign": "center",
 "minHeight": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 40,
 "minWidth": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "fontSize": 18,
 "shadowBlurRadius": 15,
 "class": "Button",
 "label": "Ruang Perpustakaan Museum",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.mainPlayList.set('selectedIndex', 11)",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "paddingBottom": 0,
 "shadow": false,
 "data": {
  "name": "Button panorama list"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "id": "Button_21AF6FAC_2F7A_5530_4179_3FC4BACCA756",
 "width": 285,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "layout": "horizontal",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "horizontalAlign": "center",
 "minHeight": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 40,
 "minWidth": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "fontSize": 18,
 "shadowBlurRadius": 15,
 "class": "Button",
 "label": "Ruang Penyimpanan Koleksi Museum",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.mainPlayList.set('selectedIndex', 5)",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "paddingBottom": 0,
 "shadow": false,
 "data": {
  "name": "Button panorama list"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "id": "Button_217EBCF3_2F7A_3B17_41C7_0D5873688CC3",
 "width": 262,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "layout": "horizontal",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "horizontalAlign": "center",
 "minHeight": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 40,
 "minWidth": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "fontSize": 18,
 "shadowBlurRadius": 15,
 "class": "Button",
 "label": "Ruang Administrasi Museum",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.mainPlayList.set('selectedIndex', 13)",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "paddingBottom": 0,
 "shadow": false,
 "data": {
  "name": "Button panorama list"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "id": "Button_206C3772_2F76_5510_41C2_A9572CCDF7FB",
 "width": 280,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "layout": "horizontal",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "horizontalAlign": "center",
 "minHeight": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 40,
 "minWidth": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "fontSize": 18,
 "shadowBlurRadius": 15,
 "class": "Button",
 "label": "Ruang Audio Visual Museum",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.mainPlayList.set('selectedIndex', 6)",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "paddingBottom": 0,
 "shadow": false,
 "data": {
  "name": "Button panorama list"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "maxHeight": 58,
 "id": "IconButton_2130B561_2F8A_F533_41C1_ECC70471A86D",
 "width": 58,
 "maxWidth": 58,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_2130B561_2F8A_F533_41C1_ECC70471A86D.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "rollOverIconURL": "skin/IconButton_2130B561_2F8A_F533_41C1_ECC70471A86D_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.shareTwitter(window.location.href)",
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton TWITTER"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "maxHeight": 58,
 "id": "IconButton_21308561_2F8A_F533_41C6_6E285E603180",
 "width": 58,
 "maxWidth": 58,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_21308561_2F8A_F533_41C6_6E285E603180.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "rollOverIconURL": "skin/IconButton_21308561_2F8A_F533_41C6_6E285E603180_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.shareFacebook(window.location.href)",
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton FB"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
}],
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "mobileMipmappingEnabled": false,
 "data": {
  "name": "Player435"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "visible",
 "vrPolyfillScale": 0.5
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
