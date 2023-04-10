import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link"

import {AiOutlineLike, AiTwotoneLike} from "react-icons/ai"
import {MdOutlineInsertComment, MdInsertComment} from "react-icons/md"
import {IoSend} from "react-icons/io5"
import {BsShare, BsShareFill} from "react-icons/bs"

import styles from '@/styles/post.module.css';


export default function Post({token, post}){
    const [isLiked, setIsLiked] = useState(false);
    const [countLike, setCountLike] = useState(post.likeCount);
    const [countComment, setCountComment] = useState(post.commentCount);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    
    const postId = post.id;
    const imgs = post.images.split(",");

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


    function handleLikeButton(){
        const like = async () => {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_LIKE_URL+'create?postId=' + postId, {}, {headers: {"Authorization" : `Bearer ${token.accessToken}`}});
        }
        like();
        isLiked ? setCountLike(countLike-1):setCountLike(countLike+1)
        setIsLiked(!isLiked);
    }
    


    function handleCommentButton(){
        const comment = async() => {
            const result = await axios.get(process.env.NEXT_PUBLIC_API_COMMENT_URL + 'show', {headers:{"Authorization" : `Bearer ${token.accessToken}`}, params:{postId: postId}})
            console.log(result.data);
            setComments(result.data);
        }
        comment();
        console.log("running comment button")
    }

    function handleShareButton(){

    }

    async function handleSendButton(){
        const data = {
            "contents": commentContent,
            "postId": postId,
        }
        const send = async() => {
            const result = axios.post(process.env.NEXT_PUBLIC_API_COMMENT_URL + 'post', data, {headers:{"Authorization" : `Bearer ${token.accessToken}`}})
            handleCommentButton();
        }
        await send();
        setCountComment(countComment+1);
        handleCommentButton();
        // console.log("hit the wowo")
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
                <div className={styles.countLike}>{countLike} likes</div>
                <div className={styles.countComment}>{countComment} comments</div>
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
            {/* {console.log(comments)} */}
            <div className={styles.commentLayout}>
                {comments != undefined ? comments.map((comment) => (
                    <div className={styles.comment}>
                        <img className={styles.commentProfilePic} src={process.env.NEXT_PUBLIC_API_PIC_URL+comment.userProfilePicture} alt = {comment.userName} width={41} height={41}/>
                        <div className={styles.commentBody}>
                            <p className={styles.userName}>{comment.userName}</p>
                            <p className={styles.commentContent}>{comment.contents}</p>
                        </div>
                    </div>
                )):null}
            </div>
            <div className={styles.create}>
                <img className={styles.profilePic} src={process.env.NEXT_PUBLIC_API_PIC_URL+token.profilePicture} alt = {token.id} width={41} height={41}/>
                <input className={styles.input} placeholder='Write a comment' onChange={(e) => setCommentContent(e.target.value)}></input>
                <Link href = "">
                    <div onClick={handleSendButton}>
                        <IoSend className = {styles.sendIcon} size={24}/>
                    </div>
                </Link>
            </div>

        </div>
    )

}