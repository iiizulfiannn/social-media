export default interface Comment {
  id: string;
  message: string;
  owner: {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
  };
  post: string;
  publishDate: string;
}
