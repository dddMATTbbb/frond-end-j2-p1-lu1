import StudentCard from "../components/StudentCard.tsx";

export default function DocentPanelPage() {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen w-full">
                <h1 className={'text-2xl font-bold'}>Docent panel</h1>
                <div className="flex gap-3 h-screen w-full p-10">
                    <StudentCard studentId={"todo"} studentEmail={"mra060620@gmail.com"}/>
                </div>
            </div>
        </>
    )
}