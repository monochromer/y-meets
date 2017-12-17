const path = require('path');
const { assert } = require('chai');
const del = require('del');

const config = require('config');
const createData = require('seed/create-mock-data');
const { eventService, userService, roomService } = require('app/services');
const { events: eventsMock } = require('seed/mocks');

const eventsCount = (eventsMock || []).length;

describe('Events Service Test', () => {

  it('mock data should be prepared', () => {
    assert.equal(eventsCount > 0, true);
  });

  it('should return correct event by Id', (done) => {
    const ids = new Array(eventsCount);
    ids.forEach((item, index, arr) => arr[index] = index);

    const promises = ids.map(eventId => {
      return eventService.getEvent(eventId)
        .then(event => {
          assert.equal(event, !null);
          assert.equal(event.id, eventId);
          return event;
        });
    });

    Promise.all(promises)
      .then(() => done())
      .catch(e => done(e));
  });

  it('should return correct count of events', (done) => {
    eventService.getEvents()
      .then(events => {
        assert.notEqual(events, null);
        assert.equal(events.length, eventsCount);
      })
      .then(() => done())
      .catch((e) => done(e))
  });

  it('should correctly create event', (done) => {
    const HOUR = 60 * 60 * 1000;
    const now = new Date().getTime();

    const testEvent = {
      title: 'Кофепитие',
      dateStart: new Date(now),
      dateEnd: new Date(now + HOUR)
    };

    const usersIds = [1, 2, 3];
    const roomId = 1;

    eventService.createEvent({
      input: testEvent,
      usersIds,
      roomId
    }).then(createdEvent => {
      const { title, dateStart, dateEnd } = createdEvent;
        assert.deepEqual({ title, dateStart, dateEnd }, testEvent);
      })
      .then(() => done())
      .catch((e) => done(e))
  });

  it('should correctly update event', (done) => {
    const HOUR = 60 * 60 * 1000;
    const now = new Date().getTime();
    const id = 1;
    const newEventData = {
      title: 'Кофепитие и чаепитие',
      dateStart: new Date(now + HOUR * 1),
      dateEnd: new Date(now + HOUR * 2)
    };

    eventService.updateEvent({ id, input: newEventData })
      .then(updatedEvent => {
        const { title, dateStart, dateEnd } = updatedEvent;
        assert.deepEqual({ title, dateStart, dateEnd }, newEventData);
      })
      .then(() => {
        eventService.getEvent(id)
          .then(findedEvent => {
            const { title, dateStart, dateEnd } = findedEvent;
            assert.deepEqual({ title, dateStart, dateEnd }, newEventData);
          })
      })
      .then(() => done())
      .catch((e) => done(e))
  });

  it('should correctly delete event', (done) => {
    const id = 1;

    eventService
      .removeEvent(id)
      .then(() => eventService.getEvent(id))
      .then(res => assert.isNull(res))
      .then(() => done())
      .catch((e) => done(e))
  });

  it('should correctly add and remove user for event', (done) => {
    Promise.all([
      eventService.getEvents(),
      userService.getUsers()
    ])
    .then(([events, users]) => {
      assert.isNotNull(events);
      assert.isNotNull(users);
      const usersIds = users.map(user => user.id);
      const eventId = events[0].id;
      const userId = users[0].id;

      return eventService
        .addUserToEvent({
          id: eventId,
          userId
        })
        .then(event => event.getUsers())
        .then((eventUsers) => {
          const findedUser = eventUsers.find(user => user.id === userId);
          assert.isNotNull(findedUser);

          return eventService
            .removeUserFromEvent({
              id: eventId,
              userId
            })
            .then(event => event.getUsers())
            .then(eventUsers => {
              const findedUser = eventUsers.find(user => user.id === userId);
              assert.equal(findedUser, undefined);
            })
        })
    })
    .then(() => done())
    .catch((e) => done(e));
  });

  it('should correctly change event room ', (done) => {
    Promise.all([
      eventService.getEvents(),
      roomService.getRooms()
    ])
    .then(([events, rooms]) => {
      assert.isNotNull(events);
      assert.isNotNull(rooms);
      const roomsIds = rooms.map(user => user.id);
      const eventId = events[0].id;
      const roomId = rooms[0].id;

      return eventService
        .changeEventRoom({
          id: eventId,
          roomId
        })
        .then(event => event.getRoom())
        .then((eventRoom) => {
          assert.equal(eventRoom.id, roomId);
        })
    })
    .then(() => done())
    .catch((e) => done(e));
  });
});
