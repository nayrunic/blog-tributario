import "../css/editor.css"
import "../css/home.css"
import { CONFIG } from "../config/config"

const blogTitleField = document.querySelector<HTMLTextAreaElement>(".title");
const articleField = document.querySelector<HTMLTextAreaElement>(".article");

const bannerImage = document.querySelector<HTMLInputElement>("#banner-upload");
const banner = document.querySelector<HTMLDivElement>(".banner");

const publishBtn = document.querySelector<HTMLButtonElement>(".btn.dark");
const uploadImageInput = document.querySelector<HTMLInputElement>("#image-upload");

const form = new FormData();
const images: any[] = [];
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
const days = ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

const uploadImage = (uploadFile: any, type: string) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const reader = new FileReader();
        reader.onloadend = function(){
            if(banner) banner.style.backgroundImage = `url(${reader.result})`
        }
        if(file){
            images.push(file);
            if(type!=="img"){
                reader.readAsDataURL(file);
                form.append("banner", `${CONFIG.public_path}/${file.name}`);
                return;
            }
            addImage(file.name);

        }
    }
}

const addImage = (name: string) => {
    if(!articleField) return;
    const cursor = articleField.selectionStart;
    const imageText = `\r!img[${name}]\r`;
    articleField.value = articleField.value.slice(0, cursor) + imageText + articleField.value.slice(cursor);   
}

const uploadBlog = async () => {
    if(blogTitleField && articleField){
        if(blogTitleField.value === "" && articleField.value === ""){
            alert("El título y el artículo no pueden estar vacíos")
            return;
        }

        const date = new Date();
        const url = blogTitleField.value.split(" ").join("-").toLocaleLowerCase();

        form.append("title", blogTitleField.value);
        form.append("article", articleField.value);
        form.append("date", `Publicado el ${days[date.getDay()]} ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()} a las ${date.getHours()}:${date.getMinutes()}`)
        form.append("url", url);

        images.forEach(image => {
            form.append(`img-${image.name}`, image)
        })

        const res = await fetch(CONFIG.create_post,{
            method: "post",
            body: form
        })

        const data = await res.json();

        if(data.status === "500"){
            alert("Hubo un error al intentar guardar el post, intentalo más tarde.")
            return;
        }

        location.href = `/blog.html#${url}`
    }
}

uploadImageInput?.addEventListener("change", () => {
    uploadImage(uploadImageInput, "img");
    uploadImageInput.value = "";
})

bannerImage?.addEventListener("change", () => {
    uploadImage(bannerImage, "banner");
})

publishBtn?.addEventListener("click", async () => {
    uploadBlog();
})

