import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link"


export default function Post({token, post}){
    console.log("post: " + post.user.profilePicture)
    const imgs = post.images.split(",");
    return (
        <>
            <div>
                <Link href = {"/user/" + post.user.id}>
                    <img src={process.env.NEXT_PUBLIC_API_PIC_URL+post.user.profilePicture} alt = {post.user.name} width={41} height={41}/> {post.user.name}
                </Link>
            </div>
            {imgs.map((img) => <img src={process.env.NEXT_PUBLIC_API_PIC_URL+img} alt = {post.user.name} width={200} height={200}/>)}
            <p>{post.postedDate}</p>
            <p>{post.content}</p>
        </>
    )

}