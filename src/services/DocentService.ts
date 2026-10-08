import type {Boek} from "../types/boeken.ts";

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

export const getBoekenStudent = async(id: string) => {
    try{
        const response = await fetch(`http://localhost:3000/getBoekenStudent?studentId=${id}`, {
            method: "GET",
            credentials: "include"
        })

        if(!response.ok){
            const error = await response.json()
            throw new Error('getBoekenStudent Error' + error.message);
        }

        const data: Boek[] = await response.json();
        return data
    } catch (error){
        console.error(error);
    }
}

export const updateLeeslijstStudent = async(studentId:string, boekId:string, isBookmarked:boolean) => {
    isBookmarked = !isBookmarked;
    try{
        const response = await fetch(`http://localhost:3000/updateStudentLeeslijst`, {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({studentId: studentId, boekId: boekId ,isBookmarked: isBookmarked})
        })

        if(!response.ok){
            const error = await response.json()
            throw new Error('updateStudentLeeslijst Error' + error.message);
        }

        return await response.json()
    } catch (error){
        console.error(error);
    }
}