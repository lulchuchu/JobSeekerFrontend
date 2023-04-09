import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link"

import {AiOutlineLike, AiTwotoneLike} from "react-icons/ai"
import {MdOutlineInsertComment, MdInsertComment} from "react-icons/md"
import {BsShare, BsShareFill} from "react-icons/bs"

import styles from '@/styles/post.module.css';


export default function Post({token, post}){
    const [isLiked, setIsLiked] = useState(false);
    const [countLike, setCountLike] = useState(post.likeCount);
    const [countComment, setCountComment] = useState(post.commentCount);
    const postId = post.id;
    useEffect(()=>{
        if(token && postId){
            const isLiked = async () => {
                const res = await axios.get(process.env.NEXT_PUBLIC_API_LIKE_URL + 'checkLiked',
                    {headers: {"Authorization" : `Bearer ${token.accessToken}`} , params: {postId: postId}});
                    setIsLiked(res.data);
                }
            isLiked();
        }
    }, [token, postId])

    const imgs = post.images.split(",");

    function handleLikeButton(){
        const like = async () => {
            const res = axios.post(process.env.NEXT_PUBLIC_API_LIKE_URL+'create?postId=' + postId, {}, {headers: {"Authorization" : `Bearer ${token.accessToken}`}});
        }
        like();
        isLiked ? setCountLike(countLike-1):setCountLike(countLike+1)
        setIsLiked(!isLiked);
    }

    function handleCommentButton(){

    }

    function handleShareButton(){

    }

    return (
        <div className={styles.mainPost}>
            <div className = {styles.info}>
                <Link href = {"/user/" + post.user.id}>
                    <img className = {styles.profilePic} src={process.env.NEXT_PUBLIC_API_PIC_URL+post.user.profilePicture} alt = {post.user.name} width={41} height={41}/>
                </Link>
                <div>
                    <h3 className={styles.userName}>{post.user.name}</h3>
                    <p className={styles.postedDate}>{post.postedDate}</p>
                </div>
            </div>            

            <p className={styles.content}>{post.content}</p>
            {imgs.map((img) => <img src={process.env.NEXT_PUBLIC_API_PIC_URL+img} alt = {post.user.name} width={200} height={200}/>)}
            <div className={styles.infoReact}>
                <div className={styles.like}>{countLike} likes</div>
                <div className={styles.comment}>{countComment} comments</div>
            </div>
            <div className={styles.buttonLayout}>
                <button className={styles.button} onClick={handleLikeButton}>
                    {isLiked ?  <AiTwotoneLike className = {styles.icon} size={24}/>:<AiOutlineLike className = {styles.icon} size={24}/>}
                    <p className={styles.buttonText}>{isLiked? 'Liked':'Like'}</p>
                </button>
                <button className={styles.button} onClick={handleCommentButton}>
                    <MdOutlineInsertComment className = {styles.icon} size={24}/>
                    <p className={styles.buttonText}>Comment</p>
                </button>
                <button className={styles.button} onClick={handleShareButton}>
                    <BsShare className = {styles.icon} size={24}/>
                    <p className={styles.buttonText}>Share</p>
                </button>
            </div>
        </div>
    )

}