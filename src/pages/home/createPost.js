import styles from '@/styles/post.module.css';
import {HiOutlinePhotograph} from 'react-icons/hi';

export default function CreatePost({token}) {

    const userId = token.id;
    const profilePicture = token.profilePicture;

    return (
        <div className={styles.mainPost}>
            <div className={styles.create}>
                <img className={styles.profilePic} src={process.env.NEXT_PUBLIC_API_PIC_URL+profilePicture} alt = {userId} width={41} height={41}/>
                <input className={styles.input} placeholder='Start a post'></input>
            </div>
            <button className={styles.button}>
                <HiOutlinePhotograph className = {styles.icon} size={24}/>
                <p className={styles.buttonText}>Add a photo</p>
            </button>
        </div>
    )
}