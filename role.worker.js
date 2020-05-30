var roleWorker = {
  run: function (creep, i) {
    var sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
      Memory.source = { zero: true };
      creep.moveTo(sources[i], { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  },
};

module.exports = roleWorker;
