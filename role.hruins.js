var harvsterRuins = {
  run: function (creep) {
    var runis = creep.room.find(FIND_RUINS, {
      filter: function (obj) {
        return obj.store.getUsedCapacity() > 0;
      },
    });
    // console.log(runis);
    if (creep.store.getFreeCapacity() > 0) {
      var err = creep.withdraw(runis[0], RESOURCE_ENERGY);
      if (err === ERR_NOT_IN_RANGE) {
        creep.moveTo(runis[0]);
      }
    } else {
      if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns['Spawn1']);
      }
    }
  },
};

module.exports = harvsterRuins;
