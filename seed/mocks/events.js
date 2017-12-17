const eventsNames = [
  'ШРИ 2018 - начало',
  '👾 Хакатон 👾',
  '🍨 Пробуем kefir.js'
];

const HOUR = 60 * 60 * 1000;
let now = new Date().getTime();

const eventsMock = eventsNames.reduce((acc, title, index) => {
  return [
    ...acc,
    {
      title,
      dateStart: new Date(now + index * HOUR),
      dateEnd: new Date(now + (index + 1) * HOUR)
    }
  ];
}, []);

module.exports = eventsMock;
