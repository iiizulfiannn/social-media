export default interface Post {
  id: string;
  image: string;
  likes: string;
  tags: string[];
  text: string;
  publishDate: string;
  owner: {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
  };
  isLike?: boolean;
}
