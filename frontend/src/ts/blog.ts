import "../css/blog.css"
import "../css/editor.css"
import "../css/home.css"
import { CONFIG } from '../config/config';

const blogId = location.hash.split("#").pop();

const blogTitleField = document.querySelector<HTMLHeadingElement>(".title")!;
const articleField = document.querySelector<HTMLParagraphElement>(".article")!;
const banner = document.querySelector<HTMLDivElement>(".banner")!;
const published = document.querySelector<HTMLParagraphElement>(".published")!;
const pageTitle = document.querySelector<HTMLTitleElement>("title")!;

const addArticle = (data: string) => {

    const lines = data.split("\n").filter(item => item.length);
    lines.forEach(line => {
        if(line[0] === "#"){
            let hCount = 0
            for (let index = 0; index < line.length; index++) {
                if(line[index] === "#") hCount++; 
            }
            let tag = `h${hCount}`;
            articleField.innerHTML += `<${tag}>${line.slice(hCount, line.length)}</${tag}>` 
        }
        else if(line.includes("!img")){
            console.log("image")
            const imgName = line.split("[")[1].split("]")[0];
            articleField.innerHTML += `<img src="${CONFIG.public_path}/${imgName}" alt="${imgName}">`
        }else{
            articleField.innerHTML += `<p>${line}</p>`;
        }
    })

}

const updateBlog = async () => {

    const res = await fetch(`${CONFIG.get_post}/${blogId}`, { method: "get" });
    const data = await res.json();
    const post  = data.data;

    pageTitle.innerHTML = post.title;
    banner.style.backgroundImage = `url(${post.banner})`
    blogTitleField.innerHTML = post.title;
    published.innerHTML = post.date;
    addArticle(post.article);
}



updateBlog();