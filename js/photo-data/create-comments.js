import {getRandomInteger} from '../util.js';
import {NUMBEROFAVATARS, MESSAGES, NAMES} from './photo-сonstants.js';

export const createArrayComments = (number, count) => (
  [...new Array(getRandomInteger(0, number))].map((_, index) => (
    {
      id: `${index + 1}${count}`,
      avatar: `img/avatar-${getRandomInteger(1, NUMBEROFAVATARS)}.svg`,
      message: `${MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]}`,
      name: NAMES[getRandomInteger(0, NAMES.length - 1)],
    }
  )
  )
);
