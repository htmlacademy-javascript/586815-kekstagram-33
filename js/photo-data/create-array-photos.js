import {getRandomInteger} from '../util.js';
import {COUNTER,MAXNUMBEROFCOMMENTS, PHOTODESCRIPTION, Likes} from './photo-сonstants.js';
import {createArrayComments} from './create-comments.js';

const createArrayPhotos = (number) => (
  [...new Array(number)].map((_, index) => (
    {
      id: `${index + 1}`,
      url: `photos/${index + 1}.jpg`,
      description: PHOTODESCRIPTION[getRandomInteger(1, index + 1)],
      likes: getRandomInteger(Likes.MIN, Likes.MAX),
      comments: createArrayComments(getRandomInteger(0, MAXNUMBEROFCOMMENTS), index + 1),
    }
  )
  )
);

export const photos = createArrayPhotos(COUNTER);


