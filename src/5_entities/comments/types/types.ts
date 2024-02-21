export interface IComment {
    id: string;
    createdAt: Date;
    text: string;
    stars: number;
    author: IAuthor;
    productCardId: string;
    likes: ILikes;
    dislikes: IDislikes;
    subcomments: ISubcomment[];
}

interface IAuthor {
    id: string;
    firstName: string;
    lastName: string;
}

interface ILikes {
    id: string;
    commentId: string;
    items: ILikesDislikesItems[]
}
interface IDislikes {
    id: string;
    commentId: string;
    items: ILikesDislikesItems[]
}

interface ILikesDislikesItems {
    id: string;
}

interface ISubcomment {
    id: string;
    createdAt: Date;
    text: string;
    commentId: string;
}