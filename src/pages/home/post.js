import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link"


export default function Post({token, post}){
    const img_src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqX-rwj50x1C9EP3pD_oEFvcUqHX_NHmil7sJZ90&s";
    return (
        <>
            <Link href = {"/user/" + post.user.id}>
                <img src = {img_src} alt = {post.user.name} width={41} height={41}/> {post.user.name}
            </Link>
            <p>{post.postedDate}</p>
            <p>{post.content}</p>
        </>
    )

}