var havester = require('role.harvester');
var harvsterRuins = require('role.hruins');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var harvester2 = require('role.harvester2');
var worker = require('role.worker');
var carryer = require('role.carryer');

module.exports.loop = function () {
  // 清除内存逻辑
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  // 各种资源保种
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

  if (harvesters.length < 2) {
    var newName = 'Harvester' + Game.time;
    console.log('Spawning new harvester: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, MOVE], newName, { memory: { role: 'harvester' } });
  }

  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

  if (upgraders.length < 3) {
    var newName = 'Upgraders' + Game.time;
    console.log('Spawning new Upgraders: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, {
      memory: { role: 'upgrader' },
    });
  }

  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

  // 如果有工地那就维持，没有工地就不维持了
  if (Object.keys(Game.constructionSites).length > 0) {
    if (builders.length < 2) {
      var newName = 'builder' + Game.time;
      console.log('Spawning new builders: ' + newName);
      Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'builder' } });
    }
  }

  var carryers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carryer');

  if (carryers.length < 4) {
    var newName = 'carryer' + Game.time;
    console.log('Spawning new carryers: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE], newName, { memory: { role: 'carryer' } });
  }

  console.log(
    'harvesters: ' +
      harvesters.length +
      ' ' +
      'upgraders:' +
      upgraders.length +
      ' ' +
      'builders:' +
      builders.length +
      ' ' +
      'carryers:' +
      carryers.length
  );

  // v2 harvester
  if (harvesters[0] != null) {
    worker.run(harvesters[0], 0);
  }

  if (harvesters[1] != null) {
    worker.run(harvesters[1], 1);
  }
  carryer.run(carryers[0], harvesters[0]);
  carryer.run(carryers[1], harvesters[0]);
  carryer.run(carryers[2], harvesters[1]);
  carryer.run(carryers[3], harvesters[1]);

  // 其余逻辑
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    // if (creep.memory.role == 'harvester') {
    //   havester.run(creep);
    // }
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == 'ruin') {
      harvsterRuins.run(creep);
    }
    if (creep.memory.role == 'worker') {
      worker.run(creep, 0);
    }
  }
};
