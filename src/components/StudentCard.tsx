interface StudentCardProps {
    studentId: string;
    studentEmail: string;
    coverUrl?: string;
}
export default function StudentCard({studentEmail, coverUrl}: StudentCardProps) {
    return (
        <>
            <div className="flex flex-col h-fit w-fit border-3 rounded-md py-3 px-1">
                <img
                    src={coverUrl ?? "../src/assets/defaultProfilePic.jpg"}
                    loading="lazy"
                    className="w-60 h-auto rounded-md"
                />
                <p>email: {studentEmail}</p>
                <button className={"bg-orange-400 mt-4 p-2 rounded-md"}>Naar student gaan</button>
            </div>
        </>
    )
}