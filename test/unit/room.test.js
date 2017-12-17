const path = require('path');
const { assert } = require('chai');
const del = require('del');

const config = require('config');
const createData = require('seed/create-mock-data');
const { roomService } = require('app/services');
const { rooms: roomMocks } = require('seed/mocks');

const roomsCount = (roomMocks || []).length;

describe('Room Service Test', () => {

  it('mock data should be prepared', () => {
    assert.equal(roomsCount > 0, true);
  });

  it('should return correct room item by Id', (done) => {
    const ids = new Array(roomsCount);
    ids.forEach((item, index, arr) => arr[index] = index);

    const promises = ids.map(roomId => {
      return roomService.getRoom(roomId)
        .then(room => {
          assert.equal(room, !null);
          assert.equal(room.id, roomId);
          return room;
        });
    });

    Promise.all(promises)
      .then(() => done())
      .catch(e => done(e));
  });

  it('should return correct count of rooms', (done) => {
    roomService.getRooms()
      .then(rooms => {
        assert.notEqual(rooms, null);
        assert.equal(rooms.length, roomsCount);
      })
      .then(() => done())
      .catch((e) => done(e))
  });

  it('should correctly create room item', (done) => {
    const testRoom = {
      title: 'Test room',
      capacity: 8,
      floor: 4
    };

    roomService.createRoom(testRoom)
      .then(createdRoom => {
        const { title, capacity, floor } = createdRoom;
        assert.deepEqual({ title, capacity, floor }, testRoom);
      })
      .then(() => done())
      .catch((e) => done(e))
  });

  it('should correctly update room item', (done) => {
    const id = 1;
    const newRoomData = {
      title: 'Карты-Деньги-2Ствола',
      capacity: 6,
      floor: 13
    };

    roomService.updateRoom({ id, input: newRoomData })
      .then(updatedRoom => {
        const { title, capacity, floor } = updatedRoom;
        assert.deepEqual({ title, capacity, floor }, newRoomData);
      })
      .then(() => {
        roomService.getRoom(id)
          .then(findedRoom => {
            const { title, capacity, floor } = findedRoom;
            assert.deepEqual({ title, capacity, floor }, newRoomData);
          })
      })
      .then(() => done())
      .catch((e) => done(e))
  });

  it('should correctly delete room item', (done) => {
    const id = 1;

    roomService
      .removeRoom(id)
      .then(() => roomService.getRoom(id))
      .then(res => assert.isNull(res))
      .then(() => done())
      .catch((e) => done(e))
  });
});
