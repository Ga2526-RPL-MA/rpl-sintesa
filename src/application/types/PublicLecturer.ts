import Lecturer from "@/src/domain/entities/Lecturer";

type PublicLecturer = Pick<Lecturer, 'nip' | 'name'>

export default PublicLecturer;