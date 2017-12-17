const path = require('path');
const { assert } = require('chai');
const del = require('del');

const config = require('config');
const createData = require('seed/create-mock-data');
const { userService } = require('app/services');
const { users: userMocks } = require('seed/mocks');

const usersCount = (userMocks || []).length;

describe('User Service Test', () => {

  it('mock data should be prepared', () => {
    assert.equal(usersCount > 0, true);
  });

  it('should return correct user by Id', (done) => {
    const ids = new Array(usersCount);
    ids.forEach((item, index, arr) => arr[index] = index);

    const promises = ids.map(userId => {
      return userService.getUser(userId)
        .then(user => {
          assert.equal(user, !null);
          assert.equal(user.id, userId);
          return user;
        });
    });

    Promise.all(promises)
      .then(() => done())
      .catch(e => done(e));
  });

  it('should return correct count of users', (done) => {
    userService.getUsers()
      .then(users => {
        assert.notEqual(users, null);
        assert.equal(users.length, usersCount);
      })
      .then(() => done())
      .catch((e) => done(e))
  });

  it('should correctly create user', (done) => {
    const testUser = {
      login: 'John Doe',
      avatarUrl: '//placeimg.com/100/100/people',
      homeFloor: 3
    };

    userService.createUser(testUser)
      .then(createdUser => {
        const { login, avatarUrl, homeFloor } = createdUser;
        assert.deepEqual({ login, avatarUrl, homeFloor }, testUser);
      })
      .then(() => done())
      .catch((e) => done(e))
  });

  it('should correctly update user', (done) => {
    const id = 1;
    const newUserData = {
      login: 'John Doe',
      avatarUrl: '//placeimg.com/100/100/people',
      homeFloor: 3
    };

    userService.updateUser({ id, input: newUserData })
      .then(updatedUser => {
        const { login, avatarUrl, homeFloor } = updatedUser;
        assert.deepEqual({ login, avatarUrl, homeFloor }, newUserData);
      })
      .then(() => {
        userService.getUser(id)
          .then(findedUser => {
            const { login, avatarUrl, homeFloor } = findedUser;
            assert.deepEqual({ login, avatarUrl, homeFloor }, newUserData);
          })
      })
      .then(() => done())
      .catch((e) => done(e))
  });

  it('should correctly delete user', (done) => {
    const id = 1;

    userService
      .removeUser(id)
      .then(() => userService.getUser(id))
      .then(res => assert.isNull(res))
      .then(() => done())
      .catch((e) => done(e))
  });
});
