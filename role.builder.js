var rolBuilder = {
  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    } else {
      // var sources = creep.room.find(FIND_SOURCES);
      // if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      //   creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      // }

      // from spawn

      var withDrawTarget = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100
          );
        },
      });

      var err = creep.withdraw(withDrawTarget[0], RESOURCE_ENERGY);
      if (err === ERR_NOT_IN_RANGE) {
        creep.moveTo(withDrawTarget[0]);
      }
    }
  },
};

module.exports = rolBuilder;
