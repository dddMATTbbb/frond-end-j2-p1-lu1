import { useEffect, useState } from "react";
import {getStudents} from "../services/DocentService.ts";
import type {Student} from "../types/student.ts";

export function useDocentPanel() {
    const [loading, setLoading] = useState<boolean>(false);
    const [students, setStudents] = useState<Student[]>([]);
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

    return {loading, students};
}