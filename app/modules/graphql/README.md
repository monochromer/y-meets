# Примеры запросов GraphQL

``` gparhql
# ==============
# user
# ==============

query {
  users {
    id
    login
    homeFloor
    # avatarUrl
  }

  user(id: 1) {
    login
  }
}

mutation {
  createUser(input: {
    login: "John Romero",
    avatarUrl: "",
    homeFloor: 4
  }) {
    id
  }
}

mutation {
  updateUser(
    id: 4,
    input: {
      login: "Jack Silver",
      avatarUrl: "tandex.ri",
      homeFloor: 7
    }
  ) {
    id
  }
}

mutation {
  removeUser(id: 4) {
    id
  }
}


# ==============
# room
# ==============

query {
  rooms {
    id
    title
    capacity
    floor
  }

  # room(id: 2) {
  #   id
  #   title
  #   capacity
  #   floor
  # }
}

mutation {
  createRoom(input: {
    title: "Переводчик",
    floor: 23,
    capacity: 12
  }) {
    id
  }
}

mutation {
  updateRoom(
    id: 5
    input: {
      floor: 4
      capacity: 5
      title: "Awa"
    }
  ) {
    id
  }
}

mutation {
  removeRoom(id: 6) {
    id
  }
}


# ==============
# event
# ==============

query {
 events {
  id
  title
  room {
    id
  }
  dateStart
  dateEnd
  users {
    id
    login
  }
 }
}

mutation {
  createEvent(
    input: {
      title: "Кофепитие"
      dateStart: "2017-12-20T14:46:57.756Z",
      dateEnd: "2017-12-20T15:00:00.756Z"
    }
    usersIds: [1, 2]
    roomId: 1
  ) {
    id
  }
}

mutation {
  updateEvent(
    id: 1,
    input: {
      title: "ШРИ 2018 - Школа разработки интерфейсов",
      dateStart: "2017-12-17T08:53:47.860Z",
      dateEnd: "2017-12-17T10:53:47.860Z"
    }
  ) {
    id
  }
}

mutation {
  removeEvent(id: 1)
}

mutation {
  changeEventRoom(
    id: 1,
    roomId: 2) {
    id
  }
}

mutation {
  addUserToEvent(
    id: 1
    userId: 4
  ) {
    id
  }
}

mutation {
  removeUserFromEvent(
    id: 1
    userId: 4
  ) {
   id
  }
}
```
