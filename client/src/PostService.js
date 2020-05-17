import axios from 'axios'

const url = 'api/posts/';

class PostService{
    //Get Posts
    static getPosts(){
        //eslint-disable-next-line
        return new Promise(async (resolve , reject) => {
            try{
                const res = await axios.get(url);
                const data=  res.data;
                resolve(
                    data.map(post => ({
                        ...post, 
                        createdAt: new Date(post.createdAt)
                    }))
                )
                }catch(err){
               reject(err);  
            }
        })
    }

    // insert Posts
    static insertPost(text){
        return axios.post(url , {
            text
        });
    }

    //delete Posts
    static deletePost(id){
        return axios.delete(`${url}${id}`);
    }
    
}
export default PostService ;