export const getStudents = async() => {
    try{
        const response = await fetch("http://localhost:3000/getStudents", {
            method: "GET",
            credentials: "include"
        })

        if(!response.ok){
            console.log('get students error');
        }

        return await response.json()
    } catch (error){
        console.error(error);
    }
}