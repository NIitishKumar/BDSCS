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
  Download,
  Upload,
  X,
  UserPlus,
  Clock,
  GraduationCap,
  PlayCircle,
  FileText,
  UserCheck,
  Settings,
  BarChart3,
  Shield,
  Award,
  Eye,
  RefreshCw,
} from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  experience: number;
  qualification: string;
  employeeId: string;
  status: "active" | "inactive";
}

interface Class {
  id: string;
  name: string;
  subject: string;
  grade: string;
  room: string;
  capacity: number;
  enrolled: number;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  grade: string;
  classId: string;
  parentName: string;
  parentPhone: string;
  status: "active" | "inactive";
}

interface Lecture {
  id: string;
  classId: string;
  className: string;
  teacherId: string;
  teacherName: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  topic: string;
  status: "scheduled" | "completed" | "postponed" | "cancelled";
  room: string;
  assignedBy: string;
  assignedAt: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "lectures" | "teachers" | "classes" | "students" | "reports"
  >("dashboard");
  const [showCreateLectureForm, setShowCreateLectureForm] =
    useState<boolean>(false);
  const [showAssignLectureForm, setShowAssignLectureForm] =
    useState<boolean>(false);
  const [showAddTeacherForm, setShowAddTeacherForm] = useState<boolean>(false);
  // const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Current admin info
  const currentAdmin = {
    id: "admin1",
    name: "Dr. Rajesh Kumar",
    role: "Principal",
    email: "principal@bdsconventschool.edu",
  };

  // Sample data
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: "teacher1",
      name: "Mrs. Priya Sharma",
      email: "priya.sharma@bds.edu",
      phone: "9876543210",
      subject: "Mathematics",
      experience: 8,
      qualification: "M.Sc Mathematics, B.Ed",
      employeeId: "BDS001",
      status: "active",
    },
    {
      id: "teacher2",
      name: "Dr. Ravi Kumar",
      email: "ravi.kumar@bds.edu",
      phone: "9876543211",
      subject: "Science",
      experience: 12,
      qualification: "Ph.D Chemistry, M.Ed",
      employeeId: "BDS002",
      status: "active",
    },
    {
      id: "teacher3",
      name: "Mr. Rajesh Singh",
      email: "rajesh.singh@bds.edu",
      phone: "9876543212",
      subject: "English",
      experience: 6,
      qualification: "M.A English, B.Ed",
      employeeId: "BDS003",
      status: "active",
    },
  ]);

  const [classes] = useState<Class[]>([
    {
      id: "1",
      name: "Mathematics Advanced",
      subject: "Mathematics",
      grade: "Class 10",
      room: "Room 101",
      capacity: 30,
      enrolled: 25,
    },
    {
      id: "2",
      name: "Science Foundation",
      subject: "Science",
      grade: "Class 7",
      room: "Lab 2",
      capacity: 25,
      enrolled: 20,
    },
    {
      id: "3",
      name: "English Literature",
      subject: "English",
      grade: "Class 9",
      room: "Room 205",
      capacity: 35,
      enrolled: 32,
    },
  ]);

  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "Arjun Patel",
      rollNumber: "BDS001",
      grade: "Class 10",
      classId: "1",
      parentName: "Mr. Suresh Patel",
      parentPhone: "9876543211",
      status: "active",
    },
    {
      id: "2",
      name: "Sneha Singh",
      rollNumber: "BDS002",
      grade: "Class 9",
      classId: "3",
      parentName: "Mrs. Kavita Singh",
      parentPhone: "8765432108",
      status: "active",
    },
  ]);

  const [lectures, setLectures] = useState<Lecture[]>([
    {
      id: "1",
      classId: "1",
      className: "Mathematics Advanced",
      teacherId: "teacher1",
      teacherName: "Mrs. Priya Sharma",
      title: "Quadratic Equations",
      description: "Introduction to quadratic equations and their solutions",
      date: "2025-08-17",
      startTime: "09:00",
      endTime: "10:00",
      topic: "Algebra",
      status: "scheduled",
      room: "Room 101",
      assignedBy: "Dr. Rajesh Kumar",
      assignedAt: "2025-08-15T10:00:00",
    },
    {
      id: "2",
      classId: "2",
      className: "Science Foundation",
      teacherId: "teacher2",
      teacherName: "Dr. Ravi Kumar",
      title: "Chemical Reactions",
      description: "Basic chemical reactions and their properties",
      date: "2025-08-18",
      startTime: "10:00",
      endTime: "11:00",
      topic: "Chemistry",
      status: "scheduled",
      room: "Lab 2",
      assignedBy: "Dr. Rajesh Kumar",
      assignedAt: "2025-08-15T11:00:00",
    },
  ]);

  const [newLecture, setNewLecture] = useState<Partial<Lecture>>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "10:00",
    topic: "",
    classId: "",
    teacherId: "",
    status: "scheduled",
  });

  const [bulkAssignment, setBulkAssignment] = useState<{
    teacherId: string;
    classId: string;
    startDate: string;
    endDate: string;
    daysOfWeek: string[];
    startTime: string;
    endTime: string;
  }>({
    teacherId: "",
    classId: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    daysOfWeek: [],
    startTime: "09:00",
    endTime: "10:00",
  });

  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    experience: 0,
    qualification: "",
    employeeId: "",
    status: "active",
  });

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "Social Studies",
    "Hindi",
    "Computer Science",
    "Physical Education",
    "Arts",
    "Music",
  ];
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleCreateLecture = () => {
    if (
      newLecture.title &&
      newLecture.classId &&
      newLecture.teacherId &&
      newLecture.date
    ) {
      const selectedClass = classes.find((c) => c.id === newLecture.classId);
      const selectedTeacher = teachers.find(
        (t) => t.id === newLecture.teacherId
      );

      const lectureToAdd: Lecture = {
        id: Date.now().toString(),
        classId: newLecture.classId!,
        className: selectedClass?.name || "",
        teacherId: newLecture.teacherId!,
        teacherName: selectedTeacher?.name || "",
        title: newLecture.title!,
        description: newLecture.description || "",
        date: newLecture.date!,
        startTime: newLecture.startTime || "09:00",
        endTime: newLecture.endTime || "10:00",
        topic: newLecture.topic || "",
        status: "scheduled",
        room: selectedClass?.room || "",
        assignedBy: currentAdmin.name,
        assignedAt: new Date().toISOString(),
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
        teacherId: "",
        status: "scheduled",
      });
      setShowCreateLectureForm(false);
    }
  };

  const handleBulkAssignment = () => {
    if (
      bulkAssignment.teacherId &&
      bulkAssignment.classId &&
      bulkAssignment.startDate &&
      bulkAssignment.endDate
    ) {
      const selectedClass = classes.find(
        (c) => c.id === bulkAssignment.classId
      );
      const selectedTeacher = teachers.find(
        (t) => t.id === bulkAssignment.teacherId
      );

      const startDate = new Date(bulkAssignment.startDate);
      const endDate = new Date(bulkAssignment.endDate);
      const newLectures: Lecture[] = [];

      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        if (bulkAssignment.daysOfWeek.includes(dayName)) {
          const lecture: Lecture = {
            id: `${Date.now()}_${date.getTime()}`,
            classId: bulkAssignment.classId,
            className: selectedClass?.name || "",
            teacherId: bulkAssignment.teacherId,
            teacherName: selectedTeacher?.name || "",
            title: `${selectedClass?.subject} Class`,
            description: `Regular ${selectedClass?.subject} lecture`,
            date: date.toISOString().split("T")[0],
            startTime: bulkAssignment.startTime,
            endTime: bulkAssignment.endTime,
            topic: selectedClass?.subject || "",
            status: "scheduled",
            room: selectedClass?.room || "",
            assignedBy: currentAdmin.name,
            assignedAt: new Date().toISOString(),
          };
          newLectures.push(lecture);
        }
      }

      setLectures([...lectures, ...newLectures]);
      setBulkAssignment({
        teacherId: "",
        classId: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        daysOfWeek: [],
        startTime: "09:00",
        endTime: "10:00",
      });
      setShowAssignLectureForm(false);
    }
  };

  const handleAddTeacher = () => {
    if (
      newTeacher.name &&
      newTeacher.email &&
      newTeacher.subject &&
      newTeacher.employeeId
    ) {
      const teacherToAdd: Teacher = {
        id: Date.now().toString(),
        name: newTeacher.name!,
        email: newTeacher.email!,
        phone: newTeacher.phone || "",
        subject: newTeacher.subject!,
        experience: newTeacher.experience || 0,
        qualification: newTeacher.qualification || "",
        employeeId: newTeacher.employeeId!,
        status: "active",
      };

      setTeachers([...teachers, teacherToAdd]);
      setNewTeacher({
        name: "",
        email: "",
        phone: "",
        subject: "",
        experience: 0,
        qualification: "",
        employeeId: "",
        status: "active",
      });
      setShowAddTeacherForm(false);
    }
  };

  const deleteLecture = (id: string) => {
    setLectures(lectures.filter((l) => l.id !== id));
  };

  const deleteTeacher = (id: string) => {
    setTeachers(teachers.filter((t) => t.id !== id));
    // Also remove lectures assigned to this teacher
    setLectures(lectures.filter((l) => l.teacherId !== id));
  };

  const getFilteredLectures = () => {
    return lectures
      .filter(
        (lecture) =>
          lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lecture.teacherName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          lecture.className.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (lecture) => filterStatus === "all" || lecture.status === filterStatus
      );
  };

  const getTeacherStats = () => {
    return {
      totalTeachers: teachers.length,
      activeTeachers: teachers.filter((t) => t.status === "active").length,
      totalLectures: lectures.length,
      scheduledLectures: lectures.filter((l) => l.status === "scheduled")
        .length,
    };
  };

  const getClassStats = () => {
    return {
      totalClasses: classes.length,
      totalStudents: students.length,
      totalCapacity: classes.reduce((sum, cls) => sum + cls.capacity, 0),
      enrollmentRate: Math.round(
        (students.length /
          classes.reduce((sum, cls) => sum + cls.capacity, 0)) *
          100
      ),
    };
  };

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
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
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
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">
                  {currentAdmin.name} - {currentAdmin.role} | BDS Convent School
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-2 mb-6">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "lectures", label: "Lectures", icon: PlayCircle },
              { id: "teachers", label: "Teachers", icon: Users },
              { id: "classes", label: "Classes", icon: BookOpen },
              { id: "students", label: "Students", icon: GraduationCap },
              { id: "reports", label: "Reports", icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "dashboard" | "lectures" | "teachers" | "classes" | "students" | "reports")}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Teachers</p>
                    <p className="text-3xl font-bold">
                      {getTeacherStats().totalTeachers}
                    </p>
                  </div>
                  <Users className="w-12 h-12 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Total Students</p>
                    <p className="text-3xl font-bold">
                      {getClassStats().totalStudents}
                    </p>
                  </div>
                  <GraduationCap className="w-12 h-12 text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Total Classes</p>
                    <p className="text-3xl font-bold">
                      {getClassStats().totalClasses}
                    </p>
                  </div>
                  <BookOpen className="w-12 h-12 text-purple-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-100">Scheduled Lectures</p>
                    <p className="text-3xl font-bold">
                      {getTeacherStats().scheduledLectures}
                    </p>
                  </div>
                  <PlayCircle className="w-12 h-12 text-pink-200" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div
                onClick={() => setShowCreateLectureForm(true)}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 ml-4">
                    Create Lecture
                  </h3>
                </div>
                <p className="text-gray-600">
                  Schedule a new lecture and assign it to a teacher
                </p>
              </div>

              <div
                onClick={() => setShowAssignLectureForm(true)}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 ml-4">
                    Bulk Assignment
                  </h3>
                </div>
                <p className="text-gray-600">
                  Assign multiple lectures to teachers at once
                </p>
              </div>

              <div
                onClick={() => setShowAddTeacherForm(true)}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 ml-4">
                    Add Teacher
                  </h3>
                </div>
                <p className="text-gray-600">
                  Register a new teacher to the system
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Recent Lecture Assignments
              </h3>
              <div className="space-y-4">
                {lectures.slice(0, 5).map((lecture) => (
                  <div
                    key={lecture.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {lecture.teacherName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {lecture.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {lecture.className} • {lecture.teacherName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {new Date(lecture.date).toLocaleDateString()}
                      </p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          lecture.status
                        )}`}
                      >
                        {lecture.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Lectures Tab */}
        {activeTab === "lectures" && (
          <>
            {/* Search and Actions */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search lectures, teachers, or classes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="postponed">Postponed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => setShowCreateLectureForm(true)}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Lecture
                  </button>
                </div>
              </div>
            </div>

            {/* Lectures List */}
            <div className="space-y-4">
              {getFilteredLectures().map((lecture) => (
                <div
                  key={lecture.id}
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6"
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
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                          <span>{lecture.className}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-green-500" />
                          <span>{lecture.teacherName}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                          <span>
                            {new Date(lecture.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-pink-500" />
                          <span>
                            {lecture.startTime} - {lecture.endTime}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3">
                        {lecture.description}
                      </p>

                      <div className="text-xs text-gray-500">
                        Assigned by {lecture.assignedBy} on{" "}
                        {new Date(lecture.assignedAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 ml-6">
                      <button
                        // onClick={() => setSelectedLecture(lecture)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteLecture(lecture.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {getFilteredLectures().length === 0 && (
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-12 text-center">
                  <PlayCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">
                    No Lectures Found
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {searchTerm || filterStatus !== "all"
                      ? "Try adjusting your search criteria or filters."
                      : "No lectures have been created yet."}
                  </p>
                  <button
                    onClick={() => setShowCreateLectureForm(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
                  >
                    Create First Lecture
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Teachers Tab */}
        {activeTab === "teachers" && (
          <>
            {/* Teachers Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Teachers Management
              </h2>
              <button
                onClick={() => setShowAddTeacherForm(true)}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Add Teacher
              </button>
            </div>

            {/* Teachers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {teacher.name.charAt(0)}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        teacher.status
                      )}`}
                    >
                      {teacher.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {teacher.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {teacher.subject} Teacher
                  </p>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{teacher.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{teacher.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      <span>{teacher.experience} years experience</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Employee ID</span>
                      <span className="font-semibold">
                        {teacher.employeeId}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">Lectures Assigned</span>
                      <span className="font-semibold">
                        {
                          lectures.filter((l) => l.teacherId === teacher.id)
                            .length
                        }
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                      <Edit className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => deleteTeacher(teacher.id)}
                      className="flex-1 py-2 px-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Classes Tab */}
        {activeTab === "classes" && (
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Classes Overview
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">
                      Class Name
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">Grade</th>
                    <th className="px-6 py-4 text-left font-semibold">Room</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Capacity
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Enrolled
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cls, index) => (
                    <tr
                      key={cls.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {cls.name}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{cls.subject}</td>
                      <td className="px-6 py-4 text-gray-700">{cls.grade}</td>
                      <td className="px-6 py-4 text-gray-700">{cls.room}</td>
                      <td className="px-6 py-4 text-gray-700">
                        {cls.capacity}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            cls.enrolled >= cls.capacity
                              ? "bg-red-100 text-red-700"
                              : cls.enrolled / cls.capacity > 0.8
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {cls.enrolled}/{cls.capacity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Students Overview
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">
                      Student Name
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Roll Number
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">Grade</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Parent Name
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Parent Phone
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student.id}
                      className={`border-b border-gray-100 hover:bg-green-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                            {student.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-900">
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {student.rollNumber}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {student.grade}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {student.parentName}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {student.parentPhone}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            student.status
                          )}`}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                System Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Teachers</span>
                  <span className="font-bold text-gray-900">
                    {teachers.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Students</span>
                  <span className="font-bold text-gray-900">
                    {students.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Classes</span>
                  <span className="font-bold text-gray-900">
                    {classes.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Lectures</span>
                  <span className="font-bold text-gray-900">
                    {lectures.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Enrollment Rate</span>
                  <span className="font-bold text-gray-900">
                    {getClassStats().enrollmentRate}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Report
                </button>
                <button className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Data
                </button>
                <button className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-200">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Sync Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Lecture Modal */}
      {showCreateLectureForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Create New Lecture
                </h2>
                <button
                  onClick={() => setShowCreateLectureForm(false)}
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter lecture title"
                  />
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter topic"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    Assign Teacher
                  </label>
                  <select
                    value={newLecture.teacherId || ""}
                    onChange={(e) =>
                      setNewLecture({
                        ...newLecture,
                        teacherId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Teacher</option>
                    {teachers
                      .filter((t) => t.status === "active")
                      .map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} - {teacher.subject}
                        </option>
                      ))}
                  </select>
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="time"
                      value={newLecture.startTime || ""}
                      onChange={(e) =>
                        setNewLecture({
                          ...newLecture,
                          startTime: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="time"
                      value={newLecture.endTime || ""}
                      onChange={(e) =>
                        setNewLecture({
                          ...newLecture,
                          endTime: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="Enter lecture description"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowCreateLectureForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateLecture}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
              >
                Create & Assign Lecture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Assignment Modal */}
      {showAssignLectureForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Bulk Lecture Assignment
                </h2>
                <button
                  onClick={() => setShowAssignLectureForm(false)}
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
                    Teacher
                  </label>
                  <select
                    value={bulkAssignment.teacherId}
                    onChange={(e) =>
                      setBulkAssignment({
                        ...bulkAssignment,
                        teacherId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Teacher</option>
                    {teachers
                      .filter((t) => t.status === "active")
                      .map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} - {teacher.subject}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class
                  </label>
                  <select
                    value={bulkAssignment.classId}
                    onChange={(e) =>
                      setBulkAssignment({
                        ...bulkAssignment,
                        classId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={bulkAssignment.startDate}
                    onChange={(e) =>
                      setBulkAssignment({
                        ...bulkAssignment,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={bulkAssignment.endDate}
                    onChange={(e) =>
                      setBulkAssignment({
                        ...bulkAssignment,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={bulkAssignment.startTime}
                    onChange={(e) =>
                      setBulkAssignment({
                        ...bulkAssignment,
                        startTime: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={bulkAssignment.endTime}
                    onChange={(e) =>
                      setBulkAssignment({
                        ...bulkAssignment,
                        endTime: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Days of Week
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {daysOfWeek.map((day) => (
                    <label
                      key={day}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={bulkAssignment.daysOfWeek.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBulkAssignment({
                              ...bulkAssignment,
                              daysOfWeek: [...bulkAssignment.daysOfWeek, day],
                            });
                          } else {
                            setBulkAssignment({
                              ...bulkAssignment,
                              daysOfWeek: bulkAssignment.daysOfWeek.filter(
                                (d) => d !== day
                              ),
                            });
                          }
                        }}
                        className="mr-2 rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowAssignLectureForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkAssignment}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
              >
                Create Bulk Assignments
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddTeacherForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Add New Teacher
                </h2>
                <button
                  onClick={() => setShowAddTeacherForm(false)}
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newTeacher.name || ""}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter teacher's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={newTeacher.employeeId || ""}
                    onChange={(e) =>
                      setNewTeacher({
                        ...newTeacher,
                        employeeId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter employee ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newTeacher.email || ""}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newTeacher.phone || ""}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    value={newTeacher.subject || ""}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    value={newTeacher.experience || 0}
                    onChange={(e) =>
                      setNewTeacher({
                        ...newTeacher,
                        experience: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    max="50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualification
                </label>
                <textarea
                  value={newTeacher.qualification || ""}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      qualification: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  placeholder="Enter qualifications (e.g., M.Sc Mathematics, B.Ed)"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowAddTeacherForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTeacher}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
              >
                Add Teacher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
