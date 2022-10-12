import "../css/home.css"
import { CONFIG } from '../config/config';

const blogSection = document.querySelector<HTMLTableSectionElement>('.blog-section')!;

const createBlogCard = (blog: any) => {

    const url = blog.url;
    const title = blog.title;
    const article = blog.article;
    const banner = blog.banner;

    blogSection.innerHTML +=`
    <div class="blog-card">
        <img src="${banner}" class="blog-image" alt="${banner.split("/").pop()}">
        <h1 class="blog-title">${title.substring(0, 100) + "..."}</h1> 
        <p class="blog-overview">${article.substring(0,200) + "..."}</p>
        <a href="/blog.html#${url}" class="btn dark">Leer</a>
    </div>`

}

const getBlogs = async () => {
    const res = await fetch(CONFIG.get_post, {
        method: "get"
    })
    let data = await res.json();
    if(data.data instanceof Array){
        data = data.data;
        data.forEach((blog: any)=> {
            createBlogCard(blog);
        })
    }
}

getBlogs();