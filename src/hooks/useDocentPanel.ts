import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {getStudents} from "../services/DocentService.ts";
import type {Student} from "../types/student.ts";

export function useDocentPanel() {
    const [loading, setLoading] = useState<boolean>(false);
    const [students, setStudents] = useState<Student[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadStudentData() {
            try{
                const students:Student[] = await getStudents()
                setStudents(students)
            } catch (error){
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadStudentData();
    }, [])

    const onClickButton = (id:string) => {
        navigate(`/student/${id}`)
    }

    return {loading, students, onClickButton};
}