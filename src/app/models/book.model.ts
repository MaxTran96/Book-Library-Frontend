class Book {
    _id:string;
    title: string;
    author: string;
    rating: number;
    date: Date;
    status: string;

    constructor(
    ){
        this.title = ""
        this.author = ""
        this.rating = null
        this.date = new Date()
        this.status = ""
    }
}

export default Book;