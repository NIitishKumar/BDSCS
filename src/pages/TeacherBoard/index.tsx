import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  BookOpen,
  User,
  Phone,
  Mail,
  Calendar,
  ArrowLeft,
  Filter,
  Download,
  Upload,
  Check,
  X,
  Save,
  UserPlus,
  School,
  Clock,
  MapPin,
  GraduationCap,
  PlayCircle,
  CheckCircle,
  XCircle,
  Calendar as CalendarIcon,
  FileText,
  UserCheck,
  AlertCircle,
  MessageSquare,
  Pause,
} from "lucide-react";

interface Class {
  id: string;
  name: string;
  subject: string;
  grade: string;
  room: string;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  grade: string;
  classId: string;
  phone: string;
  email: string;
  parentName: string;
  parentPhone: string;
  profilePicture?: string;
}

interface Lecture {
  id: string;
  classId: string;
  className: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  topic: string;
  status: "scheduled" | "completed" | "postponed" | "cancelled";
  room: string;
  teacherId: string;
  postponeReason?: string;
}

interface Attendance {
  id: string;
  lectureId: string;
  studentId: string;
  status: "present" | "absent" | "late";
  markedBy: string;
  markedAt: string;
}

const TeacherDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "lecture-detail"
  >("dashboard");
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [showAddLectureForm, setShowAddLectureForm] = useState<boolean>(false);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("all");
  const [lectureStatus, setLectureStatus] = useState<"completed" | "postponed">(
    "completed"
  );
  const [postponeReason, setPostponeReason] = useState<string>("");

  // Current teacher info
  const currentTeacher = {
    id: "teacher1",
    name: "Mrs. Priya Sharma",
    subject: "Mathematics",
  };

  // Sample data
  const [classes] = useState<Class[]>([
    {
      id: "1",
      name: "Mathematics Advanced",
      subject: "Mathematics",
      grade: "Class 10",
      room: "Room 101",
    },
    {
      id: "2",
      name: "Algebra Basics",
      subject: "Mathematics",
      grade: "Class 9",
      room: "Room 102",
    },
    {
      id: "3",
      name: "Geometry",
      subject: "Mathematics",
      grade: "Class 8",
      room: "Room 103",
    },
  ]);

  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "Arjun Patel",
      rollNumber: "BDS001",
      grade: "Class 10",
      classId: "1",
      phone: "9876543210",
      email: "arjun.patel@email.com",
      parentName: "Mr. Suresh Patel",
      parentPhone: "9876543211",
    },
    {
      id: "2",
      name: "Rahul Sharma",
      rollNumber: "BDS003",
      grade: "Class 10",
      classId: "1",
      phone: "7654321098",
      email: "rahul.sharma@email.com",
      parentName: "Mr. Rakesh Sharma",
      parentPhone: "7654321099",
    },
    {
      id: "3",
      name: "Sneha Singh",
      rollNumber: "BDS002",
      grade: "Class 9",
      classId: "2",
      phone: "8765432109",
      email: "sneha.singh@email.com",
      parentName: "Mrs. Kavita Singh",
      parentPhone: "8765432108",
    },
    {
      id: "4",
      name: "Priya Verma",
      rollNumber: "BDS004",
      grade: "Class 8",
      classId: "3",
      phone: "6543210987",
      email: "priya.verma@email.com",
      parentName: "Mrs. Sunita Verma",
      parentPhone: "6543210988",
    },
  ]);

  const [lectures, setLectures] = useState<Lecture[]>([
    {
      id: "1",
      classId: "1",
      className: "Mathematics Advanced",
      title: "Quadratic Equations",
      description: "Introduction to quadratic equations and their solutions",
      date: "2025-08-15",
      startTime: "09:00",
      endTime: "10:00",
      topic: "Algebra",
      status: "completed",
      room: "Room 101",
      teacherId: "teacher1",
    },
    {
      id: "2",
      classId: "1",
      className: "Mathematics Advanced",
      title: "Geometry - Triangles",
      description: "Properties and theorems of triangles",
      date: "2025-08-16",
      startTime: "09:00",
      endTime: "10:00",
      topic: "Geometry",
      status: "scheduled",
      room: "Room 101",
      teacherId: "teacher1",
    },
    {
      id: "3",
      classId: "2",
      className: "Algebra Basics",
      title: "Linear Equations",
      description: "Solving linear equations in one variable",
      date: "2025-08-16",
      startTime: "11:00",
      endTime: "12:00",
      topic: "Algebra",
      status: "scheduled",
      room: "Room 102",
      teacherId: "teacher1",
    },
    {
      id: "4",
      classId: "3",
      className: "Geometry",
      title: "Basic Shapes",
      description: "Introduction to basic geometric shapes",
      date: "2025-08-17",
      startTime: "10:00",
      endTime: "11:00",
      topic: "Geometry",
      status: "postponed",
      room: "Room 103",
      teacherId: "teacher1",
      postponeReason: "Teacher illness",
    },
  ]);

  const [attendance, setAttendance] = useState<Attendance[]>([
    {
      id: "1",
      lectureId: "1",
      studentId: "1",
      status: "present",
      markedBy: "Mrs. Priya Sharma",
      markedAt: "2025-08-15T09:05:00",
    },
    {
      id: "2",
      lectureId: "1",
      studentId: "2",
      status: "absent",
      markedBy: "Mrs. Priya Sharma",
      markedAt: "2025-08-15T09:05:00",
    },
  ]);

  const [tempAttendance, setTempAttendance] = useState<{
    [studentId: string]: "present" | "absent" | "late";
  }>({});

  const [newLecture, setNewLecture] = useState<Partial<Lecture>>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "10:00",
    topic: "",
    classId: "",
    status: "scheduled",
  });

  const handleLectureClick = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    setCurrentView("lecture-detail");

    // Initialize temp attendance
    const lectureStudents = students.filter(
      (s) => s.classId === lecture.classId
    );
    const tempAtt: { [studentId: string]: "present" | "absent" | "late" } = {};

    lectureStudents.forEach((student) => {
      const existingAttendance = attendance.find(
        (a) => a.lectureId === lecture.id && a.studentId === student.id
      );
      tempAtt[student.id] = existingAttendance?.status || "present";
    });

    setTempAttendance(tempAtt);
  };

  const handleAddLecture = () => {
    if (newLecture.title && newLecture.date && newLecture.classId) {
      const selectedClass = classes.find((c) => c.id === newLecture.classId);
      const lectureToAdd: Lecture = {
        id: Date.now().toString(),
        classId: newLecture.classId!,
        className: selectedClass?.name || "",
        title: newLecture.title!,
        description: newLecture.description || "",
        date: newLecture.date!,
        startTime: newLecture.startTime || "09:00",
        endTime: newLecture.endTime || "10:00",
        topic: newLecture.topic || "",
        status: "scheduled",
        room: selectedClass?.room || "",
        teacherId: currentTeacher.id,
      };
      setLectures([...lectures, lectureToAdd]);
      setNewLecture({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        startTime: "09:00",
        endTime: "10:00",
        topic: "",
        classId: "",
        status: "scheduled",
      });
      setShowAddLectureForm(false);
    }
  };

  const deleteLecture = (id: string) => {
    setLectures(lectures.filter((l) => l.id !== id));
    setAttendance(attendance.filter((a) => a.lectureId !== id));
  };

  const saveAttendance = () => {
    if (!selectedLecture) return;

    const lectureStudents = students.filter(
      (s) => s.classId === selectedLecture.classId
    );
    const newAttendanceRecords: Attendance[] = [];

    lectureStudents.forEach((student) => {
      const existingAttendanceIndex = attendance.findIndex(
        (a) => a.lectureId === selectedLecture.id && a.studentId === student.id
      );

      const attendanceRecord: Attendance = {
        id:
          existingAttendanceIndex >= 0
            ? attendance[existingAttendanceIndex].id
            : Date.now().toString() + student.id,
        lectureId: selectedLecture.id,
        studentId: student.id,
        status: tempAttendance[student.id],
        markedBy: currentTeacher.name,
        markedAt: new Date().toISOString(),
      };

      if (existingAttendanceIndex >= 0) {
        const updatedAttendance = [...attendance];
        updatedAttendance[existingAttendanceIndex] = attendanceRecord;
        setAttendance(updatedAttendance);
      } else {
        newAttendanceRecords.push(attendanceRecord);
      }
    });

    if (newAttendanceRecords.length > 0) {
      setAttendance([...attendance, ...newAttendanceRecords]);
    }

    // Show status modal after saving attendance
    setShowStatusModal(true);
  };

  const updateLectureStatus = () => {
    if (!selectedLecture) return;

    const updatedLecture: Lecture = {
      ...selectedLecture,
      status: lectureStatus,
      postponeReason:
        lectureStatus === "postponed" ? postponeReason : undefined,
    };

    setLectures(
      lectures.map((l) => (l.id === selectedLecture.id ? updatedLecture : l))
    );

    setSelectedLecture(updatedLecture);
    setShowStatusModal(false);
    setPostponeReason("");
  };

  const getTodaysLectures = () => {
    const today = new Date().toISOString().split("T")[0];
    return lectures.filter(
      (l) => l.date === today && l.teacherId === currentTeacher.id
    );
  };

  const getUpcomingLectures = () => {
    const today = new Date().toISOString().split("T")[0];
    return lectures.filter(
      (l) => l.date > today && l.teacherId === currentTeacher.id
    );
  };

  const filteredLectures = lectures
    .filter(
      (lecture) =>
        lecture.teacherId === currentTeacher.id &&
        (lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lecture.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lecture.topic.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(
      (lecture) => filterStatus === "all" || lecture.status === filterStatus
    )
    .filter((lecture) => {
      if (filterDate === "all") return true;
      if (filterDate === "today")
        return lecture.date === new Date().toISOString().split("T")[0];
      if (filterDate === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return lecture.date === tomorrow.toISOString().split("T")[0];
      }
      if (filterDate === "week") {
        const today = new Date();
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        return (
          lecture.date >= today.toISOString().split("T")[0] &&
          lecture.date <= weekFromNow.toISOString().split("T")[0]
        );
      }
      return true;
    });

  const lectureStudents = selectedLecture
    ? students.filter((s) => s.classId === selectedLecture.classId)
    : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "postponed":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <CalendarIcon className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "postponed":
        return <Pause className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {currentView === "lecture-detail" && (
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className="mr-4 p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">BDS</span>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {currentView === "dashboard"
                    ? `Welcome, ${currentTeacher.name}`
                    : `${selectedLecture?.title}`}
                </h1>
                <p className="text-gray-600">
                  {currentView === "dashboard"
                    ? `${currentTeacher.subject} Teacher - BDS Convent School`
                    : `${selectedLecture?.className} - ${selectedLecture?.room}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                <Download className="w-4 h-4 mr-2" />
                Export Schedule
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard View */}
        {currentView === "dashboard" && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Today's Lectures</p>
                    <p className="text-3xl font-bold">
                      {getTodaysLectures().length}
                    </p>
                  </div>
                  <CalendarIcon className="w-12 h-12 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Upcoming</p>
                    <p className="text-3xl font-bold">
                      {getUpcomingLectures().length}
                    </p>
                  </div>
                  <PlayCircle className="w-12 h-12 text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Total Classes</p>
                    <p className="text-3xl font-bold">{classes.length}</p>
                  </div>
                  <BookOpen className="w-12 h-12 text-purple-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-100">Completed</p>
                    <p className="text-3xl font-bold">
                      {
                        lectures.filter(
                          (l) =>
                            l.status === "completed" &&
                            l.teacherId === currentTeacher.id
                        ).length
                      }
                    </p>
                  </div>
                  <CheckCircle className="w-12 h-12 text-pink-200" />
                </div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search lectures, classes, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="postponed">Postponed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <select
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="week">This Week</option>
                  </select>
                  <button
                    onClick={() => setShowAddLectureForm(true)}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Lecture
                  </button>
                </div>
              </div>
            </div>

            {/* Lectures List */}
            <div className="space-y-4">
              {filteredLectures.map((lecture) => (
                <div
                  key={lecture.id}
                  onClick={() => handleLectureClick(lecture)}
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <h3 className="text-xl font-bold text-gray-900 mr-4">
                          {lecture.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(
                            lecture.status
                          )}`}
                        >
                          {getStatusIcon(lecture.status)}
                          <span className="ml-2">
                            {lecture.status.charAt(0).toUpperCase() +
                              lecture.status.slice(1)}
                          </span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="font-medium">
                            {lecture.className}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2 text-green-500" />
                          <span>
                            {new Date(lecture.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-purple-500" />
                          <span>
                            {lecture.startTime} - {lecture.endTime}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                          <span>{lecture.room}</span>
                        </div>
                      </div>

                      {lecture.description && (
                        <p className="text-gray-600 mt-3">
                          {lecture.description}
                        </p>
                      )}

                      {lecture.topic && (
                        <div className="mt-3">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                            Topic: {lecture.topic}
                          </span>
                        </div>
                      )}

                      {lecture.postponeReason && (
                        <div className="mt-3 flex items-center text-yellow-700 bg-yellow-50 p-3 rounded-lg">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            Postponed: {lecture.postponeReason}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 ml-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Students</div>
                        <div className="text-lg font-bold text-gray-900">
                          {
                            students.filter(
                              (s) => s.classId === lecture.classId
                            ).length
                          }
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteLecture(lecture.id);
                        }}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center text-blue-600">
                        <span className="text-sm font-medium mr-2">
                          View Details
                        </span>
                        <UserCheck className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredLectures.length === 0 && (
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-12 text-center">
                  <PlayCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">
                    No Lectures Found
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {searchTerm ||
                    filterStatus !== "all" ||
                    filterDate !== "all"
                      ? "Try adjusting your search criteria or filters."
                      : "You don't have any lectures scheduled yet."}
                  </p>
                  <button
                    onClick={() => setShowAddLectureForm(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                  >
                    Add Your First Lecture
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Lecture Detail View */}
        {currentView === "lecture-detail" && selectedLecture && (
          <>
            {/* Lecture Info Header */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 mr-4">
                      {selectedLecture.title}
                    </h2>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${getStatusColor(
                        selectedLecture.status
                      )}`}
                    >
                      {getStatusIcon(selectedLecture.status)}
                      <span className="ml-2">
                        {selectedLecture.status.charAt(0).toUpperCase() +
                          selectedLecture.status.slice(1)}
                      </span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-600">
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-3 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Class</p>
                        <p className="font-semibold">
                          {selectedLecture.className}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-3 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-semibold">
                          {new Date(selectedLecture.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-3 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-semibold">
                          {selectedLecture.startTime} -{" "}
                          {selectedLecture.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-pink-500" />
                      <div>
                        <p className="text-sm text-gray-500">Room</p>
                        <p className="font-semibold">{selectedLecture.room}</p>
                      </div>
                    </div>
                  </div>

                  {selectedLecture.description && (
                    <div className="mt-4">
                      <p className="text-gray-700">
                        {selectedLecture.description}
                      </p>
                    </div>
                  )}
                </div>

                <div className="ml-6">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white text-center">
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-blue-100 text-sm">Students</p>
                    <p className="text-2xl font-bold">
                      {lectureStudents.length}
                    </p>
                  </div>
                </div>
              </div>

              {selectedLecture.postponeReason && (
                <div className="flex items-center text-yellow-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <AlertCircle className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-semibold">Lecture Postponed</p>
                    <p className="text-sm">{selectedLecture.postponeReason}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Students Attendance */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Mark Attendance
                </h3>
                <button
                  onClick={saveAttendance}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Attendance
                </button>
              </div>

              <div className="space-y-4">
                {lectureStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {student.name}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Roll: {student.rollNumber}</span>
                          <span>•</span>
                          <span>{student.phone}</span>
                          <span>•</span>
                          <span>Parent: {student.parentName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          setTempAttendance({
                            ...tempAttendance,
                            [student.id]: "present",
                          })
                        }
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center ${
                          tempAttendance[student.id] === "present"
                            ? "bg-green-500 text-white shadow-lg"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Present
                      </button>
                      <button
                        onClick={() =>
                          setTempAttendance({
                            ...tempAttendance,
                            [student.id]: "late",
                          })
                        }
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center ${
                          tempAttendance[student.id] === "late"
                            ? "bg-yellow-500 text-white shadow-lg"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        }`}
                      >
                        <Clock className="w-5 h-5 mr-2" />
                        Late
                      </button>
                      <button
                        onClick={() =>
                          setTempAttendance({
                            ...tempAttendance,
                            [student.id]: "absent",
                          })
                        }
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center ${
                          tempAttendance[student.id] === "absent"
                            ? "bg-red-500 text-white shadow-lg"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        <XCircle className="w-5 h-5 mr-2" />
                        Absent
                      </button>
                    </div>
                  </div>
                ))}

                {lectureStudents.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">
                      No Students Enrolled
                    </h3>
                    <p className="text-gray-400">
                      This class doesn't have any students enrolled yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Lecture Modal */}
      {showAddLectureForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Add New Lecture
                </h2>
                <button
                  onClick={() => setShowAddLectureForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lecture Title
                  </label>
                  <input
                    type="text"
                    value={newLecture.title || ""}
                    onChange={(e) =>
                      setNewLecture({ ...newLecture, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter lecture title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class
                  </label>
                  <select
                    value={newLecture.classId || ""}
                    onChange={(e) =>
                      setNewLecture({ ...newLecture, classId: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name} - {cls.grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={newLecture.topic || ""}
                    onChange={(e) =>
                      setNewLecture({ ...newLecture, topic: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter topic"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newLecture.date || ""}
                    onChange={(e) =>
                      setNewLecture({ ...newLecture, date: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={newLecture.startTime || ""}
                    onChange={(e) =>
                      setNewLecture({
                        ...newLecture,
                        startTime: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newLecture.endTime || ""}
                    onChange={(e) =>
                      setNewLecture({ ...newLecture, endTime: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newLecture.description || ""}
                  onChange={(e) =>
                    setNewLecture({
                      ...newLecture,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter lecture description"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowAddLectureForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLecture}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
              >
                Add Lecture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lecture Status Modal */}
      {showStatusModal && selectedLecture && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Update Lecture Status
              </h2>
              <p className="text-gray-600 mt-1">
                Mark this lecture as completed or postponed
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Lecture Status
                </label>
                <div className="space-y-3">
                  <div
                    onClick={() => setLectureStatus("completed")}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      lectureStatus === "completed"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <CheckCircle
                        className={`w-5 h-5 mr-3 ${
                          lectureStatus === "completed"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          Mark as Completed
                        </p>
                        <p className="text-sm text-gray-600">
                          Lecture was successfully conducted
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => setLectureStatus("postponed")}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      lectureStatus === "postponed"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-200 hover:border-yellow-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <Pause
                        className={`w-5 h-5 mr-3 ${
                          lectureStatus === "postponed"
                            ? "text-yellow-600"
                            : "text-gray-400"
                        }`}
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          Mark as Postponed
                        </p>
                        <p className="text-sm text-gray-600">
                          Lecture needs to be rescheduled
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {lectureStatus === "postponed" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Postponement
                  </label>
                  <textarea
                    value={postponeReason}
                    onChange={(e) => setPostponeReason(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    rows={3}
                    placeholder="Enter reason for postponing the lecture..."
                    required
                  />
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={updateLectureStatus}
                disabled={
                  lectureStatus === "postponed" && !postponeReason.trim()
                }
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
