var roleUpgrader = {
  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.store.getFreeCapacity() > 0) {
      // var withDrawTarget = creep.room.find(FIND_STRUCTURES, {
      //   filter: { structureType: STRUCTURE_SPAWN },
      // })[0];

      // var err = creep.withdraw(withDrawTarget, RESOURCE_ENERGY);
      // // console.log(err);
      // if (err === ERR_NOT_IN_RANGE) {
      //   creep.moveTo(withDrawTarget);
      // }
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  },
};

module.exports = roleUpgrader;
