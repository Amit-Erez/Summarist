import styles from "./book.module.css"
import { Book } from "@/types/book";
import { LuClock3 } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineMicrophone } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuBookOpenText } from "react-icons/lu";
import { BsBookmark } from "react-icons/bs";

export default async function BookInfo({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
        { cache: "no-store" }
      );
      const book: Book = await res.json();
      console.log(book)

    return (
        <div className={styles.row}>
            <div className={styles.container}>
                <div className={styles.inner__wrapper}>
                    <div className={styles.inner__book}>
                        <div className={styles["inner__book--title"]}>{book.title}</div>
                        <div className={styles["inner__book--author"]}>{book.author}</div>
                        <div className={styles["inner__book--sub-title"]}>{book.subTitle}</div>
                        <div className={styles["inner__book--wrapper"]}>
                            <div className={styles["inner__book--description-wrapper"]}>
                                <div className={styles["inner__book--description"]}>
                                    <div className={styles["inner__book--icon"]}><FaRegStar /></div>
                                    <div className={styles["inner__book--overall-rating"]}>{book.averageRating}</div>
                                    <div className={styles["inner__book--total-rating"]}>
                                        &nbsp;({book.totalRating} ratings)
                                    </div>
                                </div>
                                <div className={styles["inner__book--description"]}>
                                    <div className={styles["inner__book--icon"]}><LuClock3 /></div>
                                    <div className={styles["inner__book--duration"]}>03:24</div>
                                </div>
                                <div className={styles["inner__book--description"]}>
                                    <div className={styles["inner__book--icon"]}><HiOutlineMicrophone /></div>
                                    <div className={styles["inner__book--type"]}>{book.type}</div>
                                </div>
                                <div className={styles["inner__book--description"]}>
                                    <div className={styles["inner__book--icon"]}><HiOutlineLightBulb /></div>
                                    <div className={styles["inner__book--key-ideas"]}>{book.keyIdeas}&nbsp;Key ideas</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles["inner__book--read-btn-wrapper"]}>
                            <button className={styles["inner__book--read-btn"]}>
                                <div className={styles["inner__book--read-icon"]}><LuBookOpenText /></div>
                                <div className={styles["inner__book--read-text"]}>Read</div>
                            </button>
                            <button className={styles["inner__book--read-btn"]}>
                               <div className={styles["inner__book--read-icon"]}><HiOutlineMicrophone /></div> 
                               <div className={styles["inner__book--read-text"]}>Listen</div>
                            </button>
                        </div>
                        <div className={styles["inner__book--bookmark"]}>
                            <div className={styles["inner__book--bookmark-icon"]}><BsBookmark /></div>
                            <div className={styles["inner__book--bookmark-text"]}>Add title to My Library</div>
                        </div>
                        <div className={styles["inner__book--secondary-title"]}>
                            What's it about?
                        </div>
                        <div className={styles["inner__book--tags-wrapper"]}>
                            <div className={styles["inner__book--tag"]}>{book.tags[0]}</div>
                            <div className={styles["inner__book--tag"]}>{book.tags[1]}</div>
                        </div>
                        <div className={styles["inner__book--book-description"]}>{book.bookDescription}</div>
                        <div className={styles["inner__book--secondary-title"]}>
                            About the author
                        </div>
                        <div className={styles["inner__book--author-description"]}>{book.authorDescription}</div>
                    </div>
                    <div className={styles["inner__book--img-wrapper"]}>
                        <figure className={styles["book__image--wrapper"]}>
                            <img className={styles.book__image} src={book.imageLink} alt="book" />
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    )
}