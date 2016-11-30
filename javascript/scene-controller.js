var id = 0;

function main(scene) {
  for (var i = 0; i < scene.snowGameObjectInstanceArray.length; i++) {
    var pos = getGameObjectPosition(scene.snowGameObjectInstanceArray[i]);
    var newPos = {
      x: Math.random() * 30 - 15,
      y: pos.y,
      z: Math.random() * 30 - 15
    };
    setGameObjectPosition(scene.snowGameObjectInstanceArray[i], newPos);
    setGameObjectAnimationPositionEnding(scene.snowGameObjectInstanceArray[i], newPos);
    runGameObjectAnimation(scene.snowGameObjectInstanceArray[i], 'move');
  }
}

function bootrsap() {

  //////////////////////////////////////////
  ///// INSTANCE GAMEOBJECTS ON SCENE //////
  //////////////////////////////////////////

  var args = {};
  var snowGameObjectEntity = getAssetFromID("snow");
  var skyGameObjectEntity = getAssetFromID("sky");

  args.snowGameObjectInstanceArray = [];

  instanceGameObject(skyGameObjectEntity);

  for (var i = 0; i < 60; i++) {
    var tempSnowGameObjectInstance = instanceGameObject(snowGameObjectEntity);
    args.snowGameObjectInstanceArray.push(tempSnowGameObjectInstance);
  }

  //////////////////////////////////////////
  /////////// RUN ALL THAT SHIT ////////////
  //////////////////////////////////////////

  setTimeout(function() {
    main(args);
  }, 0);

}

function run() {

  var scene = document.querySelector('a-scene');
  if (scene.hasLoaded) {
    bootrsap();
  } else {
    scene.addEventListener('loaded', bootrsap);
  }

};

//////////////////////////////////////////
//////////////// MAGIC  //////////////////
//////////////////////////////////////////

function getAssetFromID(assetID) {
  var obj = {
    assetID: assetID,
    asset: $('#' + assetID).html()
  }
  return obj;
};

function instanceGameObject(object) {
  id++;
  var el = $(object.asset);
  $(el).attr('id', object.assetID + '-' + id);
  $('a-scene').append(el);
  return '#' + object.assetID + '-' + id;
}

function getGameObjectPosition(objectID) {
  return document.querySelector(objectID + '[position]').components.position.data;
}

function setGameObjectPosition(objectID, pos) {
  document.querySelector(objectID).setAttribute('position', {
    x: pos.x,
    y: pos.y,
    z: pos.z
  });;
}
function runGameObjectAnimation(objectID, anim){
  document.querySelector(objectID).emit(anim);
}

function setGameObjectAnimationPositionEnding(objectID, pos) {
  document.querySelector(objectID + ' a-animation#move').setAttribute('to','10 10 0');
  console.log(document.querySelector(objectID + ' a-animation#move'));
}
$(document).ready(run);
