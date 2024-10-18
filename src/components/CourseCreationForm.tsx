import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, FileText, X } from 'lucide-react';

interface CourseTime {
  day: string;
  startTime: string;
  endTime: string;
}

interface CourseData {
  courseName: string;
  courseCode: string;
  description: string;
  startDate: string;
  endDate: string;
  classTimes: CourseTime[];
  location: string;
  maxStudents: number;
  file?: File;
}

const CourseCreationForm: React.FC = () => {
  const [courseData, setCourseData] = useState<CourseData>({
    courseName: '',
    courseCode: '',
    description: '',
    startDate: '',
    endDate: '',
    classTimes: [],
    location: '',
    maxStudents: 0,
  });

  const [classTime, setClassTime] = useState<CourseTime>({
    day: '',
    startTime: '',
    endTime: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleClassTimeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClassTime({ ...classTime, [name]: value });
  };

  const addClassTime = () => {
    setCourseData({
      ...courseData,
      classTimes: [...courseData.classTimes, classTime],
    });
    setClassTime({ day: '', startTime: '', endTime: '' });
  };

  const removeClassTime = (index: number) => {
    const updatedClassTimes = courseData.classTimes.filter((_, i) => i !== index);
    setCourseData({ ...courseData, classTimes: updatedClassTimes });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCourseData({ ...courseData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend API
    console.log('Submitting course data:', courseData);
    // Implement API call here
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">创建新课程</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
            课程名称
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={courseData.courseName}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">
            课程代码
          </label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={courseData.courseCode}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            课程描述
          </label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              开始日期
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={courseData.startDate}
                onChange={handleInputChange}
                required
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              结束日期
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={courseData.endDate}
                onChange={handleInputChange}
                required
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">上课时间</label>
          <div className="flex space-x-2 mb-2">
            <select
              name="day"
              value={classTime.day}
              onChange={handleClassTimeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">选择日期</option>
              <option value="Monday">周一</option>
              <option value="Tuesday">周二</option>
              <option value="Wednesday">周三</option>
              <option value="Thursday">周四</option>
              <option value="Friday">周五</option>
              <option value="Saturday">周六</option>
              <option value="Sunday">周日</option>
            </select>
            <input
              type="time"
              name="startTime"
              value={classTime.startTime}
              onChange={handleClassTimeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="time"
              name="endTime"
              value={classTime.endTime}
              onChange={handleClassTimeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={addClassTime}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              添加
            </button>
          </div>
          {courseData.classTimes.map((time, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span>{`${time.day} ${time.startTime} - ${time.endTime}`}</span>
              <button
                type="button"
                onClick={() => removeClassTime(index)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            上课地点
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="location"
              name="location"
              value={courseData.location}
              onChange={handleInputChange}
              required
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="maxStudents" className="block text-sm font-medium text-gray-700">
            最大学生人数
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="maxStudents"
              name="maxStudents"
              value={courseData.maxStudents}
              onChange={handleInputChange}
              required
              min="1"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            上传相关文件（课程大纲等）
          </label>
          <div className="mt-1 flex items-center">
            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <FileText className="h-full w-full text-gray-300" />
            </span>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            取消
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreationForm;