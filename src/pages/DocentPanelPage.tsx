import StudentCard from "../components/StudentCard.tsx";
import {useDocentPanel} from "../hooks/useDocentPanel.ts";
import type {Student} from "../types/student.ts";

export default function DocentPanelPage() {
    const {loading, students} = useDocentPanel();
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen w-full">
                <h1 className={'text-2xl font-bold'}>Docent panel</h1>
                <div className="flex gap-5 h-screen w-full p-10">
                    {
                        students.map((student: Student) => (
                            <StudentCard studentId={student.id} studentEmail={student.email} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}