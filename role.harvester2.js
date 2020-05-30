var roleHarvester2 = {
  /** @param {Creep} creeps **/
  run: function (creeps, i) {
    for (var name in creeps) {
      var creep = creeps[name];
      if (creep.store.getFreeCapacity() > 0) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[i], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      } else {
        var targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (
              (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
              structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            );
          },
        });
        if (targets.length > 0) {
          if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
          }
        }
      }
    }
  },
};

module.exports = roleHarvester2;
