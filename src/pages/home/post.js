import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link"

import {AiOutlineLike, AiTwotoneLike} from "react-icons/ai"
import {MdOutlineInsertComment, MdInsertComment} from "react-icons/md"
import {BsShare, BsShareFill} from "react-icons/bs"


import styles from '@/styles/post.module.css';

function handleLikeButton(){
    console.log("like")
}

function handleCommentButton(){
    console.log("comment")
}

function handleShareButton(){
    console.log("share")
}

export default function Post({token, post}){
    console.log("post: " + post.user.profilePicture)
    const imgs = post.images.split(",");
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
            <div className={styles.buttonLayout}>
                <button className={styles.button} onClick={handleLikeButton}>
                    <AiOutlineLike className = {styles.icon} size={24}/>
                    <p className={styles.buttonText}>Like</p>
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