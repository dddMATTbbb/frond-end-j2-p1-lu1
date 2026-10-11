import StudentCard from "../components/StudentCard.tsx";
import {useDocentPanel} from "../hooks/useDocentPanel.ts";
import type {Student} from "../types/student.ts";
import BoekCardSkeleton from "../components/BoekCardSkeleton.tsx";

export default function DocentPanelPage() {
    const {loading, students, onClickButton} = useDocentPanel();
    const SKELETON_KEYS = Array.from({ length: 30 }, (_, i) => `skeleton-${i}`);

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen w-full">
                <h1 className={'text-2xl font-bold'}>Docent panel</h1>
                <div className="flex gap-5 h-screen w-full p-10">
                    {loading ? SKELETON_KEYS.map((key) => <BoekCardSkeleton key={key} />) : (
                        students.map((student: Student) => (
                            <StudentCard key={student.id} onClickButton={() => onClickButton(student.id)} studentId={student.id} studentEmail={student.email} />
                        ))
                    )}
                </div>
            </div>
        </>
    )
}