import React, { useState } from "react";
import {
  Search,
  Users,
  BookOpen,
  User,
  Phone,
  Mail,
  Calendar,
  ArrowLeft,
  Filter,
  Download,
  GraduationCap,
  PlayCircle,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  UserCheck,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Award,
  Star,
  FileText,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  grade: string;
  phone: string;
  email: string;
  parentName: string;
  parentPhone: string;
  profilePicture?: string;
}

interface Class {
  id: string;
  name: string;
  teacher: string;
  subject: string;
  grade: string;
  room: string;
  schedule: string;
  description?: string;
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
  teacherName: string;
}

interface Attendance {
  id: string;
  lectureId: string;
  studentId: string;
  status: "present" | "absent" | "late";
  markedBy: string;
  markedAt: string;
}

const ParentDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "class-detail">(
    "dashboard"
  );
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedChild, setSelectedChild] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("all");

  // Current parent info
  const currentParent = {
    id: "parent1",
    name: "Mr. Suresh Patel",
    phone: "9876543211",
    email: "suresh.patel@email.com",
  };

  // Sample data - Parent's children
  const [children] = useState<Student[]>([
    {
      id: "1",
      name: "Arjun Patel",
      rollNumber: "BDS001",
      grade: "Class 10",
      phone: "9876543210",
      email: "arjun.patel@email.com",
      parentName: "Mr. Suresh Patel",
      parentPhone: "9876543211",
    },
    {
      id: "5",
      name: "Ananya Patel",
      rollNumber: "BDS005",
      grade: "Class 7",
      phone: "9876543212",
      email: "ananya.patel@email.com",
      parentName: "Mr. Suresh Patel",
      parentPhone: "9876543211",
    },
  ]);

  // Classes data
  const [classes] = useState<Class[]>([
    {
      id: "1",
      name: "Mathematics Advanced",
      teacher: "Mrs. Priya Sharma",
      subject: "Mathematics",
      grade: "Class 10",
      room: "Room 101",
      schedule: "Mon, Wed, Fri - 9:00 AM",
      description:
        "Advanced mathematics covering algebra, geometry, and calculus basics",
    },
    {
      id: "4",
      name: "Science Foundation",
      teacher: "Dr. Ravi Kumar",
      subject: "Science",
      grade: "Class 7",
      room: "Lab 2",
      schedule: "Tue, Thu - 10:00 AM",
      description: "Basic science concepts and practical experiments",
    },
  ]);

  // Lectures data
  const [lectures] = useState<Lecture[]>([
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
      teacherName: "Mrs. Priya Sharma",
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
      status: "completed",
      room: "Room 101",
      teacherName: "Mrs. Priya Sharma",
    },
    {
      id: "3",
      classId: "1",
      className: "Mathematics Advanced",
      title: "Statistics Basics",
      description: "Introduction to statistical concepts",
      date: "2025-08-17",
      startTime: "09:00",
      endTime: "10:00",
      topic: "Statistics",
      status: "scheduled",
      room: "Room 101",
      teacherName: "Mrs. Priya Sharma",
    },
    {
      id: "4",
      classId: "4",
      className: "Science Foundation",
      title: "Plant Structure",
      description: "Understanding plant anatomy and functions",
      date: "2025-08-15",
      startTime: "10:00",
      endTime: "11:00",
      topic: "Biology",
      status: "completed",
      room: "Lab 2",
      teacherName: "Dr. Ravi Kumar",
    },
    {
      id: "5",
      classId: "4",
      className: "Science Foundation",
      title: "Chemical Reactions",
      description: "Basic chemical reactions and their properties",
      date: "2025-08-16",
      startTime: "10:00",
      endTime: "11:00",
      topic: "Chemistry",
      status: "postponed",
      room: "Lab 2",
      teacherName: "Dr. Ravi Kumar",
    },
  ]);

  // Attendance data
  const [attendance] = useState<Attendance[]>([
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
      lectureId: "2",
      studentId: "1",
      status: "late",
      markedBy: "Mrs. Priya Sharma",
      markedAt: "2025-08-16T09:10:00",
    },
    {
      id: "3",
      lectureId: "4",
      studentId: "5",
      status: "present",
      markedBy: "Dr. Ravi Kumar",
      markedAt: "2025-08-15T10:05:00",
    },
  ]);

  const handleClassClick = (classData: Class, child: Student) => {
    setSelectedClass(classData);
    setSelectedChild(child);
    setCurrentView("class-detail");
  };

  const getChildClasses = (childId: string) => {
    const child = children.find((c) => c.id === childId);
    if (!child) return [];
    return classes.filter((cls) => cls.grade === child.grade);
  };

  const getClassLectures = (classId: string) => {
    return lectures.filter((lecture) => lecture.classId === classId);
  };

  const getStudentAttendance = (studentId: string, lectureId: string) => {
    return attendance.find(
      (att) => att.studentId === studentId && att.lectureId === lectureId
    );
  };

  const getAttendanceStats = (studentId: string, classId: string) => {
    const classLectures = lectures.filter(
      (l) => l.classId === classId && l.status === "completed"
    );
    const studentAttendance = attendance.filter(
      (a) =>
        a.studentId === studentId &&
        classLectures.some((l) => l.id === a.lectureId)
    );

    const totalLectures = classLectures.length;
    const presentCount = studentAttendance.filter(
      (a) => a.status === "present"
    ).length;
    const lateCount = studentAttendance.filter(
      (a) => a.status === "late"
    ).length;
    const absentCount = studentAttendance.filter(
      (a) => a.status === "absent"
    ).length;

    const attendancePercentage =
      totalLectures > 0
        ? Math.round(((presentCount + lateCount) / totalLectures) * 100)
        : 0;

    return {
      totalLectures,
      presentCount,
      lateCount,
      absentCount,
      attendancePercentage,
    };
  };

  const getOverallAttendanceStats = (studentId: string) => {
    const child = children.find((c) => c.id === studentId);
    if (!child) return { totalLectures: 0, attendancePercentage: 0 };

    const childClasses = getChildClasses(studentId);
    let totalLectures = 0;
    let totalPresent = 0;
    let totalLate = 0;

    childClasses.forEach((cls) => {
      const stats = getAttendanceStats(studentId, cls.id);
      totalLectures += stats.totalLectures;
      totalPresent += stats.presentCount;
      totalLate += stats.lateCount;
    });

    const overallPercentage =
      totalLectures > 0
        ? Math.round(((totalPresent + totalLate) / totalLectures) * 100)
        : 0;

    return {
      totalLectures,
      attendancePercentage: overallPercentage,
    };
  };

  const filteredLectures = selectedClass
    ? lectures
        .filter(
          (lecture) =>
            lecture.classId === selectedClass.id &&
            (lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              lecture.topic.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .filter(
          (lecture) => filterStatus === "all" || lecture.status === filterStatus
        )
        .filter((lecture) => {
          if (filterDate === "all") return true;
          if (filterDate === "completed") return lecture.status === "completed";
          if (filterDate === "week") {
            const today = new Date();
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return new Date(lecture.date) >= weekAgo;
          }
          return true;
        })
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

  const getAttendanceStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "late":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "absent":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-700";
      case "late":
        return "bg-yellow-100 text-yellow-700";
      case "absent":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {currentView === "class-detail" && (
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
                    ? `Welcome, ${currentParent.name}`
                    : `${selectedClass?.name} - Lectures`}
                </h1>
                <p className="text-gray-600">
                  {currentView === "dashboard"
                    ? "Track your child's academic progress at BDS Convent School"
                    : `${selectedChild?.name}'s attendance in ${selectedClass?.subject}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard View */}
        {currentView === "dashboard" && (
          <>
            {/* Parent Info Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mr-6">
                    {currentParent.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {currentParent.name}
                    </h2>
                    <div className="flex items-center space-x-4 text-gray-600 mt-1">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{currentParent.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{currentParent.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Children</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {children.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Children Overview */}
            <div className="space-y-8">
              {children.map((child) => {
                const childClasses = getChildClasses(child.id);
                const overallStats = getOverallAttendanceStats(child.id);

                return (
                  <div
                    key={child.id}
                    className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden"
                  >
                    {/* Child Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-2xl mr-6">
                            {child.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{child.name}</h3>
                            <div className="flex items-center space-x-4 text-blue-100 mt-1">
                              <span>Roll No: {child.rollNumber}</span>
                              <span>•</span>
                              <span>{child.grade}</span>
                              <span>•</span>
                              <span>{child.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                            <p className="text-blue-100 text-sm">
                              Overall Attendance
                            </p>
                            <p className="text-3xl font-bold">
                              {overallStats.attendancePercentage}%
                            </p>
                            <p className="text-blue-200 text-xs">
                              {overallStats.totalLectures} Total Lectures
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Child's Classes */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-bold text-gray-900">
                          Enrolled Classes
                        </h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {childClasses.length} Classes
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {childClasses.map((classItem) => {
                          const attendanceStats = getAttendanceStats(
                            child.id,
                            classItem.id
                          );
                          const completedLectures = getClassLectures(
                            classItem.id
                          ).filter((l) => l.status === "completed");

                          return (
                            <div
                              key={classItem.id}
                              onClick={() => handleClassClick(classItem, child)}
                              className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                                  <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    attendanceStats.attendancePercentage >= 80
                                      ? "bg-green-100 text-green-700"
                                      : attendanceStats.attendancePercentage >=
                                        60
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {attendanceStats.attendancePercentage}%
                                  Attendance
                                </span>
                              </div>

                              <h5 className="text-lg font-bold text-gray-900 mb-2">
                                {classItem.name}
                              </h5>
                              <p className="text-sm text-gray-600 mb-4">
                                {classItem.subject} • {classItem.teacher}
                              </p>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center text-gray-600">
                                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                                  <span>{classItem.room}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock className="w-4 h-4 mr-2 text-green-500" />
                                  <span>
                                    {classItem.schedule.split(" - ")[1]}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">
                                    Lectures Attended
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {attendanceStats.presentCount +
                                      attendanceStats.lateCount}
                                    /{attendanceStats.totalLectures}
                                  </span>
                                </div>
                                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${attendanceStats.attendancePercentage}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>

                              <div className="mt-4 flex justify-between text-xs text-gray-500">
                                <span>
                                  📚 {completedLectures.length} lectures
                                  completed
                                </span>
                                <span className="text-blue-600 font-medium">
                                  View Details →
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {childClasses.length === 0 && (
                        <div className="text-center py-8">
                          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-500 mb-2">
                            No Classes Enrolled
                          </h3>
                          <p className="text-gray-400">
                            This student is not enrolled in any classes yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Class Detail View */}
        {currentView === "class-detail" && selectedClass && selectedChild && (
          <>
            {/* Class Info Header */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mr-6">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedClass.name}
                    </h2>
                    <p className="text-gray-600 mb-3">
                      {selectedClass.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span>{selectedClass.teacher}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{selectedClass.schedule}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{selectedClass.room}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        <span>{selectedClass.grade}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                    <UserCheck className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-green-100 text-sm">Attendance Rate</p>
                    <p className="text-2xl font-bold">
                      {
                        getAttendanceStats(selectedChild.id, selectedClass.id)
                          .attendancePercentage
                      }
                      %
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Info & Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Lectures</p>
                    <p className="text-3xl font-bold">
                      {
                        getAttendanceStats(selectedChild.id, selectedClass.id)
                          .totalLectures
                      }
                    </p>
                  </div>
                  <PlayCircle className="w-12 h-12 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Present</p>
                    <p className="text-3xl font-bold">
                      {
                        getAttendanceStats(selectedChild.id, selectedClass.id)
                          .presentCount
                      }
                    </p>
                  </div>
                  <CheckCircle className="w-12 h-12 text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100">Late</p>
                    <p className="text-3xl font-bold">
                      {
                        getAttendanceStats(selectedChild.id, selectedClass.id)
                          .lateCount
                      }
                    </p>
                  </div>
                  <Clock className="w-12 h-12 text-yellow-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100">Absent</p>
                    <p className="text-3xl font-bold">
                      {
                        getAttendanceStats(selectedChild.id, selectedClass.id)
                          .absentCount
                      }
                    </p>
                  </div>
                  <XCircle className="w-12 h-12 text-red-200" />
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
                    placeholder="Search lectures or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="postponed">Postponed</option>
                  </select>
                  <select
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Lectures</option>
                    <option value="completed">Completed Only</option>
                    <option value="week">This Week</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lectures List */}
            <div className="space-y-4">
              {filteredLectures.map((lecture) => {
                const studentAttendance = getStudentAttendance(
                  selectedChild.id,
                  lecture.id
                );

                return (
                  <div
                    key={lecture.id}
                    className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <h3 className="text-xl font-bold text-gray-900 mr-4">
                            {lecture.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              lecture.status
                            )}`}
                          >
                            {lecture.status.charAt(0).toUpperCase() +
                              lecture.status.slice(1)}
                          </span>
                          {studentAttendance && (
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ml-3 flex items-center ${getAttendanceStatusColor(
                                studentAttendance.status
                              )}`}
                            >
                              {getAttendanceStatusIcon(
                                studentAttendance.status
                              )}
                              <span className="ml-2">
                                {studentAttendance.status
                                  .charAt(0)
                                  .toUpperCase() +
                                  studentAttendance.status.slice(1)}
                              </span>
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 mb-4">
                          {lecture.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            <span>
                              {new Date(lecture.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-green-500" />
                            <span>
                              {lecture.startTime} - {lecture.endTime}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-purple-500" />
                            <span>{lecture.topic}</span>
                          </div>
                        </div>

                        {studentAttendance && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">
                                Attendance marked by:
                              </span>{" "}
                              {studentAttendance.markedBy}
                              <span className="ml-4">
                                <span className="font-medium">Time:</span>{" "}
                                {new Date(
                                  studentAttendance.markedAt
                                ).toLocaleString()}
                              </span>
                            </p>
                          </div>
                        )}

                        {lecture.status === "scheduled" && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-700 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-2" />
                              This lecture is scheduled. Attendance will be
                              marked after the class.
                            </p>
                          </div>
                        )}

                        {lecture.status === "postponed" && (
                          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-yellow-700 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-2" />
                              This lecture has been postponed. New schedule will
                              be announced soon.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredLectures.length === 0 && (
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-12 text-center">
                  <PlayCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">
                    No Lectures Found
                  </h3>
                  <p className="text-gray-400">
                    {searchTerm || filterStatus !== "all"
                      ? "Try adjusting your search criteria or filters."
                      : "No lectures have been scheduled for this class yet."}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
