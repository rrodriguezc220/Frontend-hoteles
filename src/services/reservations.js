const PATH = 'https://jsonplaceholder.typicode.com/posts';

export const getReservations = async () => {
    let data = await fetch(PATH)
  let posts = await data.json()
    return posts;
};