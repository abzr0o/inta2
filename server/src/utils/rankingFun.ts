const likeWegiht = 1;
const commentsWegiht = 2;
const gravity = 0.2;

const ranking = (
  likes: number | any,
  comments: number | any,
  days: Date | any
): number => {
  const now = new Date();
  const time = now.getTime() - days.getTime();
  const day = time / (1000 * 60 * 60 * 24);

  const result =
    (likes * likeWegiht + comments * commentsWegiht) / (day * gravity);
  return result;
};

export default ranking;
